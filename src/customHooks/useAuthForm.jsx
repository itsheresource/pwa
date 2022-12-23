import { useState } from 'react';

const useAuthForm = (validationForm) => {
  const [inputs, setInputs] = useState({
    email: '',
    phone: '',
    password: '',
    password2: '',
    key: '',
    passwordScore: 0,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  //For phone number format
  const [key, setKey] = useState('');
  const formatPhone = (e) => {
    const element = e.target;
    let caret = element.selectionStart;
    let value = element.value.split('');
    if (
      (caret === 4 || caret === 8) &&
      key !== 'Delete' &&
      key !== 'Backspace'
    ) {
      caret++;
    } else if ((caret === 3 || caret === 7) && key === 'Backspace') {
      value.splice(caret - 1, 1);
      caret--;
    } else if ((caret === 3 || caret === 7) && key === 'Delete') {
      value.splice(caret, 1);
    }
    // update caret for non-digits
    if (key.length === 1 && /[^0-9]/.test(key)) caret--;
    value = value
      .join('')
      // remove everything except digits
      .replace(/[^0-9]+/g, '')
      // limit input to 10 digits
      .replace(/(.{10}).*$/, '$1')
      // insert "-" between groups of digits
      .replace(/^(.?.?.?)(.?.?.?)(.?.?.?.?)$/, '$1-$2-$3')
      // remove  "-" at the end
      .replace(/-*$/, '');

    setInputs({
      ...inputs,
      phone: value,
    });
    // "setTimeout" to update caret after setValue
    window.requestAnimationFrame(() => {
      element.setSelectionRange(caret, caret);
    });
  };

  const handleChange = (e) => {
    if (e?.target.name === 'phone') {
      formatPhone(e);
    } else {
      setInputs({
        ...inputs,
        [e?.target.name]: e?.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validationForm(inputs, formSubmitted));
  };

  return {
    handleChange,
    inputs,
    handleSubmit,
    errors,
    setFormSubmitted,
    setKey,
  };
};

export default useAuthForm;
