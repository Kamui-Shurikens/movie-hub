import { FOCUSABLE_SELECTOR } from '@testing-library/user-event/dist/utils'
import React, { Component } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { signOutWithGoogle } from '../firebase'

export default function Navbar() {

  const navigate = useNavigate()
  let handleSearch = () => {
    //console.log("search button was clicked")
    let searchQuery = document.querySelector("input").value
    console.log(searchQuery)
    navigate(`/searchresults/${searchQuery}`)
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-warning">
        <div className="container-fluid">
          <Link to={'/'}> <a className="navbar-brand" style={{fontSize:"2rem"}} >MOVIE-HUB</a> </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={'/'}><a className="nav-link" aria-current="page" style={{fontSize:"1.3rem"}}  >Home</a></Link>
              </li>
              <li className="nav-item">
                <Link to={'/Favourites'} ><a className="nav-link" style={{fontSize:"1.3rem"}} >Favourites</a></Link>
              </li>
              <li className="nav-item">
                <Link to={'/discover'} ><a className="nav-link" style={{fontSize:"1.3rem"}} >Discover</a></Link>
              </li>
            </ul>
            <h5 style={{ marginRight: "10px" }}><strong> Hi {`${localStorage.getItem("UserName")}`}!  </strong> </h5>
            <div className="dropdown" style={{marginRight:"3px"}}>
              <button className="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={`${localStorage.getItem("photoLink")}`} className="" style={{ borderRadius: "100%", height: "6vh", backgroundColor: "yellowred", marginLeft: "10px" }} alt="your image"></img>
              </button>
              <ul className="dropdown-menu" >
                <li><button className="dropdown-item" onClick={signOutWithGoogle}>Logout</button></li>
              </ul>
            </div>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search Movie Name" aria-label="Search" onKeyDown={(e)=>{
                if(e.key == 'Enter')
                  handleSearch()
               }} />
              <button className="btn btn-outline-success" type='button' onClick={handleSearch} >Search</button>
            </form>

          </div>
        </div>
      </nav>
    </>

  )
}


// export default class Navbar extends Component {


//   handleSearch = () => {
//     console.log("search button clicked")
//   }

//   render() {
//     return (
//       <>
//         <nav className="navbar navbar-expand-lg bg-warning">
//           <div className="container-fluid">
//             <Link to={'/'}> <a className="navbar-brand" >MOVIE-HUB</a> </Link>
//             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                   <Link to={'/'}><a className="nav-link" aria-current="page"  >Home</a></Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link to={'/Favourites'} ><a className="nav-link" >Favourites</a></Link>
//                 </li>
//               </ul>
//               <form className="d-flex" role="search">
//                 <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />

//                 <button className="btn btn-outline-success" type='button' onClick={this.handleSearch} >Search</button>


//               </form>
//             </div>
//           </div>
//         </nav>
//       </>
//     )
//   }
// }
