import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';  
import AdminNav from '../../components/nav/AdminNav';
import { changeStatus, getOrders } from '../../functions/admin';
import {toast} from 'react-toastify';
import Orders from '../../components/order/Orders'

const AdminDashboard = () => {
	const [orders, setOrders] = useState([]);
	const user = useSelector((state) => state.user)

	useEffect(() =>{
		loadOrders()
	}, [])

	const loadOrders = () => getOrders(user.token).then((res) => {
		console.log('>>>>>',JSON.stringify(res.data, null, 4))
		setOrders(res.data)
	})

	const handleStatusChange = (orderId, orderStatus) => {
		changeStatus(orderId, orderStatus, user.token).then(res => {
			toast.success('Staus updated')
			loadOrders()
		})
	}

	return (
	<div className="comtainer-fluid">
		<div className="row">
			<div className="col-md-2">
				<AdminNav />
			</div>
			<div className="col-md-10">
				<h4 className='text-danger'>Admin Dashboard</h4>
				<Orders orders={orders} handleStatusChange={handleStatusChange} />
			</div>
		</div>
	</div>
	)
}


export default AdminDashboard;
