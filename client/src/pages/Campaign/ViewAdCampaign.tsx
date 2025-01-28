import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./ViewAdCampaign.css";
import nycBill from "../../assets/nycBill.jpg";

const ViewAdCampaign: React.FC = () => {
  return (
    <section className="view-ad-campaign">
        <h1>View Existing Campaign</h1>
        <div>
            <div>
                <input type="text" placeholder="Search Advertisement"/>
                <select name="campaign-filter" id="campaign-filter">
                    <option value="ongoing">Ongoing</option>
                    <option value="upcoming">Upcoming</option>
                </select>
            </div>
            <ul>
                <li>
                    <div><img src={nycBill}/></div>
                    <h2>Christmas Specials Chicken Burger</h2>
                    <h3>Created on:</h3>
                    <h3>Created by:</h3>
                </li>
            </ul>
        </div>
    </section>
  );
};

export default ViewAdCampaign;