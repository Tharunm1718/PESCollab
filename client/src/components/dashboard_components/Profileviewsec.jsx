import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import ProfileDivision from "./ProfileDiv";
import CommunityFileList from "./Communtiy-FileList"

function Profileviewsection() {
  const { id } = useParams();        
  const [user, setUser] = useState(null);
  const [conCount, setconCount]=useState(0);
  const [projects, setProjects]=useState([]);
  const [contributionCounts, setContributionCounts] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/profileview/${id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const result = await response.json();
        console.log("User:", result);

        if (result.success) {
          setUser(result.userdata);  
          setconCount(result.contributionCount)
          setProjects(result.projects)
          setContributionCounts(result.projectContibution)
        }
      } catch (err) {
        console.error("Profile fetch failed", err);
      }
    };

    fetchData(); 
  }, [id]);

  return (
    <div className="right-section">
      <div className="rectangle-bg">
        <Header title="PES COMMUNITY" />
        <div className="divider-line"></div>
        {user && <ProfileDivision user={user} id={id} conCount={conCount}/>}
        <CommunityFileList mode={"USER_PROJECTS"} data={{projects, contributionCounts}}/>
      </div>
    </div>
  );
}

export default Profileviewsection;
