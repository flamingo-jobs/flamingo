import SignInSide from "./signIn/components/SignInSide.js";
import GetHired from "./getHired/GetHired.js";
import StartHiring from "./startHiring/StartHiring.js";
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./Theme";
import { Route, BrowserRouter } from "react-router-dom";
import Base from "./Base";
import Users from "./Users";
import BACKEND_URL from "./Config.js";

const jwt = require("jsonwebtoken");

function App() {
  //Redirect user to signin page if not logged in
  const token = sessionStorage.getItem("userToken");
  if (!token) {
    return (
      <div className="App">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Route
              path="(/|/jobs|/jobDescription|/people|/organizations)"
              exact
            >
              <Base />
            </Route>
            <Route path="/signIn" exact>
              <SignInSide />
            </Route>
            <Route path="/getHired" exact>
              <GetHired />
            </Route>
            <Route path="/startHiring" exact>
              <StartHiring />
            </Route>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    );
  } else {
    const header = jwt.decode(token, { complete: true });
    const role = header.payload.userRole;
    switch (role) {
      case "employer":
        return (
          <div className="App">
            <BrowserRouter>
              <ThemeProvider theme={theme}>
                <Route
                  path="(/|/employer|/jobDescription|/createJob|/categories|/organizations)"
                  exact
                >
                  <Base />
                </Route>
                <Route path="/signIn" exact>
                  <SignInSide />
                </Route>
                <Route path="/startHiring" exact>
                  <StartHiring />
                </Route>
              </ThemeProvider>
            </BrowserRouter>
          </div>
        );
      case "jobseeker":
        return (
          <div className="App">
            <BrowserRouter>
              <ThemeProvider theme={theme}>
                <Route
                  path="(/|/jobs|/jobseeker|/jobDescription|/categories|/organizations)"
                  exact
                >
                  <Base />
                </Route>
                <Route path="/signIn" exact>
                  <SignInSide />
                </Route>
                <Route path="/getHired" exact>
                  <GetHired />
                </Route>
              </ThemeProvider>
            </BrowserRouter>
          </div>
        );
      case "admin":
        return (
          <div className="App">
            <BrowserRouter>
              <ThemeProvider theme={theme}>
                <Route
                  path="(/|/jobs|/employer|/jobseeker|/jobDescription|/createJob|/admin/categories|/organizations|/people|/admin/technologies)"
                >
                  <Base />
                </Route>
                <Route path="/signIn" exact>
                  <SignInSide />
                </Route>
                <Route path="/getHired" exact>
                  <GetHired />
                </Route>
                <Route path="/startHiring" exact>
                  <StartHiring />
                </Route>
                <Route path="/users" exact>
                  <Users />
                </Route>
              </ThemeProvider>
            </BrowserRouter>
          </div>
        );
      default:
        return (
          <div>
            <h1>404 error!</h1>
            <p>Role not found</p>
          </div>
        );
    }
  }
}

export default App;
