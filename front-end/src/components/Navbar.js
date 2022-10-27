import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    
    
    return (  
        <nav className="navbar">
            <Link to="/" className="siteName">
                Restaurant Reviewers
            </Link>
            <ul>
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/profile">Profile</CustomLink>
                <CustomLink to="/about">About</CustomLink>
                <CustomLink to="/explore">Explore</CustomLink>             
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return(
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}
export default Navbar;