import { React, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../../Config";
import { PasswordResetFailure } from "./PasswordResetFailure";
import { PasswordResetSuccess } from "./PasswordResetSuccess";

export const ResetPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const { passwordResetCode } = useParams();
  const onResetClicked = async () => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/reset-password/${passwordResetCode}`,
        { newPassword: passwordValue }
      );
      setIsSuccess(true);
    } catch (err) {
      setIsFailure(true);
      console.log(err);
    }
  };

  if (isSuccess) return <PasswordResetSuccess />;
  if (isFailure) return <PasswordResetFailure />;

  return (
    <div>
      {console.log(passwordResetCode)}
      <h1>Reset password</h1>
      <p>Please enter a new password</p>
      <input
        type="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        placeholder="password"
      />
      <input
        type="password"
        value={confirmPasswordValue}
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
        placeholder="Confirm Password"
      />
      <button
        disabled={
          !passwordValue ||
          !confirmPasswordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onResetClicked}
      >
        Reset password
      </button>
    </div>
  );
};
