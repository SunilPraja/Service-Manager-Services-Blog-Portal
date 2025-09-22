import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <section className="hero container">
      <div className="hero-inner">
        <h2>Service Manager</h2>
        <p>Find curated services, book appointments, and read our blog.</p>
        <div className="cta">
          <Link className="btn" to="/services">Explore Services</Link>
          <Link className="btn ghost" to="/blog">Read Blog</Link>
        </div>
      </div>
    </section>
  );
}
