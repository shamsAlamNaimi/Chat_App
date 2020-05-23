import React from 'react';
import './InfoBar.css';
//const {closeIcon,onlineIcon}= ''
 import closeIcon from '../../icons/closeIcon.png';
 import onlineIcon from '../../icons/onlineIcon.png';

const InfoBar=({ room })=>(
    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcon" src={onlineIcon}  height="10px" alt="online"/>
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon}  height="15px" className= "closeIcon" alt="close"></img></a>
        </div>
    </div>
)

export default InfoBar;