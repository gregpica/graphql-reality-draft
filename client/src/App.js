import React, { Component } from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Show from './containers/Show';
import SelectedShow from './containers/SelectedShow';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div className="App">
            <Show>
              <Switch>
                <Route exact path="/"  />
                <Route path="/show" component={SelectedShow} />
              </Switch>
            </Show>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
