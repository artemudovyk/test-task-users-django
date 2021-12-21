import Button from '../Button';
import moment from 'moment';

function EditableRow({ user, userGroupsOptions, saveHandler, cancelHandler, editFormData, editFormChangeHandler }) {
    console.log(editFormData);

	return (
		<tr key={user.id} data-key={user.id}>
			<th scope="row">{user.id}</th>
			<td>
				<input
					type="text"
					required="required"
					placeholder="Enter a name"
					name="username"
					value={editFormData.username}
                    onChange={editFormChangeHandler}
				/>
			</td>
			<td>{moment(user.created).format('DD.MM.YYYY hh:mm:ss')}</td>
			<td>
				<select name="group" value={editFormData.group.id} onChange={editFormChangeHandler}>
					{userGroupsOptions.map((group) => (
						<option value={group.id}>{group.name}</option>
					))}
				</select>
			</td>
			<td>
				<Button onClick={() => saveHandler(user)} text="Save" dataKeyValue={user.id} color="success" />
				&nbsp;
				<Button onClick={cancelHandler} text="Cancel" dataKeyValue={user.id} color="warning" />
			</td>
		</tr>
	);
}

export default EditableRow;
