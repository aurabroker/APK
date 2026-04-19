// src/components/steps/Step3Firma.jsx

import React from 'react';
import { YNGroup } from '../YNGroup.jsx';

export function Step3Firma({ form, setForm, onBack, onNext }) {
  const sd = (k) => (v) => setForm((f) => ({ ...f, descriptions: { ...f.descriptions, [k]: v } }));
  const sc = (k) => (v) => setForm((f) => ({ ...f, company: { ...f.company, [k]: v } }));

  return (
    <div className="card">
      <div className="step-hdr">
        <div className="step-num">3</div>
        <div className="step-title">Ochrona — firma</div>
      </div>

      <div className="info">
        Jeśli reprezentujesz firmę — wybierz <strong>TAK</strong>, aby rozwinąć szczegółowe pytania.
      </div>

      <YNGroup
        qKey="company"
        question="Reprezentuję firmę i potrzebuję ochrony ubezpieczeniowej dla niej"
        form={form}
        setForm={setForm}
      >
        <div className="sec-div">Dane firmy</div>

        <div className="field">
          <label>Nazwa firmy</label>
          <input
            type="text"
            value={form.company.name}
            onChange={(e) => sc('name')(e.target.value)}
            placeholder="np. XYZ Sp. z o.o."
          />
        </div>

        <div className="field-row">
          <YNGroup
            qKey="assets"
            question="5.1 — Aktywa firmy przekraczają 6,2 mln EUR"
            form={form}
            setForm={setForm}
          />
          <YNGroup
            qKey="revenue"
            question="5.2 — Przychody netto przekraczają 12,8 mln EUR"
            form={form}
            setForm={setForm}
          />
        </div>

        <div className="field">
          <label>5.3 — Zatrudnienie (FTE, średnioroczne)</label>
          <input
            type="text"
            value={form.company.fte}
            onChange={(e) => sc('fte')(e.target.value)}
            placeholder="np. 45"
          />
        </div>

        <div className="sec-div">Potrzeby ubezpieczeniowe firmy</div>

        <YNGroup qKey="co_property" question="5.4 — Ubezpieczenie mienia firmy" form={form} setForm={setForm}>
          <div className="field" style={{ marginBottom: 0 }}>
            <textarea rows={2} value={form.descriptions.co_property || ''} onChange={(e) => sd('co_property')(e.target.value)} placeholder="nieruchomości, maszyny, towary, sprzęt IT..." />
          </div>
        </YNGroup>

        <YNGroup qKey="co_oc" question="5.5 — Ubezpieczenie odpowiedzialności cywilnej (OC)" form={form} setForm={setForm}>
          <div className="field" style={{ marginBottom: 0 }}>
            <textarea rows={2} value={form.descriptions.co_oc || ''} onChange={(e) => sd('co_oc')(e.target.value)} placeholder="rodzaj działalności, specyfika ryzyk OC..." />
          </div>
        </YNGroup>

        <YNGroup qKey="co_credit" question="5.6 — Ubezpieczenie kredytu" form={form} setForm={setForm} />

        <YNGroup qKey="co_gwarancje" question="5.7 — Ubezpieczenie gwarancji" form={form} setForm={setForm}>
          <div className="field" style={{ marginBottom: 0 }}>
            <textarea rows={2} value={form.descriptions.co_gwarancje || ''} onChange={(e) => sd('co_gwarancje')(e.target.value)} placeholder="przetargowa, kontraktowa, celna, wadium..." />
          </div>
        </YNGroup>

        <YNGroup qKey="co_legal" question="5.8 — Ubezpieczenie ochrony prawnej" form={form} setForm={setForm} />

        <YNGroup qKey="co_financial" question="5.9 — Ubezpieczenie ryzyk finansowych" form={form} setForm={setForm}>
          <div className="field" style={{ marginBottom: 0 }}>
            <textarea rows={2} value={form.descriptions.co_financial || ''} onChange={(e) => sd('co_financial')(e.target.value)} placeholder="D&O, PI/E&O, Cyber, Crime..." />
          </div>
        </YNGroup>

        <YNGroup qKey="co_personal" question="5.10 — Pracownicze ubezpieczenie osobowe" form={form} setForm={setForm}>
          <div className="field" style={{ marginBottom: 0 }}>
            <textarea rows={2} value={form.descriptions.co_personal || ''} onChange={(e) => sd('co_personal')(e.target.value)} placeholder="NNW zbiorowe, grupowe życiowe, zdrowie, KPE..." />
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
