import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { GlobalContext } from "../../Context/Context";
import "./Home.css";
import { Link } from "react-router-dom";
import { CirclesWithBar } from "react-loader-spinner";

const Home = ({ filtereddata }) => {
  const { t } = useTranslation();
  const { isLoading } = useContext(GlobalContext);
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtereddata.slice(indexOfFirstItem, indexOfLastItem);

  const toggleReadMore = (getCurrentId) => {
    setSelected((prevSelected) =>
      prevSelected === getCurrentId ? null : getCurrentId
    );
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          outerCircleColor="#4fa94d"
          innerCircleColor="#4fa94d"
          barColor="#4fa94d"
          ariaLabel="circles-with-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
  return (
    <div>
      <h2>{t("Gaps By Value Chain")}</h2>
      <div className="card-container">
        {currentItems.length > 0 ? (
          currentItems.map(({ id, image, title, description }, index) => (
            <div className="card" key={index}>
              <div className="card-image">
                <Link to={`/gaps-detail/${id}/`}>
                  <img src={image} alt={title} />
                </Link>
              </div>
              <div className="card-content">
                <h2 className="card-title">
                  <Link style={{ color: "black" }} to={`/gaps-detail/${id}/`}>
                    {title}
                  </Link>
                </h2>
                <p className="card-description">
                  {selected === id
                    ? description
                    : `${description.substring(0, 100)}...`}
                </p>
                <button onClick={() => toggleReadMore(id)}>
                  {selected === id ? "Show less" : "Read More"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(filtereddata.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
