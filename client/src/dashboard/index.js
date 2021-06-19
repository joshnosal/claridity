import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'

import Header from './header'
import OrganizationScreen from '../organizations'

const useStyles = makeStyles(theme => ({
  container: {
    background: theme.palette.grey[100],
    width: '100vw',
    height: '100vh',
    overflow: 'hidden'
  },
  body: {

  }
}))

export default function Dashboard(props){
  const cl = useStyles()

  return(
    <Box className={cl.container}>
      <Header/>
      <Box >
        <Switch>
          <Route exact path='/'>All</Route>
          <Route path='/Organizations'>
            <OrganizationScreen/>
          </Route>
        </Switch>
      </Box>
    </Box>
  )
}