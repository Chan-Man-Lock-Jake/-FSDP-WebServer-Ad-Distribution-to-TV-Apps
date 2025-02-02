import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CreateTvGroup.css";
import Header1 from "./CreateTvGroupHeader1";
import Outlets from "./SelectOutlet";

type OutletInfo = {
  OutletId: string;
  TvId: string;
  Company: string;
  OutletName: string;
  TotalTv: string;
  TvDimension: string;
  TvName: string;
};

const CreateTvGroup: React.FC = () => {
  const [selectedOutlet, setSelectedOutlet] = useState<string | null>(null);
  const [selectedTvs, setSelectedTvs] = useState<{
    [outletId: string]: string[];
  }>({});
  const navigate = useNavigate();
  const location = useLocation();

  // get selected tvs from SelectTv.tsx
  useEffect(() => {
    if (location.state?.selectedTvs && location.state?.outletId) {
      setSelectedTvs((prev) => ({
        ...prev,
        [location.state.outletId]: location.state.selectedTvs,
      }));
    }
  }, [location.state]);

  const handleNext = () => {
    if (!selectedOutlet && Object.keys(selectedTvs).length === 0) {
      alert("Please select at least one outlet or Tv.");
    } else {
      navigate("/admin/submit-group-details", {
        state: { selectedOutlet, selectedTvs },
      });
    }
  };

  return (
    <div className="create-tv-grp">
      <Header1 />
      <Outlets
        selectedOutlet={selectedOutlet}
        setSelectedOutlet={setSelectedOutlet}
        selectedTvs={selectedTvs}
        setSelectedTvs={setSelectedTvs}
        handleNext={handleNext}
      />
      {/* <button className="next-btn" onClick={handleNext}>
        Next
      </button> */}
      {/* <Tvs /> */}
    </div>
  );
};

export default CreateTvGroup;
