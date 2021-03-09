import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useState } from 'react';
import { Trans } from 'react-i18next';
import { authedStyle } from './styles';
import { ListItemIcon } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';

export default function AuthedNav(props) {
  const classes = authedStyle();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const history = useHistory();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push(e.currentTarget.dataset.link)
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleNavigationLink = (e) => {
    history.push(e.currentTarget.dataset.link)
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose} data-link='/profile'>
        <ListItemIcon>
          <ContactPhoneIcon />
        </ListItemIcon>        
        <Trans i18nKey='common:menu:profile' defaults='Profile' />
      </MenuItem>        
      <MenuItem onClick={handleMenuClose} data-link='/setting'>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <Trans i18nKey='common:menu:setting' defaults='Setting' />
      </MenuItem>      
      <MenuItem onClick={handleMenuClose} data-link='/auth/sign-out'>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <Trans i18nKey='auth:signOut' defaults='Sign out' />
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem onClick={handleNavigationLink} data-link='/notifications'>
        <IconButton aria-label='' color='inherit'>
          <Badge badgeContent={0} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p><Trans i18nKey='common:menu:notification' defaults='Notification' /></p>
      </MenuItem>
      <MenuItem onClick={handleNavigationLink} data-link='/profile'>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'>
          <ContactPhoneIcon />
        </IconButton>
        <p><Trans i18nKey='common:menu:profile' defaults='Profile' /></p>
      </MenuItem>      
      <MenuItem onClick={handleNavigationLink} data-link='/setting'>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'>
          <SettingsIcon />
        </IconButton>
        <p><Trans i18nKey='common:menu:setting' defaults='Setting' /></p>
      </MenuItem>
      <MenuItem onClick={handleNavigationLink} data-link='/auth/sign-out'>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'>
          <ExitToAppIcon />
        </IconButton>
        <p><Trans i18nKey='auth:signOut' defaults='Sign out' /></p>
      </MenuItem>

    </Menu>
  );

  return (
    <div>
      <div className={classes.sectionDesktop}>
        <IconButton aria-label='show 17 new notifications' color='inherit'>
          <Badge badgeContent={0} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          edge='end'
          aria-label='account of current user'
          aria-controls={menuId}
          aria-haspopup='true'
          onClick={handleProfileMenuOpen}
          color='inherit'>
          <AccountCircle />
        </IconButton>
      </div>
      <div className={classes.sectionMobile}>
        <IconButton
          aria-label='show more'
          aria-controls={mobileMenuId}
          aria-haspopup='true'
          onClick={handleMobileMenuOpen}
          color='inherit'>
          <MoreIcon />
        </IconButton>
      </div>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
