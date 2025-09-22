import React from 'react';

export default function SearchFilter({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="search-filter">
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
