import DashboardPage from './dashboard';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import YourProjects from './Yourprojects';
import CreateProject from './CreateProject';
import SingleProject from './Singleproject';
import Community from './Community';
import Profileview from './ProfileView';
import Publicview from './PublicProjectView';
import Contribution from './Contribution'
import Settings from './Settings';
import EditProfile from "./Editprofile"
import DesktopOnly from './components/DesktopOnly';
import Teammates from './Teammates';
import MyProfileRedirect from './MyProfile';

function App() {
    return (
        <DesktopOnly>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/yourprojects" element={<YourProjects />} />
                <Route path="/uploadproject" element={<CreateProject />} />
                <Route path="/yourprojects/:id" element={<SingleProject />} />
                <Route path="/community" element={<Community />} />
                <Route path="/profileview/:id" element={<Profileview />} />
                <Route path="/projects/:id" element={<Publicview />} />
                <Route path="/contribute/:id" element={<Contribution />} />
                <Route path="/settings/" element={<Settings />} />
                <Route path="/editprofile/" element={<EditProfile />} />
                <Route path="/teammates" element={<Teammates />} />
                <Route path="/:title/team" element={<Community mode="team" />} />
                <Route path="/myprofile" element={<MyProfileRedirect />} />
            </Routes>
        </DesktopOnly>
    )
}

export default App;