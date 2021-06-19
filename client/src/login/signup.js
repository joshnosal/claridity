import React, { useContext, useState } from 'react'
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

export default function SignUp(props){
  const empty = {
    name: '',
    email: '',
    password: '',
    confirm: ''
  }
  const cl = useStyles()
  const [values, setValues] = useState(empty)
  const [loading, setLoading] = useState(false)
  const { notify, signUp } = useContext(AppContext)

  const handleChange = (prop) => (e) => setValues({...values, [prop]: e.target.value})

  const submitForm = () => {
    if (!values.name) return notify('Please enter your name')
    if (!values.email) return notify('Please enter your email')
    if (!values.password) return notify('Please enter a password')
    if (!values.confirm) return notify('Please confirm your password')
    if (values.password !== values.confirm) return notify('Passwords do not match')
    setLoading(true)
    signUp(values, (err, result) => {
      setLoading(false)
      if (err) {
        notify('Something went wrong!')
        setValues(empty)
      } else {
        notify('Success! Please sign in below.')
        props.updateView('signin')
      }
    })
  }

  return(
    <>
    <Box className={cl.title}>Sign Up</Box>
    <Box className={cl.inputRow}>
      <TextField
        variant='outlined'
        fullWidth={true}
        margin='dense'
        size='small'
        onChange={handleChange('name')}
        value={values.name}
        label='Name'
      />
    </Box>
    <Box className={cl.inputRow}>
      <TextField
        variant='outlined'
        fullWidth={true}
        margin='dense'
        label='Email'
        onChange={handleChange('email')}
        value={values.email}
      />
    </Box>
    <Box className={cl.inputRow}>
      <TextField
        variant='outlined'
        fullWidth={true}
        margin='dense'
        label='Password'
        type='password'
        onChange={handleChange('password')}
        value={values.password}
      />
    </Box>
    <Box className={cl.inputRow}>
      <TextField
        variant='outlined'
        fullWidth={true}
        margin='dense'
        label='Confirm'
        type='password'
        onChange={handleChange('confirm')}
        value={values.confirm}
      />
    </Box>
    <Box display='flex' justifyContent='flex-end' alignItems='center'>
      <Button
        variant='contained'
        disableElevation={true}
        color='primary'
        onClick={submitForm}
        style={{minWidth: '90px'}}
      >
        {loading ? <CircularProgress color='secondary' size={24}/> : 'Submit'}
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