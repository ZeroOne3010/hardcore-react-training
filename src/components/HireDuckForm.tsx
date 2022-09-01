import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, memo, useRef, useEffect } from "react";
import { v4 } from "uuid";
import * as Yup from "yup";
import { DuckProspectType } from "../services/ducks";

type Props = {
  onHireDuck: (prospect: DuckProspectType) => void;
};

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

const HireDuckForm: FC<Props> = ({ onHireDuck }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div>
      <Formik
        validateOnMount
        validationSchema={schema}
        initialValues={{ firstName: "", lastName: "" }}
        onSubmit={(values) => {
          const prospect: DuckProspectType = {
            ...values,
            id: v4(),
            birthDay: "2022-06-15",
            gender: 0,
            wingedness: "r",
            migratesForWinters: false,
            relatedToCEO: true,
            isAdmin: false
          };
          console.log("prospekti", prospect);
          onHireDuck(prospect);
        }}
      >
        {({ isValid }) => {
          return (
            <Form>
              <div>
                <label htmlFor="firstName">Etunimi</label>
                <Field
                  type="text"
                  name="firstName"
                  id="firstName"
                  innerRef={inputRef}
                />
                <ErrorMessage name="firstName" />
              </div>
              <div>
                <label htmlFor="lastName">Sukunimi</label>
                <Field type="text" name="lastName" id="lastName" />
                <ErrorMessage name="lastName" />
              </div>
              <button type="submit" disabled={!isValid}>
                🦆 Palkkaa!
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default memo(HireDuckForm);
