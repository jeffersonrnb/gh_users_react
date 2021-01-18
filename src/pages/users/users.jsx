import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Layout from '../../ui/layout/layout'
import useFetchAPI from '../../hooks/fetch_api'
import '../../assets/css/users.scss'

export default function UsersPage() {
  const [usersList, setUsersList] = useState([])

  const params = { httpAction: 'get' }
  const getUsers = useFetchAPI('users')

  const handleMore = () => {
    let newParams = { ...params }
    if (usersList && usersList.length > 0)
      newParams.query = `since=${usersList[usersList.length-1].id}`

    getUsers.fetchAPI(newParams)
  }

  useEffect(() => getUsers.fetchAPI(params), [])

  useEffect(() => {
    if(getUsers.status !== 'SUCCESS') return

    const newUsersList = usersList.concat(getUsers.responseData.data)
    setUsersList(newUsersList)
  }, [getUsers.status, getUsers.responseData])

  return (
    <Layout>
      <h1>Users List</h1>
      <div className="users-list">
        <table className="fixed_header">
          <thead>
            <tr>
              <th>Id</th>
              <th>Login</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usersList && usersList.map(user => (
              <tr key={`user-${user.id}`}>
                <td>{user.id}</td>
                <td>{user.login}</td>
                <td>
                  <NavLink to={`/users/${user.login}`}>View details</NavLink>
                </td>
              </tr>
            ))}
            {getUsers && getUsers.status !== 'FETCHING' &&
              <div className="loading">
                <Link onClick={handleMore}>More...</Link>
              </div>
            }
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
