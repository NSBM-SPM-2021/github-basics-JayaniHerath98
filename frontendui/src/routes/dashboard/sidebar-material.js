import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { ArrowBack} from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Details, House, Book, Settings, DevicesOther } from '@material-ui/icons';
import MapIcon from '@material-ui/icons/Map';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, ThemeProvider, createTheme } from '@material-ui/core/styles';
import { Route, Switch, NavLink, Link, useRouteMatch, useHistory } from 'react-router-dom';
import Users from './users';
import Main from './main';
import './dashboard.css';
import { Grid } from '@material-ui/core';
import Books from './books';

const drawerWidth = 270;

// const theme = createTheme({
//   typography: {
//     // Tell Material-UI what the font-size on the html element is.
//     htmlFontSize: 20,
//   },
// });

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: 16,
    display4: {
      fontSize: 16,
    },
    display3: {
      fontSize: 16,
    },
    display2: {
      fontSize: 16,
    },
    display1: {
      fontSize: 16,
    },
    headline: {
      fontSize: 16,
    },
    title: {
      fontSize: 16,
    },
    subheading: {
      fontSize: 16,
    },
    body2: {
      fontSize: 16,
    },
    body1: {
      fontSize: 16,
    },
    caption: {
      fontSize: 16,
    },
    button: {
      fontSize: 16,
    },
  },
  palette: {
    primary: {
      main: "#f00",
    },
    
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
      ListItemText: {
        fontSize: "1.6rem"
      }
    },
  },
  appBar: {
    color: 'red',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      ListItemText: {
        fontSize: "1.8rem"
      }
    },
  },
  menuButton: {
    marginRight: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  backButton: {
    marginRight: theme.spacing(4),
    
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },

  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
}));

function ResponsiveDrawer(props) {
  const {url, path} = useRouteMatch();
  const history = useHistory();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [currentTopic, setTopic] = useState('LIBRARY MANAGEMENT APP');
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <Divider/>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      {/* <span>LOGO</span> */}
      <Divider />
      <List>
        <Link to={url}>
        <ListItem button key={'DASHBOARD'} onClick={()=>setTopic('DASHBOARD')}>
            <ListItemIcon><Details /></ListItemIcon>
            <ListItemText primary={'Dashboard'} />
        </ListItem>
        </Link>
        <Link to={`${url}/books`}>
        <ListItem button key={'BOOKS'} onClick={()=>setTopic('BOOKS')}>
            <ListItemIcon><Book/></ListItemIcon>
            <ListItemText primary={'Books'} />
        </ListItem>
        </Link>
        <Link to={`${url}/lendings`}>
        <ListItem button key={'LENDINGS'} onClick={()=>setTopic('LENDINGS')}>
            <ListItemIcon><House /></ListItemIcon>
            <ListItemText primary={'Lendings'} />
        </ListItem>
        </Link>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} style={{ background: '#30336b'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={()=>{history.goBack(); setTopic("REPORTING APP")}}
            className={classes.backButton}
          >
            <ArrowBack color="secondary" style={{ fontSize: 25 }}/>
          </IconButton>
          <Typography variant="h5" noWrap style={{ color: "white", fontWeight: "500"}}>
           { currentTopic }
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="primary">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="primary">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="primary"
            >
              <AccountCircle />
            </IconButton>
          </div>

          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          
        </Toolbar>
      </AppBar>
      {renderMenu}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
      <div className={classes.toolbar}  />
      <Grid item xs={12}>
        <Switch>
                <Route path={path} exact component={Main}/>
                <Route path={`${path}/books`} component={Books}/>
                <Route path={`${path}/lendings`}exact component={Users}/>
        </Switch>
      </Grid>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;