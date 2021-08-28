import SignInSide from "./signIn/components/SignInSide.js";
import { ForgotPassword } from "./signIn/components/ForgotPassword.js";
import { ResetPassword } from "./signIn/components/ResetPassword.js";
import { AcceptInvitation } from "./signIn/components/AcceptInvitation.js";
import GetHired from "./getHired/GetHired";
import StartHiring from "./startHiring/StartHiring.js";
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./Theme";
import { Route, BrowserRouter } from "react-router-dom";
import Base from "./Base";
import ScrollToTop from "./components/ScrollToTop.js";
import ProfileSetup from "./getHired/ProfileSetup";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <Route path='(/|/jobs|/employer|/jobseeker|/jobDescription|/createJob|/admin|/organizations|/people|/job|/searchResults|/suggestedJobs|/contactUs)'>
            <Base />
          </Route>
          <Route path="/signIn">
            <SignInSide />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/reset-password/:passwordResetCode">
            <ResetPassword />
          </Route>
          <Route path="/invitation/:passwordResetCode">
            <AcceptInvitation />
          </Route>
          <Route path="/getHired">
            <GetHired />
          </Route>
          <Route path="/setupProfile">
            <ProfileSetup />
          </Route>
          <Route path="/startHiring">
            <StartHiring />
          </Route>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
