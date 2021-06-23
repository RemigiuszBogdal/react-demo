import React from "react";

import "./styles.scss";

const PropertyDetails = ({
  name,
  thumbnail,
  description,
  pricePerNight,
  address,
  country,
}) => (
  <div className="property-details">
    <h1>{name}</h1>
    <img src={thumbnail} alt={name} />
    <p>Price per night: {pricePerNight}</p>
    <p>
      {address}, {country}
    </p>
    <p>{description}</p>
  </div>
);

export default PropertyDetails;
