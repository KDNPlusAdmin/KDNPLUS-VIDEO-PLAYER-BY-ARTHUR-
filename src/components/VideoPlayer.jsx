/* eslint-disable react/prop-types */
// src/components/VideoPlayer.jsx
import React, { useRef, useState } from 'react';
import VideoJS from 'react-video-js-player';

const VideoPlayer = ({ videoUrl, subtitlesUrl, audioTracks }) => {
    const playerRef = useRef(null);
    const [isLocked, setIsLocked] = useState(false);
    const [brightness, setBrightness] = useState(1);

    const onPlayerReady = (player) => {
        playerRef.current = player;
    };

    const handleLockToggle = () => {
        setIsLocked(!isLocked);
    };

    const handleBrightnessChange = (event) => {
        setBrightness(event.target.value);
        playerRef.current.style.filter = `brightness(${brightness})`;
    };

    return (
        <div className="video-player">
            <VideoJS
                options={{
                    autoplay: false,
                    controls: true,
                    sources: [{ src: videoUrl, type: 'application/x-mpegURL' }],
                    tracks: [
                        { kind: 'subtitles', src: subtitlesUrl, srclang: 'en', label: 'English' },
                    ],
                    audioTracks: audioTracks,
                }}
                onReady={onPlayerReady}
            />
            <div className="controls">
                <button onClick={handleLockToggle}>
                    {isLocked ? 'Unlock Player' : 'Lock Player'}
                </button>
                <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.1"
                    value={brightness}
                    onChange={handleBrightnessChange}
                />
            </div>
        </div>
    );
};

export default VideoPlayer;
