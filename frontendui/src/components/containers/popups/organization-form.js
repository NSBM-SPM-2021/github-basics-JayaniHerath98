import React, { useEffect, useState } from 'react';
import './popup.css';
import EventEmitter from '../../../utils/EventEmitter';
import organization_service from '../../../services/organization_service';
import Organization from '../../../models/Organization';

const OrganizationForm = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [info, setInfo] = useState('');
    const [contact, setContact] = useState('');
    const [incharge, setIncharge] = useState('');
    const [category, setCategory] = useState('');
    const [parent, setParent] = useState('');

    const [categories, setCategories] = useState([]);

    const loadCategories = () => {
        setCategories([{catid: "60c7c4fb2335833fac709744", name: "Social"}]);
    }

    const organizationSubmit = () => {
        console.log("category - "+category);
        // Select Category
        var selected = "";
        categories.forEach((cat)=> {
            if(cat.catid===category){
                console.log(cat);
                selected = cat;
                
            }
        });

        if(selected===""){
            selected = {catid: "60c7c4fb2335833fac709744", name: "Social"};
        }

        // var categoryex = {catid: "60c7c4fb2335833fac709744", name: "Social"};
        console.log(JSON.parse(JSON.stringify(category)));
        var organization = new Organization(name, info, address, incharge, contact, selected);
        organization_service.addOrganization(organization);
    }

    const closeLogPannel = () => {
        EventEmitter.emit("closePannel", {close:true});
    }

    useEffect(() => {
        loadCategories();
        return () => {
            
        }
    }, []);

    return (
        <>
            <div className="ct-popup-box">
                <div className="ct-close" onClick={closeLogPannel} >CLOSE</div>

                            <div className="ct-pupup-head text-center">

                                <h1 className="ct-font-secondary">Add Organization</h1>
                                <p>Use this form to establish new organization within portal.</p>

                                </div>

                                <div className="ct-popup-body text-left ct-flex">

                                <div className="form-col">
                                
                                    <div class="form-group">
                                        <label for="name">Organization Name</label>
                                        <input type="text" class="form-control" id="name" placeholder="eg: RDA South"
                                        onChange={(event)=>setName(event.target.value)}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="address">Address</label>
                                        <input type="text" class="form-control" id="address" placeholder="eg: 5B, Colombo 5, Colombo"
                                        onChange={(event)=>setAddress(event.target.value)}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="info">Organization Description</label>
                                        <textarea class="form-control" id="info" rows="5"
                                        onChange={(event)=>setInfo(event.target.value)}></textarea>
                                    </div>
                                    <div class="form-row align-items-center">
                                        <div class="col-auto">
                                        <label class="sr-only" for="contact">Contact No.</label>
                                        <input type="text" class="form-control mb-2" id="contatct" placeholder="Contact Number"
                                        onChange={(event)=>setContact(event.target.value)}/>
                                        </div>
                                        <div class="col-auto">
                                        <button  class="btn btn-primary mb-2">Add</button>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="incharge">Inharge</label>
                                        <input type="email" class="form-control" id="incahrge" placeholder="Select from Users"
                                        onChange={(event)=>setIncharge(event.target.value)}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="category">Organization Category</label>
                                        <select class="form-control" id="category"
                                        onChange={(event)=>setCategory(event.target.value)}>
                                        {
                                            categories&&categories.length>0?categories.map((cat)=><option value={cat.catid}>{cat.name}</option>)
                                            :<></>
                                        }
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="parent">Parent Organization</label>
                                        <select class="form-control" id="parent"
                                        onChange={(event)=>setParent(event.target.value)}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        </select>
                                    </div>
                                    
                                    <div className="text-center">
                                    <button type="submit" class="btn btn-success" onClick={organizationSubmit}>CREATE</button>
                                    </div>
                                
                                </div>

                                <div className="ct-flex-br">
                                |
                                </div>
                                        
                                        
                                <div className="form-col">
                                <h1 className="ct-font-secondary">Do You Know?</h1>
                                <p className="ct-font-secondary">Are you an institution looking to create a happier community? We have helped colleges, corporates, incubators, government bodies in building emotionally resilient communities of more than 2 million people.</p>
                                <p className="ct-font-secondary">Haven't got an <a href="#" onClick={()=>{}}>Account</a>?</p>
                                </div>



                            </div>
            </div>
        
        </>
    );
}

export default OrganizationForm;
