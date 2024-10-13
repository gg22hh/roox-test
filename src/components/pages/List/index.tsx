import React, { useEffect, useState } from 'react'
import s from './list.module.scss'
import { UserCard } from '../../UserCard'
import { useDispatch, useSelector } from '../../../services/store'
import { getIsLoading, getUsers, getUsersSelector } from '../../../services/slices/Users'
import { TUser } from '../../../utils/types'

type TList = {
  sort: string
}

export const List = ({sort}: TList) => {
  const [users, setUsers] = useState<TUser[]>([])
  const usersData = useSelector(getUsersSelector)
  const isLoading = useSelector(getIsLoading)

  useEffect(() => {
    setUsers(usersData)
  }, [usersData])

  useEffect(() => {
    if (sort === 'city') {
      const sortedUsers = [...users].sort((a: TUser, b: TUser) => {
        return a.address.city.localeCompare(b.address.city);
      });
      setUsers(sortedUsers)
    } else if (sort === 'company') {
      const sortedUsers = [...users].sort((a: TUser, b: TUser) => {
        return a.company.name.localeCompare(b.company.name);
      });
      setUsers(sortedUsers)
    }
  }, [sort])

  const usersList = users.map(user => {
    return <UserCard
      key={user.id}
      id={user.id}
      name={user.name}
      city={user.address.city}
      company={user.company.name}
    />
  })

  return (
    <div className={s.list}>
      <h1 className={s.list__title}>Список пользователей</h1>
      <div className={s.list__container}>
        {isLoading ? <div>Загрузка пользователей...</div> : usersList}
      </div>
    </div>
  )
}
