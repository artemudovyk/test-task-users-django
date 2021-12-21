import Button from '../Button';
import moment from 'moment';

function ReadOnlyGroupRow({ group, editHandler, deleteHandler }) {
	return (
		<tr key={group.id} data-key={group.id}>
			<th scope="row">{group.id}</th>
			<td>{group.name }</td>
			<td>{group.description}</td>
			<td>
				<Button onClick={() => editHandler(group)} text="Edit" />
				&nbsp;
				<Button onClick={() => deleteHandler(group)} text="Delete" color="danger" />
			</td>
		</tr>
	);
}

export default ReadOnlyGroupRow;
