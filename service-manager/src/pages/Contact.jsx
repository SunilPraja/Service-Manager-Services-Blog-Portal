import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function Contact(){
  const [form, setForm] = useState({ name:'', email:'', message:''});
  const [submitted, setSubmitted] = useState([]);
  const [token, setToken] = useState(null);

  const onSubmit = e => {
    e.preventDefault();
    // store in component state as mock submission
    if (!token) {
      alert('Please complete reCAPTCHA');
      return;
    }
    setSubmitted(prev => [...prev, { ...form, date: new Date().toISOString() }]);
    setForm({ name:'', email:'', message:''});
    setToken(null);
    alert('Form submitted (mock). Data saved in component state.');
  };

  return (
    <section className="container contact-page">
      <h2>Contact Us</h2>
      <form onSubmit={onSubmit} className="contact-form">
        <label>Name<input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required /></label>
        <label>Email<input type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} required /></label>
        <label>Message<textarea value={form.message} onChange={e=>setForm({...form, message: e.target.value})} required /></label>
        <div style={{margin:'1rem 0'}}>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITEKEY || 'MOCK_KEY'}
            onChange={value => setToken(value)}
          />
        </div>
        <button type="submit">Send</button>
      </form>

      <div className="mock-submissions">
        <h3>Mock Submissions</h3>
        {submitted.length === 0 ? <p>No mock submissions yet.</p> : (
          <ul>
            {submitted.map((s,i)=> <li key={i}>{s.name} ({s.email}) — {new Date(s.date).toLocaleString()}</li>)}
          </ul>
        )}
      </div>
    </section>
  );
}
