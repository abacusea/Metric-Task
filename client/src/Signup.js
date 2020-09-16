import React, {useState} from 'react'
import './App.css'
import { signup } from './auth'
import { useHistory } from "react-router"

const Signup = () => {
	const [values, setValues] = useState({
		username: '',
		password: '',
	})

	const {username, password} = values

	const handleChange = name => event => {
		setValues({...values, [name]: event.target.value })
	}

	let history = useHistory()

	const clickSubmit = (event) => {
		event.preventDefault()
		signup({ username, password }).then(data => {
            if (data.error) {
                alert(data.error)
            } else {
            	alert('Signup Success!')
                setValues({
                    ...values,
                    username: '',
                    password: ''
                });
                history.push('/login')
            }
        })
	}
  return (
  	<div class="main-w3layouts wrapper">
		<h1>SignUp</h1>
		<div class="main-agileinfo">
			<div class="agileits-top">
				<form action="#" method="post">
					<input onChange={handleChange('username')} type="text" name="Username" placeholder="Username" required="" />
					<input onChange={handleChange('password')} type="password" name="password" placeholder="Password" required="" />
					
					<input onClick={clickSubmit} type="submit" value="SIGNUP" />
				</form>
				
			</div>
		</div>
		
		<ul class="colorlib-bubbles">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>
  );
}

export default Signup