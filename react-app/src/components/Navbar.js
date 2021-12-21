import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				<ul className="navbar-nav me-auto mb-2 mb-lg-0">
					<li className="nav-item">
                        <Link to="/" className="nav-link active">Users</Link>
					</li>
                    <li className="nav-item">
                    <Link to="/groups" className="nav-link active">Groups</Link>
					</li>				
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
