import React, { useEffect, useState } from 'react';
import './styles.scss';
import Button from '../UI/Button';
import { ArrowRightTopIcon } from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';

type Props = {}

export default function Join(props: Props) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false)
  const {windowWidth} = useWindowWidth();



  useEffect(() => {
    if (windowWidth < 548) {
      setIsMobile(true)
    } else setIsMobile(false)
  }, [])
  function onHandleNavigate() {
    navigate('/choose-your-plan');
  }

  return (
    <section className='join'>
      <div>
        <h2>Join a company of skillful traders</h2>
        <p>When it comes to trading, we believe in consistency and risk management, which are indicators of discipline. We hire real traders, not bounty hunters..</p>
        <Button label="Pricing" onClick={onHandleNavigate} icon={ArrowRightTopIcon} fullWidth={isMobile}/>
      </div>
    </section>
  );
}
