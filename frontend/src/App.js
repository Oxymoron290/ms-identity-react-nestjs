import logo from './logo.svg';
import './App.css';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from './utils/authConfig';
import AuthenticatedComponent from './components/AuthenticatedComponent';

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
        <Menu />
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
