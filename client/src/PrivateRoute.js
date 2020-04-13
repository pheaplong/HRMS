import React, { useEffect, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserAccountContext from './context/UserAccount/UserAccountContext'
import alertContext from './context/alert/alertContext'
const PrivateRoute = ({ component: Component, ...rest }) => {
   const { isAuthenticated, loading } = useContext(UserAccountContext);
   const { setAlert } = useContext(alertContext)
   useEffect(() => {
      !isAuthenticated && setAlert('Authorization', 'You have no Authorization to access this!')
   })
   return (
      <Route
         {...rest}
         render={props =>
            !isAuthenticated ? (<Redirect to='/' />) : (<Component {...props} />)
         }
      />
   );
};

export default PrivateRoute;
