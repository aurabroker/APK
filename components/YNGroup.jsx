// src/components/YNGroup.jsx
// Komponent TAK/NIE z opcjonalnym rozwinięciem

import React from 'react';

/**
 * @param {object} props
 * @param {string}   props.qKey       klucz odpowiedzi w form.yn
 * @param {string}   props.question   treść pytania
 * @param {object}   props.form       bieżący stan formularza
 * @param {Function} props.setForm    setter stanu
 * @param {React.ReactNode} [props.children]  content gdy TAK
 */
export function YNGroup({ qKey, question, form, setForm, children }) {
  const val = form.yn[qKey];
  const set = (v) => setForm((f) => ({ ...f, yn: { ...f.yn, [qKey]: v } }));

  return (
    <div className={`yn-group${val === 'yes' ? ' yes' : ''}`}>
      <div className="yn-q">{question}</div>
      <div className="yn-btns">
        <button
          className={`yn-btn${val === 'yes' ? ' sel-yes' : ''}`}
          onClick={() => set('yes')}
        >
          TAK
        </button>
        <button
          className={`yn-btn${val === 'no' ? ' sel-no' : ''}`}
          onClick={() => set('no')}
        >
          NIE
        </button>
      </div>
      {val === 'yes' && children && (
        <div className="detail-inner" style={{ marginTop: 10 }}>
          {children}
        </div>
      )}
    </div>
  );
}
