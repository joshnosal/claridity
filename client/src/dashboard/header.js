import React from 'react'
import { Box, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  container: {
    background: theme.palette.background.default,
    padding: '0 10px',
    display: 'flex',
    alignItems: 'center'
  },
  link: {
    color: theme.palette.primary.main,
    fontWeight: '700',
    fontSize: '16px',
    padding: '5px 10px',
    '&:hover': { 
      color: theme.palette.common.white,
      cursor: 'pointer'
    }
  },
  divider: {
    borderRight: '1px solid '+theme.palette.primary.main,
    height: '24px'
  },
}))

export default function Header(props){
  const cl = useStyles()
  const history = useHistory()

  return (
    <Box className={cl.container}>
      <Box 
        className={cl.link}
        onClick={()=>history.push('/')}
      >
        All
      </Box>
      <Box className={cl.divider}/>
      <Box className={cl.link}>Pipeline</Box>
      <Box className={cl.link}>Deals</Box>
      <Box 
        className={cl.link}
        onClick={()=>history.push('/Organizations')}
      >
        Organizations
        </Box>
      <Box className={cl.divider}/>
      <Box className={cl.link}>LOIs</Box>
      <Box className={cl.link}>Checklists</Box>
      <Box className={cl.link}>Datarooms</Box>
      <Box className={cl.link}>Reports</Box>
      <Box flexGrow={1}/>
      <Box className={cl.link}>Notifications</Box>
      <Box className={cl.divider}/>
      <Box className={cl.link}>Account</Box>
    </Box>
  )
}