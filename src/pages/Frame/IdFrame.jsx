//import React from 'react'
import Box  from '@mui/material/Box'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'



function Frame () {
    return (
        <Container disableGutters maxWidth={false} sx ={{ height:'100vh', backgroundColor: 'orange'}}>
          <Box
            sx ={{
              backgroundColor: 'white',
              width: '100%',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            TODO
          </Box>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
          <TextField id="outlined-basic" label="Input" variant="outlined" />
          <Button variant="contained" sx ={{ m:1 , width: '80ch'}} >ADD</Button>
          </Box>
    
        </Container>
      )
}
export default Frame