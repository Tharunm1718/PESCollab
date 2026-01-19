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

    const handlelogout = async () => {
        const token = localStorage.getItem('token');
        try {
            if (token) {
                await fetch(" https://pes-collab-3jcl.vercel.app/logout", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            }
        } finally {
            localStorage.removeItem('token');
            navigate('/');
        }
    };

    useEffect(() => {
        const response = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const res = await fetch(' https://pes-collab-3jcl.vercel.app/settings', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                });
                const data = await res.json();
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
        const token = localStorage.getItem('token');
        await fetch(" https://pes-collab-3jcl.vercel.app/settings/update", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
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
                            <button className="logout-btn" onClick={handlelogout}>Log Out</button>
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
