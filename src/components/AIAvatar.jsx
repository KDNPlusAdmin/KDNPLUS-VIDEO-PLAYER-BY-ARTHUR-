/* eslint-disable react/prop-types */
// src/components/AIAvatar.jsx
import React, { useEffect, useState } from 'react';

const AIAvatar = ({ isVisible }) => {
    const [fade, setFade] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setFade(true);
        } else {
            setTimeout(() => setFade(false), 500); // Adjust for fade-out duration
        }
    }, [isVisible]);

    return (
        <div className={`ai-avatar ${fade ? 'visible' : ''}`}>
            <img src="/path/to/avatar.png" alt="AI Avatar" />
            <p>Hi, I’m Nonso. How can I assist you today?</p>
        </div>
    );
};

export default AIAvatar;
