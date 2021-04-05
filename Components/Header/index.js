import React from 'react'
import './style.css';
const Header =(props) =>{
    return(
        <header className="header">
            <nav className="headermenu">
                <a href="http://localhost:3000/">Home</a>
                <a href="http://localhost:3000/search">Stocks</a>
        
            </nav>
        </header>
    )
}

export default Header; 