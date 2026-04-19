// src/components/steps/Step5Historia.jsx

import React from 'react';
import { YNGroup } from '../YNGroup.jsx';
import { Satisfaction } from '../Satisfaction.jsx';

export function Step5Historia({ form, setForm, onBack, onNext }) {
  const sd = (k) => (v) => setForm((f) => ({ ...f, descriptions: { ...f.descriptions, [k]: v } }));

  return (
    <div className="card">
      <div className="step-hdr">
        <div className="step-num">5</div>
        <div className="step-title">Doświadczenie ubezpieczeniowe (ostatnie 3 lata)</div>
      </div>

      <YNGroup
        qKey="history"
        question="6. Mam/mamy doświadczenie w zakresie korzystania z ubezpieczeń w ostatnich 3 latach"
        form={form}
        setForm={setForm}
      >
        <div className="sec-div">Szczegóły</div>

        <YNGroup
          qKey="was_insured"
          question="6.1 — Byłem/byliśmy ubezpieczającym lub ubezpieczonym"
          form={form}
          setForm={setForm}
        >
          <div className="field">
            <label>Kto, gdzie, zakres ubezpieczenia</label>
            <textarea
              rows={2}
              value={form.descriptions.insured || ''}
              onChange={(e) => sd('insured')(e.target.value)}
              placeholder="np. OC firmy w TU Allianz, zakres pełny, 2022..."
            />
          </div>
          <div className="field">
            <label>Poziom zadowolenia z ubezpieczenia</label>
            <Satisfaction satKey="insured" form={form} setForm={setForm} />
          </div>
        </YNGroup>

        <YNGroup
          qKey="claims"
          question="6.2 — Mieliśmy szkody"
          form={form}
          setForm={setForm}
        >
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Opis szkód</label>
            <textarea
              rows={2}
              value={form.descriptions.claims || ''}
              onChange={(e) => sd('claims')(e.target.value)}
              placeholder="rodzaj szkody, kiedy wystąpiła, czy była wypłacona..."
            />
          </div>
        </YNGroup>

        <YNGroup
          qKey="broker"
          question="6.3 — Korzystaliśmy z pośrednika ubezpieczeniowego"
          form={form}
          setForm={setForm}
        >
          <div className="field">
            <label>Nazwa pośrednika</label>
            <input
              type="text"
              value={form.descriptions.broker_name || ''}
              onChange={(e) => sd('broker_name')(e.target.value)}
              placeholder="nazwa brokera lub agenta"
            />
          </div>
          <div className="field">
            <label>Poziom zadowolenia z pośrednika</label>
            <Satisfaction satKey="broker" form={form} setForm={setForm} />
          </div>
        </YNGroup>
      </YNGroup>

      <div className="btn-row">
        <button className="btn btn-sec" onClick={onBack}>← Wróć</button>
        <button className="btn btn-pri" onClick={onNext}>Dalej →</button>
      </div>
    </div>
  );
}
