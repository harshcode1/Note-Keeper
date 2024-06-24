import React,{useEffect} from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {

  let navi = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token')
    navi("/login")

  }
  //=> Here we are using useLocation
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className='nav-link ${location.path==="/"?"active":""}' aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className='nav-link ${location.path==="/"?"active":""}' to="/about">About</Link>
            </li>
          </ul>
          {!localStorage.getItem('token')? <form className="d-flex" role="search">
          <Link className="btn btn-primary mx-1" to="/login"  role="button">Login</Link>
          <Link className="btn btn-primary mx-1" to="/signup"  role="button">SignUP</Link>
          </form>:<button onClick={handleLogout} className="btn btn-primary mx-1" >Logout</button>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
