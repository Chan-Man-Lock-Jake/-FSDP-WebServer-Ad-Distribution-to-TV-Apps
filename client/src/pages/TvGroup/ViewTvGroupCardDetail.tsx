import React from "react";
import "./ViewTvGroup.css";

type Tv = {
  OutletId: string,
  OutletName: string,
  TvId: string;
  TvName: string;
  TvDimension: string;
};

type Tag = {
  TagKey: string;
  TagValue: string;
};

type TvGroupInfo = {
  TvGroupId: string;
  TvGroupName: string;
  TotalTv: string;
  Location: string;
  Tv: Tv[];
  TvGroupDesc: string;
  TvGroupStatus: string;
  Tag: Tag[];
  Region: string;
};

type ViewTvGroupCardDetailProps = {
  group: TvGroupInfo;
  onBackClick: () => void;
};

const ViewTvGroupCardDetail: React.FC<ViewTvGroupCardDetailProps> = ({
  group,
  onBackClick,
}) => {
  if (!group) {
    return <p>Loading TV Group details...</p>;
  }

  return (
    <div className="tv-grp-detail">
      <button className="back-btn" onClick={onBackClick}>
        <img
          src="../../../src/assets/back-btn.jpg"
          alt="back button icon"
          className="icon"
        />
      </button>

      <h2>{group.TvGroupName}</h2>

      {/* TV Details */}
      <div className="tv-grp-tv">
        <h2>TVs in Group:</h2>
        {group.Tv && group.Tv.length > 0 ? (
          <ul>
            <li className="tv-grp-tv-header">
                <span>Outlet</span>
                <span>TV Name</span>
                <span>TV Dimension</span>
            </li>
            {group.Tv.map((tv) => (
              <li key={tv.TvId}>
                <span>{tv.OutletName}</span>
                <span>{tv.TvName}</span>
                <span>{tv.TvDimension}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No TVs in this group</p>
        )}
      </div>

      {/* TV Group Details */}
      <div className="tv-grp-info">
        <p>Total TVs: {group.TotalTv}</p>
        <p>Location: {group.Location}</p>
        <p>Group Description: {group.TvGroupDesc}</p>
        <p>Status: {group.TvGroupStatus}</p>
        <p>Region: {group.Region}</p>

        {/* Tags */}
        <h3>Tags:</h3>
        {group.Tag && group.Tag.length > 0 ? (
          <ul>
            {group.Tag.map((tag) => (
              <li key={tag.TagKey}>
                {tag.TagKey}: {tag.TagValue}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tags available</p>
        )}
      </div>
    </div>
  );
};

export default ViewTvGroupCardDetail;
