import Sidebar from './components/dashboard_components/Sidebar';
import SingleProjectSection from './components/dashboard_components/SingleProjectsec';
import './Dashboard.css';
import "./CreateProject.css";
import "./Singleproject.css";

export default function Publicview() {


    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <SingleProjectSection title={"Publicview"}/>
        </div>
    );
}