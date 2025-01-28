import React from 'react';
import Calendar from "react-calendar";
import { Link } from 'react-router-dom';
import './CreateAdCampaign.css';
import "react-calendar/dist/Calendar.css";

const CreateAdCampaign: React.FC = () => {
    return (
        <section id='create-campaign-flow'>
            {/* <div></div>
            <form id='create-campaign-form'>
                <ul>
                    <li>
                        <div>
                            <h1>Campaign Description</h1>
                            <p>Come up with a name and objective for your campaign!</p>
                        </div>
                        <div className='campaign-description'>
                            <div>
                            <h2>Campaign Name</h2>
                            <input type="text" placeholder='e.g. Christmas Specials Chicken Burger' />
                            <h2>Campaign Objective</h2>
                            <textarea placeholder='e.g. Brand awareness/Increase sale profits/To persuade/To inform' name="" id=""></textarea>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div>
                            <h1>Demographics</h1>
                            <p>Select your demographics based on the options provided.</p>
                        </div>
                        <div className='campaign-demographic'>
                            <div>
                                <div>
                                    <a className='additional-options'>Gender</a>
                                    <div>
                                    <select className='select-gender'>
                                        <option label='select option'></option>
                                        <option>M</option>
                                        <option>F</option>
                                    </select>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M200-440v-80h560v80H200Z"/></svg>
                                    </div>
                                </div>
                                <div>
                                    <a className='additional-options'>Age Range</a>
                                    <div>
                                    <input placeholder='e.g. 15-20'/>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M200-440v-80h560v80H200Z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <select className='add-option'>
                                <option label='Add Option'></option>
                                <option>Gender</option>
                                <option>Age Range</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <div>
                            <h1>Performance Measurement</h1>
                            <p>Select the type of performance metrics you would like to use for your campaign.</p>                       
                        </div>
                        <div>

                        </div>
                    </li>
                    <li>
                        <div>
                            <h1>Advertisement</h1>
                            <p>Select an advertisement you would like to use from either your local storage or your existing ones on the platform.</p>     
                        </div>
                        <div>

                        </div>
                    </li>
                    <li>
                        <div>
                            <h1>Schedule Date</h1>
                            <p>Select a date to launch your campaign.</p>                        
                        </div>
                        <div className='campaign-schedule-date'>
                            <Calendar />
                        </div>
                    </li>
                    <li>
                        <div>
                            <h1>Schedule Time Slot</h1>
                            <p>Scheduled time slot for your advertisement.</p>  
                        </div>
                        <div>

                        </div>
                    </li>
                </ul>
            </form> */}
            {/* <div className='create-campaign-progress-bar'>View Existing Campaign</div> */}
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
            <Link to='../review-ad-campaign' className='next-container'>
                <button id='next-button'>Next</button>
            </Link>
        </section>
    );
}

export default CreateAdCampaign;
