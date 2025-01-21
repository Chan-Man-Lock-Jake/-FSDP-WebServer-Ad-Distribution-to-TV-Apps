import React from 'react';
import Calendar from "react-calendar";
import './CreateAdCampaign.css';
import "react-calendar/dist/Calendar.css";

const CreateAdCampaign: React.FC = () => {
    return (
        <section id='create-campaign-flow'>
            <ul>
                <li className='Campaign-Description-Section'>
                    <div>
                        <a>Campaign Description</a>
                        <p>Come up with a name and objective for your TV Group!</p>
                    </div>
                    <form id='campaign-description-form'>
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
                    <form id='demographic-form'>
                        <div>
                            <div>
                                <a>Gender</a>
                                <a>Age Range</a>
                            </div>
                            <div>
                                <div>
                                <select>
                                    <option label='select option'></option>
                                    <option>M</option>
                                    <option>F</option>
                                </select>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M200-440v-80h560v80H200Z"/></svg>
                                </div>
                                <div>
                                <input placeholder='e.g. 15-20'/>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M200-440v-80h560v80H200Z"/></svg>
                                </div>
                            </div>
                        </div>
                        <select>
                            <option label='Add Option'></option>
                            <option>Gender</option>
                            <option>Age Range</option>
                        </select>
                    </form>
                </li>
                <li>
                    <div>
                        <a>Performance Measurement</a>
                        <p>Select your demographics based on the options provided.</p>
                    </div>
                    <form id='performance-measurement-form'>
                        <div>
                            <div>
                                <a>Polls</a>
                               <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M200-440v-80h560v80H200Z"/></svg>
                            </div>
                            <div>
                                <a>Interaction Rate</a>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M200-440v-80h560v80H200Z"/></svg>
                            </div>
                            <div>
                                <a>Share Rate</a>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M200-440v-80h560v80H200Z"/></svg>
                            </div>
                        </div>
                        <select>
                            <option label='Add Option'></option>
                            <option>Polls</option>
                            <option>Share Rate</option>
                            <option>Interaction Rate</option>
                        </select>
                    </form>
                </li>
                <li>
                    <div>
                        <a>Advertisement</a>
                        <p>Select your demographics based on the options provided.</p>
                    </div>
                    <form id='advertisement-form'>
                        <a>Upload from</a>
                        <div id='upload-ad'>
                            <button>Local Storage</button>
                            <button>Platform Storage</button>
                        </div>
                    </form>
                </li>
                <li>
                    <div>
                        <a>Schedule</a>
                        <p>Select a timeline to launch your campaign.</p>
                    </div>
                    <form id='schedule-form'>
                        <Calendar />
                    </form>
                </li>
                <li>
                    <div>
                        <a>Schedule Time Slot</a>
                        <p>Select your scheduled time slot for your advertisement.</p>
                    </div>
                    <form id='schedule-time-slot-form'>
                        <label htmlFor='start-time'>Start Time</label>
                        <input id='start-time' type="time"/>
                        <label htmlFor='duration'>Duration (hours)</label>
                        <input id='duration' type="number"/>
                        <label htmlFor='end-time'>End Time</label>
                        <input id='end-time' type="time"/>
                        <label htmlFor='interval'>Interval (hours)</label>
                        <input id='interval' type="number"/>
                    </form>
                </li>
            </ul>
            <div className='next-container'>
                <button id='next-button'>Next</button>
            </div>
        </section>
    );
}

export default CreateAdCampaign;
