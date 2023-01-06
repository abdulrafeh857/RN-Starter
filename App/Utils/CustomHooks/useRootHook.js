import useToken from './useToken';
import useAddress from './useAddress';

const useRootHook = () => {
  const Token = useToken();
  const Address = useAddress();

  return {Token, Address};
};

export default useRootHook;
