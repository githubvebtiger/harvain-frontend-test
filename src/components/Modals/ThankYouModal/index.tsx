import React from 'react';
import './styles.scss'
import ModalWrapper from '../ModalWrapper';

type Props = {
  onClose: () => void;
}
export default function ThankYouModal(props: Props) {
  return (
    <ModalWrapper onClose={props.onClose} className='thank-you-modal-wrapper'>
      <div className="thank-you-modal">
        <h2>Thank you!</h2>
        <p>Before we start, our support team needs to verify if the transaction has been processed. We will notify you
          immediately once it's confirmed.</p>
      </div>
    </ModalWrapper>
  )
}
