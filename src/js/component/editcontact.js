import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, Navigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const EditContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const params = useParams()
    console.log('I will change this ID'+params.id);

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        fetchSingleContact();
    },[])
    
    const fetchSingleContact =()=>{
        fetch('https://assets.breatheco.de/apis/fake/contact/' + params.id, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
        })
        .then(resp => {
			console.log(resp.ok); // will be true if the response is successfull
			console.log(resp.status); // the status code = 200 or code = 400 etc.
			console.log(resp); // will try return the exact result as string
			return resp.json();
        })
        .then(data => {
			console.log(data); //this will print on the console the exact object received from the server
            setFullName(data.full_name);
            setEmail(data.email);
            setPhone(data.phone);
            setAddress(data.address);
		})
        .catch(error => {
            console.log('Looks like there was a problem: \n', error);
        });
    }
    const onSubmit = () => {
        if (fullName === "") {
            alert("Enter Full Name!");
        } else if (email === "" || !email.includes("@")) {
            alert("Enter Correct Email!");
        } else if (phone === "" || phone.length !== 10) {
            alert("Enter Correct Phone Number!");
        } else if (address === "") {
            alert("Enter Address!");
        } else {
            const contact = {
                full_name: fullName,
                email: email,
                agenda_slug: store.agenda,
                address: address,
                phone: phone
            };

            fetch("https://assets.breatheco.de/apis/fake/contact/"+params.id, {
                method: "PUT",
                body: JSON.stringify(contact),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => {
                    console.log(resp.ok); // will be true if the response is successful
                    console.log(resp.status); // the status code = 200 or code = 400 etc.
                    console.log(resp); // will try return the exact result as string
                    return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
                })
                .then(data => {
                    console.log(data);
                    setFullName("");
                    setEmail("");
                    setPhone("");
                    setAddress("");
                    alert("Successfully Updated Contact!");
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    return(
        <div className="d-flex justify-content-center">
        <div className="cardaddcontact" style={{backgroundColor:"white"}}>
            <div className="ms-5">
                <h1 className="fh1">Edit Contact</h1>
                <Link className="lnk" to="/">
                <button type="button" className="btn btn-light mt-3">Back to contacts</button>
                </Link>
                <div className="mb-3 me-5 mt-4">
                    <label for="formGroupExampleInput" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" value={fullName} onChange={(e)=> setFullName(e.target.value)} placeholder="Full Name"/>
                </div>
                <div className="mb-3 me-5">
                    <label for="formGroupExampleInput2" className="form-label">Email</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter email"/>
                </div>
                <div className="mb-3 me-5">
                    <label for="formGroupExampleInput2" className="form-label">Phone number</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder="Enter phone number"/>
                </div>
                <div className="mb-3 me-5">
                    <label for="formGroupExampleInput2" className="form-label">Address</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" value={address} onChange={(e)=> setAddress(e.target.value)} placeholder="Enter adress"/>
                </div>
                <button onClick={onSubmit} type="submit" class="btn btn-primary">Update</button>                
            </div>
        </div>
    </div>
    )
}
export default EditContact