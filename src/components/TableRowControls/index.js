import React from 'react'
import { withRouter } from 'react-router-dom'
import './style.scss'

import IconButton from '../IconButton'
import EditIcon from '../../assets/img/edit.svg'
import DeleteIcon from '../../assets/img/delete.svg'

function TableRowControls({
  onEdit,
  onDelete,
  editUrl,
  deleteUrl,
  history,
  children,
}) {
  function handleEditClick() {
    if (typeof onEdit === 'function') {
      onEdit()
    }

    if (editUrl) {
      history.push(editUrl)
    }
  }
  function handleDeleteClick() {
    if (typeof onDelete === 'function') {
      onDelete()
    }

    if (deleteUrl) {
      history.push(editUrl)
    }
  }

  return (
    <div className="controls-container">
      {editUrl || onEdit ? (
        <IconButton
          src={EditIcon}
          className="edit-btn"
          onClick={handleEditClick}
        />
      ) : null}
      {deleteUrl || onDelete ? (
        <IconButton
          src={DeleteIcon}
          className="delete-btn"
          onClick={handleDeleteClick}
        />
      ) : null}
      {children}
    </div>
  )
}

export default React.memo(withRouter(TableRowControls))
