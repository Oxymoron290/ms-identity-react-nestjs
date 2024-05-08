import logo from './logo.svg';
import './App.css';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';
import AuthenticatedComponent from './components/AuthenticatedComponent';
import Orders from './components/Orders';
import BakeryMenu from './components/BakeryMenu';

function App() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.error(e);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <BakeryMenu />
        {isAuthenticated && <Orders />}
        <hr />
        {isAuthenticated ? (
          <AuthenticatedComponent />
        ) : (
          <button onClick={handleLogin}>Sign In</button>
        )}
      </header>
    </div>
  );
}

export default App;
