import SignInSide from "./signIn/components/SignInSide.js";
import GetHired from "./getHired/GetHired";
import StartHiring from "./startHiring/StartHiring.js";
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./Theme";
import { Route, BrowserRouter } from "react-router-dom";
import Base from "./Base";
import Users from "./Users";
import BACKEND_URL from "./Config.js";
import ScrollToTop from "./components/ScrollToTop.js";
import ProfileSetup from "./getHired/ProfileSetup"
const jwt = require("jsonwebtoken");

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <Route path="(/|/jobs|/employer|/jobseeker|/jobDescription|/createJob|/admin|/organizations|/people|/job)">
            <Base />
          </Route>
          <Route path="/signIn">
            <SignInSide />
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
