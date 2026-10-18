import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Clock, 
  Phone, 
  Settings, 
  CheckCircle2, 
  MessageSquare, 
  HelpCircle, 
  Plus, 
  Trash2, 
  Power,
  CalendarDays
} from 'lucide-react';

export const AIReceptionistPage = () => {
  const { industry, industryConfig } = useAuth();
  const { aiConfigs, updateAiConfig, services } = useData();
  const { addToast } = useToast();

  const terms = industryConfig.terms;
  const currentConfig = aiConfigs[industry] || aiConfigs.healthcare;

  // Local form state for configuration
  const [configForm, setConfigForm] = useState(currentConfig);

  // Sync when industry changes
  useEffect(() => {
    setConfigForm(aiConfigs[industry] || aiConfigs.healthcare);
  }, [industry, aiConfigs]);

  // Chat simulator state
  const [messages, setMessages] = useState([
    {
      id: 'msg-init',
      sender: 'ai',
      text: currentConfig.greetingMessage,
      timestamp: '10:00 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    updateAiConfig(industry, configForm);
    addToast('AI Receptionist settings saved');
  };

  const handleAddFaq = () => {
    setConfigForm((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }],
    }));
  };

  const handleFaqChange = (index, field, value) => {
    const updated = [...configForm.faqs];
    updated[index][field] = value;
    setConfigForm({ ...configForm, faqs: updated });
  };

  const handleRemoveFaq = (index) => {
    const updated = configForm.faqs.filter((_, i) => i !== index);
    setConfigForm({ ...configForm, faqs: updated });
  };

  // Deterministic Mock Assistant Engine
  const generateMockReply = (userQuery) => {
    const q = userQuery.toLowerCase();

    // 1. Hours / Timing
    if (q.includes('hour') || q.includes('open') || q.includes('time') || q.includes('when')) {
      return {
        text: `Our business hours are: ${configForm.businessHours}. Would you like me to schedule a slot during these hours?`,
      };
    }

    // 2. Services / What do you offer?
    if (q.includes('service') || q.includes('procedure') || q.includes('offer') || q.includes('treatment') || q.includes('class')) {
      const currentServices = services.filter((s) => s.industry === industry || industry === 'general');
      const serviceList = currentServices.slice(0, 3).map((s) => `• ${s.name} (₹${s.price})`).join('\n');
      return {
        text: `We offer specialized ${terms.services.toLowerCase()}:\n${serviceList}\nWhich of these would you like to inquire about?`,
      };
    }

    // 3. Price / Fee / Cost
    if (q.includes('price') || q.includes('cost') || q.includes('fee') || q.includes('how much') || q.includes('rate')) {
      return {
        text: `Our ${terms.services.toLowerCase()} typically range from ₹800 to ₹4,500 depending on complexity and provider seniority. You can view all pricing or book a consultation directly.`,
      };
    }

    // 4. Booking Request
    if (q.includes('book') || q.includes('appointment') || q.includes('schedule') || q.includes('visit') || q.includes('slot')) {
      return {
        text: `I'd be delighted to arrange your ${terms.booking.toLowerCase()}! I have created a draft reservation for tomorrow morning. Here is the provisional summary:`,
        draftBooking: {
          service: services.find((s) => s.industry === industry)?.name || 'General Consultation',
          date: '2026-10-20',
          time: '10:30 AM',
        },
      };
    }

    // 5. Contact / Human Escalation
    if (q.includes('human') || q.includes('call') || q.includes('phone') || q.includes('doctor') || q.includes('urgent') || q.includes('person')) {
      return {
        text: `For immediate human assistance or urgent questions, please dial our concierge line at ${configForm.escalationPhone}. Our duty staff will connect with you right away.`,
      };
    }

    // Default Fallback
    return {
      text: `Thank you for your message. I am trained specifically on ${industryConfig.name} operations. I can assist you with business hours, available ${terms.services.toLowerCase()}, pricing in ₹, or drafting a new ${terms.booking.toLowerCase()}.`,
    };
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = inputText;
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateMockReply(query);
      const aiMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: reply.text,
        draftBooking: reply.draftBooking,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: configForm.greetingMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    addToast('Simulator transcript reset');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-brand-navy tracking-tight">
              AI Receptionist Concierge
            </h1>
            <Badge variant="teal" size="sm">Autonomous Agent</Badge>
          </div>
          <p className="text-xs text-brand-muted mt-1">
            Configure automated scheduling, business FAQs, and test conversation flows in real-time.
          </p>
        </div>

        {/* Master Toggle */}
        <div className="flex items-center gap-3 p-2 bg-white rounded-2xl border border-brand-border shadow-2xs">
          <span className="text-xs font-bold text-brand-navy pl-2">Receptionist Status:</span>
          <button
            type="button"
            onClick={() => {
              const nextState = !configForm.isEnabled;
              setConfigForm({ ...configForm, isEnabled: nextState });
              updateAiConfig(industry, { isEnabled: nextState });
              addToast(`AI Receptionist ${nextState ? 'Enabled' : 'Disabled'}`);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              configForm.isEnabled
                ? 'bg-brand-mint text-brand-teal border border-teal-200'
                : 'bg-slate-100 text-slate-500 border border-slate-200'
            }`}
          >
            <Power className="w-3.5 h-3.5" />
            {configForm.isEnabled ? 'Active (Answering)' : 'Disabled'}
          </button>
        </div>
      </div>

      {/* Main Grid: Left Config, Right Interactive Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Configuration Settings */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-brand-border shadow-subtle p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <div>
                <h3 className="text-base font-bold text-brand-navy">Assistant Identity & Parameters</h3>
                <p className="text-xs text-brand-muted">Tailor voice tone, greeting, and operating hours</p>
              </div>
              <Badge variant="navy" size="sm">{industryConfig.name.split(' ')[0]}</Badge>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-brand-navy uppercase mb-1">
                    Receptionist Name
                  </label>
                  <input
                    type="text"
                    value={configForm.name}
                    onChange={(e) => setConfigForm({ ...configForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-navy uppercase mb-1">
                    Tone & Response Style
                  </label>
                  <select
                    value={configForm.responseStyle}
                    onChange={(e) => setConfigForm({ ...configForm, responseStyle: e.target.value })}
                    className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
                  >
                    <option value="Professional & Warm">Professional & Warm</option>
                    <option value="Direct & Concise">Direct & Concise</option>
                    <option value="Casual & Friendly">Casual & Friendly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-brand-navy uppercase mb-1">
                  Welcome Greeting Message
                </label>
                <textarea
                  rows={2}
                  value={configForm.greetingMessage}
                  onChange={(e) => setConfigForm({ ...configForm, greetingMessage: e.target.value })}
                  className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-brand-navy uppercase mb-1">
                    Business Hours
                  </label>
                  <input
                    type="text"
                    value={configForm.businessHours}
                    onChange={(e) => setConfigForm({ ...configForm, businessHours: e.target.value })}
                    className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
                  />
                </div>

                <div>
                  <label className="block font-bold text-brand-navy uppercase mb-1">
                    Human Escalation Phone
                  </label>
                  <input
                    type="text"
                    value={configForm.escalationPhone}
                    onChange={(e) => setConfigForm({ ...configForm, escalationPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-teal"
                  />
                </div>
              </div>

              {/* FAQs Knowledge Base */}
              <div className="pt-2">
                <div className="flex items-center justify-between pb-2 border-b border-brand-border mb-3">
                  <span className="font-bold text-brand-navy uppercase text-[11px]">
                    Knowledge Base FAQs ({configForm.faqs.length})
                  </span>
                  <button
                    type="button"
                    onClick={handleAddFaq}
                    className="text-brand-teal hover:underline font-bold text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add FAQ
                  </button>
                </div>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {configForm.faqs.map((faq, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-brand-border bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          placeholder="Question e.g. Do you take walk-ins?"
                          value={faq.question}
                          onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white border border-brand-border rounded-lg text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFaq(idx)}
                          className="text-brand-muted hover:text-brand-error p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Answer provided by AI assistant..."
                        value={faq.answer}
                        onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-brand-border rounded-lg text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-brand-border flex justify-end">
                <Button variant="primary" size="sm" type="submit" icon={CheckCircle2}>
                  Save AI Configuration
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Interactive Chat Simulator */}
        <div className="lg:col-span-5 flex flex-col h-[650px] bg-white rounded-2xl border border-brand-border shadow-modal overflow-hidden">
          {/* Simulator Header */}
          <div className="p-4 border-b border-brand-border bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-teal text-white flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-navy flex items-center gap-1.5">
                  {configForm.name}
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[10px] text-brand-muted">
                  Interactive Simulator • Demo Mode
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset Conversation"
                className="p-1.5 rounded-lg text-brand-muted hover:text-brand-navy hover:bg-slate-200/60 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2 border-b border-brand-border/60 bg-brand-ice/30 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
            <span className="text-brand-muted font-bold mr-1">Try asking:</span>
            <button
              onClick={() => setInputText('What are your hours?')}
              className="px-2 py-0.5 rounded-md bg-white border border-brand-border hover:border-brand-teal text-brand-navy"
            >
              Hours?
            </button>
            <button
              onClick={() => setInputText('What services do you offer?')}
              className="px-2 py-0.5 rounded-md bg-white border border-brand-border hover:border-brand-teal text-brand-navy"
            >
              Services?
            </button>
            <button
              onClick={() => setInputText('I want to book an appointment')}
              className="px-2 py-0.5 rounded-md bg-white border border-brand-border hover:border-brand-teal text-brand-navy"
            >
              Book slot
            </button>
            <button
              onClick={() => setInputText('Can I speak with a human?')}
              className="px-2 py-0.5 rounded-md bg-white border border-brand-border hover:border-brand-teal text-brand-navy"
            >
              Call human
            </button>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/30">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-2xs whitespace-pre-line leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-brand-navy text-white rounded-br-xs'
                      : 'bg-white border border-brand-border text-brand-navy rounded-bl-xs'
                  }`}
                >
                  {m.text}

                  {/* Draft Booking Confirmation Card */}
                  {m.draftBooking && (
                    <div className="mt-2.5 p-3 rounded-xl bg-teal-50/60 border border-brand-teal/40 space-y-1.5 text-brand-navy">
                      <div className="font-bold text-[11px] flex items-center gap-1 text-brand-teal">
                        <CalendarDays className="w-3.5 h-3.5" />
                        Provisional Draft Booking
                      </div>
                      <div className="text-[11px]">
                        <strong>Service:</strong> {m.draftBooking.service}
                      </div>
                      <div className="text-[11px]">
                        <strong>Time:</strong> {m.draftBooking.date} at {m.draftBooking.time}
                      </div>
                      <div className="pt-1 text-[10px] text-brand-muted italic">
                        *Demo mode simulation: No real-world calls placed.
                      </div>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-brand-muted mt-0.5 px-1">{m.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-brand-border rounded-xl px-3 py-2 text-xs text-brand-muted w-fit animate-pulse">
                <Bot className="w-3.5 h-3.5 text-brand-teal" />
                <span>{configForm.name} is typing...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-brand-border bg-white flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about hours, services, or bookings..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-brand-border rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal transition-all"
            />
            <Button
              variant="primary"
              size="sm"
              type="submit"
              disabled={!inputText.trim()}
              className="p-2 rounded-xl"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
