import Button from '../Button';
import moment from 'moment';

function ReadOnlyRow({ object, editHandler, deleteHandler }) {
	return (
		<tr key={object.id} data-key={object.id}>
			<th scope="row">{object.id}</th>
			<td>{object.username || object.name }</td>
			<td>{moment(object.created).format('DD.MM.YYYY hh:mm:ss')}</td>
			<td>{object.group ? object.group.name : object.description}</td>
			<td>
				<Button onClick={() => editHandler(object)} text="Edit" />
				&nbsp;
				<Button onClick={() => deleteHandler(object)} text="Delete" color="danger" />
			</td>
		</tr>
	);
}

export default ReadOnlyRow;
