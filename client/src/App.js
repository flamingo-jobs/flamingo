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
          <Route path="(/|/jobs|/employer|/employee|/jobDescription|/admin/categories)" exact>
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
}

export default App;
