import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  root: {
    border: 0,
    borderRadius: 3,
    color: 'black',
    fontSize: '20px',
    height: 48,
    padding: '0 30px',
    margin: '4px'
  },
});

export default function CustomListItem() {
  const classes = useStyles();
  return <ListItemText className={classes.root}>Menu Item</ListItemText>;
}
