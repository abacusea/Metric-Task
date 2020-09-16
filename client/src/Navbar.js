import React from 'react'
import './App.css'
import { NavLink } from 'react-router-dom'
import { signout} from './auth'
import { useHistory } from "react-router"


const Navbar = () => {
	let history = useHistory()
  return (
  	<div class="navbar">
		<NavLink exact to="/" className="navlink">
		     Home
		</NavLink>
		<NavLink exact to="/signup" className="navlink">
		     Signup
		</NavLink>
		<NavLink exact to="/login" className="navlink">
		     Login
		</NavLink>
		<NavLink onClick= {() => signout(()=> {
			history.push('/login')
		})}
		exact to="/signout" className="navlink">
		     Signout
		</NavLink>
	</div>
  );
}

export default Navbar