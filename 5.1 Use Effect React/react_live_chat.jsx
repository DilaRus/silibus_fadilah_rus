import { useState, useEffect } from 'react';

const sampleMessages = [
  'Hi there!',
  'How is the project going?',
  'Hello, you. WHatever you are doing right now, you can do this!',
  'Remember to clean effects.',
  'Hydrate!',
];

function ChatSimulator() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Effect 1: generate a message every 3 seconds, show "typing" for 1 second before each one
  useEffect(() => {
    let typingTimeout;
    let messageTimeout;

    const interval = setInterval(() => {
      setIsTyping(true);
      typingTimeout = setTimeout(() => setIsTyping(false), 1000);
      messageTimeout = setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: Date.now(), text: sampleMessages[prev.length % sampleMessages.length] },
        ]);
      }, 1000);
    }, 3000);

    // Cleanup: stop the interval and any pending timeouts
    return () => {
      clearInterval(interval);
      clearTimeout(typingTimeout);
      clearTimeout(messageTimeout);
      console.log('Chat cleanup: interval and timeouts cleared');
    };
  }, []);

  // Effect 2: online / offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Effect 3: scroll to the bottom whenever messages or the typing indicator change
  useEffect(() => {
    const end = document.getElementById('chat-end');
    if (end) end.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isTyping]);

  return (
    <div>
      <p>{isOnline ? '🟢 Online' : '🔴 Offline'}</p>
      <div style={{ height: '200px', overflowY: 'auto', border: '1px solid black', padding: '10px' }}>
        {messages.map(message => (
          <p key={message.id}>{message.text}</p>
        ))}
        {isTyping && <p><em>Someone is typing...</em></p>}
        <div id="chat-end" />
      </div>
    </div>
  );
}

function LiveChatExercise() {
  const [showChat, setShowChat] = useState(true);

  return (
    <div>
      <h2>Exercise 1: Live Chat Simulator</h2>
      <button onClick={() => setShowChat(prev => !prev)}>
        {showChat ? 'Stop Chat (Unmount)' : 'Start Chat (Mount)'}
      </button>
      <hr />
      {showChat && <ChatSimulator />}
    </div>
  );
}

export default LiveChatExercise;
