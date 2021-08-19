import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import DetailedAccordion from "./DetailedAccordion";
import BACKEND_URL from "../../Config";
import axios from "axios";

function Technologies({ tech, handleTechAddClick }) {
  const [technologies, setTechnologies] = useState([]);
  const [userTech, setUserTech] = useState({});

  useEffect(() => {
    retrieveTechnoliges();
  }, []);

  const retrieveTechnoliges = () => {
    axios.get(`${BACKEND_URL}/technologies`).then((res) => {
      if (res.data.success) {
        setTechnologies(res.data.existingData);
      } else {
        setTechnologies([]);
      }
    });
  };

  const handleTech = (data) => {
    setUserTech(data);
  };

  useEffect(() => {
    if (!!userTech) {
      let newRows = tech;
      let i = tech.findIndex((x) => x.type === userTech.type);
      if (i >= 0) {
        newRows[i] = userTech;
      } else {
        newRows.push(userTech);
      }
      handleTechAddClick(newRows);
    }
  }, [userTech, tech, handleTechAddClick]);

  const displayTechnologies = () => {
    if (technologies) {
      return technologies.map((technology, techIndex) => {
        return (
          <div key={techIndex}>
            <DetailedAccordion
              key={technology._id}
              info={technology}
              current={tech[techIndex]}
              onChange={handleTech}
            />
          </div>
        );
      });
    } else {
      return <Loading />;
    }
  };

  return <div>{displayTechnologies()}</div>;
}

export default Technologies;
