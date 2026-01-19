import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import TabSwitcher from "./toggle";
import CommunityFileList from "./Communtiy-FileList";
import Loader from "../Loader";

function CommunitySection({ mode }) {
  const { title } = useParams();
  const [activeTab, setActiveTab] = useState("PROJECTS");
  const [projects, setProjects] = useState([]);
  const [contributionCounts, setContributionCounts] = useState({});
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        setLoading(true);

        let response;
        let result;

        if (mode === "team" && title) {
          response = await fetch(
            ` https://pes-collab-3jcl.vercel.app/${title}/team`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              credentials: "include",
            }
          );

          result = await response.json();

          if (result.success) {
            setMembers(result.members);
          }

        } else {
          response = await fetch(
            " https://pes-collab-3jcl.vercel.app/community",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`
              },
              credentials: "include",
            }
          );

          result = await response.json();

          if (result.success) {
            setMembers(result.members);
            setProjects(result.projects);
            setContributionCounts(result.contributionCounts);
          }
        }

      } catch (err) {
        console.error("Failed to fetch community data", err);
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
          {mode !== "team" && (
            <TabSwitcher
              tabs={["Projects", "Members"]}
              defaultTab={0}
              onChange={(index) =>
                setActiveTab(index === 0 ? "PROJECTS" : "MEMBERS")
              }
            />
          )}
        </div>

        {mode === "team" ? (<CommunityFileList mode={"MEMBERS"} data={{ projects, contributionCounts, members }} />) : (
          <CommunityFileList mode={activeTab} data={{ projects, contributionCounts, members }} />
        )}
      </div>
    </div>
  );
}

export default CommunitySection;
