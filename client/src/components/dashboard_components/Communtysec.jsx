import { useState , useEffect } from "react";
import Header from "./Header";
import TabSwitcher from "./toggle";
import CommunityFileList from "./Communtiy-FileList";
import Loader from "../Loader";

function CommunitySection() {
  const [activeTab, setActiveTab] = useState("PROJECTS");
    const [projects, setProjects] = useState([]);
    const [contributionCounts, setContributionCounts] = useState({});
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/community", {
          method: "GET",
          credentials: "include",
        });

        const result = await response.json();
        console.log("Projects data:", result);

        if (result.success) {
          setProjects(result.projects);
          setContributionCounts(result.contributionCounts);
          setMembers(result.members);
        }
      } catch (err) {
        console.error("Failed to fetch community projects", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

        <div className="sub_header">
          <input
            type="text"
            placeholder="Search Projects..."
            className="search-bar"
          />

          <TabSwitcher
            tabs={["Projects", "Members"]}
            defaultTab={0}
            onChange={(index) =>
              setActiveTab(index === 0 ? "PROJECTS" : "MEMBERS")
            }
          />
        </div>

        <CommunityFileList mode={activeTab} data={{projects, contributionCounts, members}}/>
      </div>
    </div>
  );
}

export default CommunitySection;
