import Sidebar from './components/dashboard_components/Sidebar';
import CreateProjectSection from './components/dashboard_components/CreateProjectsec';
import './Dashboard.css';
import "./CreateProject.css";
export default function CreateProject() {


    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <CreateProjectSection />
        </div>
    );
}