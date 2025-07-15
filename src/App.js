import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { CssBaseline } from '@mui/material';
import './App.css';
import { ColorContextProvider } from './components/Theme/Theme';

function App() {
  return (
    <ColorContextProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ColorContextProvider>
  );
}

export default App;