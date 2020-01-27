import React from 'react'

import Modal from '@material-ui/core/Modal'
import { useDispatch } from 'react-redux'

import * as ModalActions from '../redux/actions/modal'

function CustomModal ({ ...props }) {
  const dispatch = useDispatch()
  return <Modal open onClose={() => dispatch(ModalActions.closeModal())} {...props} />
}

export default CustomModal

export { ModalActions }
