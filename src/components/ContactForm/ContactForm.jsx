import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export default function ContactForm({ addContact }) {
  const [name, setName] = useState(INITIAL_STATE.name);
  const [number, setNumber] = useState(INITIAL_STATE.number);

  const handleChange = ({ currentTarget: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const onFormSubmit = e => {
    e.preventDefault();

    addContact(name, number);
    setName(INITIAL_STATE.name);
    setNumber(INITIAL_STATE.number);
  };

  return (
    <form className={css.form} onSubmit={onFormSubmit}>
      <label htmlFor="" className={css.form__item}>
        Name
        <input
          type="text"
          name="name"
          className={css.form__input}
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="" className={css.form__item}>
        Number
        <input
          type="tel"
          name="number"
          className={css.form__input}
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit" className={css.form__btn}>
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = { addContact: PropTypes.func.isRequired };
