import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";

const NavBar = (props)=> {
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const location = useLocation();
    const currentPath = location.pathname;
    
    const handleSearchSubmit = (e) => {
        e.preventDefault();

        if (searchText.trim()) {
            props.onSearch(searchText.trim());
            setSearchText('');  
            navigate('/search');
        }
    };

     const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleNavClick = () => {
        if (props.resetSearch) {
            props.resetSearch();
        }
    };
    
    const placeholderStyle = props.mode === 'dark' ?{
        color : 'white',
        '--bs-body-color': 'white' 
    } : {};
    return (
      <div>
        <style jsx>{`
            .dark-mode-input::placeholder {
                color: rgba(255, 255, 255, 0.7) !important;
                opacity: 1 !important;
            }
            .dark-mode-input {
                color: white !important;}
                `}
                </style>
        <nav className={`navbar navbar-expand-lg fixed-top ${props.mode === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">InfoWave</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item"><Link 
                            className={`nav-link ${currentPath === '/' ? 'active' : ''}`} 
                            aria-current={currentPath === '/' ? 'page' : undefined} 
                            to="/" 
                            onClick={handleNavClick}
                        >
                            Home
                        </Link></li>
                    <li className="nav-item">
                        <Link 
                            className={`nav-link ${currentPath === '/business' ? 'active' : ''}`} 
                            to="/business" 
                            onClick={handleNavClick}
                        >
                            Business 
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            className={`nav-link ${currentPath === '/entertainment' ? 'active' : ''}`} 
                            to="/entertainment" 
                            onClick={handleNavClick}
                        >
                            Entertainment
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            className={`nav-link ${currentPath === '/health' ? 'active' : ''}`} 
                            to="/health" 
                            onClick={handleNavClick}
                        >
                            Health
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            className={`nav-link ${currentPath === '/science' ? 'active' : ''}`} 
                            to="/science" 
                            onClick={handleNavClick}
                        >
                            Science
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            className={`nav-link ${currentPath === '/sports' ? 'active' : ''}`} 
                            to="/sports" 
                            onClick={handleNavClick}
                        >
                            Sports
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            className={`nav-link ${currentPath === '/technology' ? 'active' : ''}`} 
                            to="/technology" 
                            onClick={handleNavClick}
                        >
                            Technology
                        </Link>
                    </li>
                </ul>
                <form className="d-flex me-3" role="search" onSubmit={handleSearchSubmit}>
                    <input 
                    className={`form-control me-2 ${props.mode === 'dark' ? 'bg-dark border-light dark-mode-input' : ''}`}
                    type="search"
                    placeholder="Search news..."
                    aria-label="search"
                    value={searchText}
                    onChange={handleInputChange}
                    />
                    <button 
                        className={`btn btn-outline-${props.mode === 'dark' ? 'light' : 'dark'} me-2`}
                        type="submit"
                        disabled={!searchText.trim()} 
                    >
                    Search
                    </button>
                </form>
                <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                    
                    <input 
                        className="form-check-input" 
                        onClick={props.toggleMode} 
                        type="checkbox" 
                        role="switch" 
                        id="flexSwitchCheckDefault" 
                        checked={props.mode === 'dark'} 
                        readOnly 
                    />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{props.mode === 'light' ? '☀️' : '🌙'}</label>
                </div>
                </div>
            </div>
            </nav>
      </div>
    );
  
}
export default NavBar;