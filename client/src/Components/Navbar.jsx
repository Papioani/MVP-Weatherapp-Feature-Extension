import React from "react";
import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div className="navbar">
            <Link to="/" className="links">Home </Link>
            <Link to ="/map" className="links">Weather Map</Link>
            <Link to="/about" className="links"> About </Link>
            <Link to="/contact" className="links"> Contact </Link>
            
        </div>
    )
}

export default Navbar;