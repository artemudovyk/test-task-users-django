import { useState, useEffect } from 'react';
import { usersListUrl, userGroupsListUrl } from './api';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import UsersPage from './pages/UsersPage';
import UserGroupsPage from './pages/UserGroupsPage';

function App() {
	const [users, setUsers] = useState(); // Array of users
	const [groups, setGroups] = useState(); // Array of user groups

	// Load data from API
	useEffect(() => {
        console.log('useEffect started')
		// Retrieve all users from API
		async function getUsers() {
			const response = await axios.get(usersListUrl());
			setUsers(response.data);
		}
		getUsers();

		// Retrieve all user groups from API
		async function getUserGroups() {
			const response = await axios.get(userGroupsListUrl());
			setGroups(response.data);
		}
		getUserGroups();
	}, []);

    // useEffect(() => {
    //     const updatedGroups = groups.map((group) => {
	// 		const updGr = group;
	// 		updGr.user_count = users.filter((u) => u.group.name === group.name).length;
	// 		return updGr;
	// 	});
	// 	setGroups(updatedGroups);
    // }, [])

	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route
					exact
					path="/"
					element={<UsersPage users={users} setUsers={setUsers} groups={groups} setGroups={setGroups} />}
				/>
				<Route path="/groups" element={<UserGroupsPage users={users} groups={groups} setGroups={setGroups} />} />
			</Routes>
		</div>
	);
}

export default App;
