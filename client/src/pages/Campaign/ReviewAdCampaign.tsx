import React from 'react';
import Calendar from "react-calendar";
import './ReviewAdCampaign.css';
import "react-calendar/dist/Calendar.css";

const ReviewAdCampaign: React.FC = () => {
    return (
        <section id='review-campaign-flow'>
            <div id='campaign-details'>
                <h1>Christmas Specials Chicken Burger</h1>
                <div>
                    <h2>Campaign Objective</h2>
                    <a>Increase sales of the Christmas Specials Chicken Burger by 30% compared to previous holiday seasonal offerings.</a>
                </div>
                <div>
                    <h2>Demographics</h2>
                    <div>
                        <span>Female</span>
                        <span>Age 15-20</span>
                    </div>
                </div>
                <div>
                    <h2>Performance Metrics</h2>
                    <div>
                        <span>Polls</span>
                        <span>Share Rate</span>
                        <span>Interaction Rate</span>
                    </div>
                </div>
                <div>
                    <h2>Schedule</h2>
                    <div className='calendar'>
                    <Calendar />
                    </div>
                </div>
                <div>
                    <h2>Scheduled Time Slot</h2>
                    <div>
                        <span>11.30PM</span>
                        <span>1.30PM</span>
                        <span>20 min</span>
                    </div>
                </div>
            </div>
            {/* <div className='next-container'>
                <button id='next-button'>Push</button>
            </div> */}
        </section>
    );
}

export default ReviewAdCampaign;
