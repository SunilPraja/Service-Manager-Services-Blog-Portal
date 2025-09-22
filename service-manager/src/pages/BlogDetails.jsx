import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ENDPOINTS } from '../api/config';

export default function BlogDetails(){
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(()=>{
    async function load(){
      try{
        if (process.env.VITE_MODE === 'WP') {
          const res = await axios.get(`${ENDPOINTS.POSTS().replace(/\?.*$/,'')}/${id}?_embed`);
          const p = res.data;
          setPost({
            id: p.id,
            title: p.title?.rendered || p.title,
            content: p.content?.rendered || p.content,
            image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || p.image
          });
        } else {
          // local JSON fallback
          const mod = await import('../data/blogs.json');
          const found = mod.default.find(b => String(b.id) === String(id));
          setPost(found);
        }
      }catch(e){
        const mod = await import('../data/blogs.json');
        const found = mod.default.find(b => String(b.id) === String(id));
        setPost(found);
      }
    }
    load();
  },[id]);

  if(!post) return <p>Loading...</p>;

  return (
    <article className="container blog-details">
      <h2>{post.title}</h2>
      {post.image && <img src={post.image} alt={post.title} />}
      <div dangerouslySetInnerHTML={{__html: post.content || post.excerpt || ''}} />
    </article>
  );
}
