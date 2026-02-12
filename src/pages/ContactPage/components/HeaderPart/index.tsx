import React from 'react';
import './styles.scss'
import { AddressIcon, MailIcon, WhiteAddressIcon, WhiteMailIcon} from '../../../../assets';
import { useTheme } from '../../../../provider/ThemeProvider';
import { SUPPORT_EMAIL } from '../../../../constants';

type Props = {}
export default function HeaderPart(props: Props) {
  const { theme } = useTheme();
  return (
    <div className="header-part">
      <div className="left">
        <h2>Contact us</h2>
        <p>Just send us your questions or concerns by filling up the contact form or by starting a
          new ticket by clicking on the help button on the bottom right and we will give you the
          best help you need.</p>
        <p>We provide support in multiple languages.</p>
      </div>
      <div className="right">
        <div className="item">



        <h3><img className='img-mob' src={theme === 'dark' ? WhiteAddressIcon: AddressIcon}/>Address<img className='img-mob-block' src={theme === 'dark' ? WhiteAddressIcon: AddressIcon}/></h3>
          <p>Premises NO. 2301-B, One Raffles Quay North Tower, Singapore</p>
        </div>
        <div className="item">
          <h3><img className='img-mob' src={theme === 'dark' ? WhiteMailIcon: MailIcon}/>Email<img className='img-mob-block'  src={theme === 'dark' ? WhiteMailIcon: MailIcon}/></h3>
          <a>{SUPPORT_EMAIL}</a>
        </div>
      </div>
    </div>
  )
}
