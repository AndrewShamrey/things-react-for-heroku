import React from "react";
import AllThings from "./components/allThings/allThings";
import "./App.css";
import spinner from "./images/spinner.gif";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      things: null,
      isLoading: false,
    };
    this.updateThings = this.updateThings.bind(this);
  }

  updateThings() {
    this.setState({ isLoading: true });
    fetch("https://safe-garden-89946.herokuapp.com/api/v1/things")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ isLoading: false, things: data });
      });
  }

  componentDidMount() {
    this.updateThings();
  }

  render() {
    const { things, isLoading } = this.state;

    return (
      <div className="App">
        <header>
          <h1>Things-react task</h1>
          <h3>by Andrew Shamrey</h3>
        </header>
        {isLoading && (
          <img src={spinner} className="spinner-gif" alt="loading" />
        )}
        {things && <AllThings things={things} forUpdate={this.updateThings} />}
      </div>
    );
  }
}

export default App;
