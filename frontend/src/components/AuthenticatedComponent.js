import React from 'react';
import { useMsal, useAccount } from '@azure/msal-react';

const AuthenticatedComponent = () => {
  const { accounts } = useMsal();
  const account = useAccount(accounts[0]);

  return (
    <div>
      {account ? <p>Welcome, {account.name}!</p> : <p>You are not signed in.</p>}
    </div>
  );
};

export default AuthenticatedComponent;
