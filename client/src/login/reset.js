import React, { useState, useContext } from 'react'
import { Box, TextField, Button, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { AppContext } from '../AppContext'

const useStyles = makeStyles(theme=>({
  title: {
    fontSize: '24px',
    color: theme.palette.primary.main,
    fontWeight: '700',
    margin: '0 0 10px 0'
  },
  inputRow: {
    margin: '0 0 10px 0'
  },
  navBtn: {
    color: theme.palette.primary.main,
    fontWeight: '700',
    cursor: 'pointer',
    '&:hover': {color: theme.palette.background.default}
  }
}))

export default function Reset(props){
  const empty = {
    email: '',
    password: '',
  }
  const cl = useStyles()
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(empty)
  const { notify, resetPwd } = useContext(AppContext)

  const handleChange = (prop) => (e) => setValues({...values, [prop]: e.target.value})

  const submitReset = () => {
    if (!values.email) return notify('Please enter your email')
    if (!values.password) return notify('Please enter a password')
    setLoading(true)
    resetPwd(values, (err) => {
      if (err) {
        notify('Something went wrong!')
        setValues(empty)
      } else {
        notify('Password successfully updated!')
        props.updateView('signin')
      }
    })

  }

  return(
    <>
    <Box className={cl.title}>Reset Password</Box>
    <Box className={cl.inputRow}>
      <TextField
        variant='outlined'
        fullWidth={true}
        margin='dense'
        placeholder='Email...'
        onChange={handleChange('email')}
        value={values.email}
      />
    </Box>
    <Box className={cl.inputRow}>
      <TextField
        variant='outlined'
        fullWidth={true}
        margin='dense'
        placeholder='New password...'
        type='password'
        onChange={handleChange('password')}
        value={values.password}
      />
    </Box>
    <Box display='flex' justifyContent='flex-end' alignItems='center'>
      <Button
        variant='contained'
        disableElevation={true}
        color='primary'
        onClick={submitReset}
        style={{minWidth: '90px'}}
      >
        {loading ? <CircularProgress color='secondary' size={24}/> : 'Reset'}
      </Button>
    </Box>
    <Box display='flex' alignItems='center' justifyContent='center'>
      <Box 
        className={cl.navBtn}
        onClick={()=>props.updateView('signin')}
      >
        Sign in
      </Box>
    </Box>
    </>
  )
}