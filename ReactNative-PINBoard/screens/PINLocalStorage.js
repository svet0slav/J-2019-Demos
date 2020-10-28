import React from 'react'
//import { ls } from 'local-storage'
import { AsyncStorage } from 'react-native'

var localStorage = require('local-storage');

class PINLocalStorageError {
    hasError;
    errText;

    constructor(errText = null) {
        this.hasError = (errText !== null);
        this.errText = (errText !== null) ? errText : "";
    }

    static Success()
    {
        return new PINLocalStorageError();
    }
}

class PINLocalStorage
{
    static PINStorageKey = 'SavedPIN';

    // Returns the state of the saved PIN or error object PINLocalStorageError.
    static loadState1()
    {
        try {
            // var serializedData = localStorage.get(this.PINStorageKey);
            // if (serializedData === null)
            //     { return null; }
            // var data = JSON.parse(serializedData);
            var data = localStorage.get(PINLocalStorage.PINStorageKey);
            return data;
        }
        catch (err) {
            //console.error("Error loading data");
            console.error(err);
            return undefined; //new PINLocalStorageError(err)
        }
    }

    // Saves and returns the error object PINLocalStorageError
    static saveState1(state)
    {
        try {
            // // Get only data from store state to save.
            // var data = state;
            // // Save the data.
            // var serializedData = JSON.stringify(data);
            // setItem(this.PINStorageKey, serializedData);
            localStorage.set(PINLocalStorage.PINStorageKey, state);
            return PINLocalStorageError.Success();
        }
        catch (err) {
            //console.error("Error saving data");
            console.error(err);
            return new PINLocalStorageError("Error: " + err.toString());
        }
    }

    // Clears data and returns the error object PINLocalStorageError
    static clearState1()
    {
        try {
            localStorage.remove(PINLocalStorage.PINStorageKey);
            return PINLocalStorageError.Success();
        }
        catch (err) {
            //console.error("Error saving data");
            console.error(err);
            return new PINLocalStorageError("Error: " + err.toString());
        }
    }

    // Second set of methods that use the AsyncStorage
// Returns the state of the saved PIN or error object PINLocalStorageError.
static async loadState2()
{
    try {
        var serializedData = await AsyncStorage.getItem(PINLocalStorage.PINStorageKey);
        console.log("Get item from storage: ", serializedData);
        if (serializedData === null)
             { return null; }
        var data = JSON.parse(serializedData);
        return data;
    }
    catch (err) {
        //console.error("Error loading data");
        console.error(err);
        return undefined; //new PINLocalStorageError(err)
    }
}

// Saves and returns the error object PINLocalStorageError
static async saveState2(state)
{
    try {
        var data = state;
        // Save the data.
        var serializedData = JSON.stringify(data);
        console.log("Saving item to storage: " + serializedData);
        var result = await AsyncStorage.setItem(PINLocalStorage.PINStorageKey, serializedData);
        return PINLocalStorageError.Success();
    }
    catch (err) {
        //console.error("Error saving data");
        console.error(err);
        return new PINLocalStorageError("Error: " + err.toString());
    }
}

// Clears data and returns the error object PINLocalStorageError
static async clearState2()
{
    try {
        await AsyncStorage.removeItem(PINLocalStorage.PINStorageKey);
        return PINLocalStorageError.Success();
    }
    catch (err) {
        //console.error("Error saving data");
        console.error(err);
        return new PINLocalStorageError("Error: " + err.toString());
    }
}

}

export { PINLocalStorage }