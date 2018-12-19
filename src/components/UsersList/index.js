import React from 'react'

import Table, { Row, Column, Header, HeaderColumn } from '../Table'
import TableRowControls from '../TableRowControls'
import TickIcon from '../../assets/img/tick_black.svg'

export default function UsersList({ users, deleteUser }) {
  function renderRow({ data: user, ...otherProps }) {
    const userId = user.get('user_id')

    function handleUserDelete() {
      if (window.confirm('Biztosan törölni akarja ezt a felhasználót?')) {
        deleteUser(userId)
      }
    }

    return (
      <Row key={userId}>
        <Column>
          {user.get('firstname')} {user.get('lastname')}
        </Column>
        <Column>{user.get('email')}</Column>
        <Column>
          {!!user.get('is_admin') ? <img src={TickIcon} alt="" /> : null}
        </Column>
        <Column>
          <TableRowControls
            editUrl={`/-/users/${userId}`}
            onDelete={handleUserDelete}
          />
        </Column>
      </Row>
    )
  }

  return (
    <Table data={users} renderRow={renderRow}>
      <Header>
        <HeaderColumn>Név</HeaderColumn>
        <HeaderColumn>E-mail</HeaderColumn>
        <HeaderColumn>Admin</HeaderColumn>
        <HeaderColumn />
      </Header>
    </Table>
  )
}
