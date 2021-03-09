import React from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import logo from '../../../assets/images/logo_lg.png'

const useStyle = createUseStyles({
  AppLogo: {  display: 'inline' },
  Logo: {
    maxWidth: '40px',
    display: 'inline-block',
    marginRight: '10px'
  },
  Text: {
    maxWidth: '40px',
    fontWeight: 'bold',
    color: 'white',
    fontSize: '22px'
  }
})

function AppLogo(props) {
  const classes = useStyle();
  return (
    <div >
      <Link to='/'>
        <img className={classes.Logo} src={logo} alt='Logo' />
      </Link>
    </div>
  )
}

export default AppLogo;

