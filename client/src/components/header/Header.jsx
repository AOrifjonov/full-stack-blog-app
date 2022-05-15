import React from 'react'
import './header.css'

export default function Header() {
  return (
    <div className="header">
        <div className="headerTitles">
            <span className='headerTitleSm'>React & Node</span>
            <span className='headerTitleLg'>Blog</span>
        </div>
        <img className='headerImg' src="https://images.unsplash.com/photo-1483808161634-29aa1b0e585e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="Img " />
    </div>
  )
}