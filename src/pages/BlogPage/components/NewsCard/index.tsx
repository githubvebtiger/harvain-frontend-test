import React from 'react';
import './styles.scss'
import Button from '../../../../components/UI/Button';
import { whiteArrowRightIcon } from '../../../../assets';

type Props = {
  img: string;
  title: string;
  text: string;
  link: string;
}
export default function NewsCard(props: Props) {
  const onClick = () => {
    window.open(props.link, '_blank');
  }
  return (
    <div className="news-card">
      <div className="news-img">
        <img src={props.img}/>
      </div>
      <div className="content">
        <h3>{props.title}</h3>
        <p>{props.text}</p>
        <Button label="Read more" onClick={onClick} icon={whiteArrowRightIcon}/>
      </div>
    </div>
  )
}
