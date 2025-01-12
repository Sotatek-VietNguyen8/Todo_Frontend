import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';


function TaskTodo() {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')

  const API_URL = 'http://localhost:5189'

  const AddTask = async () => {
    if (task.trim() !== '') {
      console.log("Sending task to backend_add:", task)
      const response = await axios.post(`${API_URL}/post`, { text: task } )
      const newTask = response.data
      console.log("Response from backend:", response.data)
      setTasks([...tasks, newTask])
      setTask('')
    }
  } 

  
  const deleteTask = async (index) => {
    try {
      const taskToDelete = tasks[index]
      
      console.log("Sending task to backend_delete: ", taskToDelete)
      console.log("Id to delete: ", taskToDelete.id)

      await axios.delete(`${API_URL}/delete/${taskToDelete.id}`)

      const updatedTasks = tasks.map((t, i) => (i === index ? { ...t, is_deleted: true } : t))
      

      setTasks(updatedTasks) 
    } catch (error) {
      console.error("Error deleting task:", error.message)
    }
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: '#dfe6e9' }}>
      <Box
        sx={{
          backgroundColor: 'white',
          width: '100%',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        TODO
      </Box>
      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' }, display: 'flex', justifyContent: 'center' }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Add a new task"
          variant="outlined"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ m: 1, width: '25ch' }}
          onClick={AddTask}
        >
          ADD+
        </Button>
      </Box>
      <Box sx={{ mt: 2, width: '100%' , maxWidth: 360, mx: 'auto', bgcolor: 'background.paper'}}>
        <List>
          {
            tasks.map((item, index) =>(
              <ListItem
                key={index}
                secondaryAction={
                  !item.is_deleted && (
                    <IconButton  edge= "end" aria-label='delete' onClick={()=> deleteTask(index)}>
                      <DeleteIcon/>
                    </IconButton>
                  )
                }
                 disablePadding
                 dense
                 sx={{
                   textDecoration: item.is_deleted ? 'line-through' : 'none',
                   color: item.is_deleted ? '##b2bec3' : 'black'
                  }}
                > 
                  <ListItemButton disabled ={item.is_deleted}>
                    <Checkbox
                      edge= "start"
                      checked= {item.is_deleted || item.completed}
                      tabIndex={-1}
                      disableRipple
                    />
                    <ListItemText primary ={ item.text} />
                  </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Container>
  );
}

export default TaskTodo;
