import {  React, useEffect } from 'react';
import ProfileSidebar from './partials/ProfileSidebar';
import UpdateUserInfo from './UpdateUserInfo';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Profile() {

    const { isLoggedIn } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn]);

    return (
        <div className='md:flex lg:flex sm:block'>
            <ProfileSidebar />
            <UpdateUserInfo profile={true} />
        </div>
    );
}
