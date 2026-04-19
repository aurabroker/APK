// src/components/steps/Step1Dane.jsx
// Krok 1 — Dane podstawowe + generator linku klienckiego

import React from 'react';
import { genToken } from '../../lib/formState.js';
import { sb } from '../../lib/supabase.js';

export function Step1Dane({ form, setForm, mode, onBack, onNext, toast }) {
  const [clientToken, setClientToken] = React.useState('');

  const sf = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const genClientLink = async () => {
    const t = genToken();
    const r = await sb('POST', 'apk_tokens', {
      token: t,
      advisor_name: form.advisor || '',
      status: 'pending',
    });
    if (r.error) { toast('Błąd generowania linku: ' + r.error, 'err'); return; }
    setClientToken(t);
    toast('Link kliencki wygenerowany ✓', 'ok');
  };

  return (
    <div className="card">
      <div className="step-hdr">
        <div className="step-num">1</div>
        <div className="step-title">Dane podstawowe</div>
      </div>

      <div className="field-row">
        <div className="field">
          <label>Data analizy<span className="req">*</span></label>
          <input type="date" value={form.date} onChange={(e) => sf('date')(e.target.value)} />
        </div>
        <div className="field">
          <label>Nr referencyjny</label>
          <input
            readOnly
            value={form.ref}
            style={{ background: 'var(--bg)', color: 'var(--tx3)', fontFamily: 'monospace', fontSize: 12 }}
          />
        </div>
      </div>

      <div className="field">
        <label>Imię i nazwisko / Nazwa klienta<span className="req">*</span></label>
        <input
          type="text"
          value={form.client}
          onChange={(e) => sf('client')(e.target.value)}
          placeholder="np. Jan Kowalski lub ABC Sp. z o.o."
        />
      </div>

      <div className="field">
        <label>Doradca Aura Consulting</label>
        <input
          type="text"
          value={form.advisor}
          onChange={(e) => sf('advisor')(e.target.value)}
          placeholder="Imię i nazwisko doradcy"
        />
      </div>

      <div className="field">
        <label>Uwagi wstępne</label>
        <textarea
          rows={2}
          value={form.notes}
          onChange={(e) => sf('notes')(e.target.value)}
          placeholder="Kontekst rozmowy, źródło kontaktu..."
        />
      </div>

      {mode === 'advisor' && (
        <>
          <div className="warn" style={{ marginTop: 14 }}>
            Wygeneruj jednorazowy link kliencki — klient wypełni formularz samodzielnie,
            dane trafią do Supabase (projekt aurabroker).
          </div>
          <button className="btn btn-sec" style={{ fontSize: 12 }} onClick={genClientLink}>
            🔗 Generuj link kliencki
          </button>
          {clientToken && (
            <div className="link-box">
              <p style={{ marginBottom: 6, fontWeight: 600, color: 'var(--green)' }}>
                ✓ Token zapisany w <code>apk_tokens</code>:
              </p>
              <code>{`${window.location.origin}${window.location.pathname}?apk_token=${clientToken}`}</code>
              <p style={{ marginTop: 6, fontSize: 11, color: 'var(--tx3)' }}>
                Token: <strong>{clientToken}</strong> · ważny 30 dni · jednorazowy
              </p>
            </div>
          )}
        </>
      )}

      <div className="btn-row">
        <button className="btn btn-sec" onClick={onBack}>← Wróć</button>
        <button className="btn btn-pri" onClick={onNext}>Dalej →</button>
      </div>
    </div>
  );
}
