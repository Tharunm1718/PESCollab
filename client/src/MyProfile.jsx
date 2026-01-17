import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyProfileRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    async function go() {
      const res = await fetch("http://localhost:3000/auth/me", {
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