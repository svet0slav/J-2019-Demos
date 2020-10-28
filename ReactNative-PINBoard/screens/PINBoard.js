import React from 'react';
import { AppRegistry, Text, View, Button, TouchableOpacity } from 'react-native';
import { stylesPinBoard } from './PINStyles'

class PINBoard extends React.Component {
    constructor(props) {
      super(props);
      this.handleEnter = this.handleEnter.bind(this);
      var length = props.length ? props.length : 4;
      this.state = {
        currentDigit: 0,
        current: Array(1).fill(0),
        length: length
      }
      this.state.current[length-1] = 0; //extend the array
      this.state.current.fill(0);
    }

    handleClick(value, e)
    {
      // shift digits to left
      var curr = this.state.current.slice();
      var lastIndex = curr.length - 1;
      for (let i = 0; i < lastIndex; i++)
      {
        curr[i] = curr[i+1];
      }
      //add last digit at the end
      curr[lastIndex] = value;
      this.setState({ currentDigit: value, current: curr})
    }

    clearCurrentDigits()
    {
      console.log("Clear digits");
      var len = this.state.length;
      var newState = { currentDigit: 0, current: Array(1).fill(0), length: len };
      newState.current[len-1] = 0;
      newState.current.fill(0);
      this.setState(newState);
    }

    handleEnter(e)
    {
      //send the data to upper module
      if (this.props.onEnterPin)
      {
        var pinValue = this.state.current.slice().join("");
        console.log("Enter " + pinValue);
        this.props.onEnterPin(pinValue);
        this.clearCurrentDigits();
      }
    }

    handleCancel(e)
    {
      this.clearCurrentDigits();
    }

    renderSquare(props) {
      return (
        <View style={stylesPinBoard.square} onPress={(e) => this.handleClick(props.value, e)}>
         <TouchableOpacity onPress={(e) => this.handleClick(props.value, e)} style={{backgroundColor: '#CCC'}}
            hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}>
           <Text style={stylesPinBoard.squareText}>{props.title}</Text>
         </TouchableOpacity>
        </View>
      );
    }

    renderCurrent()
    {
      var currEntry = "";
      var curr = this.state.current.slice();
      currEntry = curr.join("");
      return (
        <View>
        {/* <Text>Current number: {this.state.currentDigit.toString()}  Current entry: {currEntry} (L{this.state.length.toString()})</Text> */}
        <Text style={{fontSize: 24}}>Current: {currEntry}</Text>
        </View>
      );
    }
  
    render() {
      //const styles = this.stylesPinBoard;
      return (
        <View style={stylesPinBoard.boardContainer}>
          <View style={stylesPinBoard.caption}>
            <Text >PIN board. Enter PIN below (L{this.state.length.toString()})</Text>
          </View>
          <View style={stylesPinBoard.status}>
            {this.renderCurrent()}
          </View>
          <View style={stylesPinBoard.squareBoard}>
              {this.renderSquare({ value: 1, title: "1"})}
              {this.renderSquare({ value: 2, title: "2"})}
              {this.renderSquare({ value: 3, title: "3"})}
              {this.renderSquare({ value: 4, title: "4"})}
              {this.renderSquare({ value: 5, title: "5"})}
              {this.renderSquare({ value: 6, title: "6"})}
              {this.renderSquare({ value: 7, title: "7"})}
              {this.renderSquare({ value: 8, title: "8"})}
              {this.renderSquare({ value: 9, title: "9"})}
              
              <View style={stylesPinBoard.square} onPress={(e) => this.handleCancel(e)}>
                <TouchableOpacity style={stylesPinBoard.squareButton} onPress={(e) => this.handleCancel(e)}>
                  <Text style={stylesPinBoard.squareText}>UNDO</Text>
                </TouchableOpacity>
              </View>

              {this.renderSquare({ value: 0, title: "0"})}

              <View style={stylesPinBoard.square} onPress={(e) => this.handleEnter(e)}>
                <TouchableOpacity style={stylesPinBoard.squareButton} onPress={(e) => this.handleEnter(e)}>
                  <Text style={stylesPinBoard.squareText}>ENTER</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      );
    }

  }

  //AppRegistry.registerComponent('AwesomeProject', () => PINBoard);

export { PINBoard };