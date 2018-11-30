import React, { Component } from "react";
import "./App.css";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import { insert } from "ramda";
import Card from "./Card";

class App extends Component {
  state = { list: ["apple", "banana", "pear", "peach", "orange"] };
  handleDrop = (target, source) => {
    this.setState(({ list }) => ({
      list: insert(
        list.indexOf(target),
        source,
        list.filter(curr => curr !== source)
      )
    }));
  };

  render() {
    return (
      <section className="ExampleSection">
        <ul className="CardList">
          {this.state.list.map(item => (
            <Card onDrop={this.handleDrop}>
              {item}
            </Card>
          ))}
        </ul>
      </section>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
