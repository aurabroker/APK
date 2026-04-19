// src/components/Satisfaction.jsx
// Ocena zadowolenia 1–5

import React from 'react';

const LABELS = ['1 — b. zły', '2 — zły', '3 — neutralny', '4 — dobry', '5 — b. dobry'];

/**
 * @param {object} props
 * @param {string}   props.satKey   klucz w form.sat
 * @param {object}   props.form
 * @param {Function} props.setForm
 */
export function Satisfaction({ satKey, form, setForm }) {
  const val = form.sat[satKey] || 0;
  const set = (v) => setForm((f) => ({ ...f, sat: { ...f.sat, [satKey]: v } }));

  return (
    <div className="sat-row">
      {LABELS.map((l, i) => (
        <button
          key={i}
          className={`sat-btn${val === i + 1 ? ` s${i + 1}` : ''}`}
          onClick={() => set(i + 1)}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
