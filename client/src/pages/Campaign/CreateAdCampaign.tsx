import React from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import './CreateAdCampaign.css';

const CreateAdCampaign: React.FC = () => {
    return (
        <section id='create-campaign-flow'>
            <ul>
                <li className='Campaign-Description-Section'>
                    <div>
                        <a>Campaign Description</a>
                        <p>Come up with a name and objective for your TV Group!</p>
                    </div>
                    <form id='tv-group-description-form'>
                        <div>
                            <a>Campaign Name</a>
                            <input id='campaign-name' placeholder='e.g. Christmas Specials Chicken Burger'/>
                        </div>
                        <div className='campaign-objective'>
                            <a>Campaign Objective</a>
                            <textarea id='campaign-objective' placeholder='e.g. Brand awareness/Increase sale profits/To persuade/To inform'/>
                        </div>
                    </form>
                </li>
                <li>
                    <div>
                        <a>Demographic</a>
                        <p>Select your demographics based on the options provided.</p>
                    </div>
                </li>
                <li>
                    <div>
                        <a>Performance Measurement</a>
                        <p>Select your demographics based on the options provided.</p>
                    </div>
                </li>
                <li>
                    <div>
                        <a>Advertisement</a>
                        <p>Select your demographics based on the options provided.</p>
                    </div>
                </li>
                <li>
                    <div>
                        <a>Schedule</a>
                        <p>Select a timeline to launch your campaign.</p>
                    </div>
                    <form>
                        <Calendar />
                    </form>
                </li>
                <li>
                    <div>
                        <a>Scheduled Time Slot</a>
                        <p>Select your scheduled time slot for your advertisement.</p>
                    </div>
                </li>
            </ul>
        </section>
    );
}

export default CreateAdCampaign;
