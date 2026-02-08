import React from 'react';
import './styles.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button, { EButtonType } from '../../../UI/Button';
import { useModal } from '../../../../provider/ModalContext';
import LoginModal from '../../../Modals/LoginModal';
import RegisterModal from '../../../Modals/RegisterModal';

import { ROUTES } from '../../../Navigation';

type Props = {};

export default function HeaderNav(props: Props) {
  const location = useLocation();
  const navigate = useNavigate()
  const {openModal} = useModal()

  function openRegisterModal() {
    openModal(RegisterModal, {navigate})
  }

  function openLoginModal() {
    // If already authenticated
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // If was logged into satellite - go back to satellite profile
      const loginId = localStorage.getItem('loginId');
      if (loginId) {
        navigate(ROUTES.PROFILE);
      } else {
        // Otherwise go to satellites list
        navigate(ROUTES.SATELLITES);
      }
      return;
    }
    openModal(LoginModal, {navigate})
  }

  return (
    <nav className="header__nav">
      <ul>
        <li>
          <Link to={ROUTES.HOME} className={location.pathname === ROUTES.HOME ? 'active-link' : ''}>
            Home
          </Link>
        </li>
        <li>
          <Link to={ROUTES.BLOG} className={location.pathname === ROUTES.BLOG ? 'active-link' : ''}>
            Blog
          </Link>
        </li>
        <li>
          <Link to={ROUTES.FAQ} className={location.pathname === ROUTES.FAQ ? 'active-link' : ''}>
            FAQ
          </Link>
        </li>
        <li>
          <Link to={ROUTES.CONTACT} className={location.pathname === ROUTES.CONTACT ? 'active-link' : ''}>
            Contact Us
          </Link>
        </li>
        <li>
          <Button onClick={openRegisterModal} label="Register"/>
        </li>
        <li>
          <Button onClick={openLoginModal} label="Log in" variant={EButtonType.BUTTON_SECONDARY}/>
        </li>
      </ul>
    </nav>
  );
}
