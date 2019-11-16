import React from 'react';
import './Navbar.css'
import { FaShoppingCart, FaRegBell,FaUserCircle } from "react-icons/fa";

export default class Navbar extends React.Component {
constructor(props){
    history(props);
}

    routeToDash = ()=>{
        this.props.history.push('/compareCart');
    }
    render(){
        return (
            <div className="navbar-wrapper">
                <div>
                 <FaShoppingCart onClick={this.routeToDash}/>
                </div>
                <div>
                 <FaRegBell />
                </div>
                <div>
                 <FaUserCircle />
                </div>
                <div>
                 <FaShoppingCart />
                </div>
            </div>
        )
    }
}