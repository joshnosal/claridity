import React, { useState, useContext } from 'react'
import { Box, Button, Dialog, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { AppContext } from '../AppContext'
import CloseIcon from '@material-ui/icons/Close'
import axios from 'axios'

import OrgTable from './org_table'

const useStyles = makeStyles(theme => ({
  container: {

  },
  popupTitle: {
    color: theme.palette.primary.main,
    fontWeight: '700',
    fontSize: '18px'
  },
  closeIcon: {
    color: theme.palette.grey[400],
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.common.black
    }
  }
}))

export default function OrgMain(props){
  const [open, setOpen] = useState(false)

  return (
    <Box display='flex' flexDirection='column' padding='20px'>
      <Box margin='0 0 10px 0'>
        <Button 
          color='primary' 
          variant='contained'
          disableElevation={true}
          size='small'
          onClick={()=>setOpen(true)}
        >New</Button>
      </Box>
      <NewOrgDialog open={open} close={()=>setOpen(false)}/>
      <OrgTable/>
    </Box>
  )

}

const NewOrgDialog = (props) => {
  const cl = useStyles()
  const [name, setName] = useState('')
  const { userToken, notify } = useContext(AppContext)
  const tokenSource = axios.CancelToken.source()

  const handleClose = () => {
    setName('')
    props.close()
  }

  const create = () => {
    if (!name) return notify('Organization name is required.')

    axios.post('/org/create_new', {name: name}, {
      cancelToken: tokenSource.token,
      headers: {Authorization: `JWT ${userToken}`}
    })
      .then(res => {
        console.log('here')
        handleClose()
      })
      .catch(err => {
        notify('Something went wrong! Please try later.')
      })
  }
 
  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
    >
      <Box display='flex' flexDirection='column' minWidth='400px'>
        <Box display='flex' justifyContent='space-between' padding='10px'>
          <Box className={cl.popupTitle}>New Organization</Box>
          <CloseIcon className={cl.closeIcon}/>
        </Box>
        <Box padding='10px'>
          <TextField
            variant='outlined'
            fullWidth={true}
            margin='dense'
            label='Name'
            onChange={(e)=>setName(e.target.value)}
            value={name}
          />
        </Box>
        <Box padding='10px' textAlign='center'>
          <Button
            color='primary' 
            variant='contained'
            disableElevation={true}
            size='small'
            onClick={create}
          >Create</Button>
        </Box>
      </Box>
    </Dialog>

  )
}