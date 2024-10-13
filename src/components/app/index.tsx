import React, { useEffect, useState } from 'react';
import './app.css';
import { Sidebar } from '../sidebar';
import { Routes, Route } from 'react-router-dom';
import { List } from '../pages/List';
import { User } from '../pages/User';
import { useDispatch } from '../../services/store';
import { getUsers } from '../../services/slices/Users';

function App() {
  const [sort, setSort] = useState('')
  const dispacth = useDispatch()

  useEffect(() => {
    dispacth(getUsers())
  }, [])

  return (
    <div className="App">
      <Sidebar setSort={setSort} />
      <Routes>
        <Route path='/' element={<List sort={sort} />} />
        <Route path='/user/:id' element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
