import { useHistory } from "react-router-dom";
export const PasswordResetSuccess = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Success</h1>
      <p>
        Your password has been successfully changed! Now please login with your
        new password
      </p>
      <button onClick={() => history.push("/signin")}>Go to Login</button>
    </div>
  );
};
