"use strict";
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const RoleType = Object.freeze({
  Guest: 0,
  Admin: 1
});

const getGravatar = email => {
  const avatar = gravatar.url(email, {
    s: "200", //Size
    r: "pg", //Rating
    d: "mm" //default
  });
  return avatar;
};

const getHash = password => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const compareHash = (item1, item2) => {
  const isMatched = bcrypt.compareSync(item1, item2);
  return isMatched;
};

const signPayload = payload => {
  //sign token
  const token = jwt.sign(payload, process.env.SECRETORKEY, { expiresIn: 3600 });
  return token;
};

module.exports = {
  getGravatar,
  getHash,
  compareHash,
  signPayload,
  RoleType
};
