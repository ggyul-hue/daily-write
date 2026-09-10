import { questionBank } from './question-bank.js';

// Room v3 starts empty; future rq-v1-* entries are added here.
export const roomQuestionBank = [];

const normalize = value => String(value ?? '').normalize('NFC').trim().replace(/\s+/g, ' ');
const legacyRoom = () => questionBank.filter(q => q?.roomEligible === true && Array.isArray(q.roomChoices) && q.roomChoices.length === 3);

export function validateRoomCatalog(catalog = roomQuestionBank, legacy = questionBank) {
  const errors = [];
  const ids = new Set(legacy.map(q => q.id));
  const seen = new Set();
  for (const q of catalog) {
    if (!/^rq-v1-\d{4}$/.test(q?.id ?? '')) errors.push(`invalid rq ID: ${q?.id}`);
    if (seen.has(q?.id) || ids.has(q?.id)) errors.push(`duplicate cross-catalog ID: ${q?.id}`);
    seen.add(q?.id);
    if (typeof q?.text !== 'string' || !q.text.trim()) errors.push(`missing rq text: ${q?.id}`);
    if (!Array.isArray(q?.roomChoices) || q.roomChoices.length !== 3) errors.push(`invalid rq choices: ${q?.id}`);
    else {
      const choices = q.roomChoices.map(normalize);
      if (choices.some(value => !value) || new Set(choices).size !== 3) errors.push(`duplicate/empty rq choice: ${q.id}`);
    }
  }
  const all = getAllRoomQuestions(legacy, catalog);
  const textSeen = new Map();
  for (const q of all) {
    const key = normalize(q.text);
    if (textSeen.has(key)) errors.push(`duplicate effective Room text: ${q.id} with ${textSeen.get(key)}`);
    else textSeen.set(key, q.id);
  }
  return { ok: errors.length === 0, errors };
}

export function getAllRoomQuestions(legacy = questionBank, catalog = roomQuestionBank) {
  const linked = legacy.filter(q => q?.roomEligible === true && Array.isArray(q.roomChoices) && q.roomChoices.length === 3)
    .map(q => ({ id: q.id, text: q.roomText ?? q.text, roomChoices: q.roomChoices, source: 'solo-linked' }));
  const roomOnly = catalog.map(q => ({ id: q.id, text: q.text, roomChoices: q.roomChoices, source: 'room-only' }));
  return [...linked, ...roomOnly];
}

export function getRoomQuestionById(id, legacy = questionBank, catalog = roomQuestionBank) {
  return getAllRoomQuestions(legacy, catalog).find(q => q.id === id) ?? null;
}

export const roomCatalogValidation = validateRoomCatalog();
if (!roomCatalogValidation.ok) throw new Error(roomCatalogValidation.errors.join('; '));
