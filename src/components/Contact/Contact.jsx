import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import styles from "./Contact.module.css";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const onDelete = () => dispatch(deleteContact(contact.id));

  return (
    <li className={styles.item}>
      <span className={styles.name}>{contact.name}</span>
      <span className={styles.number}>{contact.number}</span>
      <button className={styles.delete} onClick={onDelete}>
        Delete
      </button>
    </li>
  );
};

export default Contact;
