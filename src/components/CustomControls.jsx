/* eslint-disable react/prop-types */
// src/components/CustomControls.jsx
import React from 'react';

const CustomControls = ({ onPlay, onPause, onRewind, onSkipIntro }) => {
    return (
        <div className="custom-controls">
            <button onClick={onPlay}>Play</button>
            <button onClick={onPause}>Pause</button>
            <button onClick={onRewind}>Rewind 15s</button>
            <button onClick={onSkipIntro}>Skip Intro</button>
        </div>
    );
};

export default CustomControls;
