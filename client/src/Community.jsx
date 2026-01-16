import Sidebar from './components/dashboard_components/Sidebar';
import CommunitySection from './components/dashboard_components/Communtysec';
import './Dashboard.css';
import "./CreateProject.css";
import "./toggle.css";
import "./Community.css";


export default function Community({ mode }) {


    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <CommunitySection mode={mode} />
        </div>
    );
}