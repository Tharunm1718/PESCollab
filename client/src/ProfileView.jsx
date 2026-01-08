import Sidebar from './components/dashboard_components/Sidebar';
import Profileviewsection from './components/dashboard_components/Profileviewsec';
import './Dashboard.css';
import "./CreateProject.css";
import "./ProfileView.css"

export default function Profileview() {


    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <Profileviewsection />
        </div>
    );
} 