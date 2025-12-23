import React from 'react';
import './styles.scss'
import Button from '../../../UI/Button';
import { useNavigate } from 'react-router-dom';


import { ROUTES } from '../../../Navigation';


export default function AuthNav() {
  const navigate = useNavigate()
  const onHandleLogOut = () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("clientRefreshToken");
    localStorage.removeItem("clientAccessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("satellite");
    localStorage.removeItem("loginId");
    navigate(ROUTES.HOME, { replace: true });
  }
  return (
    <div className='auth-nav'>
      <Button onClick={onHandleLogOut} label="Log out"/>
    </div>
  )
}
