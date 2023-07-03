import React, { createContext, useState } from "react";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}, 
			],
			agenda: '4geeks_agenda',
			name:"rodrigo",
			contacts: [
				{
					full_name: "Rodrigo",
					email: "almeida@gmail.com",
					agenda_slug: "ogirdor",
					address:"47568 NW 34ST, 33434 FL, USA",
					phone:"7864445566"
				}
			]
	
		},
		actions: {
			addContact: (contactObj) =>{
				const store = getStore();
				setStore({contacts: [...store.contacts,contactObj]})
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			sumTwoNumbers: (A,B) =>{
				console.log(A+B);
			},
			changeName:(newName) =>{
				setStore({name:newName})
				getActions().sumTwoNumbers(5,11)
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				const ContactContext = createContext();

				const ContactProvider = ({ children }) => {
				const [contacts, setContacts] = useState([]);

				const addContact = (newContact) => {
					setContacts([...contacts, newContact]);
				};

				return (
					<ContactContext.Provider value={{ contacts, addContact }}>
					{children}
					</ContactContext.Provider>
				);
				};


				//reset the global store
				setStore({ demo: demo });
			},
			changeAgenda: (newAgenda) =>{
				const store = getStore();
				setStore({
					...store,
					agenda: newAgenda
				})
			},
		}
	};
};

export default getState;
