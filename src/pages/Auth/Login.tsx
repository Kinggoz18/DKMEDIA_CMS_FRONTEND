import dkMediaLogo from "../../assets/dkMediaLogo.png";
import { NavigateFunction, useNavigate } from "react-router";
import { GoogleLoginBtn } from "../../components/GoogleLoginBtn";

function Login() {
  const navigate: NavigateFunction = useNavigate();

  const onLoginClick = () => {
    return navigate("/");
  }

  return (
    <div className="h-screen w-screen bg-background p-4 fixed overflow-hidden flex flex-col top-0 text-neutral-100">
      <header className="h-[20vh] w-full">
        <img src={dkMediaLogo} alt="DkMedia Logo" className="w-[253px] h-[56px]" />
      </header>

      <main className="h-full flex flex-col items-center gap-y-6 w-[80%] self-center mt-10">
        <div className="text-3xl font-bold">DKMEDIA Admin Panel</div>
        <div className="w-full h-1 bg-neutral-100"></div>
        <GoogleLoginBtn onBtnClick={onLoginClick} title="Google Login" />
      </main>
    </div>
  );
}

export default Login;
