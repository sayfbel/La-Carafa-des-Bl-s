import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, AlertCircle, Check, X } from 'lucide-react';
import { api } from '../../services/api';

export function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const initialForm = {
    name: '',
    slug: '',
    description: '',
    display_order: 1,
    is_active: true
  };
  const [formData, setFormData] = useState(initialForm);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await api.admin.getCategories();
      if (res?.success) setCategories(res.data);
    } catch (err) {
      setErrorMessage(err.message || 'Erreur lors du chargement des catégories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      ...initialForm,
      display_order: categories.length + 1
    });
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      display_order: cat.display_order,
      is_active: Boolean(cat.is_active)
    });
    setModalOpen(true);
  };

  const handleNameBlur = () => {
    if (!editingCategory && formData.name && !formData.slug) {
      const cleanSlug = formData.name
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug: cleanSlug }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    try {
      if (editingCategory) {
        await api.admin.updateCategory(editingCategory.id, formData);
        setStatusMessage('Catégorie mise à jour avec succès.');
      } else {
        await api.admin.createCategory(formData);
        setStatusMessage('Nouvelle catégorie créée.');
      }
      setModalOpen(false);
      loadCategories();
    } catch (err) {
      setErrorMessage(err.message || 'Erreur lors de l’enregistrement.');
    }
  };

  const handleDelete = async (id, name, productsCount) => {
    if (productsCount > 0) {
      setErrorMessage(`Impossible de supprimer « ${name} » car ${productsCount} produit(s) y sont rattachés.`);
      return;
    }

    if (!window.confirm(`Confirmez-vous la suppression de la catégorie « ${name} » ?`)) {
      return;
    }

    try {
      await api.admin.deleteCategory(id);
      setStatusMessage('Catégorie supprimée.');
      loadCategories();
    } catch (err) {
      setErrorMessage(err.message || 'Impossible de supprimer cette catégorie.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', color: 'var(--color-burgundy)', margin: 0 }}>
            Catégories de Produits
          </h1>
          <p style={{ color: 'var(--color-text-muted)', margin: '0.4rem 0 0' }}>
            Structurez votre carte entre pains de tradition, viennoiseries et pâtisseries fines.
          </p>
        </div>

        <button onClick={openCreateModal} className="btn btn-primary">
          <Plus size={18} />
          <span>Ajouter une catégorie</span>
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

      {/* Categories Table */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 0,
          border: '1px solid var(--color-border)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#FAF5EC', borderBottom: '1px solid var(--color-border)', color: 'var(--color-burgundy)' }}>
              <th style={{ padding: '1rem 1.25rem', width: '80px' }}>Ordre</th>
              <th style={{ padding: '1rem 1.25rem' }}>Nom de la Catégorie</th>
              <th style={{ padding: '1rem 1.25rem' }}>Slug</th>
              <th style={{ padding: '1rem 1.25rem' }}>Description</th>
              <th style={{ padding: '1rem 1.25rem' }}>Produits rattachés</th>
              <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--color-gold)' }}>
                  #{c.display_order}
                </td>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                  {c.name}
                </td>
                <td style={{ padding: '1rem 1.25rem', color: 'var(--color-text-muted)' }}>
                  /{c.slug}
                </td>
                <td style={{ padding: '1rem 1.25rem', color: 'var(--color-text-muted)', maxWidth: '300px' }}>
                  {c.description || '—'}
                </td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <span style={{ backgroundColor: 'var(--color-ivory)', padding: '0.2rem 0.6rem', borderRadius: 0, fontWeight: 600 }}>
                    {c.products_count || 0} produit(s)
                  </span>
                </td>
                <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => openEditModal(c)}
                      aria-label="Modifier la catégorie"
                      style={{ background: 'none', border: 'none', color: 'var(--color-burgundy)', cursor: 'pointer', padding: '0.4rem' }}
                    >
                      <Edit size={17} />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id, c.name, c.products_count)}
                      aria-label="Supprimer la catégorie"
                      style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', padding: '0.4rem' }}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal with Fixed Header, Scrollable Content, and Fixed Footer */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.55)',
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
              borderRadius: 0,
              maxWidth: '540px',
              width: '100%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden'
            }}
          >
            {/* Modal Header: Fixed */}
            <div
              style={{
                padding: '1.25rem 1.75rem',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#FAF7F2',
                flexShrink: 0
              }}
            >
              <h2 style={{ fontSize: '1.4rem', color: 'var(--color-burgundy)', margin: 0 }}>
                {editingCategory ? 'Modifier la catégorie' : 'Créer une catégorie'}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '0.25rem' }}
                title="Fermer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form wrapping body and fixed footer */}
            <form
              onSubmit={handleSave}
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: 0,
                overflow: 'hidden'
              }}
            >
              {/* Modal Body: Scrollable fields */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '1.5rem 1.75rem'
                }}
              >
                <div className="form-group">
                  <label className="form-label" htmlFor="cat-name">Nom de la catégorie *</label>
                  <input
                    id="cat-name"
                    type="text"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onBlur={handleNameBlur}
                    className="form-input"
                    placeholder="Ex: Viennoiseries"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cat-slug">Identifiant URL (slug) *</label>
                  <input
                    id="cat-slug"
                    type="text"
                    required
                    maxLength={100}
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="form-input"
                    placeholder="viennoiseries"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cat-order">Ordre d'affichage</label>
                  <input
                    id="cat-order"
                    type="number"
                    min="1"
                    max="999"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="cat-desc">Description</label>
                  <textarea
                    id="cat-desc"
                    rows={3}
                    maxLength={1000}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="form-textarea"
                    placeholder="Courte phrase mise en valeur sur les cartes d'accueil..."
                  />
                </div>
              </div>

              {/* Modal Footer: Fixed Confirmation Buttons ALWAYS Visible */}
              <div
                style={{
                  padding: '1rem 1.75rem',
                  borderTop: '1px solid var(--color-border)',
                  backgroundColor: '#FAF7F2',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '1rem',
                  flexShrink: 0
                }}
              >
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn btn-outline"
                  style={{ padding: '0.6rem 1.25rem' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.5rem' }}
                >
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
