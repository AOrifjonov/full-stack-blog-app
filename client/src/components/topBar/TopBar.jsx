import "./topbar.css"
import { Link } from 'react-router-dom'
import { useContext, useState } from "react"
import { Context } from "../../context/Context"

export default function TopBar() {
    const [isShow, setIsShow] = useState(true)
    const isShowMenuHandler = () => {
        setIsShow(!isShow)
    }
    const { user, dispatch } = useContext(Context)
    const PF = 'https://my-story-uz.herokuapp.com/images/'
    return (
        <>
            <div className='top'>
                <div className="showEl">
                    {
                        <i onClick={isShowMenuHandler} className="fa-solid fa-list"></i>
                    }
                </div>
                <div className="topLeft">
                    <i className="topIcon fa-brands fa-facebook-square"></i>
                    <i className="topIcon fa-brands fa-twitter-square"></i>
                    <i className="topIcon fa-brands fa-pinterest-square"></i>
                    <i className="topIcon fa-brands fa-instagram-square"></i>
                </div>
                <div className="topCenter">
                    {
                        isShow && (
                            <ul className="topList">
                                <li className="topListItem">
                                    <Link to='/' className="link">
                                        HOME
                                    </Link>
                                </li>
                                {
                                    !user && (
                                        <li className="topListItem">
                                            <Link to='/' className="link">
                                                ABOUT
                                            </Link>
                                        </li>
                                    )
                                }
                                <li className="topListItem">
                                    <Link to='/' className="link">
                                        CONTACT
                                    </Link></li>
                                <li className="topListItem">
                                    <Link to='/write' className="link">
                                        WRITE
                                    </Link></li>
                                <li onClick={() => dispatch({ type: "LOGOUT" })} className="topListItem">
                                    {user && 'LOGOUT'}
                                </li>
                            </ul>
                        )
                    }
                </div>
                <div className="topRight">
                    {user ? (
                        <Link to='/settings' >
                            <img className='topImg' src={user.profilePic ? PF + user.profilePic : 'https://images.unsplash.com/photo-1636390785299-b4df455163dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'} alt="" />
                        </Link>
                    ) : (
                        isShow && (
                            <ul className="topList">
                                <li className="topListItem">
                                    <Link to='/login' className="link">
                                        LOGIN
                                    </Link>
                                </li>
                                <li className="topListItem">
                                    <Link to='/register' className="link">
                                        REGISTER
                                    </Link>
                                </li>
                            </ul>
                        )
                    )}
                    <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
            {
                user && (
                    <div className="userProfilePicSm">
                        <Link to='/settings' >
                            <img src={user.profilePic ? PF + user.profilePic : 'https://images.unsplash.com/photo-1636390785299-b4df455163dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'} alt="" />
                        </Link>
                    </div>
                )
            }
        </>
    )
}