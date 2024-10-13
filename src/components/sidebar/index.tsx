import React from 'react'
import s from './sidebar.module.scss'
import { MyButton } from '../MyButton'

type TSidebar = {
  setSort: (sort: string) => void
}

export const Sidebar = ({setSort}: TSidebar) => {
  return (
    <div className={s.sidebar}>
      <h1>Сортирвка</h1>
      <MyButton onClick={() => setSort('city')} text='по городу' />
      <MyButton onClick={() => setSort('company')} text='по компании' />
    </div>
  )
}
