import React from 'react';
import { Accounts } from 'meteor/accounts-base';

export default (props) => {
  return (
    <div className="title-bar">
      <div className="title-bar__content">
        <h1 className="title-bar__title">{props.title}</h1>
        <button className="button button--link-text" onClick={() => Accounts.logout()}>Logout</button>
      </div>
    </div>
  );
}