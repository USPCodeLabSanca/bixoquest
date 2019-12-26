import React from 'react'
import BookIcon from '@material-ui/icons/ImportContacts'
import StyleIcon from '@material-ui/icons/Style'

const style = {
  root: 'h-16 shadow-lg w-full flex justify-around items-center bg-secondary text-white text-2xl',
  item: 'flex items-center justify-between',
  icon: 'mr-2'
}
// TODO - pull info from backend
export default function Header () {
  return (
    <header className={style.root}>
      <div className={style.item}><BookIcon className={style.icon} />09/32</div>
      <div className={style.item}><StyleIcon className={style.icon} />098/320</div>
    </header>
  )
}
