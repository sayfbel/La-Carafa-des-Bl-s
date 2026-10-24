const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function fetchJson(endpoint, options = {}) {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('admin_token') : null;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: defaultHeaders,
    credentials: 'include' // include session cookies for admin routes
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = data?.error?.message || `Erreur serveur (${response.status})`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.code = data?.error?.code;
    throw error;
  }

  return data;
}

// Public API
export const api = {
  getHealth: () => fetchJson('/health'),
  getCategories: () => fetchJson('/categories'),
  getProducts: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJson(`/products${query ? `?${query}` : ''}`);
  },
  getProductBySlug: (slug) => fetchJson(`/products/${slug}`),
  getHomepageContent: () => fetchJson('/content/homepage'),
  getPublicSettings: () => fetchJson('/settings/public'),
  submitContact: (payload) => fetchJson('/contact', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),

  // Admin API
  admin: {
    login: (credentials) => fetchJson('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),
    logout: () => fetchJson('/admin/auth/logout', { method: 'POST' }),
    me: () => fetchJson('/admin/auth/me'),
    getStats: () => fetchJson('/admin/stats'),

    // Products & Uploads
    uploadImage: async (file) => {
      const formData = new FormData();
      formData.append('image', file);
      const token = typeof localStorage !== 'undefined' ? localStorage.getItem('admin_token') : null;
      const response = await fetch(`${API_BASE}/admin/upload`, {
        method: 'POST',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        body: formData,
        credentials: 'include'
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error?.message || `Erreur d'upload (${response.status})`);
      }
      return data;
    },
    getProducts: () => fetchJson('/admin/products'),
    createProduct: (data) => fetchJson('/admin/products', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    updateProduct: (id, data) => fetchJson(`/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    deleteProduct: (id) => fetchJson(`/admin/products/${id}`, { method: 'DELETE' }),

    // Categories
    getCategories: () => fetchJson('/admin/categories'),
    createCategory: (data) => fetchJson('/admin/categories', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    updateCategory: (id, data) => fetchJson(`/admin/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    deleteCategory: (id) => fetchJson(`/admin/categories/${id}`, { method: 'DELETE' }),

    // Settings
    getSettings: () => fetchJson('/admin/settings'),
    updateSettings: (data) => fetchJson('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(data)
    }),

    // Messages
    getMessages: () => fetchJson('/admin/messages'),
    updateMessageStatus: (id, status) => fetchJson(`/admin/messages/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    }),
    deleteMessage: (id) => fetchJson(`/admin/messages/${id}`, { method: 'DELETE' }),

    // Audit
    getAuditLogs: () => fetchJson('/admin/audit-logs')
  }
};
