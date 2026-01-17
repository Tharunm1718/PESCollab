import React from 'react';
import { useEffect } from 'react';
import WelcomeMessage from './WelcomeMessage';
import InfoCard from './InfoCard';
import ListItem from './ListItem';
import TeammatesCard from './TeammatesCard';
import LeaderboardCard from './LeaderboardCard';
import ProjectsListCard from './ProjectsListCard';
import { ProjectIcon, ContributionIcon } from './Icons';
import Loader from '../Loader';



const sampleLeaders = [
  { rank: 1, name: 'Tharun M', score: 500 },
  { rank: 2, name: 'Chiranth S', score: 450 },
  { rank: 3, name: 'Lalith N', score: 420 },
  { rank: 4, name: 'User Four', score: 380 },
  { rank: 5, name: 'User Five', score: 350 },
  { rank: 6, name: 'User Six', score: 320 },
];


const BentoGrid = () => {
  const [username, setUsername] = React.useState('');
  const [myprojects, setMyprojects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [teammates, setTeammates] = React.useState([]);
  const [communityProjects, setCommunityProjects] = React.useState([]);
  const [contributionCounts, setContributionCounts] = React.useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
        setTeammates(data.teammates || []);
        setCommunityProjects(data.communityProjects || []);
        setContributionCounts(data.contributionCounts || {});
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loader size="large" />;
  }

  return (
    <div className="bento-grid">
      <WelcomeMessage name={username} />

      <InfoCard title="Your PROJECTS" cardContainerClass="card-container-2" cardClass="card-2">
        {myprojects.slice(0, 3).map((proj, index) => (
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
        <p className='update-message-2'>Contribution page will be updated soon.</p>
      </InfoCard>

      <TeammatesCard teammates={teammates} />

      <LeaderboardCard leaders={sampleLeaders} />

      <ProjectsListCard projects={communityProjects} contributioncount={contributionCounts} />

    </div>
  );
};

export default BentoGrid;