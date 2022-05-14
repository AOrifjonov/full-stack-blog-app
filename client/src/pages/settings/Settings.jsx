import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context'
import './settings.css'
import {toast} from 'react-toastify'
import { axiosInstance } from '../../config'

export default function Settings() {
  const PF = 'https://my-story-uz.herokuapp.com/images/'
  const navigate = useNavigate()
  const {user, dispatch} = useContext(Context)
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username: username ? username : user.username,
      email: email ? email : user.email, 
      password: password ? password : user.password
    }

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename)
      data.append("file", file)
      updatedUser.profilePic = filename;
      try {
        await axiosInstance.post('/upload', data)
        toast.success("Profile picture has been updated")
      } catch (err) {
        console.log(err);
      }
    }
     try {
      const res = await axiosInstance.put('/users/'+user._id, updatedUser);
      dispatch({type: "UPDATE_SUCCESS", payload: res.data})
      toast.success("Updated your profile")
      navigate(`/`)
     } catch (err) {
        dispatch({type: "UPDATE_FAILURE"})
       console.log(err);
     }
  }

  return (
    <div className='settings'>
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update your account</span>
            <span className="settingsDeleteTitle">Delete account</span>
          </div>

          <form onSubmit={handleSubmit} className="settingsForm">
            <label>Profile Picture</label>
            <div className="settingPP">
                <img className='settingsPPImg' src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon fa-solid fa-user-pen"></i>
              </label>        
              <input onChange={e => setFile(e.target.files[0])} type="file" id='fileInput' style={{display: 'none'}} />    
            </div>
            <label>Username</label>
            <input type="text" placeholder={user.username} onChange={e => setUsername(e.target.value)} />
            <label>Email</label>
            <input type="email" placeholder={user.email}  onChange={e => setEmail(e.target.value)}/>
            <label>Password</label>
            <input placeholder='*********' type="password"  onChange={e => setPassword(e.target.value)} />
            <button type='submit' className='settingsSubmit'>Update</button>
          </form>
        </div>
        <Sidebar />
    </div>
  )
}
