// import UsersListComponent from "../components/UsersListComponent";
import { usersListUrl, userDetailUrl, userGroupsListUrl } from '../api';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ReadOnlyRow from '../components/users/ReadOnlyUserRow';
import EditableUserRow from '../components/users/EditableUserRow';
import AddNewUserForm from '../components/users/AddNewUserForm';

function UsersPage({ users, setUsers, groups, setGroups }) {
	const [editUserId, setEditUserId] = useState(); // User's ID that is currently edited in inline form
	// Inline user edit form data
	const [editFormData, setEditFormData] = useState({
		id: '',
		username: '',
		group: {
			id: "0",
		}
	});
	// New user form data
	const [newUserFormData, setNewUserFormData] = useState({
		id: '',
		username: '',
		group: {
			id: "0",
		}
	});

	// =================
	// === API calls ===
	// =================
	/**
	 * Deletes user data via an API with DELETE method.
	 * @param {*} user User object. Used to track which user to delete with 'user.id'.
	 */
	const deleteUser = async (user) => {
		await axios.delete(userDetailUrl(user.id));
		// TODO:
		// Handle when API call is unsuccessful.
	};

	/**
	 * Updates user data via an API with PUT method.
	 * @param {object} user User object. Used to track which user to update with 'user.id'.
	 * @param {*} updatedUser User object with updated data with which we replace old data via an API.
	 */
	const updateUser = async (user, updatedUser) => {
		const { data } = await axios.put(userDetailUrl(user.id), updatedUser);
		console.log(data);
		// TODO:
		// Handle when API call is unsuccessful.
	};

	/**
	 * Creates new user via an API with POST method.
	 * @param {*} user User object with data for new user.
	 */
	const addNewUser = async (user) => {
		const { data } = await axios.post(usersListUrl(), user);
		console.log(data);
		return data;
		// TODO:
		// Handle when API call is unsuccessful.
	};

	// =================
	// === Handlers ===
	// =================
	/**
	 * Edit button handler. Shows inline edit form.
	 * @param {*} user User object. Used to track which user to edit with 'user.id'.
	 */
	const editUserButtonHandler = (user) => {
		// Show inline user edit form
		setEditUserId(user.id);

		// Update edit form state with user's data
		const newFormData = {
			id: user.id,
			username: user.username,
			group: user.group,
		};
		setEditFormData(newFormData);
	};

	/**
	 * Delete button handler. Asks user to confirmation and after successful confirm make an API call and update UI.
	 * @param {*} user User object. Used to track which user to delete with 'user.id'.
	 */
	const deleteUserHandler = (user) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			// Call an API
			deleteUser(user);
			// Filter deleted user from the UI
			setUsers(users.filter((u) => u.id !== user.id));
		}
	};

	/**
	 * Hides inline user edit form.
	 */
	const cancelEditHandler = () => {
		setEditUserId(null);
	};

	/**
	 * Tracks changes in inline user edit form in separate state.
	 * @param {*} event JS event.
	 */
	const editFormChangeHandler = (event) => {
		const fieldName = event.target.getAttribute('name');
		let fieldValue;
		if (fieldName === 'group') {
			// If user edited group field, instead of writing ID of the new group, we'll
			// provide complete UserGroup object that we'll find by 'id' in 'userGroups' array.
			// That way we'll correctly make an API request later on.
			const groupId = parseInt(event.target.value);
			fieldValue = groups.find((group) => group.id === groupId);
		} else {
			fieldValue = event.target.value;
		}

		const newFormData = { ...editFormData };
		newFormData[fieldName] = fieldValue;

		setEditFormData(newFormData);
	};

	/**
	 * Tracks changes in new user form in separate state.
	 * @param {*} event JS event.
	 */
	const addFormChangeHandler = (event) => {
		const fieldName = event.target.getAttribute('name');
		let fieldValue;
		if (fieldName === 'group') {
			// If user edited group field, instead of writing ID of the new group, we'll
			// provide complete UserGroup object that we'll find by 'id' in 'userGroups' array.
			// That way we'll correctly make an API request later on.
			const groupId = parseInt(event.target.value);
			fieldValue = groups.find((group) => group.id === groupId);
		} else {
			fieldValue = event.target.value;
		}

		const formData = { ...newUserFormData };
		formData[fieldName] = fieldValue;

		setNewUserFormData(formData);
	};

	/**
	 * Save button handler for inline user edit form.
	 * @param {*} user User object. Used to track which user to edit with 'user.id'.
	 */
	const saveEditHandler = (user) => {
		const updatedUser = { ...editFormData };
		// Call an API
		updateUser(user, updatedUser);

		// Update users data in UI
		const newUsers = users.map((u) => {
			if (u.id === user.id) {
				return updatedUser;
			} else {
				return u;
			}
		});
		setUsers(newUsers);

		// Hide inline edit form.
		cancelEditHandler();
	};

	/**
	 * New user form submit handler. Function is async because
	 * we need to await for an ID of created user to correctly update UI.
	 */
	const addNewUserHandler = async () => {
		console.log('add');
		const user = { ...newUserFormData };
		// Call an API
		const newUser = await addNewUser(user);

		// // Update users data in UI
		const updatedUsers = [...users, newUser];
		setUsers(updatedUsers);

		// Refresh form inputs
		setNewUserFormData({
			id: '',
			username: '',
			group: {
				id: "0",
			}
		});
	};

	return (
		<>
			<h1>Users</h1>
			<form>
				<table className="table table-striped table-hover table-bordered">
					<thead>
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Username</th>
							<th scope="col">Created</th>
							<th scope="col">Group</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{users &&
							groups &&
							users.map((user) => (
								<>
									{editUserId !== user.id ? (
										<ReadOnlyRow
											key={user.id}
											object={user}
											editHandler={editUserButtonHandler}
											deleteHandler={deleteUserHandler}
										/>
									) : (
										<EditableUserRow
											key={user.id}
											user={user}
											userGroupsOptions={groups}
											saveHandler={saveEditHandler}
											cancelHandler={cancelEditHandler}
											editFormData={editFormData}
											editFormChangeHandler={editFormChangeHandler}
										/>
									)}
								</>
							))}
					</tbody>
				</table>
			</form>
			<h2>Add new user</h2>
			{users && groups && (
				<AddNewUserForm
					userGroupsOptions={groups}
					newUserFormData={newUserFormData}
					addFormChangeHandler={addFormChangeHandler}
					addNewUserHandler={addNewUserHandler}
				/>
			)}
		</>
	);
}

export default UsersPage;
