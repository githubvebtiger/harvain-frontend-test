import React from 'react';
import './styles.scss'
import { firstTableData, secondTableData } from './const';
import Button, { EButtonType } from '../../../../components/UI/Button';
import { AttentionIcon } from '../../../../assets';
import { toast } from '../../../../components/Toast';

type Props = {
  title: string;
  subtitleColors: string[];
  tableArray: string[][];
  proportions: number[]
}

function Table(props: Props) {
  const getWidth = (index: number) => {
    return props.proportions[index] * 100 + '%'
  }
  const title = props.title.split(' ');
  return (
    <div className="pricing-table">
      <h1 className="title">{title[0]}<br/>{title[1]}</h1>
      <div className="subtitle-container">
        {props.tableArray[0].map((subtitles, index) => (
          <h1 style={{flexBasis: getWidth(index), color: props.subtitleColors[index]}}
              className="subtitle">{subtitles}</h1>
        ))}
      </div>
      <div className="column">
        {props.tableArray.slice(1).map(rows => {
          return (
            <div className="rows">
              {rows.map((item, index) => {
                return (<div className="row" style={{flexBasis: getWidth(index)}}>
                  {item}
                </div>)
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function PricingTable() {
  const onHandleClick = () => {
    toast.info('Refund + Profit Splits')
  }
  return (
    <div className="pricing-table__wrapper">
      <Table proportions={[1 / 2, 1 / 4, 1 / 4]} tableArray={firstTableData} title="Evaluation stage"
             subtitleColors={['', '#F5CD7C', '#52B696']}/>
      <div>
        <Table proportions={[3 / 4, 1 / 4]} tableArray={secondTableData} title="Funded Stage"
               subtitleColors={['', '#8560E4',]}/>
        {/* <Button label="Refund + Profit Splits" onClick={onHandleClick} icon={AttentionIcon}
                variant={EButtonType.BUTTON_SECONDARY}/> */}
      </div>

    </div>
  )
}
