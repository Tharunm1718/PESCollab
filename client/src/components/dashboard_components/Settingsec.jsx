import Header from "./Header";
import { useParams } from "react-router-dom";
import Formcomponent from "./Settingformcomponent";
import { UserPen } from "lucide-react"
import { useState, useEffect } from "react";

function SettingSection() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userUSN, setUserUSN] = useState("");
    const [userAbout, setUserAbout] = useState("");
    const [userPassword, setUserPassword] = useState("");

    useEffect(() => {
        const response = async () => {
            try {
                const res = await fetch('http://localhost:3000/settings', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                console.log(data);
                setUserName(data.settings.name);
                setUserEmail(data.settings.email);
                setUserUSN(data.settings.usn);
                setUserAbout(data.settings.about_me);
                setUserPassword(data.settings.password);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        response();
    }, []);
    return (
        <div className="right-section">
            <div className="rectangle-bg">
                <Header title="SETTINGS" />
                <div className="divider-line"></div>
                <div className="Profile-info">
                    <Formcomponent className="Name" userValue={userName} />
                    <Formcomponent className="Email" userValue={userEmail} />
                    <Formcomponent className="USN" userValue={userUSN} />
                    <Formcomponent className="About-Me" userValue={userAbout} />
                    <Formcomponent className="Password" userValue={userPassword} />
                </div>
                <div className="btn-container">
                    <button className="save-btn">Edit Profile</button>
                    <button className="logout-btn">Log Out</button>
                </div>
            </div>
        </div>
    );
}

export default SettingSection;