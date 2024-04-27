import tokenRequest from 'service/request/tokenRequest';
import { validate } from 'uuid';
import userRequest from 'service/request/userRequest';
import { useDispatch } from 'react-redux';
import { deleteUser, setUser } from 'redux/actions/user';

export default function useFetchUserRedux() {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      let user = await tokenRequest.get();
      if (validate(user.id)) {
        user = await userRequest.get(user.id);
      }
      dispatch(deleteUser());
      dispatch(setUser(user));
    } catch (e) {
      return console.info("Fetch user redux failed");
    }
  };

  return fetchUser;
}