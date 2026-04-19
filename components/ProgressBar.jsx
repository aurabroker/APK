// src/components/ProgressBar.jsx

import React from 'react';

const TOTAL = 6;

/** @param {{ step: number }} props */
export function ProgressBar({ step }) {
  return (
    <div className="prog-wrap">
      <div className="prog-bars">
        {Array.from({ length: TOTAL }, (_, i) => (
          <div
            key={i}
            className={`prog-bar${i + 1 < step ? ' done' : i + 1 === step ? ' active' : ''}`}
          />
        ))}
      </div>
      <div className="prog-lbl">
        Krok {step}/{TOTAL}
      </div>
    </div>
  );
}
