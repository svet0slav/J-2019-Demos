import { createStore } from 'redux'
import React from 'react'
import { PinScreenActionApp, PinScreenAction, PIN_SCREEN_STATUSES, PinState } from '../screens/PINActions'
import { PINLocalStorage } from './PINLocalStorage'

class PinScreenStore {
    
    store;
    storeStateChange;
    stateUnsubscribe;

    constructor(props) {
        //super(props);
        this.store = createStore(PinScreenActionApp);
        this.storeStateChange = props.storeStateChange;
        this.stateUnsubscribe = this.store.subscribe(() => this.storeStateChange());
        console.log("Store created");
        //Load the state from the storage
        console.log("Checking local storage");
        PINLocalStorage.loadState2().then((persistedState) => {
                if (persistedState !== null) {
                    console.log("Persisted state is loaded");
                    console.log(persistedState);
                    this.initialize(persistedState);
                }
                else {
                    console.log("Persisted state is missing"); 
                }
            })
            .catch((error) => {
                console.error("Loading saved state failed", error);
            });
    }

    initialize(persistedState)
    {
        var initialState = (persistedState === null) ? null
                            : { savedPin: persistedState.savedPin,
                                currentPin: null,
                                status: PIN_SCREEN_STATUSES.STATUS_TEST,
                                lastResult: "Loaded" };
        console.log("Initial state from storage");
        console.log(initialState);
        if (initialState !== null)
        {
            this.runActionConfirm(initialState.savedPin, initialState.savedPin);
        }
    }

    getState()
    {
        return this.store.getState();
    }

    getStatus()
    {
        var storeState = this.store.getState();
        return storeState.status;
    }

    getStatusText()
    {
        var status = this.getStatus();
        return (status != null) ? PIN_SCREEN_STATUSES.getStatusText(status) : "Unknown";
    }

    saveStatePersisted()
    {
        var state = this.store.getState();
        var data = { savedPin: state.savedPin };
        PINLocalStorage.saveState2(data).then((value) => {
            console.log("Saved state", value);
        }).catch((error) => {
            console.error("Failed persistence. ", error);
            console.log(error);
        });

        console.log(PINLocalStorage.loadState2())
    }

    runActionStart() {
        var storeBeginState = this.store.getState();
        var action = PinScreenAction.createActionStart( storeBeginState ? storeBeginState.savedPin : null);
        console.log("Dispatching action Create");
        console.log(action);
        this.store.dispatch(action);
    }

    runActionEntry(currPin, pin) {
        console.log("Dispatching action ");
        var action = PinScreenAction.createActionEntry(currPin, pin);
        console.log("Action " + action.id.toString() + ":" + action.text);
        console.log("Action PIN " + action.pin);
        this.store.dispatch(action);
        console.log("Dispatched action");
    }

    runActionConfirm(currPin, pin) {
        console.log("Dispatching action ");
        var action = PinScreenAction.createActionConfirm(currPin, pin);
        console.log("Action " + action.id + ":" + action.text);
        console.log("Action PIN " + action.pin);
        this.store.dispatch(action);
        console.log("Dispatched action");
        // Save the PIN when on confirm action the status is TEST (Successfully confirmed)
        var storeEndState = this.store.getState();
        if (storeEndState.status === PIN_SCREEN_STATUSES.STATUS_TEST) // && oldStatus === PIN_SCREEN_STATUSES.STATUS_CONFIRM
        {
            this.saveStatePersisted();
        }
    }

    runActionTest(currPin, pin) {
        var action = PinScreenAction.createActionTest(currPin, pin);
        console.log("Dispatching action Test");
        console.log(action);
        this.store.dispatch(action);
        console.log("Dispatched action");
    }

    runActionClear() {
        this.store.dispatch(PinScreenAction.createActionClear());
        PINLocalStorage.clearState2().then((value) => {
            console.warn("PIN cleared");
        }).catch((error) => {
            console.error("PIN clearing failed.");
        });
    }

    finish()
    {
        // Stop listening to state updates
        this.storeUnsubscribe()
    }
}

export { PinScreenStore }