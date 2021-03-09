import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppLogo from '../../components/AppUI/Logo/AppLogo';
import AuthedNav from './AuthedNav';
import NavDefault from './DefaultNav';
import { authedStyle } from './styles';

function Navbar(props) {
  const { isAuthenticated } = props;
  const classes = authedStyle();

  return (
    <React.Fragment>
      <div className={classes.grow}>
        <AppBar position="fixed">
          <Toolbar>
            <AppLogo />
            <Link to='/'>
              <Typography className={classes.title} variant="h6" noWrap>
                X-Connection
              </Typography>
            </Link>

            <div className={classes.search}>
            </div>
            <div className={classes.grow} />
            {isAuthenticated ? <AuthedNav {...props} /> : <NavDefault {...props} />}
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
}

export const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    profile: state.user.profile,
  };
};

export default connect(mapStateToProps, null)(Navbar);
