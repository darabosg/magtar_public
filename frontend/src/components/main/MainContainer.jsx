import React from 'react'
import { Route } from 'react-router-dom'
import './MainContainer.css'

const MainContainer = ({ header, children, path }) => {
    return (
        <Route path={path}>
            <div className='box main_container'>
                {header && <h3 className='main_header'>{header}</h3>}
                {children}
            </div>
        </Route>
    )
}

export default MainContainer
