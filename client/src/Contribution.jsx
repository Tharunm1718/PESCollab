import Sidebar from './components/dashboard_components/Sidebar';
import CreateProjectSection from './components/dashboard_components/CreateProjectsec';
import './Dashboard.css';
import "./CreateProject.css";
import { useParams } from "react-router-dom";

export default function Contribution() {
    const { id } = useParams();
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <CreateProjectSection mode={"Contribute"} projectId={id} />
        </div>
    );
}