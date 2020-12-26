/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import { auth } from '../../firebase'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'

const Register = ({history}) => {
	const [email, setEmail] = useState('')


	const {user} = useSelector((state) => ({...state}))

	useEffect(() => {
		if(user && user.token) history.push('/')
	}, [user, history])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const config = {
			url: process.env.REACT_APP_REGISTER_URL,
			handleCodeInApp: true
		}

		console.log(config)

		await auth.sendSignInLinkToEmail(email, config)
		toast.success(`Email is send to ${email}. Click the to complete your registration.`)
		window.localStorage.setItem('emailForRegistration', email)

		setEmail('')
	}

	const registerRorm = () => (
		<form onSubmit={handleSubmit}>
			<input type="email" 
			className="form-control" 
			value={email} 
			onChange={e => setEmail(e.target.value)}
			placeholder="Your email"
			autoFocus
			/>

			<br/>

	<button type="submit" className="btn btn-raised">Register {email}</button>
		</form>
	)

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h4>Rgister</h4>
					{registerRorm()}
				</div>
			</div>
		</div>
	)
}

export default Register
