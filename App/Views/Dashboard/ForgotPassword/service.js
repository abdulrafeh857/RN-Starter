// Imports
import {useState} from 'react';
import resetPasswordService from 'Services/ResetPassword';

const useService = (props) => {
  const [email, setEmail] = useState('');

  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = () => {
    setIsLoading(true);
    resetPasswordService({email: email})
      .then(() => {
        setIsLoading(false);
        setError(null);
        setSuccess(true);
      })
      .catch((e) => {
        console.log('Failed to reset password', e.response);
        setIsLoading(false);
        setError(e.response.data.email[0]);
        setSuccess(false);
      });
  };

  return {
    email,
    setEmail,
    error,
    success,
    isLoading,
    resetPassword,
  };
};

export default useService;
