// Switch baseURL between 'json' and 'wp' by changing MODE
export const MODE = import.meta.env.VITE_MODE || 'JSON'; // 'JSON' or 'WP'
export const WP_BASE = import.meta.env.VITE_WP_BASE || 'http://localhost:8000'; // set in env on deploy
export const ENDPOINTS = {
  SERVICES: () =>
    MODE === 'WP' ? `${WP_BASE}/wp-json/wp/v2/services?_embed` : '/src/data/services.json',
  POSTS: () => (MODE === 'WP' ? `${WP_BASE}/wp-json/wp/v2/posts?_embed` : '/src/data/blogs.json'),
  POST_BY_ID: (id) =>
    MODE === 'WP' ? `${WP_BASE}/wp-json/wp/v2/posts/${id}?_embed` : `/src/data/blogs.json`
};
