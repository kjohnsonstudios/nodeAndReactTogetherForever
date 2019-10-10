import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    response: null,
    post: ''
  };
  
  componentDidMount() {
    this.fetchPeople()
      .then(res => this.setState({ response: JSON.parse(res.express) }))
      .catch(err => console.log(err));
  }
  
  fetchPeople = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  
  searchList = async (e) => {
    e.preventDefault();
    this.setState({ post: e.target.value})
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: e.target.value }),
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState({ response: JSON.parse(body.express) });
  };
  
render() {
  let { response, post } = this.state;
    return (
      <div className="App">
        <form onSubmit={this.searchList}>
          <p><strong>Search:</strong></p>
          <input
            type="text"
            value={post}
            onChange={(e) => this.searchList(e)} />
          <button type="submit">Submit</button>
        </form>
        {response && response.results.map(user =>
          <div key={user.name} style={{ border: 'solid 1px black', width: 300, display: 'inline-block', margin: 10 }}>
            {/* <img src={user.image} /> */}
            <h3>{user.name}</h3>
            <h4>{user.birth_year}</h4>
          </div>
        )}
      </div>
    );
  }
}

export default App;