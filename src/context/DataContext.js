import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const URL = process.env.REACT_APP_BACKEND_URL;

    const [orderId, setOrderId] = useState();
    const [orderDetails, setOrderDetails] = useState('');

    return (
        <DataContext.Provider value={{
            orderId, setOrderId,
            orderDetails, setOrderDetails,
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;