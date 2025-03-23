import { useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import { LoginUser } from "../redux/Auth/AuthSlice";
import { useDispatch } from "react-redux";

/**
 * Intersection observer hook
 * @param handleAuthErrorFunc Handler function to throw error
 * @param LoginUser Login user function from redux store
 * @returns void
 */
const useHandleOAuthRedirect = (handleAuthErrorFunc: (errorMsg: string) => void) => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();

  const handleAuthRedirect = async () => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const authId = queryParams.get("authId");
      const erroMsg = queryParams.get("erroMsg");

      console.log({ authId, erroMsg });

      if (erroMsg) {
        throw new Error(erroMsg)
      }

      if (authId) {
        dispatch(LoginUser(authId));
        setTimeout(() => {
          navigate('/');
        }, 400)
      }

    } catch (error: any) {
      // handleAuthErrorFunc(erroMsg);
      console.log({ error })
    }
  };

  useEffect(() => {
    handleAuthRedirect();
  }, []);
};

export default useHandleOAuthRedirect;
