// src/components/Basket.jsx
// Koszyk ryzyk — accordion z checklistą i polem opisu

import React, { useState } from 'react';

/**
 * @param {object} props
 * @param {{ roman: string, label: string, items: string[] }} props.data
 * @param {{ [itemIndex: number]: boolean }} props.sels  zaznaczone pozycje
 * @param {(i: number) => void} props.onToggle
 * @param {string} props.desc       opis klasy
 * @param {(v: string) => void} props.onDesc
 */
export function Basket({ data, sels, onToggle, desc, onDesc }) {
  const [open, setOpen] = useState(false);
  const cnt = Object.values(sels || {}).filter(Boolean).length;

  return (
    <div className={`basket${open ? ' open' : ''}`}>
      <div className="basket-hdr" onClick={() => setOpen((o) => !o)}>
        <div className="basket-left">
          <div className="b-roman">{data.roman}</div>
          <div className="b-label">{data.label}</div>
          {cnt > 0 && <span className="b-cnt">{cnt}</span>}
        </div>
        <div className="b-toggle">+</div>
      </div>

      {open && (
        <div className="basket-body">
          <div className="chk-list">
            {data.items.map((item, i) => (
              <div
                key={i}
                className={`chk-item${sels[i] ? ' on' : ''}`}
                onClick={() => onToggle(i)}
              >
                <input
                  type="checkbox"
                  checked={!!sels[i]}
                  onChange={() => onToggle(i)}
                  onClick={(e) => e.stopPropagation()}
                />
                <label>{item}</label>
              </div>
            ))}
          </div>
          <div className="b-desc">
            <textarea
              placeholder={`Uwagi do klasy ${data.roman} — ${data.label}...`}
              value={desc || ''}
              onChange={(e) => onDesc(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
