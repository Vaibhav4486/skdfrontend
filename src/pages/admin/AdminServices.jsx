import { useEffect, useState } from 'react';
import { getAllServices, createService, updateService, deleteService } from '../../api/servicesApi';

const emptyForm = { name: '', slug: '', shortDescription: '', startingRate: '', maxAmount: '', maxTenure: '', iconKey: '', displayOrder: 1 };

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    getAllServices().then((res) => setServices(res.data)).finally(() => setLoading(false));
  }

  useEffect(load, []);

  function startEdit(s) {
    setEditingId(s.id);
    setForm({ ...s });
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
        await updateService(editingId, payload);
      } else {
        await createService(payload);
      }
      cancelEdit();
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save this service.');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this service?')) return;
    await deleteService(id);
    load();
  }

  return (
    <div className="page wrap">
      <div className="section-head">
        <p className="eyebrow">Admin</p>
        <h2>Services</h2>
      </div>

      <form className="card" onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <h3>{editingId ? 'Edit service' : 'Add a new service'}</h3>
        <div className="grid-2">
          <div className="field"><label>Name</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div>
          <div className="field"><label>Slug (URL-friendly)</label><input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="e.g. home-loans" required /></div>
        </div>
        <div className="field"><label>Short description</label><textarea value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} required /></div>
        <div className="grid-3">
          <div className="field"><label>Starting rate</label><input value={form.startingRate || ''} onChange={(e) => setForm({ ...form, startingRate: e.target.value })} placeholder="e.g. 8.4% p.a." /></div>
          <div className="field"><label>Max amount</label><input value={form.maxAmount || ''} onChange={(e) => setForm({ ...form, maxAmount: e.target.value })} placeholder="e.g. ₹1 Cr" /></div>
          <div className="field"><label>Max tenure</label><input value={form.maxTenure || ''} onChange={(e) => setForm({ ...form, maxTenure: e.target.value })} placeholder="e.g. 30 years" /></div>
        </div>
        <div className="field"><label>Display order</label><input type="number" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: e.target.value })} required /></div>
        {error && <div className="form-error">{error}</div>}
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-primary" type="submit">{editingId ? 'Save changes' : 'Add service'}</button>
          {editingId && <button type="button" className="btn-ghost" onClick={cancelEdit}>Cancel</button>}
        </div>
      </form>

      {loading && <p className="loading-msg">Loading…</p>}
      <div className="grid-2">
        {services.map((s) => (
          <div key={s.id} className="card">
            <h3>{s.name}</h3>
            <p style={{ color: '#5B6B78' }}>{s.shortDescription}</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <button className="btn-ghost" onClick={() => startEdit(s)}>Edit</button>
              <button className="btn-ghost" style={{ color: '#D14343', borderColor: '#D14343' }} onClick={() => handleDelete(s.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
