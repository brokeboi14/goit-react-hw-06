import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { nanoid } from "nanoid";
import css from ".//ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";

const ContactForm = ({ onAddContact }) => {
  const nameFieldId = useId();
  const numberFieldId = useId();
  const contactId = nanoid(10);
  const dispatch = useDispatch();

  const phoneRegExp = /^[\d-]+$/;
  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short. Should be more than 3 symbols!")
      .max(50, "Too Long. Should be less than 50 symbols!")
      .required("Required"),
    number: Yup.string()
      .min(3, "Too Short. Should be more than 3 symbols!")
      .max(50, "Too Long. Should be less than 50 symbols!")
      .matches(phoneRegExp, "Invalid phone number!")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    dispatch(    
    addContact({
      id: contactId,
      name: values.name,
      number: values.number,
    })
    );
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        id: "",
        name: "",
        number: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      <Form className={css.form}>
        <div className={css.formInputWrapper}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field
            className={css.formInput}
            id={nameFieldId}
            type="text"
            name="name"
          />
          <ErrorMessage
            className={css.formInputErrorMsg}
            name="name"
            component="span"
          />
        </div>
        <div className={css.formInputWrapper}>
          <label htmlFor={numberFieldId}>Number</label>
          <Field
            className={css.formInput}
            id={numberFieldId}
            type="text"
            name="number"
          />
          <ErrorMessage
            className={css.formInputErrorMsg}
            name="number"
            component="span"
          />
        </div>
        <button className={css.formSbmBtn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;