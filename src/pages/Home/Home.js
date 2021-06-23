import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";

import "./styles.scss";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPageOptions = [5, 10, 20];

  const getProperties = useCallback(async () => {
    const response = await axios
      .get(`https://60d1e41c5b017400178f4a5d.mockapi.io/api/booking/properties`)
      .catch((error) => {
        console.error(error);
      });

    if (response?.data) {
      setProperties(response.data);
    }
  }, []);

  const onPagePerPageChange = (event) => {
    setCurrentPage(1);
    setItemsPerPage(event.target.value);
  };

  useEffect(() => {
    getProperties();
  }, [getProperties]);

  const totalPages = useMemo(
    () => Math.ceil(properties.length / itemsPerPage),
    [properties, itemsPerPage]
  );

  const propertiesVisible = useMemo(
    () =>
      properties
        .sort((a, b) => {
          const aPricePerNight = parseFloat(a.pricePerNight);
          const bPricePerNight = parseFloat(b.pricePerNight);

          return sortOrder === "asc"
            ? aPricePerNight - bPricePerNight
            : bPricePerNight - aPricePerNight;
        })
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [sortOrder, properties, currentPage, itemsPerPage]
  );

  return (
    <div className="home">
      <select
        value={sortOrder}
        onChange={(event) => setSortOrder(event.target.value)}
      >
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </select>
      <select value={itemsPerPage} onChange={onPagePerPageChange}>
        {itemsPerPageOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <ul>
        {propertiesVisible.map(({ id, name, pricePerNight }) => (
          <li key={id}>
            <a href={`/property/${id}`}>
              {name} - {pricePerNight}
            </a>
          </li>
        ))}
      </ul>
      {Array.from(Array(totalPages)).map((el, i) => (
        <button key={i} onClick={() => setCurrentPage(i + 1)}>
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Home;
