import React from 'react'
import './style.css';

const Logo = props =>{
    return(
        <div className="logo">
             <nav className="headermenu">
             <a href="#" >Stockex Stocks</a>
                <img 
                src={process.env.PUBLIC_URL +"/image/Capture.PNG" }
                alt="Stocksymbol" height="65px" width="65px"></img>
            </nav>
            
           
        </div>
    );
}

export default Logo;