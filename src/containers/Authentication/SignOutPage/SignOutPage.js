import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startSignOutAction } from '../duck/auth'

function SignOutPage() {
  const dispatch = useDispatch();
  dispatch(startSignOutAction());
  return (
    <div>  
      <Redirect to='/' />
    </div>
  )
}

export default SignOutPage;
