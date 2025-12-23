import React, { useEffect, useState } from 'react';
import './styles.scss'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ColumnConfig, Table } from '../../components/Table/intex';
import Button, { EButtonType } from '../../components/UI/Button';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '../../provider/ThemeProvider';
import { ROUTES } from '../../components/Navigation';
import { fetchSatelliteById, fetchSatellites, getSatelliteToken } from '../../api/satellites';
import { useModal } from '../../provider/ModalContext';
import LoginModal from '../../components/Modals/LoginModal';

type Props = {}
type TableData = {
  id: number;
  uuid: string;
  block_balance: number;
  active_balance: number;
  withdrawal: number;
  order: any;
};

const SatellitesTable = ({data}: { data: any[] }) => {
  const {openModal} = useModal()
  const navigate = useNavigate()


  const onHandleLogin = (id: number, uuid: string) => {
    fetchSatelliteById(id)

    openModal(LoginModal, {uuid, navigate})


  }

  const columns: ColumnConfig<TableData>[] = [

    {
      header: 'UUID',
      render: (row) => <p>{row.uuid}</p>,
    },
    {
      header: 'Block Balance',
      render: (row) => <p>${row.block_balance}<span className=" down"> ↓</span></p>,
    },
    {
      header: 'Active Balance',
      render: (row) => <p>${row.active_balance}<span className="up"> ↑</span></p>,
    },
    {
      header: 'Withdrawal',
      render: (row) => <p>{`$${row.withdrawal}`}</p>,
    },
    {
      header: ' ',
      render: (row) => <Button onClick={() => onHandleLogin(row.id, row.uuid)} label="Login"
                               variant={EButtonType.BUTTON_GRAY}
                               fullWidth/>,
    },
  ];

  return <Table data={data} columns={columns}/>;
};
export default function SatellitesPage() {
  const [satellites, setSatellites] = useState<TableData[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  // useEffect(() => {
  //   fetchSatellites().then(data => {
  //     setSatellites(data.satellites)
  //     setTotalPrice(satellites.reduce((sum: number, satellite: TableData) => {
  //       return sum + (satellite.active_balance || 0);
  //     }, 0))
  //   })
  // }, []);

  useEffect(() => {
    fetchSatellites().then(data => {
      if (data?.data) {
        setSatellites(data.data.satellites || []);
        setTotalPrice(data.data.total_balance || 0);
      }
    });
  }, []);


  const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'
  return (

    <>
      <div className="satellities-page-wrapper">
        <Header isAuth showLogout/>
        <div className="satellites-page container">
          <div className="balance">
            <p>Total balance:</p>
            <h2>${totalPrice}</h2>
          </div>
          <SatellitesTable data={satellites}/>
        </div>
        <Footer/>
      </div>
    </>
  )
}
