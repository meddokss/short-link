import React, { useCallback, useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import Loader from "../components/Loader";
import LinksList from "../components/LinksList";

const LinksPage = () => {
  const { token } = useContext(AuthContext);
  const { loading, request } = useHttp();
  const [links, setLinks] = useState([]);

  const getLinks = useCallback(async () => {
    try {
      const data = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(data);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="container">
      {!loading && links && <LinksList links={links} />}
    </div>
  );
};

export default LinksPage;
