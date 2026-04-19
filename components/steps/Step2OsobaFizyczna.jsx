// src/components/steps/Step2OsobaFizyczna.jsx

import React from 'react';
import { YNGroup } from '../YNGroup.jsx';

export function Step2OsobaFizyczna({ form, setForm, onBack, onNext }) {
  const sd = (k) => (v) => setForm((f) => ({ ...f, descriptions: { ...f.descriptions, [k]: v } }));

  return (
    <div className="card">
      <div className="step-hdr">
        <div className="step-num">2</div>
        <div className="step-title">Ochrona — osoba fizyczna</div>
      </div>

      <div className="info">
        Odpowiedz <strong>TAK</strong>, jeśli potrzebujesz ochrony dla siebie lub swoich bliskich.
      </div>

      <YNGroup
        qKey="individual"
        question="Jestem osobą fizyczną i potrzebuję ochrony ubezpieczeniowej dla siebie i moich bliskich"
        form={form}
        setForm={setForm}
      >
        <div className="sec-div">Szczegóły</div>

        <YNGroup
          qKey="ind_property"
          question="4.1 — Ważne jest dla mnie ubezpieczenie mienia własnego"
          form={form}
          setForm={setForm}
        >
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Rodzaj mienia</label>
            <textarea
              rows={2}
              value={form.descriptions.ind_property || ''}
              onChange={(e) => sd('ind_property')(e.target.value)}
              placeholder="mieszkanie, dom, auto, wartościowe przedmioty..."
            />
          </div>
        </YNGroup>

        <YNGroup
          qKey="ind_personal"
          question="4.2 — Ważne jest dla mnie ubezpieczenie mojej osoby i moich bliskich"
          form={form}
          setForm={setForm}
        >
          <div className="field" style={{ marginBottom: 0 }}>
            <label>Kogo i co chronić</label>
            <textarea
              rows={2}
              value={form.descriptions.ind_personal || ''}
              onChange={(e) => sd('ind_personal')(e.target.value)}
              placeholder="NNW, choroba, życie, dzieci, partner/ka..."
            />
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
