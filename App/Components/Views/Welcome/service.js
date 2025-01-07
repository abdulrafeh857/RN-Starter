const useService = props => {
  const onContinue = () => {
    props.navigation.navigate('User');
  };

  return { onContinue };
};

export default useService;
