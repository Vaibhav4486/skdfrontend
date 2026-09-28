import { useState } from 'react';
import Reveal from '../components/Reveal';
import PageHero from '../components/PageHero';
import { checkEligibility } from '../api/eligibilityApi';
import { IMG } from '../data/images';

// These strings must match exactly what the backend's EligibilityService
// switches on (com.skdfinance.backend.service.EligibilityService#getRateAndTenure) —
// note they differ slightly from servicesData's display names ("4 Wheeler Loan"
// here vs "4-Wheeler Loans" there), so this list is intentionally separate.
const LOAN_TYPES = ['Home Loan', 'Mortgage Loan', 'Open Plot Purchase', 'Business Loan', '4 Wheeler Loan'];

export default function EmiCalculator() {
  const [tab, setTab] = useState('emi');

  return (
    <div>
      <PageHero
        compact
        image={IMG.calculator}
        eyebrow="Plan ahead"
        title="EMI calculator & eligibility"
        lead="Sketch a monthly payment before you sit in Tarnaka — then we refine it against your actual papers and lender options."
      />
    <div className="page wrap">
      <Reveal>
        <p className="prose" style={{ maxWidth: 720, marginBottom: 28 }}>
          The calculator is indicative: it uses the amount, rate, and years you choose. The eligibility
          checker talks to our server and gives a score, not a sanction letter. Use both as a starting
          conversation, not a promise.
        </p>
      </Reveal>

      <div className="calc-tabs">
        <button className={`calc-tab ${tab === 'emi' ? 'active' : ''}`} onClick={() => setTab('emi')}>EMI Calculator</button>
        <button className={`calc-tab ${tab === 'eligibility' ? 'active' : ''}`} onClick={() => setTab('eligibility')}>Eligibility Checker</button>
      </div>

      {tab === 'emi' ? <EmiCalculatorTool /> : <EligibilityCheckerTool />}
    </div>
    </div>
  );
}

function EmiCalculatorTool() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const r = rate / 12 / 100;
  const n = tenure * 12;
  const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayable = emi * n;
  const totalInterest = totalPayable - amount;
  const principalPct = Math.round((amount / totalPayable) * 100);
  const interestPct = 100 - principalPct;

  function inr(v) {
    return '₹' + Math.round(v).toLocaleString('en-IN');
  }

  // amortization schedule, first 12 months
  const schedule = [];
  let balance = amount;
  for (let m = 1; m <= 12; m++) {
    const interestPortion = balance * r;
    const principalPortion = emi - interestPortion;
    balance -= principalPortion;
    schedule.push({ month: m, emi, principal: principalPortion, interest: interestPortion, balance });
  }

  return (
    <Reveal>
      <div className="calc-layout">
        <div className="form-card">
          <h3>Loan Parameters</h3>
          <div className="slider-group">
            <div className="slider-row"><label>Loan Amount</label><span className="val tab-nums">{inr(amount)}</span></div>
            <input type="range" min="100000" max="10000000" step="50000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </div>
          <div className="slider-group">
            <div className="slider-row"><label>Interest Rate (% p.a.)</label><span className="val tab-nums">{rate.toFixed(2)}%</span></div>
            <input type="range" min="5" max="20" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
          </div>
          <div className="slider-group">
            <div className="slider-row"><label>Loan Tenure (Years)</label><span className="val tab-nums">{tenure} Years</span></div>
            <input type="range" min="1" max="30" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
          </div>
        </div>

        <div className="calc-result">
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '.03em' }}>Monthly EMI</p>
          <div className="emi-amt tab-nums">{inr(emi)}</div>
          <div className="row"><span>Principal Amount</span><strong className="tab-nums">{inr(amount)}</strong></div>
          <div className="row"><span>Total Interest</span><strong className="tab-nums">{inr(totalInterest)}</strong></div>
          <div className="row"><span>Total Payable</span><strong className="tab-nums">{inr(totalPayable)}</strong></div>
          <div className="row" style={{ borderBottom: 'none' }}><span>Number of Payments</span><strong className="tab-nums">{n} months</strong></div>

          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', marginTop: 20, marginBottom: 6 }}>Principal vs Interest</p>
          <div className="breakdown-bar">
            <div className="principal" style={{ width: `${principalPct}%` }}>{principalPct}%</div>
            <div className="interest" style={{ width: `${interestPct}%` }}>{interestPct}%</div>
          </div>
          <div className="breakdown-legend">
            <span>Principal</span>
            <span>Interest</span>
          </div>
        </div>
      </div>

      <div className="section-head left" style={{ marginTop: 44 }}>
        <h2>Amortization Schedule (First 12 Months)</h2>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead><tr><th>Month</th><th>EMI</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.month}>
                <td>{row.month}</td>
                <td className="tab-nums">{inr(row.emi)}</td>
                <td className="tab-nums" style={{ color: 'var(--green-dark)' }}>{inr(row.principal)}</td>
                <td className="tab-nums" style={{ color: 'var(--gold)' }}>{inr(row.interest)}</td>
                <td className="tab-nums">{inr(Math.max(row.balance, 0))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

function EligibilityCheckerTool() {
  const [form, setForm] = useState({
    fullName: '', phone: '', monthlyIncome: '', age: '', employmentType: 'Salaried',
    existingEmi: '', cibilScore: '', city: '', loanType: LOAN_TYPES[0]
  });
  const [result, setResult] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError('');
    setResult(null);
    setLoading(true);

    const payload = {
      ...form,
      monthlyIncome: Number(form.monthlyIncome),
      age: Number(form.age),
      existingEmi: form.existingEmi ? Number(form.existingEmi) : 0,
      cibilScore: form.cibilScore ? Number(form.cibilScore) : null
    };

    try {
      const { data } = await checkEligibility(payload);
      setResult(data);
    } catch (err) {
      const body = err.response?.data;
      if (body?.fieldErrors) setFieldErrors(body.fieldErrors);
      else setGeneralError(body?.message || 'Something went wrong — please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Reveal>
      <div className="calc-layout">
        <form className="form-card" onSubmit={handleSubmit}>
          <h3>Enter Your Details</h3>
          <div className="field">
            <label>Full name</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} required />
            {fieldErrors.fullName && <div className="form-error">{fieldErrors.fullName}</div>}
          </div>
          <div className="field">
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="10-digit mobile number" required />
            {fieldErrors.phone && <div className="form-error">{fieldErrors.phone}</div>}
          </div>
          <div className="field">
            <label>Monthly income (₹)</label>
            <input type="number" name="monthlyIncome" value={form.monthlyIncome} onChange={handleChange} required />
            {fieldErrors.monthlyIncome && <div className="form-error">{fieldErrors.monthlyIncome}</div>}
          </div>
          <div className="field">
            <label>Age</label>
            <input type="number" name="age" value={form.age} onChange={handleChange} required />
            {fieldErrors.age && <div className="form-error">{fieldErrors.age}</div>}
          </div>
          <div className="field">
            <label>Employment type</label>
            <select name="employmentType" value={form.employmentType} onChange={handleChange}>
              <option>Salaried</option>
              <option>Self-Employed</option>
              <option>Business Owner</option>
            </select>
          </div>
          <div className="field">
            <label>Existing EMI (₹, if any)</label>
            <input type="number" name="existingEmi" value={form.existingEmi} onChange={handleChange} />
          </div>
          <div className="field">
            <label>CIBIL score (if known)</label>
            <input type="number" name="cibilScore" value={form.cibilScore} onChange={handleChange} />
            {fieldErrors.cibilScore && <div className="form-error">{fieldErrors.cibilScore}</div>}
          </div>
          <div className="field">
            <label>City</label>
            <input name="city" value={form.city} onChange={handleChange} />
          </div>
          <div className="field">
            <label>Loan type</label>
            <select name="loanType" value={form.loanType} onChange={handleChange}>
              {LOAN_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          {generalError && <div className="form-error">{generalError}</div>}
          <button className="btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Checking…' : 'Check Eligibility'}
          </button>
        </form>

        <div className="calc-result">
          {!result ? (
            <div style={{ color: 'rgba(255,255,255,0.7)' }}>
              Fill in your details and submit to see your estimated eligibility here.
              <p style={{ fontSize: '0.8rem', marginTop: 16, color: 'rgba(255,255,255,0.5)' }}>
                This is an indicative estimate — actual eligibility may vary based on lender policy.
              </p>
            </div>
          ) : (
            <>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '.03em' }}>
                Estimated Eligibility
              </p>
              <div className="emi-amt tab-nums">₹{result.eligibleAmount?.toLocaleString('en-IN')}</div>
              <div className="row"><span>Eligibility Score</span><strong>{result.eligibilityScore}/100</strong></div>
              <p style={{ color: 'rgba(255,255,255,0.85)', marginTop: 14 }}>{result.recommendation}</p>
              {result.qualifiesFor?.length > 0 && (
                <>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: 16, marginBottom: 8 }}>You may also qualify for:</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {result.qualifiesFor.map((q) => (
                      <span key={q} className="pill" style={{ background: 'rgba(31,158,109,0.2)', color: '#4ade9f' }}>{q}</span>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Reveal>
  );
}
