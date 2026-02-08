import React, { useEffect, useState } from 'react';
import './styles.scss'
import { BlackCrossIcon, CrossIcon } from '../../../assets';
import useWindowWidth from '../../../hooks/useWindowWidth';
import Header from '../../Header';
import { useTheme } from '../../../provider/ThemeProvider';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}
export default function ModalWrapper({children, onClose, className}: Props) {
  const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'
  const [isMobile, setIsMobile] = useState(false)
  const {windowWidth} = useWindowWidth();

  useEffect(() => {
    if (windowWidth < 880) {
      setIsMobile(true)
    } else setIsMobile(false)
  }, [windowWidth])
  return (
    <>

      <div className={'modal-wrapper ' + className}>
        <div className="content">

          <div className="close-btn" onClick={onClose}>
            <img src={isMobile && !isDarkTheme? BlackCrossIcon : CrossIcon} alt="CrossIcon"/>
          </div>
          {children}
        </div>


      </div>
    </>
  )
}
