import React from 'react';
import Square from './Square'
import './App.css';
var TOP_Y = 10;
var BOTTOM_Y = 600;
var LEFT_X = 10;
var RIGHT_X = 700;

class App extends React.Component {

  state = {
    startX: 100,
    startY: 100,
    shiftX: 0,
    shiftY: 0,
    background_color: '#ea4c89',
    border_color: '#864AFC',
    draggable: false
  }

  componentDidMount() {
    let background_color = this.getRandomColorGenerator();
    let border_color = this.getRandomColorGenerator();
    this.setState({
      background_color, border_color
    })
  }


  handleMouseDown = (e) => {

    let squrePosition = document.querySelector('.square');

    this.setState({
      draggable: true,
      shiftX: e.pageX - squrePosition.getBoundingClientRect().left,
      shiftY: e.pageY - squrePosition.getBoundingClientRect().top,
    })
    document.addEventListener('mousemove', this.handleMouseMove);
  }

  handleMouseUp = () => {

    this.setState({
      draggable: false
    })
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  getRandomColorGenerator = () => {
    const color = "#" + ("000000" + (Math.random() * 0x1000000 | 0).toString(16)).substr(-6);
    console.log(color);
    return color;
  }

  handleMouseMove = (e) => {
    let squrePosition = document.querySelector('.square')
    e.stopPropagation();
    e.preventDefault();
    if (!this.state.draggable) return

    let shift = {
      x: this.state.startX - e.clientX,
      y: this.state.startY - e.clientY
    };

    let squreCoordinates = {
      x: squrePosition.offsetLeft,
      y: squrePosition.offsetTop,
    };

    let newX = squreCoordinates.x - shift.x;

    if (LEFT_X < newX && newX < RIGHT_X) {
      this.setState({
        shiftX: this.state.shiftX - shift.x,
        startX: this.state.startX - shift.x,
        background_color: this.getRandomColorGenerator()
      })
    }

    let newY = squreCoordinates.y - shift.y;

    if (TOP_Y < newY && newY < BOTTOM_Y) {

      this.setState({
        shiftY: this.state.shiftY - shift.y,
        startY: this.state.startY - shift.y,
        border_color: this.getRandomColorGenerator()
      })
    }


  }

  render() {
    return (
      <div className="App"
        onMouseUp={this.handleMouseUp}>
        <Square
          x={this.state.startX}
          y={this.state.startY}
          background_color={this.state.background_color}
          border_color={this.state.border_color}
          onMouseDown={e => this.handleMouseDown(e)}
          onMouseUp={this.handleMouseUp}
        />
      </div>
    );
  }

}

export default App;