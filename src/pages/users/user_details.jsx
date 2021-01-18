import React, { useState, useEffect } from 'react'
import Layout from '../../ui/layout/layout'
import useFetchAPI from '../../hooks/fetch_api'
import '../../assets/css/user_details.scss'

export default function UserDetailsPage({ match }) {
  const username = match.params.username
  
  const [userData, setUserData] = useState()
  const [userRepos, setUserRepos] = useState()

  const params = { httpAction: 'get' }

  const getUserDetails = useFetchAPI(`users/${username}/details`)
  const getUserRepos = useFetchAPI(`users/${username}/repos`)

  useEffect(() => {
    getUserDetails.fetchAPI(params)
    getUserRepos.fetchAPI(params)
  }, [])

  useEffect(() => {
    if(getUserDetails.status !== 'SUCCESS') return

    setUserData(getUserDetails.responseData.data)
  }, [getUserDetails.status, getUserDetails.responseData])

  useEffect(() => {
    if(getUserRepos.status !== 'SUCCESS') return

    setUserRepos(getUserRepos.responseData.data)
  }, [getUserRepos.status, getUserRepos.responseData])

  return (
    <Layout>
      <h1>User Information</h1>
      {userData &&
        <div className="user-info">
          <span><strong>Id:</strong> {userData.id}</span>
          <span><strong>Login:</strong> {userData.login}</span>
          <span><strong>Profile URL:</strong> <a href={userData.html_url}>{userData.html_url}</a></span>
          <span><strong>Date of Creation:</strong> {userData.created_at}</span>
        </div>
      }      
      <h2>Repos List</h2>
      <div className="repos-list">
        {userRepos && userRepos.length > 0 &&
          //TODO: Extract table to a component
          <table className="fixed_header">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {userRepos && userRepos.map(repo => (
                <tr key={`repo-${repo.id}`}>
                  <td>{repo.id}</td>
                  <td>{repo.name}</td>
                  <td>
                    <a href={`${repo.html_url}`}>{repo.html_url}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    </Layout>
  );
}
