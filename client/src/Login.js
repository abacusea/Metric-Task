import React, {useState} from 'react'
import './login.css'
import { signin, authenticate } from './auth'
import { useHistory } from "react-router"

const Login = () => {
	const [values, setValues] = useState({
		username: '',
		password: '',
	})
	const {username, password, redirectToReferrer} = values

	const handleChange = name => event => {
		setValues({...values, [name]: event.target.value })
	}

	let history = useHistory()
	
	const clickSubmit = (event) => {
		event.preventDefault()
		signin({ username, password }).then(data => {
            if (data.error) {
                alert(data.error)
                setValues({...values, loading: false})
            } else {
            	localStorage.setItem('userId', username)
                authenticate(data, () => {
                	setValues({
                    ...values,
                    username: '',
                    password: '',
	                });
	                history.push('/')
                })

            }
        })
	}

  return (
  	<div class="login-page">
  		<h1>Login</h1>
	  <div class="form">   
	    <form class="login-form">
	      <input onChange={handleChange('username')} type="text" placeholder="username"/>
	      <input onChange={handleChange('password')} type="password" placeholder="password"/>
	      <button onClick={clickSubmit}>login</button>
	     
	    </form>
	  </div>
	</div>
  );
}

export default Login