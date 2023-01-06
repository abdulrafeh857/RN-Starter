const SignUpErrors = (type, message) => {
  switch (type) {
    case 'NO_FIRST_NAME':
      console.error('First name field is Empty.');
      return {code: 'first_name', message: 'First name field is required.'};
    case 'NO_LAST_NAME':
      console.error('Last name field is Empty.');
      return {code: 'last_name', message: 'Last name field is required.'};
    case 'NO_EMAIL':
      console.error('Email field is Empty.');
      return {code: 'email', message: 'Email field is required.'};
    case 'INVALID_EMAIL':
      console.error('Email is invalid.');
      return {code: 'email', message: 'Email is invalid.'};
    case 'NO_PASSWORD1':
      console.error('Password field is Empty.');
      return {code: 'password1', message: 'Password field is required.'};
    case 'NO_PASSWORD2':
      console.error('Password field is Empty.');
      return {code: 'password2', message: 'Password field is required.'};
    case 'NON_FIELD_ERRORS':
      console.error(message);
      return {code: 'non_field_errors', message: message};
  }
};

const parseSignUpError = (error) => {
  let {
    first_name,
    last_name,
    email,
    password1,
    password2,
    non_field_errors,
  } = error.response.data;

  if (first_name) {
    return SignUpErrors('NO_FIRST_NAME');
  } else if (last_name) {
    return SignUpErrors('NO_LAST_NAME');
  } else if (email) {
    if (email[0].substr(0, 5) === 'Enter') return SignUpErrors('INVALID_EMAIL');
    else return SignUpErrors('NO_EMAIL');
  } else if (password1) {
    return SignUpErrors('NO_PASSWORD1');
  } else if (password2) {
    return SignUpErrors('NO_PASSWORD2');
  } else if (non_field_errors) {
    return SignUpErrors('NON_FIELD_ERRORS', non_field_errors[0]);
  }
};

export default parseSignUpError;
