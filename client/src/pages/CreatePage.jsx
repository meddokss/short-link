import React, { useContext, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const CreatePage = () => {
  const history = useHistory();
  const { token } = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");
  const handleChange = (e) => {
    setLink(e.target.value);
  };

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "api/link/generate",
          "POST",
          { from: link },
          { Authorization: `Bearer ${token}` }
        );
        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  return (
    <div className="container">
      <h1>Create Page</h1>
      <div className="col s8 offset-2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="Вставьте ссылку"
            id="link"
            type="text"
            className="yellow-input"
            value={link}
            onChange={handleChange}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Введите ссылку</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
