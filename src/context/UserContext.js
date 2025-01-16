import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Load user data on mount
        const loadUserData = () => {
            const encryptedData = localStorage.getItem('userData');
            if (encryptedData) {
                try {
                    const userData = JSON.parse(atob(encryptedData));
                    setUser(userData);
                } catch (error) {
                    console.error('Error loading user data:', error);
                    localStorage.removeItem('userData');
                }
            }
        };

        loadUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};