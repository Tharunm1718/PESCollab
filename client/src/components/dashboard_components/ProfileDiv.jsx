import { useState, useEffect } from "react";
import { useInteractiveCard } from "./useInteractiveEffects";
import Footer from "./ProfileDiv-Footer";
import TeamUpModal from "./TeamUpModal";

function ProfileDivision({ user, id, conCount }) {
    const cardRef = useInteractiveCard();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [myUSN, setMyUSN] = useState("");

    const handleTeamUpClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSuccess = (message) => {
        setSuccessMessage(message);
        setTimeout(() => {
            setSuccessMessage(null);
        }, 3000);
    };

    useEffect(() => {
        fetch("http://localhost:3000/auth/me", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) setMyUSN(data.usn);
            });
    }, []);

    return (
        <>
            <div className="interactive-container" ref={cardRef}>
                <div className="file-list-container-3 glass-card community-filelist">
                    <div className="profile-sec-head">
                        <button ref={cardRef} className="interactive-container" style={{ width: '13vw', height: '27vh', border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}>
                            <div className="glass-card card-6 Profile">
                                <svg className="text-primary" viewBox="0 0 24 24" fill="currentColor" style={{ width: "13vw", height: '18vh' }}>
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </div>
                        </button>
                        <div className="profile-content">
                            <span className="name">{user.name}</span>
                            <div className="profile-sub-content">
                                <div className="usn">
                                    <span className="label">USN</span>
                                    <span className="value">{id}</span>
                                </div>
                                <div className="email">
                                    <span className="label">email</span>
                                    <span className="email-value">{user.email}</span>
                                </div>
                            </div>
                            {myUSN !== id &&
                                <div className="profile-actions">
                                    <button className="team-up-btn save-btn" onClick={handleTeamUpClick}>
                                        Team Up
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="footer">
                        <Footer Count={conCount} title={"Contribution"} />
                        <Footer Count={5} title={"Projects"} />
                        <Footer Count={50} title={"TeamMates"} />
                    </div>
                </div>
            </div>
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}
            <TeamUpModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                studentId={user.id || id}
                onSuccess={handleSuccess}
            />
        </>
    )
}

export default ProfileDivision