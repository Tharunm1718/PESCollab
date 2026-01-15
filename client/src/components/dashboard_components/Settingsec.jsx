import Header from "./Header";
import Formcomponent from "./Settingformcomponent";
import { UserPen } from "lucide-react"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

function SettingSection({ mode }) {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userUSN, setUserUSN] = useState("");
    const [userAbout, setUserAbout] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const response = async () => {
            try {
                setLoading(true);
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
            } finally {
                setLoading(false);
            }
        };
        response();
    }, []);

    const handleSave = async () => {
        await fetch("http://localhost:3000/settings/update", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: userName,
                email: userEmail,
                about_me: userAbout,
                password: userPassword
            })
        });
        navigate('/settings');
    };

    if (loading) {
        return (
            <div className="right-section">
                <div className="rectangle-bg">
                    <Loader size="medium" />
                </div>
            </div>
        );
    }

    return (
        <div className="right-section">
            <div className="rectangle-bg">
                <Header title="SETTINGS" />
                <div className="divider-line"></div>
                <div className="Profile-info">
                    <Formcomponent className="Name" value={userName} onChange={setUserName} mode={mode} />
                    <Formcomponent className="Email" value={userEmail} onChange={setUserEmail} mode={mode} />
                    <Formcomponent className="USN" value={userUSN} onChange={setUserUSN} mode={mode} />
                    <Formcomponent className="About-Me" value={userAbout} onChange={setUserAbout} mode={mode} />
                    <Formcomponent className="Password" value={userPassword} onChange={setUserPassword} mode={mode} />
                </div>
                <div className="btn-container">
                    {mode === "view" &&
                        <>
                            <button className="save-btn" onClick={() => navigate('/editprofile')}>Edit Profile</button>
                            <button className="logout-btn">Log Out</button>
                        </>
                    }
                    {mode === "edit" &&
                        <>
                            <button className="save-btn" onClick={handleSave}>Save Changes</button>
                            <button className="logout-btn" onClick={() => navigate('/settings')}>Cancel</button>
                        </>
                    }

                </div>
            </div>
        </div>
    );
}

export default SettingSection;