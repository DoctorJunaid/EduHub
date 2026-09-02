import React, { useState } from 'react';
import { MagnifyingGlass, PaperPlaneRight, DotsThreeVertical, Paperclip, Smiley } from '@phosphor-icons/react';
import { users } from '../data/mockData';

export default function MessagesView({ user }) {
  const currentUserId = user?.id || 'u_admin1';
  const inboxUsers = users.filter(u => u.id !== currentUserId && u.role !== 'super_admin');
  
  const [activeUserId, setActiveUserId] = useState(inboxUsers[0]?.id || 'u_teach1');
  const [searchTerm, setSearchTerm] = useState('');
  const [inputText, setInputText] = useState('');
  
  // Dynamic message thread state keyed by contact ID
  const [messagesState, setMessagesState] = useState({
    'u_teach1': [
      { id: 1, senderId: 'u_teach1', text: 'Hi! Please review the assignment criteria for CS-4A.', time: '10:42 AM' },
      { id: 2, senderId: currentUserId, text: 'Checked and approved! All rubrics look solid.', time: '10:45 AM' },
      { id: 3, senderId: 'u_teach1', text: 'Great, are we having the faculty meeting at 2 PM today?', time: 'Just now' }
    ],
    'u_stud1': [
      { id: 1, senderId: 'u_stud1', text: 'Respected Sir, I have submitted my React project assignment.', time: '11:15 AM' },
      { id: 2, senderId: currentUserId, text: 'Received. It will be graded before tomorrow.', time: '11:20 AM' }
    ],
    'u_stud2': [
      { id: 1, senderId: 'u_stud2', text: 'Assalam o Alaikum, my tuition fee voucher status is updated.', time: '09:30 AM' },
      { id: 2, senderId: currentUserId, text: 'Walaikum Assalam, yes your 1Link payment is verified.', time: '09:45 AM' }
    ]
  });

  const activeChatUser = inboxUsers.find(u => u.id === activeUserId) || inboxUsers[0];
  const activeMessages = messagesState[activeUserId] || [
    { id: 1, senderId: activeUserId, text: 'Hello, let me know if you need assistance.', time: 'Yesterday' }
  ];

  const filteredUsers = inboxUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      senderId: currentUserId,
      text: inputText.trim(),
      time: 'Just now'
    };

    setMessagesState(prev => ({
      ...prev,
      [activeUserId]: [...(prev[activeUserId] || []), newMsg]
    }));

    setInputText('');
  };

  return (
    <div className="content-container animate-fade-in" style={{ flexDirection: 'row', height: 'calc(100vh - 152px)', gap: 24 }}>
      
      {/* Inbox Sidebar */}
      <div className="table-card" style={{ width: 340, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: 20, borderBottom: '1px solid var(--border-light)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-heading)', margin: '0 0 12px 0' }}>Messages & Inbox</h2>
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-color)', padding: '8px 12px', borderRadius: 'var(--r-full)', border: '1px solid var(--border-strong)' }}>
            <MagnifyingGlass size={16} color="var(--text-muted)" style={{ marginRight: 8 }} />
            <input 
              type="text" 
              placeholder="MagnifyingGlass conversations..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.85rem', color: 'var(--text-main)' }}
            />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredUsers.map((u) => {
            const isSelected = u.id === activeUserId;
            const msgs = messagesState[u.id] || [];
            const lastMsg = msgs[msgs.length - 1]?.text || 'No previous messages';

            return (
              <div 
                key={u.id} 
                onClick={() => setActiveUserId(u.id)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', 
                  cursor: 'pointer',
                  background: isSelected ? 'var(--bg-color)' : 'transparent',
                  borderBottom: '1px solid var(--border-light)',
                  borderLeft: isSelected ? '3px solid var(--primary)' : '3px solid transparent',
                  transition: 'all 0.15s'
                }}
              >
                <img 
                  src={u.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}`} 
                  alt="" 
                  style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover' }} 
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.92rem' }}>{u.name}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Online</span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: isSelected ? 'var(--text-heading)' : 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {lastMsg}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="table-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        {/* Chat Header */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img 
              src={activeChatUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(activeChatUser?.name || 'User')}`} 
              alt="" 
              style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} 
            />
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-heading)', fontSize: '1rem' }}>{activeChatUser?.name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'capitalize' }}>
                {activeChatUser?.role?.replace('_', ' ')} • Active
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, color: 'var(--text-muted)' }}>
            <DotsThreeVertical size={20} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Chat History */}
        <div style={{ flex: 1, background: 'var(--bg-color)', padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ textAlign: 'center', margin: '4px 0 12px 0' }}>
            <span style={{ background: 'var(--card-bg)', border: '1px solid var(--border-strong)', padding: '4px 14px', borderRadius: 'var(--r-full)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Conversation Log
            </span>
          </div>

          {activeMessages.map((msg) => {
            const isMe = msg.senderId === currentUserId;
            const senderAvatar = isMe 
              ? (user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Me')}`)
              : (activeChatUser?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(activeChatUser?.name || 'Contact')}`);

            return (
              <div 
                key={msg.id} 
                style={{ 
                  display: 'flex', 
                  gap: 12, 
                  maxWidth: '75%', 
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                  flexDirection: isMe ? 'row-reverse' : 'row'
                }}
              >
                <img src={senderAvatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                  <div style={{ 
                    background: isMe ? 'var(--primary)' : 'var(--card-bg)', 
                    color: isMe ? '#fff' : 'var(--text-main)', 
                    border: isMe ? 'none' : '1px solid var(--border-strong)',
                    padding: '10px 16px', 
                    borderRadius: 'var(--r-lg)', 
                    borderTopRightRadius: isMe ? 4 : 12,
                    borderTopLeftRadius: isMe ? 12 : 4,
                    fontSize: '0.9rem', 
                    lineHeight: 1.5,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                  }}>
                    {msg.text}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4, marginLeft: isMe ? 0 : 4, marginRight: isMe ? 4 : 0 }}>
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input Form */}
        <div style={{ padding: 18, background: 'var(--card-bg)', borderTop: '1px solid var(--border-light)' }}>
          <form onSubmit={handleSendMessage} style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-color)', border: '1px solid var(--border-strong)', padding: '6px 14px', borderRadius: 'var(--r-full)', gap: 10 }}>
            <Paperclip size={18} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '0.9rem', color: 'var(--text-main)' }}
            />
            <button 
              type="submit" 
              style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer' }}
            >
              <PaperPlaneRight size={15} />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
