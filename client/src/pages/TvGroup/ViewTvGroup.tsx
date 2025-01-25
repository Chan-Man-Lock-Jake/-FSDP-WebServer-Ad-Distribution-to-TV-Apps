import React from "react";
import "./ViewTvGroup.css";
import Header from "./ViewTvGroupHeader"
import Filter from "./ViewTvGroupFilter"

const ViewTvGroup: React.FC = () => {
    return (
    <div className="tv-grp-header">
        <Header />
        <Filter />
    </div>
    )
};

export default ViewTvGroup;