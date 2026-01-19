import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyProfileRedirect() {
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function go() {
      const res = await fetch(" https://pes-collab-3jcl.vercel.app/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: "include"
      });
      const data = await res.json();

      if (data.success) {
        navigate(`/profileview/${data.usn}`);
      } else {
        navigate("/login");
      }
    }
    go();
  }, []);

}

export default MyProfileRedirect;