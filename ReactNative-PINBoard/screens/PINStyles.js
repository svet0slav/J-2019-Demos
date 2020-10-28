import { StyleSheet } from 'react-native';
import Layout from '../constants/Layout';

const containerWidth = Layout.window.width * 0.85;
const messagesWidth = Layout.window.width * 0.80;
const messagesHeight = Layout.window.height * 0.20;

const boardWidth = Layout.window.width * 0.80;
const boardHeight = Layout.window.width * 0.90;

const stylesPinScreen = StyleSheet.create({
  container: {
    width: containerWidth,
    paddingTop: 3,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    backgroundColor: '#f9f',
    alignSelf: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap',
    flexShrink: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textMessages: {
    width: messagesWidth,
    height: messagesHeight,
    marginTop: 1,
    marginBottom: 1,
    backgroundColor: '#f5f',
    fontSize: 14,
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
    color: '#129',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexShrink: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'left'
  },
  textMessage: {
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 5, paddingBottom: 5,
    fontSize: 14,
    fontFamily: 'sans-serif',
    fontWeight: 'normal',
    color: '#129',
    flexWrap: 'nowrap',
    alignSelf: 'flex-start',
    textAlign: 'left'
  },
  board: {
    width: boardWidth,
    height: boardHeight,
    backgroundColor: '#55f',
    margin: 5,
    padding: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DD7',
    shadowColor: '#DC9',
    shadowOffset: {width: 1, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 8,
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearPin: {
    color: '#F00',
    margin: 5,
    width: messagesWidth / 2,
    height: 20,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#DD7',
    borderRadius: 5,
    shadowColor: '#DBA',
    shadowOffset: {width: 1, height: 6},
    shadowOpacity: 0.7,
    shadowRadius: 8,
  }
});

const stylesPinBoard = StyleSheet.create({
  boardContainer: {
    fontSize: 14,
    fontFamily: 'sans-serif',
    backgroundColor: '#FDB',
    flex: 1
  },

  caption: {
    color: '#070',
    backgroundColor: '#FCA',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    textAlign: 'left',
  },

  status: {
    color: '#F70',
    backgroundColor: '#FB9',
    marginBottom: 5,
    paddingLeft: 5, paddingRight: 5,
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    textAlign: 'left',
  },

  squareBoard: {
    backgroundColor: '#FCA',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#FDE',
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 5,
    marginRight: 5,
    flex: 1,
    flexBasis: boardWidth / 4,
    flexDirection: "row",
    flexWrap: 'wrap',
    flexShrink: 3,
    justifyContent: 'space-around',
    alignItems: 'center',
    },

  square: {
    backgroundColor: '#CC3',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#62A',
    borderRadius: 5,
    shadowColor: '#DC9',
    shadowOffset: {width: 2, height: 5},
    shadowOpacity: 0.7,
    shadowRadius: 7,
    color: '#00F',
    minWidth: boardWidth / 5,
    minHeight: boardHeight / 6,
    marginTop: 5,
    marginRight: 5,
    marginBottom: 5,
    marginLeft: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center'
  },

  squareButton: {
    backgroundColor: '#CC3',
    shadowColor: '#DC9',
    shadowOffset: {width: 1, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    flex: 1,
    marginTop: 3,
    marginRight: 3,
    marginBottom: 3,
    marginLeft: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },

  squareText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: '#00F',
    alignItems: 'stretch',
    textAlign: 'center',
    alignSelf: 'center'
  }
});

export { stylesPinScreen, stylesPinBoard };