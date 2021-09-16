import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import './Nav.css'
import UserContext from '../contexts/user'
import { Button } from 'react-bootstrap'
import logo from '../img/nav_logo.png'

const Nav = () => {
    const { user, setUser } = useContext(UserContext)
    const history = useHistory()

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
        // message('Logged out', 'success')
        history.push('/login')
    }

    return (
        <div className='navbar'>
            <nav className='box'>
                <img className='nav_logo' src={logo} alt='mag_logo' />
                <ul>
                    <li>{user && <p className='user'>{user.email}</p>}</li>

                    <li>
                        <h5>Instruments</h5>
                    </li>
                    <li>
                        <NavLink activeClassName='active_route' to='/create'>
                            <Button variant='success' className='nav_button'>
                                New instrument
                            </Button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to='/instruments'
                            activeClassName='active_route'
                        >
                            <Button className='nav_button'>Instruments</Button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/orders' activeClassName='active_route'>
                            <Button className='nav_button'>Orders</Button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/stock' activeClassName='active_route'>
                            <Button className='nav_button'>Stock</Button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/summary' activeClassName='active_route'>
                            <Button className='nav_button'>Summary</Button>
                        </NavLink>
                    </li>
                    <li>
                        <h5>Production</h5>
                    </li>
                    <li>
                        <NavLink to='/prodline' activeClassName='active_route'>
                            <Button className='nav_button'>
                                Production line
                            </Button>
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to='/timeline' activeClassName='active_route'>
                            <Button className='nav_button'>Timeline???</Button>
                        </NavLink>
                    </li> */}
                    <li>
                        <h5>Options</h5>
                    </li>

                    <li>
                        <NavLink to='/users' activeClassName='active_route'>
                            <Button className='nav_button'>Users</Button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/settings' activeClassName='active_route'>
                            <Button className='nav_button'>Settings</Button>
                        </NavLink>
                    </li>
                    <li>
                        <Button
                            className='nav_button'
                            variant='danger'
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </li>
                </ul>
                <span className='copy'>
                    Made with <span id='heart'>&#9825;</span> by Gabor Darabos
                </span>
            </nav>
        </div>
    )
}

export default Nav
