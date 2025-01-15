import React from 'react';
import './CreateAdCampaign.css';

const CreateAdCampaign: React.FC = () => {
    return (
        <section id='create-campaign-flow'>
            <ul>
                <li>
                    <div>
                        <a>TV Group Description</a>
                        <p>Come up with a name, location and description for your TV Group!</p>
                    </div>
                    <form id='tv-group-description-form'>
                        <div>
                            <a>Group Name</a>
                            <input placeholder='e.g. Jewel Changi Jinjja Chicken'/>
                        </div>
                        <div>
                            <a>Location</a>
                            <input placeholder='e.g. Jewel Changi'/>
                        </div>
                        <div>
                            <a>Group Description</a>
                            <input placeholder='e.g. Christmas special menu'/>
                        </div>
                    </form>
                </li>
                <li><a><span>Scheduled Time Slot</span></a></li>
                <li><a><span>Performance Measurement</span></a></li>
                <li><a><span>Advertisement</span></a></li>
            </ul>
        </section>
    );
}

export default CreateAdCampaign;
