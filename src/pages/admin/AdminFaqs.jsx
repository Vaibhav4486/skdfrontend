import { useEffect, useState } from 'react';
import { getAllFaqsForAdmin, createFaq, updateFaq, setFaqPublished, deleteFaq } from '../../api/faqApi';

const emptyForm = { question: '', answer: '', category: '', displayOrder: 1 };

export default function AdminFaqs() {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    getAllFaqsForAdmin().then((res) => setFaqs(res.data)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  function startEdit(f) {
    setEditingId(f.id);
    setForm({ ...f });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const payload = { ...form, displayOrder: Number(form.displayOrder) };
    try {
      if (editingId) {
        await updateFaq(editingId, payload);
      } else {
        await createFaq(payload);
      }
      cancelEdit();
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save this FAQ.');
    }
  }

  async function togglePublish(f) {
    await setFaqPublished(f.id, !f.published);
    load();
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this FAQ?')) return;
    await deleteFaq(id);
    load();
  }

  return (
    <div className="page wrap">
      <div className="section-head">
        <p className="eyebrow">Admin</p>
        <h2>FAQs</h2>
      </div>

      <form className="card" onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <h3>{editingId ? 'Edit FAQ' : 'Add a new FAQ'}</h3>
        <div className="field"><label>Question</label><input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required /></div>
        <div className="field"><label>Answer</label><textarea value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required /></div>
        <div className="grid-2">
          <div className="field"><label>Category (optional)</label><input value={form.category || ''} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
          <div className="field"><label>Display order</label><input type="number" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: e.target.value })} required /></div>
        </div>
        {error && <div className="form-error">{error}</div>}
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-primary" type="submit">{editingId ? 'Save changes' : 'Add FAQ'}</button>
          {editingId && <button type="button" className="btn-ghost" onClick={cancelEdit}>Cancel</button>}
        </div>
      </form>

      {loading && <p className="loading-msg">Loading…</p>}
      {faqs.map((f) => (
        <div key={f.id} className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div>
              <strong>{f.question}</strong>
              <p style={{ color: '#5B6B78', margin: '6px 0' }}>{f.answer}</p>
            </div>
            <span className={`pill ${f.published ? 'pill-approved' : 'pill-pending'}`}>{f.published ? 'Published' : 'Draft'}</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn-ghost" onClick={() => togglePublish(f)}>{f.published ? 'Unpublish' : 'Publish'}</button>
            <button className="btn-ghost" onClick={() => startEdit(f)}>Edit</button>
            <button className="btn-ghost" style={{ color: '#D14343', borderColor: '#D14343' }} onClick={() => handleDelete(f.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
