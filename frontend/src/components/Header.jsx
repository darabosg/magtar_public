import React from 'react'
import headerLogo from '../img/header_logo.png'
import './Header.css'

const Header = () => {
    return (
        <header>
            <h1>MAGtár</h1>
            <img id='header_logo' src={headerLogo} alt='header_logo' />
        </header>
    )
}

export default Header
