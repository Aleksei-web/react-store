import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { auth } from '../../firebase'
import {toast} from 'react-toastify'
import axios from 'axios'

const createOrUpdateUser = async (authtoken) => {
	return await axios.post(`${process.env.REACT_APP_API}/create-or-update-user`, {}, {
		headers: {
			authtoken,
		}
	})
}

const RegisterComplite = ({history}) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	// const {user} = useSelector((state) => ({...state}))
	let dispatch = useDispatch()

	useEffect(() => {
		setEmail(window.localStorage.getItem('emailForRegistration'));
	}, [history])

	const handleSubmit = async (e) => {
		e.preventDefault()
		//validation
		if(!email || !password) {
			toast.error('Email and passwor is required')
			return;
		}

		if(password.length < 6) {
			toast.error('Password must be at least 6 characters long')
			return;
		}
		

		try {
			const result = await auth.signInWithEmailLink(
				email, 
				window.location.href
				)
				console.log(result);
			if(result.user.emailVerified){
				window.localStorage.removeItem('emailForRegistration')

				let user = auth.currentUser
				await user.updatePassword(password)
				const idTokenResult = await user.getIdTokenResult()

				createOrUpdateUser(idTokenResult.token)
				.then((res) => {
					dispatch({
						type: "LOGGED_IN_USER",
						payload: {
							name: res.data.name,
							email: res.data.email,
							token: idTokenResult.token,
							role: res.data.role,
							_id: res.data._id,
						}
					})
				})
				.catch((err) => console.log(err));


				history.push('/')
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message)
		}

	}

	const completeRegistationRorm = () => (
		<form onSubmit={handleSubmit}>
			<input type="email" 
			className="form-control" 
			value={email}
			disabled
			/>

<input type="password" 
			className="form-control" 
			value={password}
			onChange={e => setPassword(e.target.value)}
			placeholder="Password"
			autoFocus
			/>

			<button 
				type="submit" 
				className="btn btn-raised">
				Complite Registration
			</button>
		</form>
	)

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h4>Rgister Complete</h4>
					{completeRegistationRorm()}
				</div>
			</div>
		</div>
	)
}

export default RegisterComplite
