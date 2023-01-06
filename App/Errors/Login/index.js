const LoginErrors = (type) => {
  switch (type) {
    case 'NO_USERNAME':
      console.error('Email field is Empty.');
      return {code: 'username', message: 'Email field is required.'};

    case 'NO_PASSWORD':
      console.error('Password field is Empty.');
      return {code: 'password', message: 'Password field is required.'};

    case 'INVALID_CREDENTIALS':
      console.error('Email or Password incorrect');
      return {code: 'invalid', message: 'Email or Password is incorrect.'};
  }
};

const parseLoginError = (error) => {
  let {username, password, detail} = error.response.data;
  if (username) {
    return LoginErrors('NO_USERNAME');
  } else if (password) {
    return LoginErrors('NO_PASSWORD');
  } else if (detail) {
    return LoginErrors('INVALID_CREDENTIALS');
  }
};

export default parseLoginError;
