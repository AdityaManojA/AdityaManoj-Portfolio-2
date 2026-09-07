import React, { useState, useEffect } from 'react';
import { HANDBOOK_META, HANDBOOK_FOUNDATIONS, HANDBOOK_QUESTIONS, HandbookQuestion } from '../data/handbookData';

interface HandbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'foundations' | 'deepdives';
  initialQuestionId?: number;
}

export const HandbookModal: React.FC<HandbookModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'foundations',
  initialQuestionId
}) => {
  const [activeTab, setActiveTab] = useState<'foundations' | 'deepdives'>(initialTab);
  const [selectedFoundationId, setSelectedFoundationId] = useState<string>(HANDBOOK_FOUNDATIONS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedQuestionId, setExpandedQuestionId] = useState<number | null>(initialQuestionId || null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
    if (initialQuestionId) setExpandedQuestionId(initialQuestionId);
  }, [initialTab, initialQuestionId]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!isOpen) return null;

  const categories = ['All', 'Kubernetes', 'Linux & Containers', 'Infrastructure as Code', 'CI/CD & Git', 'Cloud & Networking', 'SRE & Observability'];

  const filteredQuestions = HANDBOOK_QUESTIONS.filter((q: HandbookQuestion) => {
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.steps.some(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.details.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const currentFoundation = HANDBOOK_FOUNDATIONS.find(f => f.id === selectedFoundationId) || HANDBOOK_FOUNDATIONS[0];

  return (
    <div className="handbook-modal-backdrop" onClick={onClose}>
      <div className="handbook-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="handbook-modal-header">
          <div className="handbook-modal-title-area">
            <div className="handbook-badge-row">
              <span className="handbook-badge">{HANDBOOK_META.badge}</span>
              <span className="handbook-author">By {HANDBOOK_META.author}</span>
            </div>
            <h2 className="handbook-title">{HANDBOOK_META.title}</h2>
            <p className="handbook-subtitle">{HANDBOOK_META.subtitle}</p>
          </div>
          <button className="handbook-close-btn" onClick={onClose} aria-label="Close Handbook">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="handbook-tabs-nav">
          <button
            className={`handbook-tab-btn ${activeTab === 'foundations' ? 'active' : ''}`}
            onClick={() => setActiveTab('foundations')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Part I: Architecture & Foundations ({HANDBOOK_FOUNDATIONS.length})
          </button>
          <button
            className={`handbook-tab-btn ${activeTab === 'deepdives' ? 'active' : ''}`}
            onClick={() => setActiveTab('deepdives')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Part II: 20 Systems Deep-Dives
          </button>
        </div>

        {/* Modal Body */}
        <div className="handbook-modal-body">
          {activeTab === 'foundations' ? (
            <div className="handbook-foundations-layout">
              {/* Sidebar list of sections */}
              <div className="handbook-sidebar">
                <div className="handbook-sidebar-heading">Foundational Modules</div>
                <div className="handbook-sidebar-nav">
                  {HANDBOOK_FOUNDATIONS.map((f, idx) => (
                    <button
                      key={f.id}
                      className={`handbook-sidebar-item ${selectedFoundationId === f.id ? 'active' : ''}`}
                      onClick={() => setSelectedFoundationId(f.id)}
                    >
                      <span className="handbook-sidebar-num">0{idx + 1}</span>
                      <span className="handbook-sidebar-title">{f.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Foundation Content View */}
              <div className="handbook-content-pane">
                <div className="handbook-module-header">
                  <span className="handbook-section-tag">Module Architecture</span>
                  <h3 className="handbook-module-title">{currentFoundation.title}</h3>
                </div>

                {currentFoundation.content.map((p, idx) => (
                  <p key={idx} className="handbook-paragraph">{p}</p>
                ))}

                {currentFoundation.alertBox && (
                  <div className={`handbook-alert-box alert-${currentFoundation.alertBox.type}`}>
                    <div className="handbook-alert-title">{currentFoundation.alertBox.title}</div>
                    <div className="handbook-alert-text">{currentFoundation.alertBox.text}</div>
                  </div>
                )}

                {currentFoundation.asciiDiagram && (
                  <div className="handbook-diagram-wrapper">
                    <div className="handbook-diagram-header">
                      <span>Architecture Topology</span>
                      <button
                        className="handbook-copy-btn"
                        onClick={() => copyToClipboard(currentFoundation.asciiDiagram || '', `diagram-${currentFoundation.id}`)}
                      >
                        {copiedIndex === `diagram-${currentFoundation.id}` ? 'Copied!' : 'Copy Diagram'}
                      </button>
                    </div>
                    <pre className="handbook-diagram-code">
                      <code>{currentFoundation.asciiDiagram}</code>
                    </pre>
                  </div>
                )}

                {currentFoundation.subsections && currentFoundation.subsections.length > 0 && (
                  <div className="handbook-subsections-list">
                    {currentFoundation.subsections.map((sub, sIdx) => (
                      <div key={sIdx} className="handbook-subsection-card">
                        <h4 className="handbook-subsection-title">{sub.title}</h4>
                        <ul className="handbook-points-list">
                          {sub.points.map((pt, pIdx) => (
                            <li key={pIdx} className="handbook-point-item">{pt}</li>
                          ))}
                        </ul>
                        {sub.code && (
                          <div className="handbook-code-block">
                            <pre><code>{sub.code}</code></pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Part II: 20 Deep Dives */
            <div className="handbook-deepdives-layout">
              {/* Search and Category Filters */}
              <div className="handbook-filter-container">
                <div className="handbook-search-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search 20 deep-dives (e.g. iptables, runc, DAG, DynamoDB, SRE, CoreDNS)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="handbook-search-input"
                  />
                  {searchQuery && (
                    <button className="handbook-clear-search" onClick={() => setSearchQuery('')}>×</button>
                  )}
                </div>

                <div className="handbook-category-pills">
                  {categories.map((cat, idx) => (
                    <button
                      key={idx}
                      className={`handbook-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Questions List */}
              <div className="handbook-questions-list">
                {filteredQuestions.length === 0 ? (
                  <div className="handbook-empty-state">
                    <p>No questions matched your search criteria. Try a different query or reset filters.</p>
                    <button className="handbook-reset-btn" onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  filteredQuestions.map((q) => {
                    const isExpanded = expandedQuestionId === q.id;
                    return (
                      <div key={q.id} className={`handbook-q-card ${isExpanded ? 'expanded' : ''}`}>
                        <div
                          className="handbook-q-header"
                          onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                        >
                          <div className="handbook-q-meta">
                            <span className="handbook-q-num">Q{q.id < 10 ? `0${q.id}` : q.id}</span>
                            <span className="handbook-q-category">{q.category}</span>
                          </div>
                          <h4 className="handbook-q-title">{q.question}</h4>
                          <p className="handbook-q-summary">{q.summary}</p>
                          <div className="handbook-expand-cue">
                            <span>{isExpanded ? 'Collapse Details' : 'Explore Low-Level Breakdown'}</span>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="handbook-q-content">
                            {q.asciiDiagram && (
                              <div className="handbook-diagram-wrapper">
                                <div className="handbook-diagram-header">
                                  <span>Execution Flow & Architecture Diagram</span>
                                  <button
                                    className="handbook-copy-btn"
                                    onClick={() => copyToClipboard(q.asciiDiagram || '', `q-${q.id}`)}
                                  >
                                    {copiedIndex === `q-${q.id}` ? 'Copied!' : 'Copy Diagram'}
                                  </button>
                                </div>
                                <pre className="handbook-diagram-code">
                                  <code>{q.asciiDiagram}</code>
                                </pre>
                              </div>
                            )}

                            <div className="handbook-steps-container">
                              <h5 className="handbook-steps-header">Step-by-Step Low-Level Internals</h5>
                              {q.steps.map((step, sIdx) => (
                                <div key={sIdx} className="handbook-step-card">
                                  <div className="handbook-step-title">{step.title}</div>
                                  <div className="handbook-step-details">{step.details}</div>
                                </div>
                              ))}
                            </div>

                            {q.proTip && (
                              <div className="handbook-protip-box">
                                <span className="handbook-protip-badge">SRE Production Tip</span>
                                <p className="handbook-protip-text">{q.proTip}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
