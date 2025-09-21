import { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../../../redux/contactsSlice";
import styles from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");

  const normalizePhone = (value) => {
    let phone = value.trim();

    // якщо починається з "0" → додаємо +38
    if (/^0\d{9}$/.test(phone)) {
      phone = "+38" + phone;
    }

    // якщо вже є код країни, залишаємо
    if (!phone.startsWith("+")) {
      phone = "+38" + phone;
    }

    return phone;
  };

  const validate = (nameValue, numberValue) => {
    if (!nameValue.trim()) {
      return "Name is required";
    }
    if (nameValue.trim().length < 2) {
      return "Name must be at least 2 letters";
    }
    if (!/^[a-zA-Zа-яА-ЯіїєІЇЄ\s]+$/.test(nameValue.trim())) {
      return "Name can only contain letters and spaces";
    }

    if (!numberValue.trim()) {
      return "Number is required";
    }
    if (!/^\+38\d{10}$/.test(numberValue)) {
      return "Phone must be in format +38 067 0000000";
    }

    return "";
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const normalizedNumber = normalizePhone(number);
    const validationError = validate(name, normalizedNumber);

    if (validationError) {
      setError(validationError);
      return;
    }

    dispatch(addContact({ name, number: normalizedNumber }));
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
          placeholder="Mary Poppins"
        />
      </label>

      <label className={styles.label}>
        Number
        <input
          className={styles.input}
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="(+38) 067 0000000"
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
