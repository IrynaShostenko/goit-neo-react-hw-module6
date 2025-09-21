import { useSelector } from "react-redux";
import { selectVisibleContacts } from "../../redux/selectors";
import Contact from "../Contact/Contact";
import styles from "./ContactList.module.css";

const ContactList = () => {
  const contacts = useSelector(selectVisibleContacts);

  if (!contacts.length) {
    return <p className={styles.empty}>No contacts yet</p>;
  }

  return (
    <ul className={styles.list}>
      {contacts.map((c) => (
        <Contact key={c.id} contact={c} />
      ))}
    </ul>
  );
};

export default ContactList;
