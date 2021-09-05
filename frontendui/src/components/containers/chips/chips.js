import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  // override: {
  //   MuiChip: {
  //     root:
  //   }
  // },
  root: props=>({
    display: 'flex',
    color: props.background||gradientSets.primary,
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  }),
}));

const gradientSets = {
  primary:'#1B1464',
  secondary: '#FC427B',
  info: '#74b9ff',
  success: '#20bf6b',
  danger: '#eb3b5a',
  warning: '#f7b731',
};

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

export default function Chips(props) {
  const classes = useStyles();

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <div className={classes.root}>
      {
        props.type==='normal'?
        props.values.map((element)=><ChipNormal values={element}/>)
        :
        props.type==='tag'?
        props.values.map((element)=><ChipTag values={element}/>)
        :
        null
      }
      {/* <Chip label={props.values[0].title}  onClick={props.onClick}/>
      
      <Chip label="Clickable Link" component="a" href={props.values[0].link} clickable />
      
      <Chip label="Deletable primary" onDelete={handleDelete} color="primary" /> */}
      
    </div>
  );
}

export const ChipNormal = (props) => {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };
  return (
    <>
    <Chip label={props.values.title} onDelete={handleDelete} color="primary" />
    </>
  );
}

export const ChipTag = (props) => {
  const choice = colorFilter(props.color);
  const stColor = {background: choice};
  const classes = useStyles(stColor);
  return (
    <>
    {
      props.values.disable?
      <Chip className={classes.root} label={props.values[0].title}  onClick={props.onClick}/>
      :
      <Chip className={classes.root} label={props.values.title} component="a" href={props.values.link||'/'} clickable/>
    }
    
    </>
  );
}