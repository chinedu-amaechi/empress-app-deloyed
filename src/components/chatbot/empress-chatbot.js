// src/components/chatbot/empress-chatbot.js
"use client";

import React, { useEffect } from 'react';

const EmpressChatbot = () => {
  useEffect(() => {
    // Dynamically load Botpress chat scripts
    const loadScript = (src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
      return script;
    };

    // Load Botpress webchat injection script
    const webChatScript = loadScript(
      "https://cdn.botpress.cloud/webchat/v2.2/inject.js"
    );

    // Load specific Botpress configuration script
    const configScript = loadScript(
      "https://files.bpcontent.cloud/2025/03/12/01/20250312012516-4FC8KSAY.js"
    );

    // Cleanup function to remove scripts when component unmounts
    return () => {
      if (webChatScript) document.body.removeChild(webChatScript);
      if (configScript) document.body.removeChild(configScript);
    };
  }, []);

  return null; // This component doesn't render anything visually
};

export default EmpressChatbot;