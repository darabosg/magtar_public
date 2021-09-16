import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import MessageContext from '../contexts/message'
import {useHistory} from 'react-router-dom'

const useAxiosAuth = ({ url, method, body = null, headers = null }) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState('')
    const message = useContext(MessageContext)
    const history = useHistory()

    const token = localStorage.getItem('token')
    const axiosAuth = axios.create({
        baseURL: process.env.REACT_APP_SERVER_URL,
    })

    if (token) {
        axiosAuth.defaults.headers.common['Authorization'] = token
    } else {
        axiosAuth.defaults.headers.common['Authorization'] = null
    }

    useEffect(() => {
          const token = localStorage.getItem('token')
          const axiosAuth = axios.create({
              baseURL: process.env.REACT_APP_SERVER_URL,
          })

          if (token) {
              axiosAuth.defaults.headers.common['Authorization'] = token
          } else {
              axiosAuth.defaults.headers.common['Authorization'] = null
          }
    }, [url,method,body])

    const fetchData = () => {
 
               axiosAuth[method](url, body)
            .then(res => {
                setResponse(res.data)
            })
            .catch(err => {
                setError(err.response.data)
                if ((err.response.data.msg === 'jwt expired')) {
                    message("Token expired!", 'danger')
                    localStorage.removeItem('token')
                    history.push('/login')
                }
            })

     
    }

    return [fetchData, response, error]
}

export default useAxiosAuth
