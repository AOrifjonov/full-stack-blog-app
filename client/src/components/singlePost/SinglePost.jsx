import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './singlepost.css'
import {toast} from 'react-toastify'
import { Context } from '../../context/Context'
import { axiosInstance } from '../../config'

export default function SinglePost() {
  const navigate = useNavigate()
  const { user } = useContext(Context)
  const { postId } = useParams()
  const [post, setPost] = useState([])
  const PF = 'https://afzalbek-blog.herokuapp.com/images/';
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [updateMode, setUpdateMode] = useState(false)

  useEffect(() => {
    const fetchSinglePost = async () => {
      const res = await axiosInstance.get(`/posts/${postId}`)
      setPost(res.data)
      setDesc(res.data.desc)
      setTitle(res.data.title)
    }
    fetchSinglePost()
  }, [postId])

  const handleDelete = async () => {
    try {
      await axiosInstance.delete('/posts/' + postId, {
        data: {
          username: user.username
        }
      })
      toast.info("Your post has been deleted!")
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdate = async () => {
    try {
      await axiosInstance.put('/posts/' + postId, {
        username: user.username,
        title: title,
        desc: desc,
      })
      toast.success("Updated!")
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div className='singlePost'>
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="singlePost" className="singlePostImg" />
        )}

        <h1 className='singlePostTitle'>
          {post.title}
          {
            post.username === user?.username && (
              <div className='singlePostEdit'>
                <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(!updateMode)}></i>
                <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
              </div>
            )
          }
        </h1>

        {
          updateMode ? (
            <div className='singlePostEditSection'>
              <input 
                type='text'  
                value={title} 
                className='singlePostTitleInput' 
                autoFocus 
                onChange={(e) => setTitle(e.target.value)} 
              />
              <textarea 
                onChange={(e) => setDesc(e.target.value)} 
                value={desc} 
                className='singlePostDescInput'>
              </textarea>
              <button onClick={handleUpdate} className='singlePostButton'>Update</button>
            </div>
          ) : (
            <>
              <div className='singlePostInfo'>
                <span className="singlePostAuthor">
                  <Link className='link' to={`/?user=${post.username}`}>
                    Author: <b>{post.username}</b>
                  </Link>
                </span>
                <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
              </div>
              <p className='singlePostDesc'>
                {post.desc}
              </p>
            </>
          )
        }
      </div>
    </div>
  )
}