import React, { Component } from 'react';
import Home from './Home';
import Welcome from './Welcome';
import About from './About';
import ProtectedPage from './ProtectedPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <div>
     
         <BrowserRouter>
          <Switch>
          
              <Route exact  path="/" component={Home} />
            <ProtectedPage path="/welcome" component={Welcome}/>
            <Route path="/about" component={About}/>
            <Route render={
              ()=>{
              return( <h1>404 page not found</h1>)
              }
            }/>

          </Switch>
        </BrowserRouter>
      </div>

    );
  }
}
export default App