import React, { useState } from 'react';
import '../components/containers/main/main.css';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Links from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../styles/login_style.js';
import User from '../models/User';
// import employee_service from '../services/officials_service';

function Copyright() {
    return (
        <Typography variant="body2"  color="textSecondary" align="center">
            {'Copyright © '}
            <Links color="inherit" href="https://material-ui.com/">
                Your Website
            </Links>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function SignUpSide() {
    const useStyles =  makeStyles(theme => (styles(theme)));
    const classes = useStyles();

    const [name, setName] = useState('');
    const [contact, setContact] = useState(''); 
    const [nic, setNic] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');

    const onUserSubmit = () => {
        if(password===cpassword){
            var user = new User(name, password, contact, nic, "NOT APPROVED");
            console.log(name, password, contact, nic, "NOT APPROVED");
            // employee_service.addOfficial(user);
        } else {

        }
        

    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <form className={classes.form} onSubmit={(e)=>{e.preventDefault(); onUserSubmit()}} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="contact"
                            label="Your Contact Number"
                            name="contact"
                            autoComplete="contact"
                            autoFocus
                            onChange = {(e)=>setContact(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="nic"
                            label="Your NIC Number"
                            name="nic"
                            // autoComplete="email"
                            autoFocus
                            onChange = {(e)=>setNic(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Your Name"
                            name="name"
                            // autoComplete="username"
                            autoFocus
                            onChange = {(e)=>setName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange = {(e)=>setPassword(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="cpassword"
                            label="Confirm Password"
                            type="password"
                            id="cpassword"
                            autoComplete="current-password"
                            onChange = {(e)=>setCPassword(e.target.value)}
                        />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/home" variant="body2">
                                    {"Already have an Account?"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
