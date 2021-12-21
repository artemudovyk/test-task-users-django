import Button from '../Button';

function AddNewUserForm({
	userGroupsOptions,
	newUserFormData,
	addFormChangeHandler,
	addNewUserHandler,
}) {
	return (
		<form>
			<div className="mb-3">
				<label className="form-label">
					Username
				</label>
				<input
					type="text"
					required="required"
					className="form-control"
					placeholder="Enter a name"
					name="username"
					value={newUserFormData.username}
					onChange={addFormChangeHandler}
				/>
			</div>
			<div className="mb-3">
				<label className="form-label">
					User Group
				</label>
				<select
					name="group"
					className="form-control"
					value={newUserFormData.group.id}
					onChange={addFormChangeHandler}
				>
					<option value="0">--- Please select user group ---</option>
					{userGroupsOptions.map((group) => (
						<option value={group.id}>{group.name}</option>
					))}
				</select>
			</div>
			<Button onClick={addNewUserHandler} text="Add" color="success" />
		</form>
	);
}

export default AddNewUserForm;
