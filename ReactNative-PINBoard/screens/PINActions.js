import React from 'react';
import { combineReducers } from 'redux'

export class PIN_SCREEN_ACTIONS {
    static ACTION_TYPE = 'PIN_SCREEN'
    static ACTION_START = 0; //the default one when app starts.
    static ACTION_ENTRY = 1;
    static ACTION_CONFIRM = 2;
    static ACTION_TEST = 3;
    static ACTION_CLEAR = 4;

// List of actions for PIN screen object.
    static ACTIONS = new Array(
    { type: PIN_SCREEN_ACTIONS.ACTION_TYPE, id: PIN_SCREEN_ACTIONS.ACTION_START, text: "Application started"},  //the default starting one
    { type: PIN_SCREEN_ACTIONS.ACTION_TYPE, id: PIN_SCREEN_ACTIONS.ACTION_ENTRY, text: "PIN Entry"},
    { type: PIN_SCREEN_ACTIONS.ACTION_TYPE, id: PIN_SCREEN_ACTIONS.ACTION_CONFIRM, text: "PIN Confirm"},
    { type: PIN_SCREEN_ACTIONS.ACTION_TYPE, id: PIN_SCREEN_ACTIONS.ACTION_TEST, text: "PIN Test"},
    { type: PIN_SCREEN_ACTIONS.ACTION_TYPE, id: PIN_SCREEN_ACTIONS.ACTION_CLEAR, text: "PIN Clear"}
  );
}

export class PinScreenAction
{
    type = PIN_SCREEN_ACTIONS.ACTION_TYPE;
    id;
    text;
    currentPin;
    pin;

    constructor() {
        type = PIN_SCREEN_ACTIONS.ACTION_TYPE;
        id = PIN_SCREEN_ACTIONS.ACTIONS[0].id;
        text = PIN_SCREEN_ACTIONS.ACTIONS[0].text;
        currentPin = null;
        pin = null;
    }

    // function to create action object. Must work with specific middleware to use objects.
    static createAction(id, currPin = null, pinData = null)
    {
        var data = PIN_SCREEN_ACTIONS.ACTIONS.find( a => a.id === id);
        if (data !== null)
        {
          return {
            type : data.type,
            id : data.id,
            text : data.text,
            currentPin: currPin,
            pin : pinData
          }
        }
        else
        {
            alert("Invalid action id");
            console.log("Invalid action id "); 
            console.log(id);
            return {
              type : PIN_SCREEN_ACTIONS.ACTION_TYPE,
              id : PIN_SCREEN_ACTIONS.ACTION_START,
              text : PIN_SCREEN_ACTIONS.ACTIONS[PIN_SCREEN_ACTIONS.ACTION_START].text,
              currentPin: currPin,
              pin : pinData
            }
        }
        return action;
    }

    static createActionStart(pin)
    {
        return PinScreenAction.createAction(PIN_SCREEN_ACTIONS.ACTION_START, pin, null);
    }

    static createActionEntry(currPin, pin)
    {
      return PinScreenAction.createAction(PIN_SCREEN_ACTIONS.ACTION_ENTRY, currPin, pin);
    }

    static createActionConfirm(currPin, pin)
    {
      return PinScreenAction.createAction(PIN_SCREEN_ACTIONS.ACTION_CONFIRM, currPin, pin);
    }

    static createActionTest(currPin, pin)
    {
      return PinScreenAction.createAction(PIN_SCREEN_ACTIONS.ACTION_TEST, currPin, pin);
    }

    static createActionClear()
    {
        return PinScreenAction.createAction(PIN_SCREEN_ACTIONS.ACTION_CLEAR, null, null);
    }
}

// List of statuses for PIN screen object.
export class PIN_SCREEN_STATUSES {
    static STATUS_NEW = 0;
    static STATUS_CONFIRM = 1;
    static STATUS_TEST = 2;
    static STATUS_TEST_SUCCESS = 3;

    // List of statuses for PIN screen object.
    static STATUSES = new Array(
        { id: PIN_SCREEN_STATUSES.STATUS_NEW, text: "New PIN"},  //the default starting one
        { id: PIN_SCREEN_STATUSES.STATUS_CONFIRM, text: "PIN Confirmation"},
        { id: PIN_SCREEN_STATUSES.STATUS_TEST, text: "PIN Test"},
        { id: PIN_SCREEN_STATUSES.STATUS_TEST_SUCCESS, text: "PIN Success"}
    );

    static getStatusText(status) {
      var state = PIN_SCREEN_STATUSES.STATUSES[status];
      if (state != undefined && state != null)
      {
        return state.text;
      }
      else
        return "unknown";
    }
}

// Class for the PIN Data state and pin saved in the storage.
export class PinScreenState {
    // The Pin saved in the storage.
    savedPin;
    currentPin;
    status;
    lastResult;

    constructor() {
      this.status = PIN_SCREEN_STATUSES.STATUS_START;
      this.savedPin = null;
      this.currentPin = null;
      this.lastResult = "";
    }

    static initialState() {
      let r = { status: PIN_SCREEN_STATUSES.STATUS_START, savedPin: null, currentPin: null, lastResult: "" };
      return r;
    }
}

function PinScreenActionPrint(action)
{
  if (action === null || (typeof action === 'undefined'))
  {
    return "action: unknown";
  }
  else {
    var s = "id=" + action.id + ", text=" + action.text; // ((action.id !== null && (typeof action.id !=='undefined')) ? action.id.toString() : "N/A");
    s = s + ", currentpin=" + action.currentPin;
    s = s + " pin=" + action.pin;
    return s;
  }
}

// how saved pin updates
export function PinScreenActionChangeSavedPin(state = null, action) {
  console.log("Reducer saved pin: " + PinScreenActionPrint(action));
    switch (action.id) {
      case PIN_SCREEN_ACTIONS.ACTION_START:
        return state;
      case PIN_SCREEN_ACTIONS.ACTION_ENTRY:
        // if new pin entered, leave the same as before
        return state;
      case PIN_SCREEN_ACTIONS.ACTION_CONFIRM:
        if ( action.currentPin === action.pin)
        { // after successful confirmation, save the PIN
          return action.pin;
        }
        else    // when confirmation fails, leave as it was.
        {
          return state;
        }
      case PIN_SCREEN_ACTIONS.ACTION_TEST:
        if (state === action.pin)
        { // successful test
          return state;
        }
        else
        {
          return state;
        }
      case PIN_SCREEN_ACTIONS.ACTION_CLEAR:
        return null;
      default:
        return state;
    }
  }

//change savedPin
export function PinScreenActionChangeCurrentPin(state = null, action) {
  console.log("Reducer current pin: "  + + PinScreenActionPrint(action));
    switch (action.id) {
      case PIN_SCREEN_ACTIONS.ACTION_START:
        return null;
      case PIN_SCREEN_ACTIONS.ACTION_ENTRY:
        // if new pin entered, save id
        return action.pin;
      case PIN_SCREEN_ACTIONS.ACTION_CONFIRM:
        if ( action.currentPin === action.pin)
            { // after successful confirmation, save the PIN, clear current
              return null;
            }
            else    // when confirmation fails, clear.
            {
                return null;
            }
      case PIN_SCREEN_ACTIONS.ACTION_TEST:
          if (action.currentPin === action.pin) //test saved with entered pin
          {
            return null;
          }
          else
          {
            return null;
          }
      case PIN_SCREEN_ACTIONS.ACTION_CLEAR:
        return null;
      default:
        return state;
    }
  }

//change currentPin
export function PinScreenActionChangeStatus(state = null, action) {
  console.log("Reducer status: " + PinScreenActionPrint(action));
    switch (action.id) {
      case PIN_SCREEN_ACTIONS.ACTION_START:
        return (action.pin != null) ? PIN_SCREEN_STATUSES.STATUS_TEST : PIN_SCREEN_STATUSES.STATUS_NEW; //if has pin, go to test, otherwise new entry.
      case PIN_SCREEN_ACTIONS.ACTION_ENTRY:
        return PIN_SCREEN_STATUSES.STATUS_CONFIRM;
        
      case PIN_SCREEN_ACTIONS.ACTION_CONFIRM:
          if ( action.currentPin === action.pin)
          { // after successful confirmation, save the PIN and test
            return PIN_SCREEN_STATUSES.STATUS_TEST
          }
          else // when confirmation fails.
          {
            return PIN_SCREEN_STATUSES.STATUS_NEW
          }
      case PIN_SCREEN_ACTIONS.ACTION_TEST:
          if (action.currentPin === action.pin) //test saved with entered pin
          {
            return PIN_SCREEN_STATUSES.STATUS_TEST_SUCCESS
          }
          else
          {
            return PIN_SCREEN_STATUSES.STATUS_TEST
          }
      case PIN_SCREEN_ACTIONS.ACTION_CLEAR:
        return PIN_SCREEN_STATUSES.STATUS_NEW; //enter pin again
      default:
        return state; //state;
    }
  }

  // how last Result updates
export function PinScreenActionChangeLastResult(state = null, action) {
  console.log("Reducer last result: "  + PinScreenActionPrint(action));
  console.log("State and action:", state, action);
    switch (action.id) {
      case PIN_SCREEN_ACTIONS.ACTION_START:
        return "Started";
      case PIN_SCREEN_ACTIONS.ACTION_ENTRY:
        // if new pin entered, leave the same as before
        return "Entered new PIN";
      case PIN_SCREEN_ACTIONS.ACTION_CONFIRM:
        if ( action.currentPin === action.pin)
        { // after successful confirmation, save the PIN
          return "Confirmed. Saved.";
        }
        else    // when confirmation fails.
        {
          return "Wrong. Again!";
        }
      case PIN_SCREEN_ACTIONS.ACTION_TEST:
        if (action.currentPin === action.pin)
        { // successful test
          return "Successful!";
        }
        else
        {
          return "Failed. Try again!";
        }
      case PIN_SCREEN_ACTIONS.ACTION_CLEAR:
        return "Cleared";
      default:
        return state;
    }
  }

const PinScreenActionApp = combineReducers({
    savedPin: PinScreenActionChangeSavedPin,
    currentPin: PinScreenActionChangeCurrentPin,
    lastResult: PinScreenActionChangeLastResult,
    status: PinScreenActionChangeStatus
   });

export { PinScreenActionApp };


// old code
// export function PinScreenActionChangeState(state = null, action) {
//     switch (action.type) {
//       case PIN_SCREEN_ACTIONS.ACTION_START:
//         return [
//           ...state,
//           {
//             currentPin: null,
//             savedPin: action.pin,
//             status: (action.pin) ? PIN_SCREEN_STATUS.STATUS_TEST : PIN_SCREEN_STATUS.STATUS_NEW //if has pin, go to test, otherwise new entry.
//           }
//         ];
//       case PIN_SCREEN_ACTIONS.ACTION_ENTRY:
//         if (state.status === PIN_SCREEN_STATUS.STATUS_NEW)
//         {
//             // if new pin entered, save id
//             return [ ...state, {
//                 currentPin: action.pin,
//                 status: PIN_SCREEN_STATUS.STATUS_CONFIRM
//             }];
//         }
//         else if (state.status === PIN_SCREEN_STATUS.STATUS_CONFIRM)
//         {
//             if ( action.pin === state.currentPin)
//             { // after successful confirmation, save the PIN
//               return [ ...state, {
//                   currentPin: null,
//                   savedPin: action.pin,
//                   status: PIN_SCREEN_STATUS.STATUS_TEST
//                 }];
//             }
//             else    // when confirmation fails.
//             {
//                 return [ ...state, {
//                       currentPin: null,
//                       savedPin: null,
//                       status: PIN_SCREEN_STATUS.STATUS_NEW //enter pin again
//                 }];
//             }
//         }
//         else if (state.status === PIN_SCREEN_STATUS.STATUS_TEST)
//         {
//             // testing does not change the status.
//             return state;
//         }
//       case PIN_SCREEN_ACTIONS.ACTION_CLEAR:
//         return [ ...state, {
//             currentPin: null,
//             savedPin: null,
//             status: PIN_SCREEN_STATUS.STATUS_NEW //enter pin again
//         }];
//       default:
//         return state
//     }
//   }