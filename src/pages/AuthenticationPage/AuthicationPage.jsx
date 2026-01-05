import HomeLayout from "../../layout/HomeLayout";
import LoginForm from "../../components/user/forms/LoginForm";
import SignupForm from "../../components/user/forms/SignupForm";
import { useParams, Link } from "react-router-dom";
import ForgetPassword from "../../components/user/ForgotPasswordComponent";
import ResetPassword from "../../components/user/ResetPasswordComponent";
import OtpAuthentication from "../../components/user/SentOTPComponent";
import VerifyOtp from "../../components/user/VerifyOtpComponent";
import { login,adminLogin } from "../../redux/slices/AuthSlice";


function Authentication() {
  const { authType } = useParams();

  return (
    <HomeLayout>
      <div className="w-screen flex items-center justify-center mt-10">
        <div className="bg-base-100 shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-white mb-5">
            { 
            authType === "register" ? 
            "Create an Account" : 
            ""
            } 

            {
                 authType === "login" ? 
                 "Login to Your Account" : 
                 ""
            }

          </h2>

          {
            authType === "register" ? 
            <SignupForm /> : ""
          }

          {
            authType ==="login" ? <LoginForm dispatchFuntion={login} /> :""
          }

          {
            authType ==="adminLogin" ? <LoginForm dispatchFuntion={adminLogin} /> :""
          }




          {/* forgotpassword */}

          {
            authType === "forgotPassword" ?  <ForgetPassword /> : ""
          }
          
          
          {
            authType === "resetPassword" ?  <ResetPassword /> : ""
          }

          
          {
            authType === "sendOtp" ?  <OtpAuthentication /> : ""
          }

          {
            authType === "verifyOtp" ?  <VerifyOtp /> : ""
          }

        </div>
      </div>
    </HomeLayout>
  );
}

export default Authentication;
