import React, { useState } from 'react';
import { Field, Formik, Form, FormikConfig, FormikValues } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, FormControl, InputLabel, OutlinedInput, Button, Box, MenuItem, Select, FormHelperText, Divider, Grid } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import Book from '../../../../models/Book';
import books_service from '../../../../services/books_service';
import Chips from '../../chips/chips';
import EventEmitter from '../../../../utils/EventEmitter';
import './forms.css';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

export default function BooksMultiForm(){

    const [name, setName] = useState('');
    const [qty, setQty] = useState(1);
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState('');
    const [info, setInfo] = useState('');
    const [category, setCategory] = useState('');
    const [parent, setParent] = useState('');

    // Error Messages 
    var [nameError, setNameError] = useState('');
    var [addressError, setAddressError] = useState('');
    var [infoError, setInfoError] = useState('');
    var [contactError, setContactError] = useState('');
    var [inchargeError, setInchargeError] = useState('');
    var [categoryError, setCategoryError] = useState('');
    var [parentError, setParentError] = useState('');

    const [categories, setCategories] = useState([]);

    const {register, handleSubmit} = useForm();

    const classes = useStyles();

    const inputValidation = () => {
        let isError = false;
        if(name.length===0){
            setNameError("Can't keep Name input field Empty");
            isError = true;            
        } else {
            setNameError('');
        }
        if(info.length===0){
            setInfoError("Can't keep Address input field Empty");
            isError = true;
        } else {
            setInfoError('');
        }
        if(author.length===0){
            setAddressError("Can't keep Author input field Empty");
            isError = true;
        } else {
            setAddressError('');
        }
        // if(contact.length===10){
        //     setContactError("Can't keep Name input field Empty");
        //     isError = true;            
        // } else {
        //     setContactError('');
        // }
        console.log(isError);
        return isError;
    }

    // const contactValidationAdd = () => {
    //     if(contact.length!==10){
    //         setContactError("Entered Contact Number is incorrect");
    //         // isError = true;            
    //     } else {
    //         setContactError('');
    //         setContacts(contacts=>[...contacts, {title: contact}]);
    //     }
    // }

    const onOrganizationSubmit = () => {
        if(inputValidation()){alert("Need to Resubmit");return} else{
            
            var book = new Book(name, info, author, published, 5, category);
            books_service.addBook(book);
        }
        EventEmitter.emit("closePopup", {close:true});
    }

    return(
        
                        <div label="Initial Details">
                        <form className={classes.root} noValidate autoComplete="off" onSubmit={(e)=>{e.preventDefault(); onOrganizationSubmit()}}>
                            <h4>Submit Organization Information</h4>
                            <Box paddingBottom={2}>
                            <FormControl fullWidth variant="outlined"
                            error={nameError===''?false:true}>
                                <InputLabel htmlFor="name">Name of the Book</InputLabel>
                                <OutlinedInput  id="name" value={name}  label="Name" name="name" 
                                onChange={(e)=>setName(e.target.value)}/>
                            </FormControl>
                            <small className="fm-invalid">{nameError}</small>
                            </Box>
                            <Box paddingBottom={2}>
                            <FormControl fullWidth variant="outlined"
                            error={infoError===''?false:true}>
                                <InputLabel htmlFor="info">Descrription on Book</InputLabel>
                                <OutlinedInput  id="info" value={info}  label="Info" name="info"
                                onChange={(e)=>setInfo(e.target.value)}/>
                            </FormControl>
                            <small className="fm-invalid">{infoError}</small>
                            </Box>
                            <Box paddingBottom={2}>
                            <FormControl fullWidth variant="outlined"
                            error={addressError===''?false:true}>
                                <InputLabel htmlFor="author">Author of Book</InputLabel>
                                <OutlinedInput  id="author" value={author}  label="Author" name="author" 
                                onChange={(e)=>setAuthor(e.target.value)}/>
                            </FormControl>
                            <small className="fm-invalid">{addressError}</small>
                            </Box>
                            <Box paddingBottom={2}>
                            <FormControl fullWidth variant="outlined"
                            error={addressError===''?false:true}>
                                <InputLabel htmlFor="publisher">Publisher of Book</InputLabel>
                                <OutlinedInput  id="publisher" value={published}  label="Publisher" name="publisher" 
                                onChange={(e)=>setPublished(e.target.value)}/>
                            </FormControl>
                            <small className="fm-invalid">{addressError}</small>
                            </Box>
                            <Box paddingBottom={2}>
                            <FormControl fullWidth variant="outlined"
                            error={addressError===''?false:true}>
                                <InputLabel htmlFor="qty">QTY</InputLabel>
                                <OutlinedInput  id="qty" value={qty}  label="QTY" name="qty" 
                                onChange={(e)=>setQty(e.target.value)}/>
                            </FormControl>
                            <small className="fm-invalid">{addressError}</small>
                            </Box>
                            <Box paddingBottom={2}>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="category-lb">Choose Category</InputLabel>
                                <Select
                                labelId="category-lb"
                                id="category"
                                value={category}
                                onChange={(e)=>setCategory(e.target.value)}
                                label="Category"
                                >
                                <MenuItem selected={true} value={"General"}>General</MenuItem>
                                <MenuItem value={"Novel"}>Novel</MenuItem>
                                <MenuItem value={"Short Stories"}>Short Stories</MenuItem>
                                <MenuItem value={"Documetries"}>Documetries</MenuItem>
                                <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                                </Select>
                            </FormControl>
                            <small className="fm-invalid">{categoryError}</small>
                            </Box>
                            <Divider/>
                            <Button variant="contained" color="primary" type="submit">SUBMIT</Button>
                        </form>
                        </div>
                        
                        
            
    );
}
