import { createContext, useEffect, useState } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/auth')
        .then((resp) => resp.json())
        .then((data) => {
            if (data?.errors) {
                console.log(data.errors);
            } else {
                setUser(data)
            }
        })
    },[])

    return (
        <UserContext.Provider value={[ user, setUser ]}>
            { children }
        </UserContext.Provider>
    );
}

export {UserContext, UserProvider}