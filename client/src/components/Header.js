import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";


export default function Header(props){
  Header.defaultProps={
    title:"BLOG APP" 
}
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setValue] = useState();

  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
    return(
        <nav className="head navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">{props.title}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {
            !isLogin && (
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="submit" className="btn btn-sm btn-success" ><a className="nav-link" href="http://localhost:3000/login">Login</a></button>
            <button type="submit" className="btn btn-sm btn-success" ><a className="nav-link" href="http://localhost:3000/register">Register</a></button>
            </div>
            )
          }
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {  isLogin && (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/blogs">Blogs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-blogs">My Blogs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-blog">Create Blog</Link>
              </li>
              
            </ul>
            )
            }
          
           {
            isLogin && (<> <button type="submit" className="btn btn-sm btn-success" onClick={handleLogout}>Logout</button>
               </>)
          }
           { props.searchbar? <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>:"" /*displays this if searchbar s false*/ }
          </div>
        </div>
      </nav>
    )

}

Header.defaultProps={
    title:"Project" /*remove title from parent component and ch
}

Header.propType={
    title:PropTypes.string /*gives warning if any other datatypes is passed instead of string in App.js*/
}