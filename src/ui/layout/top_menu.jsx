import React from 'react'
import { NavLink } from 'react-router-dom'

export default function TopMenu() {
  return (
    <div className="header-menu">
      <NavLink to={'/users'}>Users</NavLink>
    </div>
  );
}
