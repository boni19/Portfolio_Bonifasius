'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatBox({ lang }: { lang: 'EN' | 'ID' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isWakeWordActive, setIsWakeWordActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const intro = lang === 'ID' 
    ? "Halo! Senang melihat Anda di sini. Mau tanya soal apa tentang Boni hari ini?" 
    : "Hello! Great to see you here. What would you like to know about Boni today?";

  const speak = (text: string) => {
    if (isMuted || typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'EN' ? 'en-US' : 'id-ID';
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert(lang === 'EN' ? 'Voice recognition not supported in your browser.' : 'Browser Anda tidak mendukung pengenalan suara.');
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'EN' ? 'en-US' : 'id-ID';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      processMessage(transcript);
    };

    recognition.onerror = (event: any) => {
      if (event.error !== 'aborted' && event.error !== 'no-speech') {
        console.error('Speech Recognition Error:', event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const processMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, lang })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Server error');
      }

      if (!response.body) throw new Error('No body');
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponse = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      setIsTyping(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantResponse += chunk;
        
        setMessages(prev => {
          const newMsg = [...prev];
          newMsg[newMsg.length - 1].content = assistantResponse.replace(/\[ACTION:.*?\]/g, '');
          return newMsg;
        });
      }

      // Agentic Actions
      if (assistantResponse.includes('[ACTION:SCROLL_CONTACT]')) {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
      if (assistantResponse.includes('[ACTION:SCROLL_EXPERTISE]')) {
        document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' });
      }
      
      speak(assistantResponse.replace(/\[ACTION:.*?\]/g, ''));
    } catch (error) {
      const errorMsg: Message = { 
        role: 'assistant', 
        content: lang === 'ID' ? "Maaf, terjadi kesalahan koneksi." : "Sorry, there was a connection error." 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: 'assistant', content: intro }]);
    }
  }, [lang]);

  const EncryptionBanner = () => (
    <div style={{
      background: '#FFF9C4',
      padding: '0.8rem 1rem',
      borderRadius: '10px',
      fontSize: '0.75rem',
      color: '#54656F',
      textAlign: 'center',
      marginBottom: '1.2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' }}>
        <span>🔒</span>
        <span>Messages and calls are end-to-end encrypted.</span>
      </div>
      <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>Only people in this chat can read, listen to, or share them. Click to learn more.</span>
    </div>
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    processMessage(input.trim());
  };

  return (
    <div className="chat-container-main">
      {/* Premium Chat Window */}
      {isOpen && (
        <div className="enterprise-chat-window">
          {/* Header */}
          <div style={chatHeaderStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={avatarContainerStyle}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#DFE5E7', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <span style={{ fontSize: '1.4rem' }}>🤖</span>
                </div>
                <div className={`status-indicator ${isListening ? 'listening' : 'online'}`} />
              </div>
              <div>
                <div style={{ fontWeight: '600', fontSize: '1rem', color: '#111B21', marginBottom: '1px' }}>Boni Assistant</div>
                <div style={{ fontSize: '0.75rem', color: isTyping ? '#00A884' : '#667781', fontWeight: isTyping ? '600' : 'normal' }}>
                  {isTyping ? 'typing...' : (isListening ? 'listening...' : 'online')}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setIsMuted(!isMuted)} style={headerActionBtnStyle}>
                {isMuted ? '🔇' : '🔊'}
              </button>
              <button onClick={() => {
                setIsOpen(false);
                setMessages([{ role: 'assistant', content: intro }]);
              }} style={headerActionBtnStyle}>✕</button>
            </div>
          </div>

          {/* Messages Container */}
          <div ref={scrollRef} className="wa-light-bg" style={messageContainerStyle}>
            <EncryptionBanner />
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}>
              <div style={{ background: '#FFFFFF', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', color: '#54656F', boxShadow: '0 1px 1px rgba(0,0,0,0.1)', textTransform: 'uppercase', fontWeight: '500' }}>
                Today
              </div>
            </div>
            {messages.map((msg, i) => (
              <div key={i} style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                marginBottom: '1.2rem',
                animation: 'fadeInUp 0.3s ease-out'
              }}>
                <div style={{
                  padding: '0.6rem 0.8rem',
                  borderRadius: msg.role === 'user' ? '12px 0 12px 12px' : '0 12px 12px 12px',
                  background: msg.role === 'user' ? '#DCF8C6' : '#FFFFFF',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                  fontSize: '0.92rem',
                  lineHeight: '1.45',
                  color: '#111B21',
                  position: 'relative'
                }}>
                  {msg.content}
                  <div style={{ fontSize: '0.65rem', color: '#667781', textAlign: 'right', marginTop: '4px' }}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {msg.role === 'user' && <span style={{ marginLeft: '4px', color: '#53BDEB' }}>✓✓</span>}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={typingIndicatorStyle}>
                <span></span><span></span><span></span>
              </div>
            )}
          </div>

          <div style={inputAreaStyle}>
            <div style={inputWrapperStyle}>
              <div style={{ marginRight: '12px', display: 'flex', alignItems: 'center' }}>
                <button 
                  onClick={startListening} 
                  style={{ 
                    ...sendBtnStyle, 
                    width: 'auto', 
                    height: 'auto', 
                    color: isListening ? '#EF4444' : '#54656F',
                    padding: '4px'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path>
                  </svg>
                </button>
              </div>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a message"
                style={{ ...inputFieldStyle, color: '#111B21' }}
              />
              <div style={{ marginLeft: '12px', display: 'flex', alignItems: 'center' }}>
                {input.trim() && (
                  <button onClick={handleSend} style={{ ...sendBtnStyle, color: '#00A884' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Floating Toggle */}
      <button 
        onClick={() => {
          if (isOpen) {
            setMessages([{ role: 'assistant', content: intro }]);
          }
          setIsOpen(!isOpen);
        }} 
        style={toggleBtnStyle}
        className="chat-toggle-premium"
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isOpen ? (
            <span style={{ fontSize: '1.5rem' }}>✕</span>
          ) : (
            <div className="wa-style-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
              <div className="wa-pulse-glow"></div>
            </div>
          )}
        </div>
      </button>

    </div>
  );
}


const chatHeaderStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  background: '#FFFFFF',
  borderBottom: '1px solid #E9EDEF',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const avatarContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const headerActionBtnStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'rgba(255,255,255,0.4)',
  fontSize: '1rem',
  cursor: 'pointer',
  padding: '5px',
  transition: 'color 0.3s',
};

const messageContainerStyle: React.CSSProperties = {
  flex: 1,
  padding: '1.5rem',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  scrollBehavior: 'smooth',
};

const inputAreaStyle: React.CSSProperties = {
  padding: '0.75rem 1rem',
  background: '#F0F2F5',
};

const inputWrapperStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  background: '#FFFFFF',
  borderRadius: '24px',
  padding: '4px 6px 4px 16px',
  border: 'none',
  transition: 'border 0.3s',
};

const inputFieldStyle: React.CSSProperties = {
  flex: 1,
  background: 'transparent',
  border: 'none',
  padding: '12px 0',
  color: '#fff',
  fontSize: '0.9rem',
  outline: 'none',
};

const sendBtnStyle: React.CSSProperties = {
  background: 'transparent',
  color: '#8696A0',
  border: 'none',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'color 0.2s',
};

const toggleBtnStyle: React.CSSProperties = {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
};

const typingIndicatorStyle: React.CSSProperties = {
  display: 'flex',
  gap: '4px',
  padding: '12px 16px',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '15px',
  width: 'fit-content',
  alignSelf: 'flex-start',
};
