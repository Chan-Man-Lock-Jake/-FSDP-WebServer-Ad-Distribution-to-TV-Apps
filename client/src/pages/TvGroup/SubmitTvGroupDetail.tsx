import React from "react";
//import { useParams, useNavigate } from "react-router-dom";
//import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./CreateTvGroup.css";
import Header from "./CreateTvGroupHeader2";
import Questions from "./GroupDetailsQuestion";

// page for submitted grp details
const SubmitTvGroupDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedOutlet, selectedTvs } = location.state || {};  

  // if no data is passed, redirect the user back
  if (!selectedOutlet && Object.keys(selectedTvs || {}).length === 0) {
    navigate("/admin/createtvgroup");
    return null;
  }
  
  return (
    <div className="tv-grp">
      <Header />
      <Questions selectedOutlet={selectedOutlet} selectedTvs={selectedTvs}/>
    </div>
  );
};

export default SubmitTvGroupDetail;
