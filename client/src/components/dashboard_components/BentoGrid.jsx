import React from 'react';
import { useEffect } from 'react';
import WelcomeMessage from './WelcomeMessage';
import InfoCard from './InfoCard';
import ListItem from './ListItem';
import TeammatesCard from './TeammatesCard';
import LeaderboardCard from './LeaderboardCard';
import ProjectsListCard from './ProjectsListCard'; // <-- Import new card
import { ProjectIcon, ContributionIcon } from './Icons';
import { use } from 'react';

// Sample Data
const sampleTeammates = [
  { name: 'Chiranth S', email: 'chiranths@gmail.com' },
  { name: 'Lalith N', email: 'lalithn@gmail.com' },
  { name: 'Tharun M', email: 'tharunm@gmail.com' },
];

const sampleLeaders = [
  { rank: 1, name: 'Tharun M', score: 500 },
  { rank: 2, name: 'Chiranth S', score: 450 },
  { rank: 3, name: 'Lalith N', score: 420 },
  { rank: 4, name: 'User Four', score: 380 },
  { rank: 5, name: 'User Five', score: 350 },
  { rank: 6, name: 'User Six', score: 320 },
];

const sampleProjects = [
  { repoName: 'Tharunm/Agriconnect', views: 5, contributors: 1 },
  { repoName: 'Tharunm/Portfolio-v2', views: 12, contributors: 1 },
];


const BentoGrid = () => {
  const [username, setUsername] = React.useState('');
  const [myprojects, setMyprojects] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include"
      });
      const data = await response.json();
      setUsername(data.name);
      const proj = data.projects.map(proj => ({
        repoName: `${proj.owner_id}/${proj.title}`,
        views: proj.views || 0,
        contributors: proj.contributors_count || 0,
      }));
      setMyprojects(proj);
    };
    fetchData();
  }, []);
  return (
    <div className="bento-grid">
      <WelcomeMessage name={username} />

      <InfoCard title="Your PROJECTS" cardContainerClass="card-container-2" cardClass="card-2">
        {myprojects.map((proj, index) => (
          <ListItem
            key={index}
            repoName={proj.repoName}
            views={proj.views}
            contributors={proj.contributors}
          >
            <ProjectIcon />
          </ListItem>
        ))}
      </InfoCard>

      <InfoCard title="Your CONTRIBUTION" cardContainerClass="card-container-5" cardClass="card-5">
        <ListItem repoName="Tharunm/Agriconnect" views="5" contributors="1">
          <ContributionIcon />
        </ListItem>
      </InfoCard>

      <TeammatesCard teammates={sampleTeammates} />

      <LeaderboardCard leaders={sampleLeaders} />

      <ProjectsListCard projects={sampleProjects} /> {/* <-- Use the new card */}

    </div>
  );
};

export default BentoGrid;