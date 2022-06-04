import {BrowserRouter} from 'react-router-dom'

import Routing from './routes'
import Login from './components/login';
import CallDashboard from './components/CallDashboard';
import { loginStyles } from './css/login.css';

function App() {
  return (
    <BrowserRouter>
    <Routing/>
    </BrowserRouter>
  );
}

export default App;
