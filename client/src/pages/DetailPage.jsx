import React, { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import AuthContext from "../context/AuthContext";
import Loader from "../components/Loader";
import LinkCard from "../components/LinkCard";

const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const [link, setLink] = useState(null);
  const { loading, request } = useHttp();
  const linkId = useParams().id;
  const getLink = useCallback(async () => {
    try {
      const fetchedlink = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLink(fetchedlink);
    } catch (e) {}
  }, [linkId, token, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loader />;
  }

  return <>{!loading && link && <LinkCard link={link} />}</>;
};

export default DetailPage;
