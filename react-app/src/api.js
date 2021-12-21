const baseUrl = 'http://localhost:8000/api/v1/';

export const usersListUrl = () => `${baseUrl}users/`
export const userGroupsListUrl = () => `${baseUrl}user_groups/`

export const userDetailUrl = (id) => `${baseUrl}users/${id}/`
export const userGroupDetailUrl = (id) => `${baseUrl}user_groups/${id}/`