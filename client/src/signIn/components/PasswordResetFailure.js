import { useHistory } from "react-router-dom";
export const PasswordResetFailure = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Failure</h1>
      <p>Something went wrong while trying reset your password! Please try again</p>
      <button onClick={() => history.push("/signin")}>Back to Login</button>
    </div>
  );
};
