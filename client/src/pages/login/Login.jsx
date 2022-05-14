import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import {Context} from '../../context/Context.js'
import {toast} from 'react-toastify'
import { axiosInstance } from '../../config'

export default function Login() {
  const {dispatch, isFetching} = useContext(Context)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"})
    try {
      const res = await axiosInstance.post('/auth/login', {
        username: username,
        password: password
      })
      dispatch({type: "LOGIN_SUCCESS", payload: res.data})
      toast.success("Logged In")
    } catch(err) {
      toast.error("Password or Login error")
      dispatch({type: "LOGIN_FAILURE"})
    }
  }
  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form onSubmit={handleSubmit} className="loginForm">
            <label>Username</label>
            <input onChange={e => setUsername(e.target.value)} className='loginInput' type="text" placeholder='Enter Your Username...' />
            <label>Password</label>
            <input onChange={e => setPassword(e.target.value)} className='loginInput' type="password" placeholder='*********' />   
            <button disabled={isFetching} type='submit' className="loginButton">Login</button>
        </form>
        <button className="loginRegisterButton">
          <Link className='link' to='/register'>
            Register
          </Link>
        </button>
    </div>
  )
}
