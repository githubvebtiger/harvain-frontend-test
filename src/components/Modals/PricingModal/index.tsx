import React from 'react';
import './styles.scss'
import ModalWrapper from '../ModalWrapper';
import Button from '../../UI/Button';
import { ArrowRightIcon } from '../../../assets';
import { useModal } from '../../../provider/ModalContext';
import MakePaymentModal from '../MakePaymentModal';


type Props = {
  onClose: () => void;
}
export default function PricingModal(props: Props) {
  const { openModal } = useModal();
  function onGetStarted(plan: string) {
    openModal(MakePaymentModal,{plan})
  }

  return (
    <ModalWrapper onClose={props.onClose} className='pricing-modal-wrapper'>
      <div className="pricing-modal">
        <h1>Choose your <span>plan</span></h1>
        <div className="pricing-plan">
          <div className="plus">
            <span className="status">Popular</span>
            <h2>Plus</h2>
            <p className="status-description">Upgraded plan that allows you do advanced actions like a pro</p>
            <p className="price">$9500</p>
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
            <Button label="Get started" onClick={()=>onGetStarted('Plus')} fullWidth/>
          </div>
          <div className="basic">
            <h2>Basic</h2>
            <p className="status-description">Standard plan that allows you to perform basic actions and access
              essential features.</p>
            <p className="price">$5000</p>
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
                <p><span>E-mail</span> support</p>
              </li>
              <li>
                <p><span>24h</span> payout</p>
              </li>
            </ul>
            <Button label="Get started" onClick={()=>onGetStarted('Basic')} fullWidth/>
          </div>
        </div>
        <a className="link-btn" href='/choose-your-plan'>Learn more about our offer<img src={ArrowRightIcon} alt="ArrowRightIcon"/></a>
        {/* TODO */}
      </div>
    </ModalWrapper>
  )
}
