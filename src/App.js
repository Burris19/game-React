import React, { Component } from 'react';
import './App.css';

class App extends Component {


  _renderDivs = (alias, type) => {
    const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return elements.map((element, index) => {
      return (
        <div
          className={`col-1`}
          key={index}
          id={`#${alias}-${element}`}
          style={{ 'background': 'red' }}>
          {this._renderImage(type, index)}
        </div>
      )
    })
  }

  _renderImage = (type, index) => {
    if (type === 'row') {
      return (
        <img
          src="/images/way.jpg"
          alt="Smiley face"
          width="100"
          height="75" />
      )
    } else {
      const allowIndex = [0, 8]
      if (allowIndex.includes(index)) {
        return (
          <img
            src="/images/way.jpg"
            alt="Smiley face"
            width="100"
            height="75" />
        )
      }
    }
  }

  _renderMap = () => {
    const rows = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    return rows.map((row) => {
      const type = row === 'one' || row === 'nine' ? 'row' : 'colum'
      return (
        <div className="row">
          {this._renderDivs(row, type)}
        </div>
      )
    })
  }

  render() {
    return (
      <div className="container">
        {this._renderMap()}
      </div>
    )
  }
}


export default App;
