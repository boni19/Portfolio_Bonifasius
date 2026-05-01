'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    desc: string;
    image: string;
    tags: string[];
    metrics: string;
    details?: {
      problem: string;
      solution: string;
      logic?: string[];
      tech?: string[];
    };
  } | null;
  lang: 'EN' | 'ID';
}

export default function ProjectModal({ isOpen, onClose, project, lang }: ProjectModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        document.body.style.overflow = 'unset';
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  return (
    <div 
      className={`modal-overlay ${isVisible ? 'active' : ''}`}
      onClick={onClose}
    >
      <div 
        className={`modal-content-wrapper ${isVisible ? 'active' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div className="modal-scroll-area">
          {project && (
            <>
              {/* Header Image */}
              <div className="modal-hero">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/1200x800?text=Image+Load+Error";
                  }}
                />
                <div className="modal-hero-overlay">
                  <h2 className="modal-title">{project.title}</h2>
                </div>
              </div>

              {/* Content Grid */}
              <div className="modal-body">
                <div className="modal-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="modal-tag">{tag}</span>
                  ))}
                </div>

                <div className="modal-info-grid">
                  <div className="modal-main-info">
                    <section className="modal-section">
                      <h3>{lang === 'EN' ? 'OVERVIEW' : 'RINGKASAN'}</h3>
                      <p>{project.desc}</p>
                    </section>

                    {project.details && (
                      <>
                        <section className="modal-section">
                          <h3>{lang === 'EN' ? 'THE CHALLENGE' : 'TANTANGAN'}</h3>
                          <p>{project.details.problem}</p>
                        </section>

                        <section className="modal-section">
                          <h3>{lang === 'EN' ? 'THE SOLUTION' : 'SOLUSI'}</h3>
                          <p>{project.details.solution}</p>
                        </section>

                        {project.details.logic && (
                          <section className="modal-section">
                            <h3>{lang === 'EN' ? 'TECHNICAL LOGIC' : 'LOGIKA TEKNIS'}</h3>
                            <div className="logic-steps">
                              {project.details.logic.map((step, i) => (
                                <div key={i} className="logic-step">
                                  <span className="step-num">{i + 1}</span>
                                  <p>{step}</p>
                                </div>
                              ))}
                            </div>
                          </section>
                        )}
                      </>
                    )}
                  </div>

                  <div className="modal-side-info">
                    <section className="modal-section">
                      <h3>{lang === 'EN' ? 'CORE STACK' : 'TEKNOLOGI UTAMA'}</h3>
                      <div className="tech-stack-list">
                        {project.details?.tech?.map(t => (
                          <div key={t} className="tech-stack-item">
                            <div className="dot" />
                            <span>{t}</span>
                          </div>
                        )) || project.tags.map(t => (
                          <div key={t} className="tech-stack-item">
                            <div className="dot" />
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="modal-section">
                      <h3>{lang === 'EN' ? 'PROJECT STATUS' : 'STATUS PROYEK'}</h3>
                      <div className="status-badge">
                        <div className="status-pulse" />
                        {lang === 'EN' ? 'Production Ready' : 'Siap Produksi'}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
