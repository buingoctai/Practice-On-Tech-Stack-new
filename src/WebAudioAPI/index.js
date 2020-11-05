import React from "react";

const WebAudioAPI = () => {
    const audioContext = new window.AudioContext();
    const analyser = audioContext.createAnalyser()
    return (
        <div>
            WebAudioAPI
        </div>
    );
}

export default WebAudioAPI;