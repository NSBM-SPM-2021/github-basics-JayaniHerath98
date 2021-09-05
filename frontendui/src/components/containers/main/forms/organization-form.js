import React, { useState } from 'react';
import { Field, Formik, Form, FormikConfig, FormikValues } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, FormControl, InputLabel, OutlinedInput, Button, Box, MenuItem, Select, FormHelperText, Divider, Grid } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import Organization from '../../../../models/Organization';
import organization_service from '../../../../services/organization_service';
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

export default function OrganizationMultiForm(){

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [info, setInfo] = useState('');
    const [contact, setContact] = useState('');
    const [contacts, setContacts] = useState([]);
    const [incharge, setIncharge] = useState('');
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
        if(address.length===0){
            setAddressError("Can't keep Address input field Empty");
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

    const contactValidationAdd = () => {
        if(contact.length!==10){
            setContactError("Entered Contact Number is incorrect");
            // isError = true;            
        } else {
            setContactError('');
            setContacts(contacts=>[...contacts, {title: contact}]);
        }
    }

    const onOrganizationSubmit = () => {
        var conlist = [];
        if(inputValidation()){alert("Need to Resubmit");return} else{
            contacts.forEach((contact)=>conlist.push(contact.title));
            console.log(conlist);
            var organization = new Organization(name, info, address, incharge, conlist, category);
            organization_service.addOrganization(organization);
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
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <OutlinedInput  id="name" value={name}  label="Name" name="name" 
                                onChange={(e)=>setName(e.target.value)}/>
                            </FormControl>
                            <small className="fm-invalid">{nameError}</small>
                            </Box>
                            <Box paddingBottom={2}>
                            <FormControl fullWidth variant="outlined"
                            error={infoError===''?false:true}>
                                <InputLabel htmlFor="info">Details</InputLabel>
                                <OutlinedInput  id="info" value={info}  label="Info" name="info"
                                onChange={(e)=>setInfo(e.target.value)}/>
                            </FormControl>
                            <small className="fm-invalid">{infoError}</small>
                            </Box>
                            <Box paddingBottom={2}>
                            <FormControl fullWidth variant="outlined"
                            error={addressError===''?false:true}>
                                <InputLabel htmlFor="address">Address</InputLabel>
                                <OutlinedInput  id="address" value={address}  label="Address" name="address" 
                                onChange={(e)=>setAddress(e.target.value)}/>
                            </FormControl>
                            <small className="fm-invalid">{addressError}</small>
                            </Box>
                            <Box paddingBottom={2}>
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <FormControl variant="outlined">
                                        <InputLabel htmlFor="contact">Contact</InputLabel>
                                        <OutlinedInput  id="contact" value={contact}  label="Contact" name="contact"
                                        onChange={(e)=>{setContact(e.target.value); console.log(e.target.value)}}/>
                                        <Button variant="contained" color="success"
                                        onClick={()=>{contactValidationAdd()}}>ADD</Button>
                                        <small className="fm-invalid">{contactError}</small>
                                    </FormControl>
                                    
                                </Grid>
                                <Grid item xs={6}>
                                    <Chips type="normal" color="primary" values={contacts} />
                                </Grid>
                            </Grid>
                            
                            </Box>
                            {/* <Box paddingBottom={2}>
                                <FormControl variant="outlined">
                                    <InputLabel htmlFor="contact">Contact</InputLabel>
                                    <OutlinedInput  id="contact" value={contact}  label="Contact" name="contact"
                                    onChange={(e)=>{setContact(e.target.value); console.log(e.target.value)}}/>
                                </FormControl>
                            </Box> */}
                            <Box paddingBottom={2}>
                            <FormControl fullWidth variant="outlined" className={classes.formControl}>
                                <InputLabel id="category-lb">Departments</InputLabel>
                                <Select
                                labelId="category-lb"
                                id="category"
                                value={category}
                                onChange={(e)=>setCategory(e.target.value)}
                                label="Category"
                                >
                                <MenuItem selected={true} value={"General"}>General</MenuItem>
                                </Select>
                            </FormControl>
                            <small className="fm-invalid">{categoryError}</small>
                            </Box>
                            {/* <Box paddingBottom={2}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="incharge">Incharge</InputLabel>
                                <OutlinedInput  id="incharge" value={incharge}  label="Incharge" name="incharge"
                                onChange={(e)=>setIncharge(e.target.value)}/>
                            </FormControl>
                            </Box>
                            <Box paddingBottom={2}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel htmlFor="parent">Parent</InputLabel>
                                <OutlinedInput  id="parent" value={parent}  label="Parent" name="parent" 
                                onChange={(e)=>setParent(e.target.value)}/>
                            </FormControl>
                            </Box> */}
                            <Divider/>
                            <Button variant="contained" color="primary" type="submit">SUBMIT</Button>
                        </form>
                        </div>
                        
                        
            
    );
}

// export function FormMultiSteps({children, ...props}){
//     const childrenArray = React.Children.toArray(children);
//     var [step, setStep] = useState(0);
//     const current = childrenArray[step];

//     const checkLast = () => {
//         return step === childrenArray.length-1;
//     }

//     const OrganizationSubmit = () => {
//         console.log("Values -")
//     }

//     return (
//         <Formik {...props} onSubmit={async (values, helpers)=>{
//             console.log("Submit Launched!");
//             if(checkLast()){
//                 await props.onSubmit(values, helpers);
//             } else {
//                 setStep(step=>step+1);
//             }
//         }}>
//             <Form autoComplete="off">
//                 {/* <Stepper alternativeLabel activeStep={step}>
//                     {childrenArray.map((label) => (
//                     <Step key={label}>
//                         <StepLabel>{label}</StepLabel>
//                     </Step>
//                     ))}
//                 </Stepper> */}
//                 {current}
//                 {step>0?<Button variant="contained" color="primary" margin={2} onClick={()=>setStep(step=>step-1)}>BACK</Button>:null}
//                 {step===1?<Button variant="contained" color="primary" type="submit">SUBMIT</Button>:<Button variant="contained" color="primary" onClick={()=>setStep(step=>step+1)}>NEXT</Button>}
                
//             </Form>
//         </Formik>
//     )
// }
