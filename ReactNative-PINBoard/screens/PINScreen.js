import React from 'react';
import { AppRegistry, ScrollView, Text, View, Button } from 'react-native';
import { PINBoard } from '../screens/PINBoard';
import { stylesPinScreen } from '../screens/PINStyles'
import '../screens/PINActions'
import {PinScreenStore} from '../screens/PINStore'
import { PinState, PIN_SCREEN_STATUSES } from '../screens/PINActions';
import { PINScreenHeader } from '../screens/PINScreenHeader';

class PINScreen extends React.Component {
  static navigationOptions = {
    title: 'PIN Board Test',
  };

  // statuses = new Array(
  //   { id: 0, text: "New PIN Entry"},  //the default starting one
  //   { id: 1, text: "New PIN Confirmation"},
  //   { id: 2, text: "PIN Test"}
  // );

  store; //= new PinScreenStore();

  constructor(props) {
    super(props);

    this.storeStateChange = this.storeStateChange.bind(this);
    var storeProps = { storeStateChange: this.storeStateChange };
    this.store = new PinScreenStore(storeProps);
    
    var storeState = this.store.getState();
    storeState = storeState != null ? storeState : new PinState();
    this.state = {
      status: storeState.status,
      currentPin: storeState.currentPin,
      savedPin: storeState.savedPin,
      errText: ""
    }

    this.handlePINEnter = this.handlePINEnter.bind(this);
    this.handleClearSavedPin = this.handleClearSavedPin.bind(this);
  }

  // Determines the status of the regime
  getStatus()
  {
    // when no saved Pin, we go into the entry of new Pin
    return this.store.getStatus();
  }

  getStatusText()
  {
    return this.store.getStatusText();
    //return this.statuses[this.state.status].text;
  }

  // Process the change of store state after an action.
  storeStateChange()
  {
    console.info('UI state changing');
    var storeState = this.store.getState();
    if ( (storeState !== null) && (storeState.status === PIN_SCREEN_STATUSES.STATUS_TEST && storeState.savedPin !== null) )
    {
      this.store.saveStatePersisted();
    }

    // Update the UI state.
    console.log("result:" + storeState.lastResult)
    var newUIState = { status: storeState.status,
      currentPin: storeState.currentPin,
      savedPin: storeState.savedPin,
      lastResult: storeState.lastResult
    };
    this.setState(newUIState);
    console.log(newUIState);
    console.log('UI state changed');
    this.forceUpdate();
    console.log('UI refreshed');
  }

  handlePINEnter(value)
  {
    console.log("Dispatching enter (see current state)");
    var state = this.store.getState();
    console.log(state);
    if (state.status === PIN_SCREEN_STATUSES.STATUS_NEW || state.status == null)
    { this.store.runActionEntry(state.currentPin, value); }
    else if (state.status === PIN_SCREEN_STATUSES.STATUS_CONFIRM)
    { this.store.runActionConfirm(state.currentPin, value) }
    else if (state.status === PIN_SCREEN_STATUSES.STATUS_TEST)
    { this.store.runActionTest(state.savedPin, value) }
    else if (state.status === PIN_SCREEN_STATUSES.STATUS_TEST_SUCCESS)
    { this.store.runActionTest(state.savedPin, value) }
    

    console.log("Dispatched enter");
    var state2 = this.store.getState();
    console.log(state2);

    // Old code that worked with if status then action.
    // if (this.state.status === 0) // new PIN entry
    // {
    //   this.setState({ currentPin: value, savedPin: null, status: 1, errText: ""});
    // }
    // else if (this.state.status === 1)
    // {
    //   if ( value === this.state.currentPin)
    //   {
    //     // save the PIN
    //     this.setState({ currentPin: null, savedPin: value, status: 2, errText: ""});
    //   }
    //   else
    //   {
    //     this.setState({ currentPin: null, savedPin: null, status: 0, errText: "Confirmation failed."});
    //   }
    // }
    // else if (this.state.status === 2) // pin test
    // {
    //   if (value === this.state.savedPin) // Success
    //   {
    //     this.setState({ currentPin: null, status: 2, errText: "Great!"});
    //   }
    //   else
    //   {
    //     this.setState({ currentPin: null, status: 2, errText: "Failure!"})
    //   }
    // }
  }

  handleClearSavedPin(e)
  {
    this.store.runActionClear();
    // Old code that worked with if status then action.
    //this.setState({ currentPin: null, savedPin: null, status: 0, errText: "PIN Deleted."});
  }

  // Convert Pin to text. isRenderSaved = true, renders saved pin, otherwise renders current
  // renderPINtoText(isRenderSaved)
  // {
  //   var status = this.state;
  //   if (status != null)
  //   {
  //     if (isRenderSaved)
  //     {
  //       return (status.savedPin ? status.savedPin.toString() : "None"); // + " : " + this.store.getStatus().savedPin;
  //     }
  //     else
  //     {
  //     return status.currentPin ? status.currentPin.toString() : "None"; // + " : " + this.store.getStatus().currentPin;;
  //     }
  //   }
  //   else
  //   {
  //     return "N/A";
  //   }
  // }

  render() {
     return (
     <ScrollView pagingEnabled={true}>
      <View  style={stylesPinScreen.container}>
        <PINScreenHeader onClear={this.handleClearSavedPin}
              currentPin={this.state.currentPin} savedPin={this.state.savedPin}
              status={this.state.status}         lastResult={this.state.lastResult}   />

        <View style={stylesPinScreen.board}>
          <PINBoard length="4" onEnterPin={this.handlePINEnter} />
        </View>
      </View>
     </ScrollView>
     );
  }
}

//AppRegistry.registerComponent('AwesomeProject', () => PINScreen);

export { PINScreen };