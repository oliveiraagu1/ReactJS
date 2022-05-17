import React, { useState } from "react";
import { FiLink } from "react-icons/fi";
import "./home.css";
import Menu from "../../components/Menu";
import LinkItem from "../../components/LinkItem";
import api from "../../services/api";
import { saveLink } from "../../services/storeLinks";

const Home = () => {
  const [link, setLink] = useState("");
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleShortLink = async () => {
    try {
      const response = await api.post("shorten", {
        long_url: link,
      });
      setData(response.data);
      setShowModal(true);
      saveLink("@encurtaLink", response.data);
      setLink("");
    } catch (error) {
      alert("Ops parece que algo deu errado!");
      setLink("");
    }
  };

  return (
    <div className="container-home">
      <div className="logo">
        <img src="/logo.png" alt="Sujeito Link Logo" />
        <h1 className="teste">Encurtar Link!</h1>
        <span>Cole seu link para encurtar</span>
      </div>

      <div className="area-input">
        <div>
          <FiLink size={24} color="#FFF" />
          <input
            placeholder="Cole seu link aqui..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <button onClick={handleShortLink}>Encurtar Link</button>
      </div>
      <Menu />
      {showModal && (
        <LinkItem closeModal={() => setShowModal(false)} content={data} />
      )}
    </div>
  );
};

export default Home;
