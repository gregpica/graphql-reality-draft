import React, { Component } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import ShowActionBar from './containers/ShowActionBar';
import SelectedShow from './containers/SelectedShow';
import NewShow from './containers/NewShow';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <ShowActionBar>
              <Switch>
                <Route exact path="/"  />
                <Route exact path="/show/new" component={NewShow} />
                <Route path="/show" component={SelectedShow} />
              </Switch>
            </ShowActionBar>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
