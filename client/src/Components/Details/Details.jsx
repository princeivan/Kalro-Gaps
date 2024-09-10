import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "./Details.css";
import { GlobalContext } from "../../Context/Context";
import html2pdf from "html2pdf.js";

const Details = () => {
  const [gap, setGap] = useState("");
  const { id } = useParams();
  const { gaps } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getGapsDetails() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://kalro-gaps.onrender.com/api/${id}/`
        );
        const data = await response.json();

        setGap(data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    }
    getGapsDetails();
  }, [id, gaps]);

  const downloadPDF = () => {
    const element = document.getElementById("main-content");
    html2pdf()
      .from(element)
      .set({
        margin: 1,
        filename: `${gap.title}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { orientation: "portrait" },
      })
      .save();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const {
    title,
    description,
    image,
    site_preparation,
    planting,
    fertilizer_application,
    pest_and_disease_control,
    harvesting,
    yield_information,
    images,
  } = gap;
  return (
    <>
      <div className="image-container">
        <img src={image} alt="title" />
        <div className="title-overlay">
          <h2>{title}</h2>
        </div>
      </div>

      <div className="content-container">
        <div id="main-content">
          <button className="pdf-download-btn" onClick={downloadPDF}>
            Download PDF
          </button>
          <h2>Overview</h2>
          <h2>{gap.title}</h2>
          <p>{gap.description}</p>

          <div className="image-gallery">
            <div className="image-grid">
              {images && images.length > 0 ? (
                images.map((img, index) => (
                  <div key={index} className="image-item">
                    <img
                      src={img.image}
                      alt={img.alt_text || `Gap image ${index + 1}`}
                    />
                  </div>
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
          </div>

          <div className="card1">
            <div className="card-header">
              <h3>{title}</h3>
            </div>
            <div className="card-body">
              <p>{description}</p>
              <button className="read-more-btn">Read more</button>
            </div>
          </div>
          <div className="card1">
            <h2 className="card-header">Site Preparation</h2>
            <p className="card-body">{site_preparation}</p>
            <button className="read-more-btn">Read more</button>
          </div>
          <div className="card1">
            <h2 className="card-header">Planting</h2>
            <p className="card-body">{planting}</p>
            <button className="read-more-btn">Read more</button>
          </div>

          <div className="card1">
            <h2 className="card-header">Fertilizer Application</h2>
            <p className="card-body">{fertilizer_application}</p>
            <button className="read-more-btn">Read more</button>
          </div>

          <div className="card1">
            <h2 className="card-header">Pest and Disease Control</h2>
            <p className="card-body">{pest_and_disease_control}</p>
            <button className="read-more-btn">Read more</button>
          </div>

          <div className="card1">
            <h2 className="card-header">Harvesting</h2>
            <p className="card-body">{harvesting}</p>
            <button className="read-more-btn">Read more</button>
          </div>

          <div className="card1">
            <h2 className="card-header">Yield Information</h2>
            <p className="card-body">{yield_information}</p>
            <button className="read-more-btn">Read more</button>
          </div>
        </div>

        <div className="sidebar">
          <ul>
            {gaps.map(({ id, title }, index) => (
              <li key={index}>
                <NavLink to={`/gaps-detail/${id}/`}>{title}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Details;
