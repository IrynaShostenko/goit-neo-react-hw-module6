import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../../redux/contactsSlice";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!name.trim()) {
      return "Name is required";
    }
    if (!/^[a-zA-Zа-яА-ЯіїєІЇЄ\s]+$/.test(name.trim())) {
      return "Name can only contain letters";
    }
    if (!number.trim()) {
      return "Number is required";
    }
    if (!/^\+?\d{6,15}$/.test(number.trim())) {
      return "Invalid phone number format";
    }
    return "";
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    dispatch(addContact({ name, number }));
    setName("");
    setNumber("");
    setError("");
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label}>
        Name
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Melissa Smith"
        />
      </label>
      <label className={styles.label}>
        Number
        <input
          className={styles.input}
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="067 0000000"
        />
      </label>

      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
