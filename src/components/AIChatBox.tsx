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
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, fontFamily: "'Inter', sans-serif" }}>
      {/* Premium Chat Window */}
      {isOpen && (
        <div className="enterprise-chat-window" style={chatWindowStyle}>
          {/* Header */}
          <div style={chatHeaderStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={avatarContainerStyle}>
                <span style={{ fontSize: '1.2rem' }}>🤖</span>
                <div className={`status-indicator ${isListening ? 'listening' : 'online'}`} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#fff', marginBottom: '2px' }}>Boni Assistant</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  {isTyping ? 'Thinking...' : 'Ready to help'}
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
          <div ref={scrollRef} style={messageContainerStyle}>
            {messages.map((msg, i) => (
              <div key={i} style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                marginBottom: '1.2rem',
                animation: 'fadeInUp 0.3s ease-out'
              }}>
                <div style={{
                  padding: '0.9rem 1.1rem',
                  borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  background: msg.role === 'user' 
                    ? 'linear-gradient(135deg, #6366f1, #a855f7)' 
                    : 'rgba(255, 255, 255, 0.07)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: msg.role === 'user' ? '0 4px 15px rgba(99, 102, 241, 0.3)' : 'none',
                  fontSize: '0.88rem',
                  lineHeight: '1.6',
                  color: '#fff'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={typingIndicatorStyle}>
                <span></span><span></span><span></span>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div style={inputAreaStyle}>
            <div style={inputWrapperStyle}>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={lang === 'EN' ? "Ask about Boni..." : "Tanya soal Boni..."}
                style={inputFieldStyle}
              />
              <button 
                onClick={startListening} 
                style={{
                  ...sendBtnStyle, 
                  background: isListening ? '#ef4444' : 'rgba(255, 255, 255, 0.05)', 
                  marginRight: '8px'
                }}
              >
                {isListening ? '🛑' : '🎙️'}
              </button>
              <button onClick={handleSend} style={sendBtnStyle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
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
            <span style={{ fontSize: '1.4rem' }}>✕</span>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="ai-icon-pulse">
                <span style={{ fontSize: '1.6rem' }}>⚡</span>
              </div>
              <span style={{ fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.5px' }}>ASK AI</span>
            </div>
          )}
        </div>
      </button>

    </div>
  );
}

const chatWindowStyle: React.CSSProperties = {
  width: '380px',
  height: '520px',
  marginBottom: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

const chatHeaderStyle: React.CSSProperties = {
  padding: '1.5rem',
  background: 'rgba(255, 255, 255, 0.02)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const avatarContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: '42px',
  height: '42px',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '14px',
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
  padding: '1.5rem',
  background: 'rgba(255, 255, 255, 0.02)',
};

const inputWrapperStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '16px',
  padding: '4px 6px 4px 16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
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
  background: '#6366f1',
  color: '#fff',
  border: 'none',
  borderRadius: '12px',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s',
};

const toggleBtnStyle: React.CSSProperties = {
  width: 'auto',
  height: '64px',
  padding: '0 1.8rem',
  borderRadius: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
