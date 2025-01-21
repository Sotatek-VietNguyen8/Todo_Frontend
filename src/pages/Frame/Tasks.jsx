// import * as React  from 'react'
// import TextField from '@mui/material/TextField'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import dayjs from 'dayjs'
// import weekOfYear from 'dayjs/plugin/weekOfYear'
// import customParseFormat from 'dayjs/plugin/customParseFormat'
// import localizedFormat from 'dayjs/plugin/localizedFormat'
// import isBetween from 'dayjs/plugin/isBetween'
// import advancedFormat from 'dayjs/plugin/advancedFormat'
// import Button from '@mui/material/Button'
// import FormControl from '@mui/material/FormControl'
// import { useState } from 'react'
// dayjs.extend(weekOfYear);
// dayjs.extend(customParseFormat);
// dayjs.extend(localizedFormat);
// dayjs.extend(isBetween);
// dayjs.extend(advancedFormat);

// function TaskForm() {
//   const [title, setTitle] = useState("")
//   const [titleErr, setTilteErr] = useState(false)

//   const handleTitle = e =>{
//     setTitle(e.target.value)
//     const handleTitle = (e) => {
//       const value = e.target.value.trim();
//       setTitle(value);
//       setTitleErr(value === "");
//     }
//   }
//   return (
//     <FormControl
//       sx ={{
//         backgroundColor: '#f3e5f5',
//           width: '50%',
//           margin: 'auto',
//           padding: '20px',
//           borderRadius: '8px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '20px'
//       }}
//     >
//       <TextField 
//         sx ={{
//           width: '100%'
//           }}
//           required
//           value={title}
//           onChange={handleTitle}
//           error={titleErr}
//           helperText={titleErr ? "Please enter a title" : ""}
//           id="title" 
//           label="title" 
//           variant="outlined"
//       />
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DatePicker 
//           label="Date" 
//           sx={{ width: '100%' }}
//         />
//       </LocalizationProvider>
//       <TextField 
//         id="description" 
//         label="description" 
//         variant="standard"
//         multiline 
//         rows={4}
//         sx ={{
//           width: '100%',
//           minHeight: '200px'
//         }}
//       />
//         <Button variant="contained"
//           sx ={{
//            backgroundColor : '#4dabf5'
//           }}
//         >SUBMIT
//         </Button>
//     </FormControl>
    
    
//   );
// }
