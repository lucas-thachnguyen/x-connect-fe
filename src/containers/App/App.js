import React from 'react';
import { Switch, Route } from 'react-router-dom';

/** Layout UI */
import Box from '@material-ui/core/Box';

import Navbars from '../Navbar/Navbar';

import AppMain from '../../components/AppMain/AppMain';
import Footer from  '../../components/AppUI/Footer/Footer';

import HomePage from '../HomePage/HomePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

import SignInPage from '../Authentication/SignInPage/SignInPage';
import SignUpPage from '../Authentication/SignUpPage/SignUpPage';
import SignOutPage from '../Authentication/SignOutPage/SignOutPage';
function App() {
  return (
    <Box maxWidth={'100%'}>
      <Navbars />
      <AppMain>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/auth/sign-in" component={SignInPage} />
          <Route exact path="/auth/sign-up" component={SignUpPage} />
          <Route exact path="/auth/sign-out" component={SignOutPage} />
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </AppMain>  
      <Footer />
    </Box>
  );
}

export default App;
