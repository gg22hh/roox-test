import React from 'react'
import s from './userCard.module.scss'
import { Link } from 'react-router-dom'

type IUserCard = {
  name: string,
  city: string,
  company: string,
  id: number
}

export const UserCard = ({name, city, company, id}: IUserCard) => {
  return (
    <div className={s.card}>
      <ul className={s.card__info}>
        <li>ФИО: <span>{name}</span></li>
        <li>город: <span>{city}</span></li>
        <li>компания: <span>{company}</span></li>
      </ul>
      <Link to={`/user/${id}`} className={s.card__button}>Подробнее</Link>
    </div>
  )
}
