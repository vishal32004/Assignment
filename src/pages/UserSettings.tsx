import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { getUsers } from "../Slices/adminSlice";

const UserSettings = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.users.users);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    return (
        <>
            <h1>User Settings</h1>
            {users.map((user) => (
                <div key={user.id}>
                    <h4>User Email: </h4>
                    {user.name}
                </div>
            ))}
        </>
    );
};

export default UserSettings;
