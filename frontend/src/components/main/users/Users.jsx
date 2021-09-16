import React, { useState, useEffect, useContext } from 'react'
import useAxiosAuth from '../../../hooks/useAxiosAuth'
import './Users.css'
import MessageContext from '../../../contexts/message'
import { Button } from 'react-bootstrap'
import { AddUserIcon } from '../../Icons'
import User from './User'

const Users = () => {
    const [users, setUsers] = useState(null)
    const [email, setEmail] = useState('')
    const message = useContext(MessageContext)
    const [fetchData, response, error] = useAxiosAuth({
        method: 'get',
        url: '/api/user',
    })

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (response !== null) {
            setUsers(response)
        }
        if (error) {
            message(error.msg, 'danger')
        }
    }, [error, response])

    const [fetchPostUser, res, err] = useAxiosAuth({
        method: 'post',
        url: '/api/user',
        body: { email },
    })

    useEffect(() => {
        if (res !== null) {
            setUsers([...users, res])
            message('User added!', 'success')
        }
        if (err) {
            message(err.msg, 'danger')
        }
        setEmail('')
    }, [err, res])

    const addUser = e => {
        e.preventDefault()
        if (!email.includes('@gmail.com')) {
            message('Must enter a GMAIL address!', 'danger')
            return
        }
        fetchPostUser()
    }

    return (
        <div className='users'>
            <form
                className='add_list_element user_list_element'
                onSubmit={addUser}
            >
                <input
                    className='add_input'
                    placeholder='Email here.'
                    required
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Button type='submit' value='Add user' className='add_button'>
                    <AddUserIcon /> Add user
                </Button>
            </form>
            <ul className='user_list'>
                {' '}
                {users &&
                    users.map(user => (
                        <User setUsers={setUsers} key={user._id} user={user} />
                    ))}
            </ul>
        </div>
    )
}

export default Users
