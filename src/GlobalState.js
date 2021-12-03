import React, {createContext, useState, useReducer, useEffect} from 'react'
import {getData} from './components/utils/FetchData'

//setui socket 1
import io from 'socket.io-client'

export const DataContext  = createContext()

export const DataProvider = ({children}) => {
    const [products, setProducts] = useState([])

    //setup socket 2
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        getData('/api/products')
        .then(res =>setProducts(res.data.products))
        .catch(err => console.log(err.response.data.msg))

        //setup socket 3
        const socket = io('https://merncommentsocketserver.herokuapp.com')
        setSocket(socket)

        //setup socket 4
        return () => socket.close()
    }, [])    

    const state = {
        products: [products, setProducts],
        socket
    }

    return (
        <DataContext.Provider value={state}>
            {children}
        </DataContext.Provider>
    )

}