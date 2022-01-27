import React, { useState } from 'react'
import useApiUser from './hooks/useApiUser'

const App = () => {
  // eslint-disable-next-line
  const [user, userHistory, userFav, saveFav, savedCheck, fetchUser] = useApiUser()
  const [name, setName] = useState('')

  const clickHandler = () =>{
    fetchUser(name)
  }
  const changeHandler = e => {
    setName(e.target.value)
  }
  const historyUserSHW = (u, i) => {
    const changeHandler = () => {
      fetchUser(userHistory[i].name)
    }

    return(
      <div className="card maxSize" onClick={ changeHandler } key={ i }>
        <img src={ u.img } className="img-fluid rounded-start" alt="user avatar" />
        <div className="card-body">
          <h5 className="card-title">{ u.name }</h5>
        </div>
      </div>
    )
  }
  const historySHW = () => (
    <>
      {userHistory && (
        <>
          <h1>History</h1>
          <div className="flexBox">
            {userHistory.map((u, i) => (
              historyUserSHW(u, i)
            ))}
          </div>
        </>
      )}
    </>
  )
  const historyFavSHW = (u, i) => {
    const changeHandler = () => {
      fetchUser(userFav[i].name)
    }

    return(
      <div className="card maxSize" key={ i } onClick={ changeHandler }>
        <img src={ u.img } className="img-fluid rounded-start" alt="user avatar" />
        <div className="card-body">
          <h5 className="card-title">{ u.name }</h5>
        </div>
      </div>
    )
  }
  const favSHW = () => (
    <>
      {userFav && (
        <>
          <h1>Saved</h1>
          <div className="userFav">
            {userFav.map((u, i) => (
              historyFavSHW(u, i)
            ))}
          </div>
        </>
      )}
    </>
  )
  const userReposSHW = () => {
    return(
      <>
        {user.repos ? (
            <>
              <h1>The repos</h1>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Description</th>
                      <th scope="col">Language</th>
                      <th scope="col">visibility</th>
                      <th scope="col">Branch</th>
                    </tr>
                  </thead>
                  <tbody>
                      {user.repos.map((r, i) => (
                        <tr key={ i } className='pointer' onClick={ () => window.open(`https://github.com/${ user.name }/${ r.name }`, '_blank') }>
                          <th scope="row">{ i+1 }</th>
                          <td>{ r.name }</td>
                          <td>{ r.description }</td>
                          <td>{ r.language }</td>
                          <td>{ r.visibility }</td>
                          <td>{ r.default_branch }</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
            </>
          ) : (
            <>
              <h1>No repos were found(</h1>
            </>
        )}
      </>
    )
  }

  const userSHW = () => (
    <>
      <div className="Row">
      </div>
      <div className="row">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={ user.img } className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{ user.name }</h5>
                <a href={ user.url } className="card-text">User's page</a>
                <button type="button" className="btn btn-light card-text" onClick={ () => saveFav() }>Un/Save</button>
                {/* { savedCheck() ? (
                  <>
                    <p>Saved {savedCheck()}</p>
                    <button type="button" className="btn btn-light card-text" onClick={ () => saveFav() }>+</button>
                  </>
                ) : (
                  <>
                    <p>Unsaved {savedCheck()}</p>
                    <button type="button" className="btn btn-light card-text"  onClick={ () => saveFav() }>-</button>
                  </>
                )} */}
                {/* { savedCheck() && (
                  <button type="button" className="btn btn-light card-text" onClick={ () => saveFav() }>+</button>
                ) }
                { !savedCheck() && (
                  <button type="button" className="btn btn-light card-text" onClick={ () => saveFav() }>-</button>
                ) } */}
              </div>
            </div>
          </div>
        </div>
      </div>
      { userReposSHW() }
    </>
  )
  return (
    <div className="container">
      <div className="row historyResize">
          { historySHW() }
      </div>
      <div className="row">
        <div className="col-3">
          { favSHW() }
        </div>
        <div className="col-9">
          <div className="row searchbarResize">
            <input className="col-8 col-gap" type="text" onChange={ changeHandler } placeholder="Enter an username" />
            <button className="col-4 btn btn-primary" onClick={ clickHandler }>Search</button>
          </div>
          { user && (
            <>
              { userSHW() }
            </>
          ) }
        </div>
      </div>
    </div>
  )
}

export default App