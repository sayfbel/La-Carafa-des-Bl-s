import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Search, Check, X, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

export function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Form State
  const initialForm = {
    name: '',
    slug: '',
    category_id: '',
    short_description: '',
    description: '',
    price: '',
    allergens: '',
    image_url: '',
    is_available: true,
    is_featured: false,
    is_published: true
  };
  const [formData, setFormData] = useState(initialForm);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        api.admin.getProducts(),
        api.admin.getCategories()
      ]);
      if (prodRes?.success) setProducts(prodRes.data);
      if (catRes?.success) setCategories(catRes.data);
    } catch (err) {
      setErrorMessage(err.message || 'Erreur lors du chargement des données.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      ...initialForm,
      category_id: categories[0]?.id || ''
    });
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      category_id: product.category_id,
      short_description: product.short_description || '',
      description: product.description || '',
      price: product.price ? String(product.price) : '',
      allergens: product.allergens || '',
      image_url: product.image_url || '',
      is_available: Boolean(product.is_available),
      is_featured: Boolean(product.is_featured),
      is_published: Boolean(product.is_published)
    });
    setModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNameBlur = () => {
    if (!editingProduct && formData.name && !formData.slug) {
      const generatedSlug = formData.name
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      if (editingProduct) {
        await api.admin.updateProduct(editingProduct.id, formData);
        setStatusMessage('Produit mis à jour avec succès.');
      } else {
        await api.admin.createProduct(formData);
        setStatusMessage('Nouveau produit créé avec succès.');
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      setErrorMessage(err.message || 'Une erreur est survenue lors de l’enregistrement.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.admin.deleteProduct(id);
      setStatusMessage('Produit supprimé du catalogue.');
      setDeleteConfirmId(null);
      loadData();
    } catch (err) {
      setErrorMessage(err.message || 'Impossible de supprimer ce produit.');
    }
  };

  // Filtered Products
  const filteredProducts = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !categoryFilter || String(p.category_id) === String(categoryFilter);
    return matchSearch && matchCategory;
  });

  return (
    <div>
      {/* Title & Add Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--color-burgundy)', margin: 0 }}>
            Gestion des Produits
          </h1>
          <p style={{ color: 'var(--color-text-muted)', margin: '0.4rem 0 0' }}>
            Consultez, modifiez et ajoutez les spécialités au catalogue en ligne.
          </p>
        </div>

        <button onClick={openCreateModal} className="btn btn-primary">
          <Plus size={18} />
          <span>Ajouter un produit</span>
        </button>
      </div>

      {statusMessage && (
        <div className="alert alert-success" style={{ marginBottom: '1.5rem' }}>
          <span>{statusMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          backgroundColor: '#FFFFFF',
          padding: '1.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <input
            type="text"
            placeholder="Rechercher par nom..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="form-select"
          style={{ width: 'auto', minWidth: '200px' }}
        >
          <option value="">Toutes les catégories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#FAF5EC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-burgundy)' }}>
              <th style={{ padding: '1rem 1.25rem' }}>Aperçu</th>
              <th style={{ padding: '1rem 1.25rem' }}>Nom du Produit</th>
              <th style={{ padding: '1rem 1.25rem' }}>Catégorie</th>
              <th style={{ padding: '1rem 1.25rem' }}>Prix</th>
              <th style={{ padding: '1rem 1.25rem' }}>Disponibilité</th>
              <th style={{ padding: '1rem 1.25rem' }}>Publication</th>
              <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <td style={{ padding: '0.85rem 1.25rem', width: '70px' }}>
                  <img
                    src={p.image_url || '/assets/images/hero-bread.webp'}
                    alt=""
                    style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                  />
                </td>
                <td style={{ padding: '0.85rem 1.25rem' }}>
                  <strong style={{ display: 'block', color: 'var(--color-text-main)' }}>{p.name}</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-light)' }}>/{p.slug}</span>
                </td>
                <td style={{ padding: '0.85rem 1.25rem', color: 'var(--color-text-muted)' }}>
                  {p.category_name}
                </td>
                <td style={{ padding: '0.85rem 1.25rem', fontWeight: 600, color: 'var(--color-gold)' }}>
                  {p.price ? `${Number(p.price).toFixed(2).replace('.', ',')} €` : '—'}
                </td>
                <td style={{ padding: '0.85rem 1.25rem' }}>
                  {p.is_available ? (
                    <span style={{ color: 'var(--color-success)', fontSize: '0.82rem', fontWeight: 600 }}>En rayon</span>
                  ) : (
                    <span style={{ color: 'var(--color-danger)', fontSize: '0.82rem', fontWeight: 600 }}>Épuisé</span>
                  )}
                </td>
                <td style={{ padding: '0.85rem 1.25rem' }}>
                  {p.is_published ? (
                    <span style={{ backgroundColor: '#ECFDF5', color: '#065F46', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                      Public
                    </span>
                  ) : (
                    <span style={{ backgroundColor: '#FEF3C7', color: '#92400E', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                      Brouillon
                    </span>
                  )}
                </td>
                <td style={{ padding: '0.85rem 1.25rem', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => openEditModal(p)}
                      aria-label="Modifier le produit"
                      style={{ background: 'none', border: 'none', color: 'var(--color-burgundy)', cursor: 'pointer', padding: '0.4rem' }}
                    >
                      <Edit size={17} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(p.id)}
                      aria-label="Supprimer le produit"
                      style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '0.4rem' }}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                  Aucun produit trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999
          }}
        >
          <div style={{ backgroundColor: '#FFF', borderRadius: 'var(--radius-lg)', padding: '2rem', maxWidth: '440px', width: '90%' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--color-danger)', marginBottom: '0.75rem' }}>
              Confirmer la suppression
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.92rem' }}>
              Êtes-vous certain de vouloir supprimer définitivement ce produit du catalogue ? Cette action est irréversible.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button onClick={() => setDeleteConfirmId(null)} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
                Annuler
              </button>
              <button onClick={() => handleDelete(deleteConfirmId)} className="btn btn-primary" style={{ backgroundColor: 'var(--color-danger)', padding: '0.5rem 1rem' }}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            padding: '1.5rem'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFF',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              maxWidth: '640px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--color-burgundy)', margin: 0 }}>
                {editingProduct ? 'Modifier le produit' : 'Créer une nouvelle création'}
              </h2>
              <button onClick={() => setModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="prod-name">Nom du produit *</label>
                  <input
                    id="prod-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    onBlur={handleNameBlur}
                    className="form-input"
                    placeholder="Baguette de tradition"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="prod-slug">Identifiant URL (slug) *</label>
                  <input
                    id="prod-slug"
                    name="slug"
                    type="text"
                    required
                    value={formData.slug}
                    onChange={handleFormChange}
                    className="form-input"
                    placeholder="baguette-de-tradition"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="prod-cat">Catégorie *</label>
                  <select
                    id="prod-cat"
                    name="category_id"
                    required
                    value={formData.category_id}
                    onChange={handleFormChange}
                    className="form-select"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="prod-price">Prix indicatif (€)</label>
                  <input
                    id="prod-price"
                    name="price"
                    type="number"
                    step="0.05"
                    min="0"
                    value={formData.price}
                    onChange={handleFormChange}
                    className="form-input"
                    placeholder="1.30"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prod-allergens">Allergènes déclarés</label>
                <input
                  id="prod-allergens"
                  name="allergens"
                  type="text"
                  value={formData.allergens}
                  onChange={handleFormChange}
                  className="form-input"
                  placeholder="Gluten (blé), Lait, Fruits à coque..."
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prod-img">Chemin ou URL de l'image</label>
                <input
                  id="prod-img"
                  name="image_url"
                  type="text"
                  value={formData.image_url}
                  onChange={handleFormChange}
                  className="form-input"
                  placeholder="/assets/images/products/baguette-tradition.webp"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prod-short">Description courte</label>
                <input
                  id="prod-short"
                  name="short_description"
                  type="text"
                  value={formData.short_description}
                  onChange={handleFormChange}
                  className="form-input"
                  placeholder="Croûte dorée croustillante, mie alvéolée..."
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prod-desc">Description complète / Recette</label>
                <textarea
                  id="prod-desc"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleFormChange}
                  className="form-textarea"
                  placeholder="Détaillez les méthodes de fermentation, farines utilisées..."
                />
              </div>

              {/* Checkboxes */}
              <div style={{ display: 'flex', gap: '2rem', margin: '1.25rem 0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    name="is_available"
                    checked={formData.is_available}
                    onChange={handleFormChange}
                  />
                  <span>Disponible en rayon</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleFormChange}
                  />
                  <span>Publier sur le site web</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleFormChange}
                  />
                  <span>Mettre en avant</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline" style={{ padding: '0.6rem 1.25rem' }}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
