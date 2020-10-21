import React from "react";

const NameDisplay = () => {
  return (
    <ProfileContext.Consumer>
      {(value) => <span id="name">{value(1, 2)}</span>}
    </ProfileContext.Consumer>
  );
};
const Profile = () => {
  console.log("this=", this);
  return <NameDisplay />;
};

const props = {
  name: "bui ngoc tai",
  sum: (a, b) => {
    return a + b;
  },
};
const sum = (a, b) => {
  return a + b;
};
const ProfileContext = React.createContext("default Value");
const ContextApi = () => {
  return (
    <ProfileContext.Provider value={props.sum}>
      <Profile />
    </ProfileContext.Provider>
  );
};

export default ContextApi;

// Summary: value có thể là reference obj, functions.
