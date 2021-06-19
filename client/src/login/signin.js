import React, { useState, useContext} from 'react'
import { Box, TextField, Button, Checkbox, FormControlLabel, CircularProgress } from '@material-ui/core'
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

export default function SignIn(props){

  const empty = {
    email: '',
    password: '',
    remember: false
  }

  const cl = useStyles()
  const [values, setValues] = useState(empty)
  const [loading, setLoading] = useState(false)
  const { notify, signIn } = useContext(AppContext)

  const handleChange = (prop) => (e) => setValues({...values, [prop]: e.target.value})
  const handleClick = () => setValues({...values, remember: !values.remember})

  const submitSignIn = () => {
    if (!values.email) return notify('Please enter your email')
    if (!values.password) return notify('Please enter a password')
    setLoading(true)
    signIn(values, () => {
      notify('Something went wrong!')
      setLoading(false)
    })
  }

  return(
    <>
      <Box className={cl.title}>Sign In</Box>
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
          placeholder='Password...'
          type='password'
          onChange={handleChange('password')}
          value={values.password}
        />
      </Box>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <FormControlLabel
          control={
            <Checkbox color='primary' checked={values.remember}/>
          }
          label='Remember me'
          onClick={handleClick}
        />
        <Button
          variant='contained'
          disableElevation={true}
          color='primary'
          onClick={submitSignIn}
          style={{minWidth: '90px'}}
        >
          {loading ? <CircularProgress color='secondary' size={24}/> : 'Sign in'}
        </Button>
      </Box>
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Box 
          className={cl.navBtn}
          onClick={()=>props.updateView('signup')}
        >
          Sign up
        </Box>
      </Box>
      <Box display='flex' alignItems='center' justifyContent='center'>
        <Box 
          className={cl.navBtn}
          onClick={()=>props.updateView('reset')}
        >
          Reset password
        </Box>
      </Box>
    </>
    
  )
}