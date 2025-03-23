import { useRef, useState } from "react";
import dkMediaLogo from "../../assets/dkMediaLogo.png";
import { GoogleLoginBtn } from "../../components/GoogleLoginBtn";
import useHandleOAuthRedirect from "../../hooks/handleOAuthRedirect";
import { AuthService } from "../../redux/Auth/AuthService";
import PrimaryButton from "../../components/PrimaryButton";
import ThrowAsyncError, { toggleError } from "../../components/ThrowAsyncError";

function Login() {
  const authService = new AuthService();
  const [isLogin, setIsLogin] = useState(true);
  const [signupKey, setSignupKey] = useState("");

  const errorRef = useRef<HTMLDivElement>(null);
  const [responseError, setResponseError] = useState("");

  const onLoginClick = async (mode: string) => {
    if (!isLogin && signupKey === "") {
      return handleThrowError("Sign up key is required");
    }

    try {
      if (!isLogin) {
        await authService.authenticateUser(mode, signupKey);
      } else {
        await authService.authenticateUser(mode);
      }
    } catch (error: any) {
      console.log({ error })
      handleThrowError(error?.message ?? error)
    }
  }

  /**
  * Throw error
  * @param {*} errorMsg
  */
  const handleThrowError = (errorMsg: string) => {
    setResponseError(errorMsg);
    setTimeout(() => {
      toggleError(errorRef);
    }, 400);
  };


  /***************************** UseEffect hooks *************************/
  useHandleOAuthRedirect(handleThrowError);

  return (
    <div className="h-screen w-screen bg-background p-4 fixed overflow-hidden flex flex-col top-0 text-neutral-100">
      <header className="h-[20vh] w-full">
        <img src={dkMediaLogo} alt="DkMedia Logo" className="w-[253px] h-[56px]" />
      </header>

      <main className="h-full flex flex-col items-center gap-y-6 w-[80%] self-center mt-10">
        <div className="text-3xl font-bold">DKMEDIA Admin Panel</div>
        <div className="w-full h-1 bg-neutral-100"></div>

        {isLogin ?
          <div className="flex flex-col items-center gap-y-4">
            <GoogleLoginBtn onBtnClick={() => onLoginClick("login")} title="Google Login" />

            <div className="flex flex-col items-center gap-y-2">
              <span>Don't have an account? </span>
              <PrimaryButton
                title={"Sign up"}
                onBtnClick={() => setIsLogin(false)}
                className={"rounded-xl !bg-blue-400 !text-neutral-100"}
              />
            </div>
          </div> :
          <div className="flex flex-col items-center gap-y-4">
            <input
              className="text-neutral-900 outline-none focus:outline-none py-2 px-7 w-full min-w-[100px] overflow-x-scroll  border-1 border-solid rounded-2xl bg-neutral-100"
              placeholder="Enter signup key"
              onChange={(e) => setSignupKey(e.target.value)}
            />
            <GoogleLoginBtn onBtnClick={() => onLoginClick("signup")} title="Google Signup" />

            <div className="flex flex-col items-center gap-y-2">
              <span>Already have an account? </span>
              <PrimaryButton
                title={"Login"}
                onBtnClick={() => setIsLogin(true)}
                className={"rounded-xl !bg-blue-400 !text-neutral-100"}
              />
            </div>
          </div>
        }
        {/* Throw error section section */}
        <ThrowAsyncError
          responseError={responseError}
          errorRef={errorRef}
          className={"!bottom-[30%]"}
        />
      </main>

    </div>
  );
}

export default Login;
