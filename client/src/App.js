import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Base from "./Base";
import ScrollToTop from "./components/ScrollToTop.js";
import Sample from "./fileUploadSample/Sample";
import GetHired from "./getHired/GetHired";
import ProfileSetup from "./getHired/ProfileSetup";
import { AcceptInvitation } from "./signIn/components/AcceptInvitation.js";
import { ForgotPassword } from "./signIn/components/ForgotPassword.js";
import { ResetPassword } from "./signIn/components/ResetPassword.js";
import SignInSide from "./signIn/components/SignInSide.js";
import StartHiring from "./startHiring/StartHiring.js";
import theme from "./Theme";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <Route path='(/|/jobs|/employer|/jobseeker|/jobDescription|/createJob|/admin|/organizations|/people|/job|/searchResults|/suggestedJobs|/contactUs|/termsOfService|/privacy)'>
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
          <Route path="/sampleUpload">
            <Sample />
          </Route>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
