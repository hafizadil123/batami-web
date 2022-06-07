/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { ChangePassword } from './components/ChangePassword';
const ChangePassword1 = () => (
  <Routes>
    <Route>
      <Route path='all' element={<ChangePassword />} />
    </Route>
  </Routes>
)

export { ChangePassword1 }
