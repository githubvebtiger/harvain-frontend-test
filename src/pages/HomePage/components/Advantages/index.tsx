import React from 'react';
import './styles.scss'
import { AdvantagesConfig } from './const';

type Props = {
   img: string;
   title: string;
   description: string;
}
 function AdvantagesItem(props:Props){
 return(
   <li>
    <div>
      <img src={props.img} alt="icon" className='' />
    </div>
    <h2 className=''>{props.title}</h2>
    <p>{props.description}</p>
   </li>
 )
}

export default function Advantages(){
  return (
   <section className='advantages'>
     <ul className='advantages-list'>
      <AdvantagesItem {...AdvantagesConfig[0]}/>
      <AdvantagesItem {...AdvantagesConfig[1]}/>
      <AdvantagesItem {...AdvantagesConfig[2]}/>
      <AdvantagesItem {...AdvantagesConfig[3]}/>
     </ul>
   </section>
  )
}
