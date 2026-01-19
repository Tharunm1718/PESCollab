import { useEffect, useState } from 'react';
import Card from './ProjectCard';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';

function CardGrid({ mode }) {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const onClick = (id, title) => {
    mode === "teammates" ? navigate(`/${title}/team`) :
      navigate(`/yourprojects/${id}`);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        setLoading(true);
        const response = await fetch(" https://pes-collab-3jcl.vercel.app/yourprojects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          credentials: "include",
        });

        const result = await response.json();
        setCardData(result.projects || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loader size="medium" />;
  }

  return (
    <div className="frame">
      {cardData.map(card => (
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          language={card.language}
          views={card.views === undefined ? 0 : card.views}
          contributors={card.contributors}
          handshakeIcon={card.handshakeIcon}
          downloadIcon={card.downloadIcon}
          onClick={() => onClick(card.id, card.title)}
          mode={mode}
          id={card.id}
        />
      ))}
    </div>
  );
};

export default CardGrid;
