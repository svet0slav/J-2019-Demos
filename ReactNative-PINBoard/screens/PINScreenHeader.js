import React from 'react';
import { Text, View, Button } from 'react-native';
import { stylesPinScreen } from '../screens/PINStyles'
import '../screens/PINActions';
import { PIN_SCREEN_STATUSES } from '../screens/PINActions';

class PINScreenHeader extends React.Component {
    constructor(props) {
      super(props);
      this.handleClearSavedPin = this.handleClearSavedPin.bind(this);
      this.state = {
        currentPin: props.currentPin,
        savedPin: props.savedPin,
        status: props.status,
        lastResult: props.lastResult
      }
    }

    // Decide when to refresh
    componentWillReceiveProps(props) {
        console.log("Header received props");
        console.log(props);
        if (props.currentPin != this.state.currentPin || props.savedPin != this.state.savedPin 
            || props.status != this.state.status || props.lastResult != this.state.lastResult)
            {
            this.setState({
                    currentPin: props.currentPin,
                    savedPin: props.savedPin,
                    status: props.status,
                    lastResult: props.lastResult
                });
            //this.forceUpdate();
        }
      }

    getStatusText()
    {
        var status = this.state.status;
        return PIN_SCREEN_STATUSES.getStatusText(status);
    }

    renderPINtoText(isRenderSaved)
    {
        var status = this.state;
        if (status != null)
        {
        if (isRenderSaved)
        {
            return (status.savedPin ? status.savedPin.toString() : "None"); // + " : " + this.store.getStatus().savedPin;
        }
        else
        {
        return status.currentPin ? status.currentPin.toString() : "None"; // + " : " + this.store.getStatus().currentPin;;
        }
        }
        else
        {
        return "N/A";
        }
    }

    handleClearSavedPin(e)
    {
        if (this.props.onClear)
        {
            this.props.onClear();
        }
    }


    render() {
        return (
        <View style={stylesPinScreen.textMessages}>
          <View>
          <Text>Status:</Text>
          <Text style={stylesPinScreen.textMessage}>{this.getStatusText()}</Text>
          <Text>Result:</Text>
          <Text style={stylesPinScreen.textMessage}>{this.state.lastResult}</Text>
          </View>
          <View>
          <Text style={stylesPinScreen.textMessage}>Saved PIN: {this.renderPINtoText(true)}</Text>
          
          <Text style={stylesPinScreen.textMessage}>New PIN: {this.renderPINtoText(false)}</Text>
          <Button style={stylesPinScreen.clearPin} 
            onClick={this.handleClearSavedPin} 
            onPress={this.handleClearSavedPin}
            title="Clear PIN" />
          </View>
        </View>
        );
    }
}

export { PINScreenHeader };