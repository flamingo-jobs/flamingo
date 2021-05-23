import Home from './home/Home';
import SignInSide from './signIn/components/SignInSide.js';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './Theme';
import { Route, BrowserRouter } from 'react-router-dom';


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
        </ThemeProvider>
        </BrowserRouter>
    </div>
    
  );
}

export default App;
