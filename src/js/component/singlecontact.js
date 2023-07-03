import React, { useEffect, useState } from "react";
import "../../styles/home.css";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const SingleContact =()=>{

    const params = useParams();
    const [contact,setContact] = useState();

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
            setContact(data)
		})
        .catch(error => {
            console.log('Looks like there was a problem: \n', error);
        });
    }

    return(
        <div className="single text-center mt-5">
            <h1>Contact</h1>
                    <Link className="lnk d-flex" to="/">
                        <button type="button" className="btn btn-light mt-3">Back to contacts</button>
                    </Link>
            {contact ?(
                <div className="d-flex justify-content-center">
                    <div className="SingleContact">
                        <div>Name:
                        <h2>{contact.full_name}</h2>
                        </div>
                        <div>Email:
                        <h2 className="mt-4">{contact.email}</h2>
                        </div>
                        <div>Phone:
                        <h2 className="mt-4">{contact.phone}</h2>
                        </div>
                        <div>Address:
                        <h2 className="mt-4">{contact.address}</h2>
                        </div>
                        <div>From:
                        <h2 className="mt-4">{contact.agenda_slug}</h2>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            )}
        </div>
    )
}

export default SingleContact