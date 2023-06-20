import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

export default function App() {
  const [contacts, setContacts] = useState(() =>
    localStorage.getItem('contacts')
      ? JSON.parse(localStorage.getItem('contacts'))
      : []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (JSON.stringify(contacts) === '[]') {
      localStorage.removeItem('contacts');
      return;
    }

    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = { name, number };
    newContact.id = nanoid();

    setContacts([newContact, ...contacts]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const changeFilter = ({ currentTarget: { value } }) => {
    setFilter(value);
  };

  const filteredContacts = () =>
    contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <div>
      <h1>Phone book</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <p>Find contacts by name</p>
      <Filter onFilterChange={changeFilter} />
      <ContactList contacts={filteredContacts()} onBtnClick={deleteContact} />
    </div>
  );
}
