import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../../Config";

export const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState("");
  const [errorMessage, setErrorMesssage] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const onSubmitClicked = async () => {
    try {
      await axios.put(`${BACKEND_URL}/api/forgot-password/${emailValue}`);
      setSuccess(true);
      setTimeout(() => {
        history.push("/signin");
      }, 3000);
    } catch (e) {
      setErrorMesssage(e.message);
    }
  };
  return success ? (
    <div>
      <h1>Success</h1>
      <p>Check email for reset link</p>
    </div>
  ) : (
    <div>
      <h1>Forgot Password</h1>
      <p>Enter your email and we'll send you an email</p>
      {errorMessage && <div>{errorMessage}</div>}
      <input
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        placeholder="s@g.c"
      />
      <button disabled={!emailValue} onClick={onSubmitClicked}>
        Send Reset Link
      </button>
    </div>
  );
};
