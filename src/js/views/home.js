import React, { useContext, useEffect, useState } from "react";
import "../../styles/home.css";
import Contact from "../component/contact.js";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const Home = () => {
	const {store,action}= useContext(Context);
	console.log(store.name);
	

	return(
	<div className="text-center mt-5 d-flex justify-content-center">
		<Contact/>
	</div>
)};
