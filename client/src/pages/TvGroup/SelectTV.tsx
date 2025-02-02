import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./CreateTvGroup.css";
import Header1 from "./CreateTvGroupHeader1";

type TvInfo = {
  TvId: string;
  TvName: string;
  TvDimension: string;
};

const SelectTV: React.FC = () => {
  const { outletId } = useParams<{ outletId: string }>();
  const [tvs, setTvs] = useState<TvInfo[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTvs, setSelectedTvs] = useState<{
    [outletId: string]: string[];
  }>(location.state?.selectedTvs || {});

  useEffect(() => {
    const fetchTv = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/admin/get-outlet-info/${outletId}`
        );
        //console.log("response-fetchtv:", response.data);
        // if (Array.isArray(response.data)) {
        //     setTvs(response.data)
        // }
        setTvs(response.data);
      } catch (error) {
        console.error("Error fetching TVs:", error);
      }
    };

    fetchTv();
  }, [outletId]);

  // handle tv selection
  const handleTvSelect = (tvId: string) => {
    setSelectedTvs((prev) => {
      const outletTvs = prev[outletId!] || [];
      return {
        ...prev,
        [outletId!]: outletTvs.includes(tvId)
          ? outletTvs.filter((id) => id !== tvId)
          : [...outletTvs, tvId],
      };
    });
  };

  // send selected tvs back
  const handleConfirm = () => {
    navigate("/admin/createtvgroup", {
      state: { outletId, selectedTvs },
    });
  };

  // back btn click handler
  // const onBackClick = () => {
  //   navigate(-1);
  // };

  return (
    <div className="select-tv">
      <Header1 />
      <button className="back-btn" onClick={() => navigate(-1)}>
        <img
          src="../../../src/assets/back-btn.jpg"
          alt="back button icon"
          className="icon"
        />
      </button>
      <h2>Available TV</h2>
      <div className="tv-list">
        {tvs.map((tv) => (
          <div key={tv.TvId} className="tv-item">
            <label>
              <input
                type="checkbox"
                checked={selectedTvs[outletId!]?.includes(tv.TvId) || false}
                onChange={() => handleTvSelect(tv.TvId)}
              />
            </label>
            <h4>{tv.TvName}</h4>
            <p>{tv.TvDimension}</p>
          </div>
        ))}
      </div>
      <button className="selecttv-next-btn" onClick={handleConfirm}>
        Next
      </button>
    </div>
  );
};

export default SelectTV;
