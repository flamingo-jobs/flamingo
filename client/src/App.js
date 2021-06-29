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
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Route path="(/|/jobs|/employer|/employee|/jobDescription|/createJob|/admin|/organizations|/people)">
            <Base />
          </Route>
          <Route path="/signIn">
            <SignInSide />
          </Route>
          <Route path="/getHired">
            <GetHired />
          </Route>
          <Route path="/startHiring">
            <StartHiring />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
