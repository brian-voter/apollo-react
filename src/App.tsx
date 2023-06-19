import React from 'react';
import logo from './logo.svg';
import './App.css';
import { UserList } from './UserList';
import { SignupForm } from './SignupForm';
import NewMessageForm from './NewMessageForm'
import GetMessages from './GetMessages';

function App() {
  return (
    <div className="App">
      <SignupForm />
      <NewMessageForm />
      <GetMessages />
    </div>
  );
}

export default App;
