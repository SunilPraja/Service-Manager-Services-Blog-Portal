import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard';
import SearchFilter from '../components/SearchFilter';
import { ENDPOINTS } from '../api/config';

export default function Services(){
  const [services, setServices] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const url = ENDPOINTS.SERVICES();
        const res = await axios.get(url);
        // If WP, services may be in a different shape; normalize:
        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];
        // If WP mode: map WP CPT to our shape (example)
        const normalized = res.data.map(item => ({
          id: item.id,
          title: item.title?.rendered || item.title,
          description: item.excerpt?.rendered?.replace(/<[^>]+>/g,'') || item.description,
          price: item.meta?.price || item.price || '—',
          image: item.featured_media_url || item.image || '/images/aroma.jpg',
          category: item.meta?.category || item.category || 'General'
        }));
        setServices(normalized);
      }catch(err){
        // fallback to local JSON import if CORS or path issues
        import('../data/services.json').then(mod => setServices(mod.default));
      }
    };
    fetchData();
  },[]);

  const categories = ['All', ...new Set(services.map(s => s.category))];

  const filtered = services.filter(s=>{
    const matchesQuery = s.title.toLowerCase().includes(query.toLowerCase()) || s.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'All' || s.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <section className="container services-page">
      <h2>Our Services</h2>
      <div className="controls">
        <SearchFilter value={query} onChange={setQuery} placeholder="Search services..." />
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid">
        {filtered.length ? filtered.map(s => <ServiceCard key={s.id} service={s} />) : <p>No services found.</p>}
      </div>
    </section>
  );
}
