import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Update } from '@material-ui/icons';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CustomButton from '../buttons/button';
import books_service from '../../../../services/books_service';
import EventEmitter from '../../../../utils/EventEmitter';
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '500px'
  },
}));

export default function BooksModalUpdate(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [nameError, setNameError] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onBookUpdate = () => {
    let obj = props.book;
    obj[name] = value;
    books_service.updateBook(props.book.id, obj);
    handleClose();
  }

  const handleChange = (event) => {
    setName(event.target.value);
  }


  useEffect(() => {
    const listner = EventEmitter.addListener("closeUpPopup", handleClose);
    return () => {
      listner.remove();
    }
  }, [])

  return (
    <div>
      <CustomButton className="btn btn-primary float-right" icon={(<Update />)} color="warning" onClick={handleOpen}></CustomButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <div label="Initial Details">
            <form className={classes.root} noValidate autoComplete="off" onSubmit={(e)=>{e.preventDefault(); onBookUpdate()}}>
                <h4>Submit Organization Information</h4>
                <Box paddingBottom={2}>
                  <FormControl fullWidth variant="outlined"
                    error={nameError===''?false:true}>
                      {/* <InputLabel htmlFor="name">Name of the Field</InputLabel>
                      <OutlinedInput  id="name" value={name}  label="Name" name="name" 
                        onChange={(e)=>setName(e.target.value)}/> */}
                      <InputLabel id="demo-simple-select-label">Name of the Field</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={name}
                        label="Name of the Field"
                        onChange={handleChange}
                      >
                        <MenuItem selected value={'name'}>Name of the Book</MenuItem>
                        <MenuItem value={'author'}>Author of the Book</MenuItem>
                        <MenuItem value={'published'}>Publisher of the Book</MenuItem>
                        <MenuItem value={'description'}>Description about the Book</MenuItem>
                      </Select>
                  </FormControl>
                  <small className="fm-invalid">{nameError}</small>
              </Box>
              <Box paddingBottom={2}>
                  <FormControl fullWidth variant="outlined"
                    error={nameError===''?false:true}>
                      <InputLabel htmlFor="value">Value Need to Update</InputLabel>
                      <OutlinedInput  id="value" value={value}  label="Name" name="value" 
                        onChange={(e)=>setValue(e.target.value)}/>
                  </FormControl>
                  <small className="fm-invalid">{nameError}</small>
              </Box>
              <Divider/>
              <Button variant="contained" color="primary" type="submit">SUBMIT</Button>
            </form>
          </div>
          </div>
        </Fade>
      </Modal>
      
    </div>
  );
}