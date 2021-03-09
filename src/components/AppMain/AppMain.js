import React from 'react';
import { node } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  AppMain: {
    minHeight: '50vh'
  }
}));

function AppMain({ children }) {
  let classes = useStyles()
  return (
    <main className={classes.AppMain}>
      {children}
    </main>
  );
}

AppMain.propTypes = {
  children: node.isRequired,
};

export default AppMain;
