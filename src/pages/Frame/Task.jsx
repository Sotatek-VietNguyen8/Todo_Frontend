
import { Box, Button, Container, IconButton, List, ListItem, ListItemText, TextField } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { Delete } from '@mui/icons-material'

function TaskTodo() {
    const [tasks, setTasks] = useState([])
    const [taskText, setTasktext] = useState('')
    const [estimate, setEstimate] = useState('')
    const [subTaskText, setSubTaskText] = useState('')
    const [subTaskEstimate, setSubTaskEstimate] = useState('')

    const API_URL ='http://localhost:5189'

    //task cha
    const addTask = async () => {
        if (taskText.trim() !== '' && estimate.trim() > '0') {
            try {
                const newTask = {
                    textTask: taskText,
                    completed: false,
                    estimate: parseInt(estimate, 10),
                    subTasks: [],
                    is_deleted: false,
                }
                console.log("Sending task to backend_add:", newTask)
                const response = await axios.post(`${API_URL}/post`,  newTask )
                
                if(response.status === 201){
                    const newTaskId = {...response.data, subTasks:[]}
                    setTasks([...tasks, newTaskId]);
                    setTasktext('')
                    setEstimate('')
                }
                console.log("Response from backend:", response.data);
            } catch (error) {
                console.error('Failed add task to backend', error)
            }
        }
    }
    //task con
    const addSubTask = async (parentId) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === parentId) {
                const currentTotalEstimate = task.subTasks.reduce((total, subTask) => total + subTask.estimate, 0);
                const newEstimate = parseInt(subTaskEstimate, 10);

                if (subTaskEstimate > '0' && currentTotalEstimate + newEstimate <= task.estimate) {
                    const newSubTask = {
                        text: subTaskText,
                        completed: false,
                        estimate: newEstimate,
                        is_deleted: false,
                    };
                    const updatedSubTasks = [...task.subTasks, newSubTask];
                    console.log("new subTask sending to backend: ", newSubTask)
                    return {
                        ...task,
                        subTasks: updatedSubTasks,
                        completed: isCompleted(updatedSubTasks) || currentTotalEstimate + newEstimate >= task.estimate,
                    };
                } else if (subTaskEstimate === '0') {
                    alert('Failed: estimate != 0 ')
                } else {
                    alert('Failed: exceed estimate!!!')
                }
            }
            return task
        })
        setTasks(updatedTasks)
        const updatedTask = updatedTasks.find((task) => task.id === parentId)
        if (updatedTask) {
            try {
                const response = await axios.put(`${API_URL}/update/${parentId}`, updatedTask)
                 if(response.status === 200 && response.data && response.data.subTasks){
                    const newSubTaskId =response.data.subTasks

                    setTasks((prevTasks)=>{
                        return prevTasks.map((task)=>{
                            if(task.id === parentId){
                                return{...task,subTasks: newSubTaskId}
                            }
                            return task
                        })
                    })
                    console.log("Task updated successfully!")
                }
            } catch (error) {
                console.error("Error updating task", error)
            }
        }
        setSubTaskText('')
        setSubTaskEstimate('')
    }
    const isCompleted = (subTasks) => {
        const checkSubTasks = subTasks.length > 0 && subTasks.every((subTask) => subTask.completed)
        return checkSubTasks
    }
    
    const toggleSubTask = (parentId, subTaskId) =>{
        const updatedTasks = tasks.map((task) =>{
            if(task.id === parentId){
                const updatedSubTasks = task.subTask.map((subTask)=>{
                    return subTask.id === subTaskId ? {...subTask, completed: !subTask.completed} : subTask
                })
                return {
                    ...task,
                    subTasks: updatedSubTasks,
                    completed: isCompleted(updatedSubTasks) || calculateTotalEstimate(updatedSubTasks) >= task.estimate
                }
            }
            return task
        })
        setTasks(updatedTasks)
    }
    
    const calculateTotalEstimate = (subTasks) => {
        const calculate =  subTasks.reduce((total, subTask) => total + (subTask?.estimate || 0), 0);
        return calculate
    };
    
    const deleteSubTask = async (parentId, subTaskId) => {
        try {
            console.log("taskId to backend", parentId)
          console.log("subTaskId to backend: ", subTaskId)
          const response = await axios.delete(`${API_URL}/delete/${parentId}/${subTaskId}`)
          console.log("delete subTask response from backend: ", response.data);
          setTasks((prevTasks) => {
            return prevTasks.map((task) => {
              if (task.id === parentId) {
                const updatedSubTasks = task.subTasks.filter(
                  (subTask) => subTask.id !== subTaskId
                )
                return { ...task, subTasks: updatedSubTasks }
              }
              return task
            })
          })
        } catch (error) {
          console.error("Error deleting subTask from backend", error);
        }
      };

    const deleteTask = async (taskId) => {
        try {
            console.log("taskId to delete: ",taskId)
            const response = await axios.delete(`${API_URL}/delete/${taskId}`);
            if (response.status === 200) {
              const updatedTasks= tasks.map((task)=> (task.id === taskId ? {...task, is_deleted: true} :task))
              //const updatedTasks = tasks.filter((task) => task.id !== taskId);
              setTasks(updatedTasks);
            }
          } catch (error) {
            console.error("Error deleting task from backend", error);
          }
    }
    return(
        <Container
            sx={{ backgroundColor: '#e3f7f6'}}
        >
            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '25ch' }, display: 'flex', justifyContent: 'center' }}          
                noValidate
                autoComplete="off"
                >
                <TextField
                    label="Add new Task"
                    value={taskText}
                    onChange={(e)=> setTasktext(e.target.value)}
                />
                <TextField
                    label="Estimate"
                    value={estimate}
                    onChange={(e)=>setEstimate(e.target.value)}
                />
                <Button variant="contained" color="#dca2a0" onClick={addTask}>Add Task</Button>
            </Box>
            <List>
                {tasks.map((task) =>(
                    <ListItem key={task.id}>
                        <ListItemText
                            primary={`${task.textTask} - Total Estimate: ${calculateTotalEstimate(task.subTasks)}/${task.estimate}`}
                            secondary={task.completed ? 'Completed' : 'Incomplete'}
                            sx={{
                                textDecoration: task.is_deleted ? 'line-through' :'none',
                                color: task.is_deleted ? '#81c784' : 'black'
                            }}
                        />
                        <IconButton aria-label="delete" onClick={ ()=>deleteTask(task.id)}>
                            <Delete />
                        </IconButton>
                        {!task.completed && !task.is_deleted &&(
                            <>
                                <TextField
                                    label="subtask"
                                    value={subTaskText}
                                    onChange={(e)=>setSubTaskText(e.target.value)}
                                    sx={{ width: '20ch' , marginRight: '10px', color: '#ffe9cf'}}
                                />
                                <TextField
                                    label="estimate"
                                    value={subTaskEstimate}
                                    onChange={(e)=>setSubTaskEstimate(e.target.value)}
                                    sx={{ width: '10ch' , marginRight: '10px', backgroundColor: '#ffe9cf'}}
                                />
                                <Button variant="contained" onClick={()=>addSubTask(task.id)}>Add Sub Task</Button>
                            </>

                        )}
                        <List>
                            {task.subTasks.map((subTask)=>(
                                <ListItem key={subTask.id}>
                                    <ListItemText
                                        checked={subTask.completed}
                                        onChange={() => toggleSubTask(task.id, subTask.id)}
                                        primary={`SubTask: ${subTask.text}`}
                                        sx={{
                                           textDecoration: subTask.is_deleted ? 'line-through': 'none',
                                          color: subTask.is_deleted ? '#81c784' : 'black'
                                       }}
                                    />
                                    <IconButton aria-label="delete" onClick={ ()=>deleteSubTask(task.id, subTask.id)}>
                                        <Delete/>
                                    </IconButton>

                                </ListItem>
                            ))}
                        </List>
                    </ListItem>
                ))}
            </List>
        </Container>
    )
}

export default TaskTodo