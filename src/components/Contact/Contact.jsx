import { BsFillTelephoneFill } from "react-icons/bs";
import { IoIosContact } from "react-icons/io";
import css from "./Contact.module.css";
import { deleteContact } from "../../redux/contactsSlice";
import { useDispatch } from "react-redux";

const Contact = ({ contact: { id, name, number }}) => {
  const dispatch = useDispatch();
  return (
    <div className={css.contactCard}>
      <div className={css.contactInfo}>
        <p className={css.contactText}>
          <IoIosContact />
          {name}
        </p>
        <p className={css.contactText}>
          <BsFillTelephoneFill />
          {number}
        </p>
      </div>
      <button
        className={css.contactDeleteBtn}
        type="button"
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </button>
    </div>
  );
};

export default Contact;