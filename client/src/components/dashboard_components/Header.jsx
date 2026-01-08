import React from 'react';
import SearchBar from './SearchBar';
import NotificationBell from './NotificationBell';
import UserProfile from './UserProfile';

const Header = (props) => {
  return (
    <header className="main-header">
      <div className="text-home">{props.title}</div>
      {props.title === "HOME" && <SearchBar />}
      <div className="header-profile-container">
        <NotificationBell />
        <UserProfile name="Tharun M" />
      </div>
    </header>
  );
};

export default Header;