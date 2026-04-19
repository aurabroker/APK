// src/lib/pdf.js
// Generuje PDF formularza APK w nowym oknie (window.print)

import { BASKETS } from '../data/baskets.js';

/**
 * Otwiera okno z wydrukiem APK.
 * @param {object} fd  form_data z payloadu
 */
export function exportPDF(fd) {
  const w = window.open('', '_blank');
  if (!w) return;

  const yn = fd.yn_answers || {};

  const yL = (k) =>
    yn[k] === 'yes'
      ? '<b style="color:#0D7A5F">TAK</b>'
      : yn[k] === 'no'
      ? '<span style="color:#aaa">NIE</span>'
      : '<span style="color:#ccc">—</span>';

  const basketRows = BASKETS.map((b) => {
    const sel = (fd.risk_classes || {})[b.roman]?.selected_items || [];
    if (!sel.length) return '';
    return `<tr>
      <td style="padding:5px 8px;font-weight:600;color:#1A3260;white-space:nowrap">${b.roman}. ${b.label}</td>
      <td style="padding:5px 8px;font-size:12px;color:#333">${sel.join(', ')}</td>
    </tr>`;
  }).join('');

  const coRows =
    yn.company === 'yes'
      ? `
      <tr><td>Nazwa firmy</td><td>${fd.company?.name || '—'}</td></tr>
      <tr><td>FTE</td><td>${fd.company?.fte || '—'}</td></tr>
      <tr><td>Aktywa &gt;6,2M EUR</td><td>${yL('assets')}</td></tr>
      <tr><td>Przychody &gt;12,8M EUR</td><td>${yL('revenue')}</td></tr>
      <tr><td>Mienie firmy</td><td>${yL('co_property')}</td></tr>
      <tr><td>OC</td><td>${yL('co_oc')}</td></tr>
      <tr><td>Kredyt</td><td>${yL('co_credit')}</td></tr>
      <tr><td>Gwarancje</td><td>${yL('co_gwarancje')}</td></tr>
      <tr><td>Ochrona prawna</td><td>${yL('co_legal')}</td></tr>
      <tr><td>Ryzyka finansowe</td><td>${yL('co_financial')}</td></tr>
      <tr><td>Pracownicze ub. osobowe</td><td>${yL('co_personal')}</td></tr>`
      : '';

  const indRows =
    yn.individual === 'yes'
      ? `
      <tr><td>Mienie własne</td><td>${yL('ind_property')}${fd.descriptions?.ind_property ? ` — <em>${fd.descriptions.ind_property}</em>` : ''}</td></tr>
      <tr><td>Ochrona osobowa</td><td>${yL('ind_personal')}${fd.descriptions?.ind_personal ? ` — <em>${fd.descriptions.ind_personal}</em>` : ''}</td></tr>`
      : '';

  const historyRows =
    yn.history === 'yes'
      ? `
      <tr><td>Był ubezpieczającym</td><td>${yL('was_insured')}</td></tr>
      <tr><td>Szkody</td><td>${yL('claims')}</td></tr>
      <tr><td>Pośrednik</td><td>${yL('broker')}${fd.descriptions?.broker_name ? ` — ${fd.descriptions.broker_name}` : ''}</td></tr>`
      : '';

  w.document.write(`<!DOCTYPE html>
<html lang="pl"><head>
<meta charset="UTF-8">
<title>APK ${fd.ref_number}</title>
<style>
  body { font-family: 'Segoe UI', sans-serif; font-size: 13px; color: #111; max-width: 740px; margin: 0 auto; padding: 32px; }
  .hdr { display: flex; justify-content: space-between; border-bottom: 2px solid #0F1F3D; padding-bottom: 14px; margin-bottom: 20px; }
  .logo { font-size: 18px; font-weight: 800; color: #0F1F3D; letter-spacing: .08em; }
  .logo span { color: #1D72B8; }
  .meta { font-size: 11px; color: #666; text-align: right; line-height: 1.8; }
  h2 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #8896A7; margin: 18px 0 8px; border-bottom: 1px solid #EDF0F5; padding-bottom: 4px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  td { padding: 5px 6px; border-bottom: 1px solid #EDF0F5; vertical-align: top; }
  td:first-child { color: #666; width: 200px; }
  .note { background: #FEF3C7; border: 1px solid #F6D860; border-radius: 4px; padding: 10px 14px; font-size: 11px; margin-top: 20px; line-height: 1.6; }
  .sig { margin-top: 44px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
  .sig-box { border-top: 1px solid #333; padding-top: 8px; font-size: 11px; color: #666; }
  @media print { body { padding: 0; } }
</style>
</head><body>
<div class="hdr">
  <div class="logo">AURA <span>CONSULTING</span><br>
    <span style="font-size:11px;font-weight:400;color:#666">Analiza Potrzeb Klienta · KNF art. 8 UDU</span>
  </div>
  <div class="meta">
    Nr ref: <strong>${fd.ref_number}</strong><br>
    Data analizy: ${fd.form_date}<br>
    Status: złożony<br>
    Tryb: ${fd.mode === 'client' ? 'Klient (samodzielnie)' : 'Doradca'}
  </div>
</div>

<h2>Dane podstawowe</h2>
<table>
  <tr><td>Klient</td><td><strong>${fd.client_name || '—'}</strong></td></tr>
  <tr><td>Doradca</td><td>${fd.advisor_name || '—'}</td></tr>
  ${fd.notes ? `<tr><td>Uwagi wstępne</td><td>${fd.notes}</td></tr>` : ''}
</table>

<h2>Osoba fizyczna</h2>
<table>
  <tr><td>Potrzeba ochrony osobistej</td><td>${yL('individual')}</td></tr>
  ${indRows}
</table>

<h2>Firma</h2>
<table>
  <tr><td>Ochrona dla firmy</td><td>${yL('company')}</td></tr>
  ${coRows}
</table>

${basketRows ? `<h2>Klasy ryzyk (Lloyd's)</h2><table>${basketRows}</table>` : ''}

<h2>Historia ubezpieczeniowa (3 lata)</h2>
<table>
  <tr><td>Doświadczenie ubezpieczeniowe</td><td>${yL('history')}</td></tr>
  ${historyRows}
</table>

${fd.final_notes ? `<h2>Uwagi klienta</h2><p style="font-size:13px;line-height:1.6;margin:6px 0">${fd.final_notes}</p>` : ''}

<div class="note">
  Formularz APK sporządzony zgodnie z art. 8 ustawy z dnia 15 grudnia 2017 r. o dystrybucji ubezpieczeń
  (Dz.U. 2019 poz. 1881 ze zm.). Aura Consulting Sp. z o.o. · Broker ubezpieczeniowy licencjonowany przez KNF ·
  auraconsulting.pl
</div>

<div class="sig">
  <div class="sig-box">Podpis klienta / Data</div>
  <div class="sig-box">Podpis doradcy / Pieczęć / Data</div>
</div>

<script>window.print(); window.onafterprint = () => window.close();<\/script>
</body></html>`);
  w.document.close();
}
