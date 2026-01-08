// src/components/CardGrid.jsx

import { useEffect, useState } from 'react';
import Card from './ProjectCard';
import { useNavigate } from 'react-router-dom';

function CardGrid() {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);
  const onClick=(id) => {
    navigate(`/yourprojects/${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/yourprojects", {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();
      console.log("Projects data:", result);
      setCardData(result.projects || []);
    }
    fetchData();
  }, []);
  return (
    <div className="frame">
      {cardData.map(card => (
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          language={card.language}
          views={card.views=== undefined ? 0 : card.views}
          contributors={card.contributors}
          handshakeIcon={card.handshakeIcon}
          downloadIcon={card.downloadIcon}
          onClick={() => onClick(card.id)}
        />
      ))}
    </div>
  );
};

export default CardGrid;