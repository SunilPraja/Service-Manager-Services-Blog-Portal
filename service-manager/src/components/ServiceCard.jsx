import React from 'react';

export default function ServiceCard({ service }) {
  return (
    <article className="service-card">
      <img src={service.image} alt={service.title} />
      <div className="card-body">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <p className="price">{service.price}</p>
      </div>
    </article>
  );
}
