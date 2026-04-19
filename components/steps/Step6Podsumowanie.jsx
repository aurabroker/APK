// src/components/steps/Step6Podsumowanie.jsx

import React, { useRef } from 'react';
import { BASKETS } from '../../data/baskets.js';

const CO_LABELS = {
  co_property: 'Mienie firmy',
  co_oc: 'OC',
  co_credit: 'Kredyt',
  co_gwarancje: 'Gwarancje',
  co_legal: 'Ochrona prawna',
  co_financial: 'Ryzyka finansowe',
  co_personal: 'Pracownicze ub. osobowe',
};

function YNDisp({ k, yn }) {
  const v = yn[k];
  if (v === 'yes') return <span className="sum-v sum-yes">TAK</span>;
  if (v === 'no')  return <span className="sum-v sum-no">NIE</span>;
  return <span className="sum-v sum-no">—</span>;
}

export function Step6Podsumowanie({ form, setForm, onBack, onSave, onPDF, saving }) {
  const checkRef = useRef();
  const yn = form.yn;

  const selBaskets = BASKETS.filter(
    (b) => Object.values(form.baskets[b.roman] || {}).filter(Boolean).length > 0
  );

  const handleSave = () => {
    if (!checkRef.current?.checked) {
      alert('Zaznacz akceptację przed zapisem.');
      return;
    }
    onSave();
  };

  return (
    <div className="card">
      <div className="step-hdr">
        <div className="step-num">6</div>
        <div className="step-title">Podsumowanie i akceptacja</div>
      </div>

      <div className="info">Sprawdź odpowiedzi. Jeśli wszystko się zgadza — zaakceptuj i zapisz.</div>

      {/* Dane podstawowe */}
      <div className="sum-sec">
        <h4>Dane podstawowe</h4>
        <div className="sum-row"><span className="sum-k">Klient</span><span className="sum-v">{form.client || '—'}</span></div>
        <div className="sum-row"><span className="sum-k">Data analizy</span><span className="sum-v">{form.date}</span></div>
        <div className="sum-row"><span className="sum-k">Nr referencyjny</span><span className="sum-v" style={{ fontFamily: 'monospace', fontSize: 12 }}>{form.ref}</span></div>
        <div className="sum-row"><span className="sum-k">Doradca</span><span className="sum-v">{form.advisor || '—'}</span></div>
      </div>

      {/* Osoba fizyczna */}
      <div className="sum-sec">
        <h4>Osoba fizyczna</h4>
        <div className="sum-row"><span className="sum-k">Potrzeba ochrony osobistej</span><YNDisp k="individual" yn={yn} /></div>
        {yn.individual === 'yes' && <>
          <div className="sum-row"><span className="sum-k">Mienie własne</span><YNDisp k="ind_property" yn={yn} /></div>
          <div className="sum-row"><span className="sum-k">Ochrona osobowa</span><YNDisp k="ind_personal" yn={yn} /></div>
        </>}
      </div>

      {/* Firma */}
      <div className="sum-sec">
        <h4>Firma</h4>
        <div className="sum-row"><span className="sum-k">Ochrona dla firmy</span><YNDisp k="company" yn={yn} /></div>
        {yn.company === 'yes' && <>
          <div className="sum-row"><span className="sum-k">Nazwa firmy</span><span className="sum-v">{form.company.name || '—'}</span></div>
          <div className="sum-row"><span className="sum-k">Zatrudnienie (FTE)</span><span className="sum-v">{form.company.fte || '—'}</span></div>
          {Object.entries(CO_LABELS).map(([k, label]) => (
            <div key={k} className="sum-row"><span className="sum-k">{label}</span><YNDisp k={k} yn={yn} /></div>
          ))}
        </>}
      </div>

      {/* Koszyki */}
      {selBaskets.length > 0 && (
        <div className="sum-sec">
          <h4>Wybrane klasy ryzyk</h4>
          <div className="b-tags">
            {selBaskets.map((b) => {
              const cnt = Object.values(form.baskets[b.roman]).filter(Boolean).length;
              return <span key={b.roman} className="b-tag">{b.roman}. {b.label} ({cnt})</span>;
            })}
          </div>
        </div>
      )}

      {/* Historia */}
      <div className="sum-sec">
        <h4>Historia ubezpieczeniowa</h4>
        <div className="sum-row"><span className="sum-k">Doświadczenie (3 lata)</span><YNDisp k="history" yn={yn} /></div>
        {yn.history === 'yes' && <>
          <div className="sum-row"><span className="sum-k">Był ubezpieczającym</span><YNDisp k="was_insured" yn={yn} /></div>
          <div className="sum-row"><span className="sum-k">Szkody</span><YNDisp k="claims" yn={yn} /></div>
          <div className="sum-row"><span className="sum-k">Pośrednik</span><YNDisp k="broker" yn={yn} /></div>
        </>}
      </div>

      <div className="field">
        <label>Dodatkowe uwagi klienta</label>
        <textarea
          rows={3}
          value={form.final_notes}
          onChange={(e) => setForm((f) => ({ ...f, final_notes: e.target.value }))}
          placeholder="Wszelkie dodatkowe informacje, pytania lub zastrzeżenia..."
        />
      </div>

      <div className="accept-box">
        <input type="checkbox" id="accept_chk" ref={checkRef} />
        <label htmlFor="accept_chk">
          Potwierdzam, że powyższe odpowiedzi są zgodne ze stanem faktycznym i wyrażam zgodę
          na ich przetwarzanie przez Aura Consulting Sp. z o.o. w celu przygotowania oferty
          ubezpieczeniowej. Formularz APK sporządzono zgodnie z art. 8 ustawy o dystrybucji
          ubezpieczeń (Dz.U. 2019 poz. 1881 ze zm.).
        </label>
      </div>

      <div className="btn-row">
        <button className="btn btn-sec" onClick={onBack}>← Wróć</button>
        <button className="btn btn-pdf" onClick={onPDF}>📄 Podgląd PDF</button>
        <button className="btn btn-save" onClick={handleSave} disabled={saving}>
          {saving ? '⏳ Zapisywanie...' : '💾 Zapisz APK'}
        </button>
      </div>
    </div>
  );
}
