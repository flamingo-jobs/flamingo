import React, { useEffect, useState } from "react";
import DetailedAccordion from "./DetailedAccordion";
import { Typography } from "@material-ui/core";
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
      let i = tech.findIndex((x) => x.name === userTech.name);
      if (i >= 0) {
        newRows[i] = userTech;
      } else {
        newRows.push(userTech);
      }
      handleTechAddClick(newRows);
    }
  }, [userTech]);

  const displayTechnologies = () => {
    if (technologies) {
      return technologies.map((technology, techIndex) => {
        return (
          <div key={techIndex}>
            <DetailedAccordion
              key={technology._id}
              info={technology}
              onChange={handleTech}
            />
          </div>
        );
      });
    } else {
      return <Typography>No featured Jobs</Typography>;
    }
  };

  return <div>{displayTechnologies()}</div>;
}

export default Technologies;
