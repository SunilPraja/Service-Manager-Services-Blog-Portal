import React from 'react';
import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <img src={post.image} alt={post.title} />
      <div className="card-body">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <Link to={`/blog/${post.id}`}>Read More</Link>
      </div>
    </article>
  );
}
