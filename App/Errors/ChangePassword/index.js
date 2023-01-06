const ChangePasswordErrors = (type, message) => {
  switch (type) {
    case 'OLD_PASSWORD':
      console.error(message[0]);
      return {code: 'oldPassword', message: message[0]};

    case 'NEW_PASSWORD1':
      console.error(message[0]);
      return {code: 'newPassword', message: message[0]};

    case 'NEW_PASSWORD2':
      console.error(message[0]);
      return {
        code: 'repeatPassword',
        message: message[0],
      };
  }
};

const parseChangePasswordError = (error) => {
  let {old_password, new_password1, new_password2} = error.response.data;
  if (old_password) {
    return ChangePasswordErrors('OLD_PASSWORD', old_password);
  } else if (new_password1) {
    return ChangePasswordErrors('NEW_PASSWORD1', new_password1);
  } else if (new_password2) {
    return ChangePasswordErrors('NEW_PASSWORD2', new_password2);
  }
};

export default parseChangePasswordError;
