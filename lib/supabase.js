// src/lib/supabase.js
// Klient Supabase — projekt aurabroker (eu-west-1)

const SB_URL = 'https://kukvgsjrmrqtzhkszzum.supabase.co';
const SB_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1a3Znc2pybXJxdHpoa3N6' +
  'enVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5MTI0NzYsImV4cCI6' +
  'MjA4ODQ4ODQ3Nn0.' +
  'wOB-4CJTcRksSUY7WD7CXEccTKNxPIVF8AT8hczS5zY';

const HEADERS = {
  'Content-Type': 'application/json',
  apikey: SB_KEY,
  Authorization: `Bearer ${SB_KEY}`,
  Prefer: 'return=representation',
};

/**
 * Wrapper REST API Supabase (bez zewnętrznej biblioteki).
 * @param {'GET'|'POST'|'PATCH'|'DELETE'} method
 * @param {string} path  np. 'apk_forms?id=eq.xxx'
 * @param {object} [body]
 * @returns {Promise<{data?: any, error?: string}>}
 */
export async function sb(method, path, body) {
  try {
    const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
      method,
      headers: HEADERS,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    if (!res.ok) return { error: data.message || data.error || `HTTP ${res.status}` };
    return { data };
  } catch (e) {
    return { error: e.message };
  }
}

/**
 * Zapisuje zdarzenie do tabeli apk_audit.
 * @param {string|null} formId
 * @param {string} event  'created'|'autosaved'|'submitted'|'pdf_exported'|'viewed'
 * @param {string} [actor]
 */
export async function auditLog(formId, event, actor = 'unknown') {
  if (!formId) return;
  await sb('POST', 'apk_audit', { form_id: formId, event, actor });
}

export { SB_URL, SB_KEY };
