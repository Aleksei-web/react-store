

const CategoryForm = ({handelSubmit, setName, name}) => (
	<form onSubmit={handelSubmit}>
		<div className="form-group">
			<label >Name</label>
			<input 
				className="form-control" 
				value={name} 
				type="text"
				onChange={e => setName(e.target.value)}
				autoFocus
				required
			/>
			<button className="btn btn-outline-primary my-2">Save</button>
		</div>
	</form>
)

export default CategoryForm;
