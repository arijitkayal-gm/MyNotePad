import React from 'react'
import { Link,useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location=useLocation();
  const nav=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    nav("/login");
  }

  const getUser=()=>{
    
  }
  
  return (
    
    <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div className="container-fluid">
        <Link className="navbar-brand text-info" to="/">MyNotePad</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className={`nav-link text-info ${location.pathname}==="/"?"active":""`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
            <Link className={`nav-link text-info ${location.pathname}==="/about"?"active":""`} to="/about">About</Link>
            </li>
            
        </ul>
        {!localStorage.getItem('token')? <form className="d-flex" role="search">
            <Link className="btn btn-outline-info mx-1" to="/Login" role="button">Login</Link>
            <Link className="btn btn-outline-info mx-1" to="/Signup" role="button">Signup</Link>
          </form>: 
          <>
          <button type='button' className='btn btn-outline-info mx-1' onClick={getUser} data-bs-toggle="modal" data-bs-target="#exampleModal2">{localStorage.getItem('name')}</button>
          
          <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-theme="dark">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5 text-info" id="exampleModalLabel">User Details</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className='container mx-2 text-info h6'>Username:{localStorage.getItem('name')}</div>
                  <div className='container mx-2 text-info h6'>Email:{localStorage.getItem('email')}</div>
                  <div className='container mx-2 text-info h6'>Joined:{localStorage.getItem('date')}</div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>

          <button className='btn btn-outline-info mx-1' onClick={handleLogout}>Logout</button>
          </>
        }
        </div>
    </div>
    </nav>
  )
}

export default Navbar
