import Sidebar from './components/dashboard_components/Sidebar';
import SettingSection from './components/dashboard_components/Settingsec';
import './Dashboard.css';
import "./CreateProject.css";
import "./Setting.css";

export default function Settings() {


    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <SettingSection />
        </div>
    );
}