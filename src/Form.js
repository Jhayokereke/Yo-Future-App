import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const futuresStore = [
  'You will Marry soon',
  'you will move to London soon',
  'You will get $2000 job next month',
  'You will buy a black benz next year',
];

const getMostOccurringLetter = (sentence) => {
  const chars = sentence.split('');
  const nameChars = {};

  chars.forEach((char) => {
    if (char.match(/[a-zA-Z]/)) {
      char = char.toLowerCase();
      if (nameChars[char]) {
        nameChars[char] += 1;
      } else {
        nameChars[char] = 1;
      }
    }
  });

  let maxChar = '';
  let max = 0;

  for (const [key, value] of Object.entries(nameChars)) {
    if (value > max) {
      max = 2;
      maxChar = key;
    }
  }
  return maxChar;
};

const prepareFutures = (futures = futuresStore) => {
  const store = new Map();
  futures.forEach((future) => {
    const keyLetter = getMostOccurringLetter(future);
    if (store.has(keyLetter)) {
      const item = store.get(keyLetter).push('future');
      store.set(keyLetter, item);
    } else {
      store.set(keyLetter, [future]);
    }
  });
  return store;
};

const FormError = ({ formik, inputName }) => (
  <>
    {formik.touched[inputName] && formik.errors[inputName] ? (
      <span className="nameError">{formik.errors[inputName]}</span>
    ) : null}
  </>
);

const Form = (props) => {
  const NAME = 'name';
  const GENDER = 'gender';
  const [futures, setFutures] = useState(null);

  useEffect(() => {
    const data = prepareFutures();
    setFutures(data);
  }, []);

  const handleSubmit = (values) => {
    const letter = getMostOccurringLetter(values[NAME]);
    let result = swal(
      `${values[NAME]}`,
      'Please we do not have a response for you.'
    );
    if (futures.has(letter)) {
      result = swal(`${values[NAME]}`, futures.get(letter)[0]);
    }
    console.log({ letter, futures });
    return result;
  };

  const formik = useFormik({
    initialValues: {
      [NAME]: '',
      [GENDER]: '',
    },
    validationSchema: Yup.object({
      [NAME]: Yup.string()
        .trim()
        .matches(/^[a-zA-Z ]*$/, { message: 'Please input a valid name' }),
      [GENDER]: Yup.string().required('Your gender is required'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className="search-params">
      <h1 className="heading">Yo Future</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control success">
          <label htmlFor="name">
            Name
            <input
              type="text"
              placeholder="Full name"
              name={NAME}
              value={formik.values[NAME]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </label>
          <FormError inputName={NAME} formik={formik} />
        </div>

        <div className="form-gender">
          <label htmlFor="gender">
            Gender
            <select
              id="gender"
              name={GENDER}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option>..</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </label>
          <FormError inputName={GENDER} formik={formik} />
        </div>

        <button type="submit">Submit </button>
      </form>

      <footer className="footer_header">
        <p className="footer_Intro">
          Built by <a href="https://twitter.com/home">Chris Uche</a>
        </p>
        <p className="copy">Copyright 2021. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Form;
