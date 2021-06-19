import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import SignInForm from './signin'
import SignUpForm from './signup'
import ResetForm from './reset'

const useStyles = makeStyles(theme => ({
  container: {
    background: theme.palette.common.white,
    minWidth: '300px',
    boxShadow: theme.shadows[20],
    padding: '10px 20px'
  }
}))

export default function LoginMain(props) {

  const cl = useStyles()
  const [view, setView] = useState('signin')

  const updateView = (newView) => setView(newView) 

  return(
    <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
      <Box className={cl.container}>
      {view === 'signin' ? (
        <SignInForm updateView={updateView}/>
      ) : view === 'signup' ? (
        <SignUpForm updateView={updateView}/>
      ) : (
        <ResetForm updateView={updateView}/>
      )}
      </Box>
    </Box>
  )
}