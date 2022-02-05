import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CartIcon from '../CartIcon/CartIcon';

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: '#00121b',
    paddingRight: '79px',
    paddingLeft: '118px',
    '@media (max-width: 900px)': {
      paddingLeft: 0,
    },
  },
  logo: {
    fontFamily: 'Work Sans, sans-serif',
    fontWeight: 600,
    color: '#FFFEFE',
    textAlign: 'left',
  },
  menuButton: {
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    size: '18px',
    marginLeft: '38px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  drawerContainer: {
    padding: '20px 30px',
  },
  menuLinksWeb: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textDecoration: 'none',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: 700,
    '@media (max-width: 420px)': {
      display: 'block',
    },
    '@media (max-width: 900px)': {
      display: 'block',
    },
  },
}));

export default function Header() {
  const { header, logo, menuButton, toolbar, drawerContainer, menuLinksWeb } =
    useStyles();

  // let { totalItems } = useCart();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener('resize', () => setResponsiveness());

    return () => {
      window.removeEventListener('resize', () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={toolbar}>
        {femmecubatorLogo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: 'start',
            color: 'inherit',
            'aria-label': 'menu',
            'aria-haspopup': 'true',
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: 'left',
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div>{femmecubatorLogo}</div>
      </Toolbar>
    );
  };
  let loggedUser = localStorage.getItem('loggedUser');

  const getDrawerChoices = () => {
    return (
      <div className={menuLinksWeb}>
        <Link
          {...{
            color: 'inherit',
            to: '/',
            component: RouterLink,
            className: menuButton,
          }}
        >
          <MenuItem>Home</MenuItem>
        </Link>
        <Link
          {...{
            color: 'inherit',
            to: '/shop',
            component: RouterLink,
            className: menuButton,
          }}
        >
          <MenuItem>Shop</MenuItem>
        </Link>
        <Link
          {...{
            color: 'inherit',
            to: '/services',
            component: RouterLink,
            className: menuButton,
          }}
        >
          <MenuItem>Services</MenuItem>
        </Link>
        <Link
          {...{
            color: 'inherit',
            to: '/cart',
            component: RouterLink,
            className: menuButton,
          }}
        >
          <MenuItem>Cart</MenuItem>
        </Link>
        {loggedUser ? (
          <Link
            {...{
              color: 'inherit',
              to: '/profile',
              component: RouterLink,
              className: menuButton,
            }}
          >
            <MenuItem>Profile</MenuItem>
          </Link>
        ) : (
          <Link
            {...{
              color: 'inherit',
              to: '/login',
              component: RouterLink,
              className: menuButton,
            }}
          >
            <MenuItem>Login</MenuItem>
          </Link>
        )}
      </div>
    );
  };
  const femmecubatorLogo = (
    <Typography variant="h6" component="h4" className={logo}>
      <Link
        {...{
          color: 'inherit',
          to: '/',
          component: RouterLink,
        }}
      >
        <img src={'/logo192.png'} alt="sky-tech" style={{ width: '100px' }} />
      </Link>
    </Typography>
  );

  const getMenuButtons = () => {
    return getDrawerChoices();
  };

  return (
    <header>
      <AppBar className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
