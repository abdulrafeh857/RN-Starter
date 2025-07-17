const parseError = error => {
  console?.log('\n\n\n PARSE ERROR +++++++ ', error?.data?.detail);
  let isFirstNameError =
    error?.status === 400 &&
    error?.data?.first_name &&
    error?.data?.first_name?.length > 0;

  let isLastNameError =
    error?.status === 400 &&
    error?.data?.last_name &&
    error?.data?.last_name?.length > 0;

  let isEmailError =
    error?.status === 400 &&
    error?.data?.email &&
    error?.data?.email?.length > 0;

  let isPhoneError =
    error?.status === 400 &&
    error?.data?.phone &&
    error?.data?.phone?.length > 0;

  let isPassword1Error =
    error?.status === 400 &&
    error?.data?.password1 &&
    error?.data?.password1?.length > 0;

  let isPassword2Error =
    error?.status === 400 &&
    error?.data?.password2 &&
    error?.data?.password2?.length > 0;

  let isNonFieldError =
    error?.status === 400 &&
    error?.data?.non_field_errors &&
    error?.data?.non_field_errors?.length > 0;

  let isMessageError =
    error?.status === 400 &&
    error?.data?.message &&
    error?.data?.message?.length > 0;

  let isMessageError2 =
    error?.status === 400 &&
    error?.data?.data?.message &&
    error?.data?.data?.message?.length > 0;

  let isMessageError4 =
    error?.data?.message && error?.data?.message?.length > 0;

  let isMessageError6 =
    error?.error?.message && error?.error?.message?.length > 0;

  let isMessageError5 =
    error?.status === 400 &&
    error?.data &&
    (Object.values(error?.data)[0] == 'This field may not be blank.' || [
      'This field may not be blank.'
    ]);

  let isMessageError3 =
    error?.status === 400 && error?.data && Object.keys(error?.data).length > 0;

  let isUnauthorizedError3 = error?.status === 401;
  let isForbiddenError3 = error?.status === 403;
  let isNotFoundError3 = error?.status === 404;
  let isMethodError3 = error?.status === 405;
  let isNotAcceptableError3 = error?.status === 406;
  let isDependencyError3 = error?.status === 424;

  let isServerError3 = error?.status === 500;
  let isServerUnavailableError2 = error?.status === 502;
  let isServerUnavailableError3 = error?.status === 503;

  let isNetworkError = error === 'Network Error';
  if (isUnauthorizedError3) {
    return {
      type: 'message',
      message:
        'You are not authorized for this request: 401\nPlease try again later...'
    };
  }
  if (isForbiddenError3) {
    return {
      type: 'message',
      message:
        "You don't have permission for this request: 403\nPlease try again later..."
    };
  }
  if (isNotFoundError3) {
    return {
      type: 'message',
      message:
        typeof error?.data?.detail == 'string'
          ? error?.data?.detail
          : typeof Object.values(error?.data)[0] == 'string'
          ? Object.values(error?.data)[0]
          :  "Not found\nPlease try again later..."
    }
  }
 
  if (isMethodError3) {
    return {
      type: 'message',
      message:
        "The requested method isn't allowed: 405\nPlease try again later..."
    };
  }
  if (isNotAcceptableError3) {
    return {
      type: 'message',
      message: error?.data?.data?.error
        ? error?.data?.data?.error + ': 406'
        : error?.data?.message
        ? error?.data?.message + ': 406'
        : "The requested method isn't acceptable: 406\nPlease try again later..."
    };
  }
  if (isDependencyError3) {
    return {
      type: 'message',
      message: 'Dependency failed error : 424\nPlease try again later...'
    };
  }

  if (isServerError3) {
    return {
      type: 'message',
      message: 'Server not responding: 500\nPlease try again later...'
    };
  }
  if (isServerUnavailableError2) {
    return {
      type: 'message',
      message:
        'Server gateway is unable to handle the request: 502\nPlease try again later...'
    };
  }
  if (isServerUnavailableError3) {
    return {
      type: 'message',
      message:
        'Server is temporarily unable to handle the request: 503\nPlease try again later...'
    };
  }

  if (isFirstNameError) {
    return {
      type: 'firstName',
      message: error?.data?.first_name[0]
    };
  }
  if (isLastNameError) {
    return {
      type: 'lastName',
      message: error?.data?.last_name[0]
    };
  }
  if (isEmailError) {
    return {
      type: 'email',
      message: error?.data?.email[0]
    };
  }
  if (isPhoneError) {
    return {
      type: 'phone',
      message: error?.data?.phone[0]
    };
  }
  if (isPassword1Error) {
    return {
      type: 'password1',
      message: error?.data?.password1[0]
    };
  }
  if (isPassword2Error) {
    return {
      type: 'password2',
      message: error?.data?.password2[0]
    };
  }
  if (isNetworkError) {
    return {
      type: 'message',
      message:
        'Network Error\nPlease check your internet connection and try again...'
    };
  }
  if (isNonFieldError) {
    return {
      type: 'password2',
      message: error?.data?.non_field_errors[0]
    };
  }
  if (isMessageError) {
    return {
      type: 'message',
      message:
        typeof error?.data?.message == 'string'
          ? error?.data?.message
          : error?.data?.message[0]
    };
  }
  if (isMessageError2) {
    return {
      type: 'message',
      message:
        typeof error?.data?.data?.message == 'string'
          ? error?.data?.data?.message
          : error?.data?.data?.message[0]
    };
  }
  if (isMessageError4) {
    return {
      type: 'message',
      message:
        typeof error?.data?.message == 'string'
          ? error?.data?.message
          : error?.data?.data?.message
    };
  }

  if (isMessageError6) {
    return {
      type: 'message',
      message:
        typeof error?.error?.message == 'string'
          ? error?.error?.message
          : error?.error?.message
    };
  }

  if (isMessageError5) {
    let key = Object.keys(error?.data)[0];

    console.log('\n\n\n\n     KEY   +==    ', key, '\n\n\n\n');

    return {
      type: 'message',
      message: key + ': ' + Object.values(error?.data)[0]
    };
  }
  if (isMessageError3) {
    return {
      type: 'message',
      message:
        typeof error?.data == 'string'
          ? error?.data
          : typeof Object.values(error?.data)[0] == 'string'
          ? Object.values(error?.data)[0]
          : 'Something went wrong. Please try again later...'
    };
  } else {
    return {
      type: 'message',
      message: 'Something went wrong. Please try again later...'
    };
  }
};

export default parseError;
