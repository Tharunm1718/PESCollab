import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import ProfileDivision from "./ProfileDiv";
import CommunityFileList from "./Communtiy-FileList";
import Loader from "../Loader";

function Profileviewsection() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [conCount, setconCount] = useState(0);
  const [projects, setProjects] = useState([]);
  const [contributionCounts, setContributionCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [projectCount, setProjectCount] = useState(0);
  const [memberDataCount, setMemberDataCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        setLoading(true);
        const response = await fetch(
          ` https://pes-collab-3jcl.vercel.app/profileview/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            },
            credentials: "include",
          }
        );

        const result = await response.json();

        if (result.success) {
          setUser(result.userdata);
          setconCount(result.contributionCount)
          setProjects(result.projects)
          setContributionCounts(result.projectContibution)
          setProjectCount(result.projectCount)
          setMemberDataCount(result.memberDataCount)
        }
      } catch (err) {
        console.error("Profile fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
        <Header title="PES COMMUNITY" />
        <div className="divider-line"></div>
        {user && <ProfileDivision user={user} id={id} conCount={conCount} projectCount={projectCount} memberDataCount={memberDataCount} />}
        <CommunityFileList mode={"USER_PROJECTS"} data={{ projects, contributionCounts }} />
      </div>
    </div>
  );
}

export default Profileviewsection;
