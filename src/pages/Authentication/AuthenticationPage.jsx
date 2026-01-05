import LoginForm from "../../components/forms/Login/LoginForm";
import SignupForm from "../../components/forms/Signup/SignupForm";
import { useParams } from "react-router-dom";
import ForgetPassword from "../../components/forms/forgot/ForgetPassword";
import ResetPassword from "../../components/forms/reset/ResetPassword";
import OtpAuthentication from "../../components/forms/sentotp/OtpAuthentication";
import VerifyOtp from "../../components/forms/verifyotp/VerifyOtp";
import { login, adminLogin } from "../../redux/slices/AuthSlice";

function AuthenticationPage() {
  const { authType } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#01162b] px-4">
      <div className=" bg-[#061c33] rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.7)] px-8 py-10">

        {/* LOGIN / ADMIN LOGIN */}
        {(authType === "login" || authType === "adminLogin") && (
          <>
            <h2 className="text-3xl font-semibold text-white text-center">
            </h2>
            <p className="text-slate-400 text-center mt-2 mb-8">
            </p>

            <LoginForm
              dispatchFuntion={
                authType === "adminLogin" ? adminLogin : login
              }
            />
          </>
        )}

        {/* REGISTER */}
        {authType === "register" && (
          <>
            <h2 className="text-3xl font-semibold text-white text-center mb-8">
            </h2>
            <SignupForm />
          </>
        )}

        {/* FORGOT PASSWORD */}
        {authType === "forgotPassword" && <ForgetPassword />}

        {/* RESET PASSWORD */}
        {authType === "resetPassword" && <ResetPassword />}

        {/* SEND OTP */}
        {authType === "sendOtp" && <OtpAuthentication />}

        {/* VERIFY OTP */}
        {authType === "verifyOtp" && <VerifyOtp />}
      </div>
    </div>
  );
}

export default AuthenticationPage;
