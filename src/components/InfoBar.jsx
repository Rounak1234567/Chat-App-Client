import React from 'react';
import close from "../icons/closeIcon.png"
import online from "../icons/onlineIcon.png"
import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={online} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={close} alt="X" /></a>
    </div>
  </div>
);

export default InfoBar;