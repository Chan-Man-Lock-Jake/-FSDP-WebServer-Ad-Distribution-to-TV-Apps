import React from "react";
import { useNavigate } from "react-router-dom";
//import axios from "axios";
import "./CreateTvGroup.css";

type GroupDetailsProps = {
  selectedOutlet: string | null;
  selectedTvs: { [outletId: string]: string[] };
};

const GroupDetailsQuestion: React.FC<GroupDetailsProps> = ({
  selectedOutlet,
  selectedTvs,
}) => {
  const navigate = useNavigate();
  // back btn click handler
  const onBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <button className="back-btn" onClick={onBackClick}>
        <img
          src="../../../src/assets/back-btn.jpg"
          alt="back button icon"
          className="icon"
        />
      </button>
      <div className="qn-container">
        <div className="qn-header">
          <h1>TV Group Description</h1>
          <p>
            Come up with a name, location and description for your TV Group !
          </p>
        </div>

        <div className="input-container">
          <div className="input-grp">
            <label htmlFor="grp-name" className="input-label">
              Group Name
            </label>
            <input
              type="text"
              id="grp-name"
              className="input-field"
              placeholder="e.g. TV Group 1"
            />
          </div>

          <div className="input-grp">
            <label htmlFor="location" className="input-label">
              Location
            </label>
            <input
              type="text"
              id="location"
              className="input-field"
              placeholder="e.g. Jewel Changi"
            />
          </div>

          <div className="input-grp">
            <label htmlFor="desc" className="input-label">
              Group Description
            </label>
            <textarea
              id="desc"
              className="textarea-field"
              placeholder="e.g. Christmas special menu "
            ></textarea>
          </div>
        </div>
      </div>

      {/* selected tv/outlet */}
      <div className="selected-items">
        <h2>Selected Outlets/TV</h2>
        <p>{selectedOutlet ? selectedOutlet: "No Outlet Selected"}</p>

        <h2>Selected TV</h2>
        {Object.keys(selectedTvs).length > 0 ? (
            Object.entries(selectedTvs).map(([outlet, tvs]) =>(
                <div key={outlet}>
                    <h3>Outlet {outlet}:</h3>
                    <ul>
                        {tvs.map((tv) => (
                            <li key={tv}>TV</li>
                        ))}
                    </ul>
                </div>
            ))
        ): (
            <p>No TV selected</p>
        )}

      </div>

      <div className="tag-container">
        <div className="input-tags">
          <h2>Tags/Labels</h2>
          <p>Tags or labels relating to the TV group</p>
        </div>

        <div className="tag-list">
          <div className="tag-item">
            <input type="text" className="tag-key" placeholder="e.g, Traffic" />
            <input type="text" className="tag-value" placeholder="e.g, High" />
          </div>
        </div>
      </div>
      <button className="q-next-btn">Next</button>
    </div>
  );
};

export default GroupDetailsQuestion;
