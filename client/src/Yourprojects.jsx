import Sidebar from './components/dashboard_components/Sidebar';
import YourProjectSection from './components/dashboard_components/Yourprojectsec'; 
import './Dashboard.css';
import "./Yourprojects.css";

const YourProjects = () => {
  return (
    <> 
      <div style={{ display: 'flex' }}>

        <Sidebar />
        <YourProjectSection />
      </div>
    </>
  );
};

export default YourProjects;