import Button from '../Button';

function EditableRow({ group, saveHandler, cancelHandler, editFormData, editFormChangeHandler }) {
    console.log(editFormData);

	return (
		<tr key={group.id} data-key={group.id}>
			<th scope="row">{group.id}</th>
			<td>
				<input
					type="text"
					required="required"
					placeholder="Enter a name"
					name="name"
					value={editFormData.name}
                    onChange={editFormChangeHandler}
				/>
			</td>
			<td>
            <input
					type="text"
					required="required"
					placeholder="Enter a description"
					name="description"
					value={editFormData.description}
                    onChange={editFormChangeHandler}
				/>
			</td>
			<td>
				<Button onClick={() => saveHandler(group)} text="Save" dataKeyValue={group.id} color="success" />
				&nbsp;
				<Button onClick={cancelHandler} text="Cancel" dataKeyValue={group.id} color="warning" />
			</td>
		</tr>
	);
}

export default EditableRow;
