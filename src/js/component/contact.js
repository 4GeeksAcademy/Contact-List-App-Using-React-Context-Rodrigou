import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import EditContact from "./editcontact";

const Contact =()=>{
    const {store, actions} = useContext(Context);
    const [contactList, setContactList] = useState([])
    const navigate = useNavigate()
    console.log(contactList);

    useEffect (()=>{
        fetchContacts()
    },[])
   
    const fetchContacts =()=>{
        fetch('https://assets.breatheco.de/apis/fake/contact/agenda/' + store.agenda,{
            method: "GET",
			headers: {
				"Content-Type": "application/json"
            }
        })
        .then(resp => {
        console.log(resp.ok);
        console.log(resp.status);
        console.log(resp);
        return resp.json();
         })
        .then(data => {
            console.log(data);
			setContactList(data);
         })
        .catch(error => {
            console.log('Looks like there was a problem: \n', error);    
        });
    }
    const deleteContact = (contactId) => {
        const confirmed = window.confirm("Are you sure you want to delete the contact?");
        if (confirmed) {
		fetch('https://assets.breatheco.de/apis/fake/contact/' + contactId, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
        })
		.then(resp => {
			console.log(resp.ok);
			console.log(resp.status); 
			console.log(resp); 
			return resp.json();
		})
		.then(data => {
			console.log(data);
			alert('Successfully Deleted Contact!')
			fetchContacts();
		})
		.catch(error => {
			console.log(error);
    	});
	}}
    const showContacts =()=>{
        return contactList.map((item,index)=>{
            return(
                <li key={index} className="list-group-item d-flex justify-content-between">
                    <div>
                        <Link to={'/contact/'+item.id}><h3>{item.full_name}</h3></Link>
                        <p>{item.email}</p>
                    </div>
                    <div className=" mt-4">
                            <button className="btn btn-light me-3" onClick={() => navigate('/edit/'+item.id)}>
                                    Edit Contact
                            </button>
                        <button className="btn btn-light" id="btn2" onClick={() => deleteContact(item.id)}>
                                Delete Contact
                        </button>
                    </div>
                </li>
            )
        })
    }
    return(
        <div>
            <h1>Contact list by Rodrigo</h1>
            <div className="card mycard">
                <div className="d-flex align-self-end me-4">
                    <Link to="/addcontact">
                    <button type="button" id="btn1" className="btn mt-3"><strong>Add Contact</strong></button>
                    </Link>
                </div>
                <div className="card-body">
                    <div className="card mycard2">
                        <div className="card-body">   
                            <ul className="list-group mt-4">
                                {showContacts()}
                            </ul>                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Contact