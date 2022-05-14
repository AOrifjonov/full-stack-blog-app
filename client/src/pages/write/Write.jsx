import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../config'
import { Context } from '../../context/Context'
import './write.css'

export default function Write() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState(null)
  const {user} = useContext(Context)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    }

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename)
      data.append("file", file)
      newPost.photo = filename;
      try {
        await axios.post('/api/upload', data)
      } catch (err) {
        console.log(err);
      }
    }
     try {
      const res = await axiosInstance.post('/posts', newPost);
      navigate(`/post/${res.data._id}`)
     } catch (err) {}
  }

  return (
    <div className='write'>
        {file && (
          <img className='writeImg' src={URL.createObjectURL(file)} alt="write img" />
        )}
        <form onSubmit={handleSubmit} className="writeForm">
            <div className="writeFormGroup">
                <label htmlFor="fileInput"><i className='writeIcon fas fa-plus'></i></label>
                <input onChange={e=> setFile(e.target.files[0])} type="file" id='fileInput' style={{display: 'none'}} />
                <input onChange={e => setTitle(e.target.value)} type="text" placeholder='Title' className='writeInput' autoFocus={true} />
            </div>
            <div className="writeFormGroup">
                <textarea onChange={e => setDesc(e.target.value)} placeholder='Tell your story' type='text' className='writeInput writeText'></textarea>
            </div>
            <button type='submit' className='writeSubmit'>Publish</button>
        </form>
    </div>
  )
}
