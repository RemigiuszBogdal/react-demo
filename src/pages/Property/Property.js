import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import PropertyDetails from "../../components/PropertyDetails";

import "./styles.scss";

const Property = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  const getProperty = useCallback(async () => {
    const response = await axios
      .get(
        `https://60d1e41c5b017400178f4a5d.mockapi.io/api/booking/properties/${id}`
      )
      .catch((error) => console.error(error));

    if (response?.data) {
      setProperty(response.data);
    }
  }, [id]);

  useEffect(() => {
    getProperty();
  }, [getProperty]);

  return (
    <div className="property">
      {property ? <PropertyDetails {...property} /> : <span>Loading...</span>}
    </div>
  );
};

export default Property;
