import * as EmailValidator from 'email-validator';
import { removeDashes } from 'utils/NormalizePhoneInput';
import zxcvbn from 'zxcvbn';

//validation Text
const EMAIL_VALIDATION_TEXT = 'please enter a valid email address';
const CONFIRM_PASSWORD = 'password does not match';
const PASSWORD_MIN = 'password must have at least 8 characters';
const PHONE_MIN = 'please fill with exactly 10 digits';

//password validator
function validatePassword(p) {
  let error = '';
  let score = 0;
  if (p.length < 8) {
    error = PASSWORD_MIN;
    score = 0;
  } else {
    score = 1;
    if (p.search(/[!@#$%^&*_]/) < 0) {
      error =
        'Your password must contain at least special char from -[ ! @ # $ % ^ & * _ ]';
    }
    if (p.search(/[0-9]/) < 0) {
      error = 'Your password must contain at least one digit.';
    }
    if (p.search(/[a-z]/) < 0) {
      error = 'Your password must contain at least one lower case letter.';
    }
    if (p.search(/[A-Z]/) < 0) {
      error = 'Your password must contain at least one upper case letter.';
    }
  }
  if (error) {
    return { error, score };
  }
  return { error: '', score: zxcvbn(p).score };
}

export default function validationForm(inputs, formSubmitted) {
  let errors = {};
  const phoneWithoutDashes = removeDashes(inputs.phone);

  //EMAIL
  if (!inputs.email && formSubmitted) {
    errors.email = 'Email is required';
  } else if (inputs.email && !EmailValidator.validate(inputs.email)) {
    errors.email = EMAIL_VALIDATION_TEXT;
  } else {
    errors.email = '';
  }

  //PHONE
  if (!inputs.phone && formSubmitted) {
    errors.phone = 'phone is required';
  } else if (inputs.phone && phoneWithoutDashes.match(/^[0-9]{10}$/) === null) {
    errors.phone = PHONE_MIN;
  } else {
    errors.phone = '';
  }

  //PASSWORD
  if (!inputs.password && formSubmitted) {
    errors.password = 'password is required';
  } else {
    errors.password = validatePassword(inputs.password).error;
    inputs.passwordScore = validatePassword(inputs.password).score;
  }

  //CONFIRM PASSWORD
  if (!inputs.password2 && formSubmitted) {
    errors.password2 = 'confirm password is required';
  } else if (inputs.password2 && inputs.password2 !== inputs.password) {
    errors.password2 = CONFIRM_PASSWORD;
  } else {
    errors.password2 = '';
  }
  return errors;
}
