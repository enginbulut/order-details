/* eslint-disable */
"use strict";
const mongoose = require("mongoose");

const mongoConnectionState = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3
};

const isConnected = state =>
  state === mongoConnectionState.connected ||
  state === mongoConnectionState.connecting;

const connect = async () => {
  try {
    if (!isConnected(mongoose.connection.readyState)) {
      mongoose.Promise = require("bluebird");
      await mongoose.connect(process.env.MONGOURI, {
        socketTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        keepAlive: 1000
      });
      console.log("Connected to MongoDB.");
      return isConnected(mongoose.connection.readyState);
    }
  } catch (ex) {
    console.log("Connection Exception : " + ex.message);
  }
};

module.exports = {
  connect: connect,
  mongoConnectionState: mongoConnectionState
};
