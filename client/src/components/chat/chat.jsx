// ChatWidget.jsx
import React, { useState } from 'react';
import "./chat.css";


const ChatWidget = () => {
    const [collapsed, setCollapsed] = useState(true);
  
    const toggleWidget = () => {
      setCollapsed((prevCollapsed) => !prevCollapsed);
    };
  
    return (
      <div className={`chat-widget-container ${collapsed ? 'collapsed' : ''}`}>
        <iframe
          allow="microphone;"
          width="350"
          height="430"
          src="https://console.dialogflow.com/api-client/demo/embedded/4c7bb031-f9fb-4b95-b783-6ce66f9586e0"
        />
        <button className="chat-widget-toggle-button" onClick={toggleWidget}>
          {collapsed ? '+' : '-'}
        </button>
      </div>
    );
  };
  
  export default ChatWidget;
