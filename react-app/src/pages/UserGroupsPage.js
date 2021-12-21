// import UsersListComponent from "../components/UsersListComponent";
import { userGroupDetailUrl, userGroupsListUrl } from '../api';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ReadOnlyGroupRow from '../components/groups/ReadOnlyGroupRow';
import EditableGroupRow from '../components/groups/EditableGroupRow';
import AddNewGroupForm from '../components/groups/AddNewGroupForm';

function UserGroupsPage({ groups, setGroups, users }) {
	const [editGroupId, setEditGroupId] = useState(); // Group's ID that is currently edited in inline form
	// Inline group edit form data
	const [editFormData, setEditFormData] = useState({
		id: '',
		name: '',
		description: '',
	});
	// New group form data
	const [newGroupFormData, setNewGroupFormData] = useState({
		id: '',
		name: '',
		description: '',
	});

	// Load data from API
	// useEffect(() => {
	// 	// Retrieve all groups from API
	// 	async function getGroups() {
	// 		const response = await axios.get(userGroupsListUrl());
	// 		setGroups(response.data);
	// 	}
	// 	getGroups();
	// }, []);

	// =================
	// === API calls ===
	// =================
	/**
	 * Deletes group data via an API with DELETE method.
	 * @param {*} group Group object. Used to track which group to delete with 'group.id'.
	 */
	const deleteGroup = async (group) => {
		const response = await axios.delete(userGroupDetailUrl(group.id));
		console.log(response);
		// TODO:
		// Handle when API call is unsuccessful.
	};

	/**
	 * Updates group data via an API with PUT method.
	 * @param {object} group Group object. Used to track which group to update with 'group.id'.
	 * @param {*} updatedUser Group object with updated data with which we replace old data via an API.
	 */
	const updateGroup = async (group, updatedGroup) => {
		const { data } = await axios.put(userGroupDetailUrl(group.id), updatedGroup);
		console.log(data);
		// TODO:
		// Handle when API call is unsuccessful.
	};

	/**
	 * Creates new group via an API with POST method.
	 * @param {*} group User object with data for new user.
	 */
	const addNewGroup = async (group) => {
		console.log(group);
		console.log(groups);
		const { data } = await axios.post(userGroupsListUrl(), group);
		console.log(data);
		return data;
		// TODO:
		// Handle when API call is unsuccessful.
	};

	// === Handlers ===
	/**
	 * Edit button handler. Shows inline edit form.
	 * @param {*} group Group object. Used to track which user to edit with 'group.id'.
	 */
	const editGroupButtonHandler = (group) => {
		// Show inline user edit form
		setEditGroupId(group.id);

		// Update edit form state with user's data
		const newFormData = {
			id: group.id,
			name: group.name,
			description: group.description,
		};
		setEditFormData(newFormData);
	};

	/**
	 * Delete button handler. Asks user to confirmation and after successful confirm make an API call and update UI.
	 * @param {*} group Group object. Used to track which user to delete with 'user.id'.
	 */
	const deleteGroupHandler = (group) => {
        // Check if any user is related to the group
		const groupUsersCount = users.filter((u) => u.group.name === group.name).length;

		if (groupUsersCount > 0) {
			window.alert("You can't delete a group that have related users to it.");
			return;
		}

        // If there are any user in the group, ask for a confirmation to delete operation
		if (window.confirm('Are you sure you want to delete this group?')) {
			// Call an API
			deleteGroup(group);
			// Filter deleted group from the UI
			setGroups(groups.filter((g) => g.id !== group.id));
		}
	};

	/**
	 * Hides inline user edit form.
	 */
	const cancelEditHandler = () => {
		setEditGroupId(null);
	};

	/**
	 * Tracks changes in inline user edit form in separate state.
	 * @param {*} event JS event.
	 */
	const editFormChangeHandler = (event) => {
		const fieldName = event.target.getAttribute('name');
		let fieldValue = event.target.value;

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
		const fieldValue = event.target.value;

		const formData = { ...newGroupFormData };
		formData[fieldName] = fieldValue;

		setNewGroupFormData(formData);
	};

	/**
	 * Save button handler for inline user edit form.
	 * @param {*} group Group object. Used to track which group to edit with 'group.id'.
	 */
	const saveEditHandler = (group) => {
		const updatedGroup = { ...editFormData };
		// Call an API
		updateGroup(group, updatedGroup);

		// Update users data in UI
		const newGroup = groups.map((g) => {
			if (g.id === group.id) {
				return updatedGroup;
			} else {
				return g;
			}
		});
		setGroups(newGroup);

		// // Hide inline edit form.
		cancelEditHandler();
	};

	/**
	 * New user form submit handler. Function is async because
	 * we need to await for an ID of created user to correctly update UI.
	 */
	const addNewGroupHandler = async () => {
		console.log('add');
		const group = { ...newGroupFormData };
		// Call an API
		const newGroup = await addNewGroup(group);

		// // Update users data in UI
		console.log(groups);
		const updatedGroups = [...groups, newGroup];
		console.log(updatedGroups);
		setGroups(updatedGroups);

		// Refresh form inputs
		setNewGroupFormData({
			id: '',
			name: '',
			description: '',
		});
	};

	return (
		<>
			<h1>User Groups</h1>
			<form>
				<table className="table table-striped table-hover table-bordered">
					<thead>
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Name</th>
							<th scope="col">Description</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>
						{groups &&
							groups.map((group) => (
								<>
									{editGroupId !== group.id ? (
										<ReadOnlyGroupRow
											key={group.id}
											group={group}
											editHandler={editGroupButtonHandler}
											deleteHandler={deleteGroupHandler}
										/>
									) : (
										<EditableGroupRow
											key={group.id}
											group={group}
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
			<h2>Add new user group</h2>
			{groups && (
				<AddNewGroupForm
					newGroupFormData={newGroupFormData}
					addFormChangeHandler={addFormChangeHandler}
					addNewUserHandler={addNewGroupHandler}
				/>
			)}
		</>
	);
}

export default UserGroupsPage;
