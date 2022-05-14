import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './register.css'
import {toast} from 'react-toastify'
import { axiosInstance } from '../../config'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      setError(false)
      const res = await axiosInstance.post("/auth/register", {
        username: username,
        email: email,
        password: password,
      });
      toast.success("Register successfully!")
      res.data && navigate('/login')
    } catch(err) {
      console.log(err)
      toast.error('Something went wrong! Please try again')
      setError(true)
      console.log(error);
    }
  }

  return (
    <div className='register'>
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={submitHandle}>
          <label>Username</label>
          <input onChange={e => setUsername(e.target.value)} className='registerInput' type="text" placeholder='Enter Your username...' />
          <label>Email</label>
          <input onChange={e => setEmail(e.target.value)} className='registerInput' type="text" placeholder='Enter Your Email...' />
          <label>Password</label>
          <input onChange={e => setPassword(e.target.value)} className='registerInput' type="password" placeholder='*********' />   
          <button className="registerButton">Register</button>
        </form>
        <button className="registerLoginButton">
          <Link className='link' to='/login'>
            Login
          </Link>
        </button>
    </div>
  )
}
