import Home from './home/Home';
import SignInSide from './signIn/components/SignInSide.js';
import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import theme from './Theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>

        <SignInSide />
      </ThemeProvider>
    </div>
  );
}

export default App;
