import React from 'react';
import './styles.scss'
import Button from '../../components/UI/Button';
import { ArrowRightIcon } from '../../assets';
import ExchangeList from './components/ExchangeList';
import { exchanges } from './components/ExchangeList/const';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../provider/ModalContext';
import RegisterModal from '../../components/Modals/RegisterModal';
import { useTheme } from '../../provider/ThemeProvider';


type Props = {}
export default function ChooseYourPlanPage(props: Props) {
  const {openModal} = useModal()

  function onGetStarted() {
    openModal(RegisterModal, {})
  }
  const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'

  return (
    <>
    <div className='pricing-page-wrapper'>
      <Header showNav/>

        <div className="pricing-page container">

        <h1>Choose your plan</h1>
        <div className="pricing-plan">
          <div className="plus">
            <div className="p-40">
              <div className="header">
                <h2>Basic</h2>
              </div>
              <p className="status-description">Standard plan that allows you to perform basic actions and access
                essential features.</p>
              <p className="price">$5000</p>
              <Button label="Subscribe" onClick={onGetStarted} fullWidth/>
            </div>
            <div className="p-40 plan-details">
              <h2>Features</h2>
              <ul className="plan-list">
                <li>
                  <p><span>All markets</span> available</p>
                </li>
                <li>
                  <p><span>Up to 15</span> satellites</p>
                </li>
                <li>
                  <p><span>Up to 500,000$</span> account size</p>
                </li>
                <li>
                  <p><span>1-3</span> Traders</p>
                </li>
                <li>
                  <p><span>E-mail </span> support</p>
                </li>
                <li>
                  <p><span>24h</span> payout</p>
                </li>
              </ul>
              <ExchangeList exchanges={exchanges.slice(0, 8)}/>
            </div>
          </div>
          <div className="plus">
            <div className="p-40">
              <div className="header">
                <h2>Plus</h2>
                <span className="status">Popular</span>
              </div>
              <p className="status-description">Upgraded plan that allows you do advanced actions like a pro</p>
              <p className="price">$9500</p>
              <Button label="Subscribe" onClick={onGetStarted} fullWidth/>
            </div>
            <div className="p-40 plan-details">
              <h2>Features</h2>
              <ul className="plan-list">
                <li>
                  <p><span>All markets</span> available</p>
                </li>
                <li>
                  <p><span>Up to 30</span> satellites</p>
                </li>
                <li>
                  <p><span>Up to 1000,000$</span> account size</p>
                </li>
                <li>
                  <p><span>4-7</span> Traders</p>
                </li>
                <li>
                  <p><span>E-mail and phone call</span> support</p>
                </li>
                <li>
                  <p><span>3h</span> payout</p>
                </li>
              </ul>
              <ExchangeList exchanges={exchanges}/>
            </div>
          </div>

        </div>
        {/* TODO */}
      </div>
    </div>
      <Footer/>
      
    </>
  )
}
