import SearchBar from './SearchBar';
import NotificationBell from './NotificationBell';
import UserProfile from './UserProfile';
import { useEffect, useState } from 'react';

const Header = (props) => {
  const [userName, setUserName] = useState(null);
  
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    async function go() {
      const res = await fetch(" http://localhost:3000/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: "include"
      });
      const data = await res.json();

      if (data.success) {
        setUserName(data.name);
      } else {
        setUserName("Guest");
      }
    }
    go();
  }, []);

  return (
    <header className="main-header">
      <div className="text-home">{props.title}</div>
      {props.title === "HOME" && <SearchBar />}
      <div className="header-profile-container">
        <NotificationBell />
        <UserProfile name={userName} />
      </div>
    </header>
  );
};

export default Header;