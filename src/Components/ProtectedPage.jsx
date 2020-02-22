import React from 'react';
import Auth from './Auth';
import { Redirect, Route} from 'react-router-dom';
var token = localStorage.getItem('token')
const ProtectedPage = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (Auth.getAuthenticated() || token) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
export default ProtectedPage;