import React from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { authedStyle } from './styles';

export default function NavDefault() {
  const classes = authedStyle();

  return (
    <div>
      <div className={classes.sectionDesktop}>
        <Link to='/auth/sign-up'>
          <Button  variant="contained" color="primary" disableElevation>
            <Trans i18nKey='auth:signUp' defaults='Sign up' />
          </Button>
        </Link>
        <Link to='/auth/sign-in'>
          <Button variant="contained" color="primary" disableElevation>
            <Trans i18nKey='auth:signIn' defaults='Sign in' />
          </Button>
        </Link>
      </div>
      <div className={classes.sectionMobile}>
        <Link to='/auth/sign-up'>
          <Button  variant="contained" color="primary" disableElevation>
            <Trans i18nKey='auth:signUp' defaults='Sign up' />
          </Button>
        </Link>
        <Link to='/auth/sign-in'>
          <Button variant="contained" color="primary" disableElevation>
            <Trans i18nKey='auth:signIn' defaults='Sign in' />
          </Button>
        </Link>
      </div>
    </div>
  )
}
