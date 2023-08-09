import React, { useState, useEffect } from "react";
import Phonebook from "components/Phonebook/Phonebook";
import Contacts from "components/Contacts/Contacts";
import Filter from "components/Filter/Filter"

const localStorageContactsKey = "contacts";

const App = () => {
  
   const [contacts, setContacts] = useState([]);
   const [filter, setFilter] = useState("");

   useEffect(() => {
    const currentContacts = JSON.parse(localStorage.getItem(localStorageContactsKey));

    if (currentContacts) {
      setContacts(currentContacts);
    }
   }, []);

   useEffect(() => {
    localStorage.setItem(localStorageContactsKey, JSON.stringify(contacts));
   },[contacts]);

   const handleAddContact = (newContact) => {
      setContacts([...contacts, newContact])
   };

   const handleFilter = (event) => {
      setFilter(event.target.value)
   };

   const handleDelete = (id) => {
    const filteredContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(filteredContacts);
   };
  

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#010101',
        flexDirection: "column",
      }}
    >
      <h1>Phonebook</h1>
      <Phonebook  handleAddContact={handleAddContact}
          contacts={contacts}/>
      <h2>Contacts</h2>
      <Filter filterText={filter}
          handleFilter={handleFilter}/>
      
      <Contacts contacts={contacts}
          filterText={filter}
          handleDelete={handleDelete}
        />
      
    </div> 
  );
};


export default App;
