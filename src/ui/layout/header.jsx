import React from 'react'
import TopMenu from './top_menu'
import '../../assets/css/header.scss'

export default function Header() {

  return (
    <div className="header-bar">
      <div className="header">
        <TopMenu />
      </div>
    </div>
  )
}
