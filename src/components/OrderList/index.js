import React from 'react'

import Table, { Row, Column, Header, HeaderColumn } from '../Table'
import TableRowControls from '../TableRowControls'
import TickIcon from '../../assets/img/tick_black.svg'
import PrintIcon from '../../assets/img/print.svg'
import { DateInterval, dayDiff } from '../Date'

export default function OrderList({ orders, deleteOrder, getPrintUrl }) {
  function renderRow({ data: order, ...otherProps }) {
    const orderId = order.get('rent_id')
    const closed = !order.get('rent_status')
    const startDate = new Date(order.get('start_date'))
    let endDate = new Date(order.get('end_date'))
    let duration = 0

    if (endDate instanceof Date && !isNaN(endDate)) {
      duration = dayDiff(endDate, startDate)
    } else {
      endDate = null
    }

    function handleOrderDelete() {
      if (window.confirm('Biztosan törölni akarja ezt a bérlést?')) {
        deleteOrder(orderId)
      }
    }

    return (
      <Row key={orderId} {...otherProps}>
        <Column>{order.get('plate_number')}</Column>
        <Column>
          <DateInterval startDate={startDate} endDate={endDate} />{' '}
          {endDate && `(${duration} nap`}
        </Column>
        <Column>{order.get('daily_rent_price', 0)} Ft</Column>
        <Column>{order.get('rent_total', 0)} Ft</Column>
        <Column style={{ textAlign: 'center' }}>
          {closed ? <img src={TickIcon} alt="" /> : null}
        </Column>
        <Column>
          <TableRowControls
            editUrl={`/-/orders/${orderId}`}
            onDelete={handleOrderDelete}
          >
            <a
              className="icon-button"
              href={getPrintUrl(orderId)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={PrintIcon}
                alt="Nyomtatás"
                width={18}
                title="Szerződés nyomtatás"
              />
            </a>
          </TableRowControls>
        </Column>
      </Row>
    )
  }

  return (
    <Table data={orders} renderRow={renderRow}>
      <Header>
        <HeaderColumn>Gékocsi</HeaderColumn>
        <HeaderColumn>Bérlés időtartama</HeaderColumn>
        <HeaderColumn>Napi díj</HeaderColumn>
        <HeaderColumn>Végösszeg</HeaderColumn>
        <HeaderColumn>Lezárt</HeaderColumn>
        <HeaderColumn />
      </Header>
    </Table>
  )
}
