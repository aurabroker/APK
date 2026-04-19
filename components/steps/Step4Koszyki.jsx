// src/components/steps/Step4Koszyki.jsx

import React from 'react';
import { Basket } from '../Basket.jsx';
import { BASKETS } from '../../data/baskets.js';

export function Step4Koszyki({ form, setForm, onBack, onNext }) {
  const toggleB = (roman, i) =>
    setForm((f) => ({
      ...f,
      baskets: {
        ...f.baskets,
        [roman]: { ...f.baskets[roman], [i]: !f.baskets[roman]?.[i] },
      },
    }));

  const setBD = (roman) => (v) =>
    setForm((f) => ({ ...f, basketDesc: { ...f.basketDesc, [roman]: v } }));

  return (
    <div className="card">
      <div className="step-hdr">
        <div className="step-num">4</div>
        <div className="step-title">Klasy ryzyk — koszyki Lloyd's</div>
      </div>

      <div className="info">
        Rozwiń <strong>koszyki ryzyk</strong> które Cię dotyczą i zaznacz interesujące pozycje.
        To opcjonalny, rozszerzony zakres używany do przygotowania oferty.
      </div>

      {BASKETS.map((b) => (
        <Basket
          key={b.roman}
          data={b}
          sels={form.baskets[b.roman] || {}}
          onToggle={(i) => toggleB(b.roman, i)}
          desc={form.basketDesc[b.roman] || ''}
          onDesc={setBD(b.roman)}
        />
      ))}

      <div className="btn-row">
        <button className="btn btn-sec" onClick={onBack}>← Wróć</button>
        <button className="btn btn-pri" onClick={onNext}>Dalej →</button>
      </div>
    </div>
  );
}
