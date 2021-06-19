import React, { useState, useMemo, useEffect } from 'react'
import { Box, CircularProgress, CssBaseline } from '@material-ui/core'
import { ThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import { AppContext } from './AppContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import LoginScreen from './login'
import Dashboard from './dashboard'

const colors = {
  green: '#18b3bc',
  green_transparent: '#18b4bc49',
  dark_gray: '#2c3e50',
  bg_gray: '#f5f5f5',
  white: '#ffffff',
  red: '#e74c3c'
}

const theme = createMuiTheme({
  palette: {
    background: {
      default: colors.dark_gray,
      paper: colors.bg_gray
    },
    primary: {main: colors.green},
    secondary: {main: colors.dark_gray},
    error: {main: colors.red},
    info: {main: colors.green},
    common: {
      white: colors.white
    },
    green_transparent: colors.green_transparent
  },
  breakpoints: {
    values: {
      xs: 400,
      md: 960
    }
  },
})

export default function App(props){

  const [userToken, setUserToken] = useState(localStorage.getItem('userToken') || '')
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const tokenSource = axios.CancelToken.source()

  const notify = (msg) => toast(msg, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    dragable: false,
    progress: undefined,
    toastId: msg,
  })

  useEffect(()=>{
    if (!userToken) return
    localStorage.setItem('userToken', userToken)
  }, [userToken])

  const appContext = useMemo(()=>({
    userToken: userToken,
    user: user,
    notify: notify,
    signUp: (vals, cb) => {
      axios.post('/user/signup', {email: vals.email, password: vals.password, name: vals.name}, {cancelToken: tokenSource.token})
        .then(res => cb(null))
        .catch(err => cb(err))
      return () => tokenSource.cancel()
    },
    signIn: (vals, cb) => {
      axios.post('/user/signin', {email: vals.email, password: vals.password, remember: vals.remember}, {cancelToken: tokenSource.token})
        .then(res => {
          setUser(res.data.user)
          setUserToken(res.data.token)
        })
        .catch(err => cb(err))
      return () => tokenSource.cancel()
    },
    signOut: () => {
      localStorage.removeItem('userToken')
      setUserToken()
      setUser()
    },
    resetPwd: (vals, cb) => {
      axios.post('/user/reset_pwd', {email: vals.email, password: vals.password}, {cancelToken: tokenSource.token})
        .then(res => cb(null))
        .catch(err => cb(err))
      return () => tokenSource.cancel()
    },
    getUser: (cb) => {
      axios.get('/user/get_user', {headers: {Authorization: `JWT ${userToken}`}, cancelToken: tokenSource.token})
      .then(res=>{
        setUser(res.data)
        cb(null, res.data)
      })
      .catch(err=>{
        cb(err, undefined)
      })
      return () => tokenSource.cancel()
    }
  }))

  useEffect(()=>{
    appContext.getUser((err, data)=>setLoading(false))
  })

  return(
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={appContext}>
        <ToastContainer limit={3}/>
        <CssBaseline/>
        {loading ? (
          <Box width='100vw' height='100vh' display='flex' alignItems='center' justifyContent='center'>
            <CircularProgress color='primary' size={56}/>
          </Box>
        ) : !user || !userToken ? (
          <LoginScreen/>
        ) : (
          <Dashboard/>
        )}
      </AppContext.Provider>
    </ThemeProvider>
  )
}

