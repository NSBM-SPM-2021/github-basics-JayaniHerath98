import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const gradientSets = {
    primary:'#1B1464',
    secondary: '#FC427B',
    info: '#74b9ff',
    success: '#20bf6b',
    danger: '#eb3b5a',
    warning: '#f7b731',
};

// const gradientSets = {
//   primary:'linear-gradient(45deg, #1B1464 30%, #0652DD 90%)',
//   secondary: 'linear-gradient(45deg, #ED4C67 30%, #FDA7DF 90%)',
//   info: 'linear-gradient(45deg, #74b9ff 30%, #55efc4 90%)',
//   success: 'linear-gradient(45deg, #20bf6b 30%, #26de81 90%)',
//   danger: 'linear-gradient(45deg, #eb3b5a 30%, #fa8231 90%)',
//   warning: 'linear-gradient(45deg, #f7b731 30%, #f6e58d 90%)',
// };

const useStyles = makeStyles(theme=>({
  root: props=>({
    background: props.background||gradientSets.primary,
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 35,
    fontSize: '15px',
    padding: '0 10px',
    margin: '2px'
  }),

  ctbutton: {
    fontSize: 16,
    marginRight: '10px'
  }
}));

function colorFilter(color){
  if(color==="secondary"){
    return gradientSets.secondary;
  } else if(color==="info"){
    return gradientSets.info;
  } else if(color==="success"){
    return gradientSets.success;
  } else if(color==="danger"){
    return gradientSets.danger;
  } else if(color==="warning"){
    return gradientSets.warning;
  } else {
    return gradientSets.primary;
  }

}

export default function CustomButton(props) {
  const choice = colorFilter(props.color);
  const stColor = {background: choice};
  const classes = useStyles(stColor);
  return <Button className={classes.root} onClick={()=>props.onClick()}>{props.icon} {props.text}</Button>;
}
