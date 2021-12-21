import Button from '../Button';

function AddNewUserForm({
	newGroupFormData,
	addFormChangeHandler,
	addNewUserHandler,
}) {
	return (
		<form>
			<div className="mb-3">
				<label className="form-label">
					Group name
				</label>
				<input
					type="text"
					required="required"
					className="form-control"
					placeholder="Enter a name"
					name="name"
					value={newGroupFormData.name}
					onChange={addFormChangeHandler}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">
					Description
				</label>
				<input
					type="text"
					required="required"
					className="form-control"
					placeholder="Enter a description"
					name="description"
					value={newGroupFormData.description}
					onChange={addFormChangeHandler}
				/>
			</div>
			<Button onClick={addNewUserHandler} text="Add" color="success" />
		</form>
	);
}

export default AddNewUserForm;
