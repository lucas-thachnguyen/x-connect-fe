import { yupResolver } from '@hookform/resolvers/yup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans } from 'react-i18next';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { createSelector } from 'reselect';
import * as yup from 'yup';
import { cleanUpError, startSignInAction } from '../duck/auth';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: '20vh',
    paddingBottom: '20vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const schema = yup.object().shape({
  email: yup.string().required(<Trans i18nKey='auth:message.emailRequire' defaults='Email is required' />),
  password: yup.string().required(<Trans i18nKey='auth:message.emailRequire' defaults='Password is required' />),
});

const SignInPage = (props) => {
  let history = useHistory();
  let classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema),
  });

  // Saga Action
  const { onSubmitSignIn, onCleanUpError } = props;

  // Action dispatcher when click [Sign-in] button
  const handleSubmitSignIn = (data) => {
    onSubmitSignIn(data);
  };


  // When user singed-in, redirect to Home page
  useEffect(() => {
    if (props.user.isAuthenticated) {
      history.push('/');
    }
    return () => {
      onCleanUpError();
    };
  }, [props.user.isAuthenticated]);

  // Validate response error from store
  useEffect(() => {
    if (props.user.authErrors && Object.keys(props.user.authErrors).length > 0) {
      for (let key in props.user.authErrors.fields ) {
        setError(key, {
          type: "manual",
          message: props.user.authErrors.fields[key]
        })
      }
      if (props.user.authErrors.common) {
        enqueueSnackbar(props.user.authErrors.common)
      }
    }
  }, [props.user.authErrors]);

  return (
    <div>
      <Container component='main' maxWidth='xs'>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component='h1' variant='h5'>
            <Trans i18nKey='auth:form.signinTitle' defaults='Sign in'></Trans>
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(handleSubmitSignIn)}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email'
              name='email'
              autoComplete='false'
              autoFocus
              inputRef={register}
              helperText={errors.email ? errors.email.message : ''}
              error={!!errors.email}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label={<Trans i18nKey='auth:form.password' defaults='Password' />}
              type='password'
              id='password'
              autoComplete='current-password'
              inputRef={register}
              helperText={errors.password ? errors.password.message : ''}
              error={!!errors.password}
            />

            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              <Trans i18nKey='auth:form.signin' defaults='Sign in' />
            </Button>
            <Grid container>
              <Grid item xs>
                <Button>
                  <Link to='/forgot-password'>
                    <Trans i18nKey='auth:form.forgotPassword' defaults='Forgot password' />
                  </Link>
                </Button>
              </Grid>
              <Grid item>
                <Trans i18nKey='auth:form.dontHaveAccount' defaults="Dont'have an account?" />
                <Link to='/auth/sign-up'>
                  <Button>
                    <Trans i18nKey='auth:form.signup' defaults='Sign up' />
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

/** Reduct Connector
 * Setup selector, mapDisPatchToProps, mapDisPatchToProps
 */
const userSelector = createSelector([(state) => state.user], (state) => state);

const mapStateToProps = (state) => {
  return {
    user: userSelector(state),
  };
};

const mapDisPatchToProps = (dispatch) => {
  return {
    onSubmitSignIn: (userData) => dispatch(startSignInAction(userData)),
    onCleanUpError: () => dispatch(cleanUpError()),
  };
};

/** Export Connector */
export default connect(mapStateToProps, mapDisPatchToProps)(SignInPage);
