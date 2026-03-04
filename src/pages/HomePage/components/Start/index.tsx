import React, { useEffect, useState } from 'react';
import './styles.scss'
import Button, { EButtonType } from '../../../../components/UI/Button';
import useWindowWidth from '../../../../hooks/useWindowWidth';
import { useNavigate } from 'react-router-dom';
import { ArrowRightTopIcon, BlackRightTopArrowIcon } from '../../../../assets';

type Props = {}
export default function Start(props: Props) {
  const [isMobile, setIsMobile] = useState(false)
  const {windowWidth} = useWindowWidth();
  const navigate = useNavigate();

  function onHandleNavigate() {
    navigate('/choose-your-plan');
  }

  useEffect(() => {
    if (windowWidth < 548) {
      setIsMobile(true)
    } else setIsMobile(false)
  }, [])
  return (
    <div className="start">
      <div className="video">
        <video id="video-bg" autoPlay loop muted playsInline>
          <source src={'/main_video.mp4'} type="video/mp4"/>
        </video>
      </div>
      <div className="top">


        <div className="container top-content">
          <p className="h1">Your profit is<span> our pride.</span></p>
        </div>
      </div>
      <div className="join-part">
        <div className="join-part-content">

          <h3>Join a company of skillful traders</h3>
          <Button
            label="Pricing"
            variant={!isMobile ? EButtonType.BUTTON_PRIMARY : EButtonType.BUTTON_GRAY}
            onClick={onHandleNavigate}
            icon={!isMobile ? ArrowRightTopIcon : BlackRightTopArrowIcon}
          />
        </div>
      </div>
    </div>
  )
}
