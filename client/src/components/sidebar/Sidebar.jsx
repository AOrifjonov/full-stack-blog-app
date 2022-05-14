import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { axiosInstance } from "../../config"
import "./sidebar.css"

export default function Sidebar() {
    const [cat, setCat] = useState([])

    useEffect(()=> {
        const getCat = async () => {
            const res = await axiosInstance.get('/categories')
            setCat(res.data)
        }
        getCat()
    }, [])

  return (
    <div className='sidebar'>
        <div className="sidebarItem">
            <span className='sidebarTitle'>ABOUT ME</span>
            <img src="https://images.unsplash.com/photo-1594474645958-e1bb60b4965d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="img sidebar" />
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Veritatis obcaecati dolores quis voluptas eaque porro
            </p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
                {
                    cat.map(i => (
                        <Link key={i._id} className="link" to={`/?cat=${i.name}`}>
                            <li className="sidebarListItem">{i.name}</li>
                        </Link>
                    ))
                }
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
            <div className="sidebarSocial">
                <i className="topIcon fa-brands fa-facebook-square"></i>
                <i className="topIcon fa-brands fa-twitter-square"></i>
                <i className="topIcon fa-brands fa-pinterest-square"></i>
                <i className="topIcon fa-brands fa-instagram-square"></i>
            </div>
        </div>
    </div>
  )
}
