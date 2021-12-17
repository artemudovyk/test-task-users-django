# test-task-users-django

Create a simple website with two pages:
1) List of Users
2) List of Groups for Users
Description of the first page:
List of Users consist of: username, created, group, actions.
username – User nickname
created – Date of creating the user
group - Group, to which the user will be added
actions – two buttons 'Edit' and 'Delete'
Also, under the list there should be a button ‘Add User'
for editing and adding new pages with such fields: username (text input) and group(select)
Please see example below
Description of the second page:
The list of groups should consist of: ID, Name, Description, Actions.
Actions – Edit and Delete buttons
Also, under the list there should be a button `Add Group`
For editing and adding new pages with such fields: Name (text input) and Description (text
input).
Group deletion is impossible if the user is assigned to this group.
The images above are added for your overall understanding, do make the same is not
necessary, the style is up to you.
To implement the test task, use Django for the backend and React for the frontend, the rest
technologies are up to you.
The results of your work please push to Bitbucket or GitHub and send us link with access to
view and download.
You should containerize your project with Docker.
You have one week to perform this task. In case of any questions please let me know.

todo:
- django
-- моделі✅
-- серіалізація✅
-- апі✅
-- підключити postgres?
-- чи треба в allowedhosts вказувати локалхост?
-- демо дані


- react
-- сетап
-- отримати дані з апі
-- сторінка зі списком юзерів
--- вивести список юзерів з апі
--- додати форму для створення нового юзера
--- додати кнопку для видалення юзера
-- сторінка зі списком груп
--- вивести список груп з апі
--- додати форму для створення нової групи
--- додати кнопку для видалення групи


- docker
-- докерізація дженго+реакт https://medium.com/@gagansh7171/dockerize-your-django-and-react-app-68a7b73ab6e9
-- протестувати на віртуалці?