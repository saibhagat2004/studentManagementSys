import { NavLink } from 'react-router-dom'; // Import NavLink from React Router

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        {/* Navigation links for all schema models */}
        <li>
          <NavLink exact to="/" activeClassName="active">Students</NavLink>
        </li>
        <li>
          <NavLink to="/departments" activeClassName="active">Departments</NavLink>
        </li>
        <li>
          <NavLink to="/results" activeClassName="active">Results</NavLink>
        </li>
        <li>
          <NavLink to="/fees" activeClassName="active">Fees</NavLink>
        </li>
        <li>
          <NavLink to="/subjects" activeClassName="active">Subjects</NavLink>
        </li>
        <li>
          <NavLink to="/teachers" activeClassName="active">Teachers</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
