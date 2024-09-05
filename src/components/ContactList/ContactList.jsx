import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { getNameFilter } from "../../redux/filtersSlice";
import { getContact } from "../../redux/contactsSlice";

const ContactList = () => {
  const contacts = useSelector(getContact);
  const filter = useSelector(getNameFilter);
  const filteredContacts = contacts.filter(
    (contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase().trim()) ||
    contact.number.includes(filter)
  );
  return (
    <ul className={css.contactList}>
      {filteredContacts.map((contact) => {
        return (
          <li className={css.contactListItem} key={contact.id}>
            <Contact contact={contact} />
          </li>
        );
      })}
    </ul>
  );
}

export default ContactList;