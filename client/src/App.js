import Home from './home/Home';
import SignInSide from './signIn/components/SignInSide.js';
import Profile from './employee/components/Profile';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './Theme';
import { Route, BrowserRouter } from 'react-router-dom';
import Jobs from './jobs/Jobs';


function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <ThemeProvider theme={theme}>
        <Route path="/" exact>
            <Home />
            </Route>
          <Route path="/signIn" exact>
            <SignInSide />
            </Route>
            <Route path="/jobs" exact>
            <Jobs />
            </Route>
            <Route path="/employee" exact>
              <Profile />
            </Route>
        </ThemeProvider>
        </BrowserRouter>
    </div>
    
  );
}

export default App;
