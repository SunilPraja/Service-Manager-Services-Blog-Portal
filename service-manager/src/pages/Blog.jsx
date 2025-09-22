import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import SearchFilter from '../components/SearchFilter';
import { ENDPOINTS } from '../api/config';

export default function Blog(){
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get(ENDPOINTS.POSTS());
        const normalized = res.data.map(p => ({
          id: p.id,
          title: p.title?.rendered || p.title,
          excerpt: p.excerpt?.rendered?.replace(/<[^>]+>/g,'') || p.excerpt,
          content: p.content?.rendered || p.content,
          image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || p.image || '/images/blog1.jpg'
        }));
        setPosts(normalized);
      }catch(e){
        import('../data/blogs.json').then(mod => setPosts(mod.default));
      }
    }
    fetchData();
  },[]);

  const filtered = posts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="container blog-page">
      <h2>Blog</h2>
      <SearchFilter value={query} onChange={setQuery} placeholder="Search posts..." />
      <div className="grid">
        {filtered.length ? filtered.map(p => <BlogCard key={p.id} post={p} />) : <p>No posts found.</p>}
      </div>
    </section>
  );
}
