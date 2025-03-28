import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./SearchForm.module.css";

export default function SearchForm({ onSubmit }) {
  const initialValues = { query: "" };

  const validationSchema = Yup.object({
    query: Yup.string().trim().required("Please enter a search query."), // Повідомлення про помилку
  });

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values.query.trim());
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className={css.searchForm}>
          <Field
            type="text"
            name="query"
            placeholder="Search for movies..."
            className={css.searchInput}
          />
          <ErrorMessage
            name="query"
            component="div"
            className={css.errorMessage}
          />
          <button type="submit" className={css.searchButton}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
}
