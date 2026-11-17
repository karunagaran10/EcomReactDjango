import React from 'react'
import './Navbar.css'
const menuitems = [
  { mid: 1, mname: "Home",     mnavi: "home" },
  { mid: 2, mname: "About",    mnavi: "about" },
  { mid: 3, mname: "Service",  mnavi: "service" },
  { mid: 4, mname: "Register", mnavi: "register" },
  { mid: 5, mname: "Sign in",  mnavi: "signin" },
  { mid: 6, mname: "Contact",  mnavi: "contact" },

]


export default function Navbar() {
  return (
    <>
      <header className='menubar'>
        <div>
          <div className='logo-image'>
            <a href=""><img src='image1.png' ></img></a>
          </div>
        </div>
        <div className='menuitems'>
          <ul>
            {/* <li><a href="#"></a>Home</li>
            <li><a href="#"></a>About</li>
            <li><a href="#"></a>Service</li>
            <li><a href="#"></a>Register</li> */}
             {menuitems.map((item) => (
            <li key={item.mid}>
              <a href={item.mnavi}>{item.mname}</a>
            </li>
          ))}
          </ul>
        </div>
      </header>
    
    </>
  )
}