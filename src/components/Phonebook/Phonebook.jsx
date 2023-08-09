import React, { useState } from "react";
import PropTypes from 'prop-types';
import css from "./Phonebook.module.css";
import { nanoid } from 'nanoid';


 
const state = {
  name: "",
  number: "",
};

const Phonebook = ({ contacts, handleAddContact }) => {
  const [contact, setContact] = useState(state);

  const handleContactData = (event) =>
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = (event) => {
    event.preventDefault();

    for (const { name } of contacts) {
      if (name === contact.name) {
        alert(`${name} is already in contacts`);

        return;
      }
    }

    const newContact = {
      id : nanoid(),
      name : contact.name,
      number : contact.number,
    };

    handleAddContact(newContact);

    setContact({name : "" , number : "" })
  };
  

    return(
      <form onSubmit={handleSubmit} className={css.formContact}>
      <label className={css.inputName}>Name</label>
      <input
        className={css.inputContactName}
        type="text"
        name="name"
        minLength={2}
        maxLength={50}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={contact.name}
        onChange={handleContactData}
      />
      <label className={css.inputName}>Number</label>
      <input
        className={css.inputContactName}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={contact.number}
        onChange={handleContactData}
        />
      <button className={css.formBtn} type="submit">Add contact</button>

    </form>
    );
};
    

Phonebook.propTypes = {
  contacts: PropTypes.array.isRequired,
  handleAddContact: PropTypes.func.isRequired,
};



export default Phonebook;