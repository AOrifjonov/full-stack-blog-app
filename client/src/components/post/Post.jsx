import './post.css'
import {Link} from 'react-router-dom'

export default function Post(post) {
    const PF = 'https://my-story-uz.herokuapp.com/images/';
  return (
    <div className='post'>
        {post.photo && (
            <img src={PF + post.photo} alt="post title" className='postImg' />
        )}
        <div className="postInfo">
            <div className="postCats">
                {
                    post.categories.map(item => (
                        <span className='postCat'>{item.name}</span>
                    ))
                }
            </div>
            <span className='postTitle'>
                <Link className='link' to={`/post/${post._id}`}>
                    {post.title}
                </Link>
            </span>
            <hr />
            <span className='postDate'>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className='postDesc'>
            {post.desc}
        </p>
    </div>
  )
}
