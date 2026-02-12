import React from 'react';
import './styles.scss';

type Exchange = {
  name: string;
  logo: string;
};

type Props = {
  exchanges: Exchange[];
};

export default function ExchangeList({exchanges}: Props) {
  return (
    <div className="exchange-list">
      <h2>Exchanges</h2>
      <div className="exchange-list-wrapper">
        {exchanges.map((exchange) => (
          <div key={exchange.name} className="exchange-item">
            <img src={exchange.logo} alt={exchange.name} className="exchange-logo"/>
            <span>{exchange.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
