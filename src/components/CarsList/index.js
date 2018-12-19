import React from 'react'

import Table, { Row, Column, Header, HeaderColumn } from '../Table'
import TableRowControls from '../TableRowControls'
import TickIcon from '../../assets/img/tick_black.svg'

export default function UsersList({ users, deleteCar }) {
  function renderRow({ data: car, ...otherProps }) {
    const carId = car.get('car_id')

    function handleCarDelete() {
      if (window.confirm('Biztosan törölni akarja ezt az autót?')) {
        deleteCar(carId)
      }
    }

    return (
      <Row key={carId}>
        <Column>{car.get('plate_number')}</Column>
        <Column>{car.get('type')}</Column>
        <Column>{car.get('modell')}</Column>
        <Column>{car.get('category')}</Column>
        <Column>{car.get('color')}</Column>
        <Column style={{ textAlign: 'center' }}>
          {car.get('insurance_status') ? <img src={TickIcon} alt="" /> : null}
        </Column>
        <Column>
          <TableRowControls
            editUrl={`/-/cars/${carId}`}
            onDelete={handleCarDelete}
          />
        </Column>
      </Row>
    )
  }

  return (
    <Table data={users} renderRow={renderRow}>
      <Header>
        <HeaderColumn>Rendszám</HeaderColumn>
        <HeaderColumn>Gyártó</HeaderColumn>
        <HeaderColumn>Model</HeaderColumn>
        <HeaderColumn>Típus</HeaderColumn>
        <HeaderColumn>Szín</HeaderColumn>
        <HeaderColumn>Biztosítás</HeaderColumn>
        <HeaderColumn />
      </Header>
    </Table>
  )
}
