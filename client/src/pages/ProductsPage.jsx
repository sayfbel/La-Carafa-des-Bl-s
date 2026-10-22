import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, Wheat, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const currentSearch = searchParams.get('search') || '';

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await api.getCategories();
        if (res?.success) setCategories(res.data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const params = {};
        if (currentCategory) params.category = currentCategory;
        if (currentSearch) params.search = currentSearch;
        const res = await api.getProducts(params);
        if (res?.success) setProducts(res.data);
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [currentCategory, currentSearch]);

  const handleCategoryChange = (slug) => {
    const params = new URLSearchParams(searchParams);
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  return (
    <div style={{ padding: '3.5rem 0 5rem' }}>
      <div className="container">
        {/* Header Title */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem' }}>
          <div
            style={{
              color: 'var(--color-gold)',
              fontSize: '0.88rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}
          >
            NOS CRÉATIONS ARTISANALES
          </div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', marginBottom: '1rem' }}>
            Le comptoir des saveurs
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Tous nos produits sont façonnés à la main et cuits chaque jour sur place à Épinay-sur-Orge avec des farines de blé sélectionnées et du pur beurre français.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            backgroundColor: '#FAF5EC',
            padding: '1.25rem 1.75rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            marginBottom: '3rem'
          }}
        >
          {/* Category Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
            <button
              onClick={() => handleCategoryChange('')}
              className={`btn ${currentCategory === '' ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.45rem 1.1rem', fontSize: '0.88rem' }}
            >
              Tous les délices ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`btn ${currentCategory === cat.slug ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '0.45rem 1.1rem', fontSize: '0.88rem' }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', minWidth: '260px' }}>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type="text"
                placeholder="Rechercher un pain, une douceur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem', borderRadius: 'var(--radius-full)' }}
              />
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)'
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.25rem' }}>
              Filtrer
            </button>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--color-text-muted)' }}>
            <Wheat size={36} className="spin-slow" style={{ color: 'var(--color-gold)', margin: '0 auto 1rem' }} />
            <p>Cuisson de notre sélection artisanale en cours...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: '#FAF5EC',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--color-border)'
            }}
          >
            <AlertCircle size={40} style={{ color: 'var(--color-gold)', margin: '0 auto 1rem' }} />
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Aucun produit ne correspond à votre recherche</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Essayez de réinitialiser vos filtres ou de modifier vos mots-clés.
            </p>
            <button onClick={() => { setSearchTerm(''); setSearchParams({}); }} className="btn btn-primary">
              Voir tout le catalogue
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '2rem'
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
                }}
                className="product-card"
              >
                {/* Product Image */}
                <div style={{ position: 'relative', height: '220px', backgroundColor: '#FAF5EC', overflow: 'hidden' }}>
                  <img
                    src={product.image_url || '/assets/images/hero-bread.webp'}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  {/* Category Pill Tag */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '0.85rem',
                      left: '0.85rem',
                      backgroundColor: 'rgba(248, 243, 232, 0.95)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--color-burgundy)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    {product.category_name}
                  </span>

                  {product.is_available === false && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '0.85rem',
                        right: '0.85rem',
                        backgroundColor: 'rgba(56, 7, 14, 0.9)',
                        color: '#FFF',
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}
                    >
                      Épuisé ce jour
                    </span>
                  )}
                </div>

                {/* Product Content */}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.35rem', margin: 0 }}>
                      <Link to={`/produits/${product.slug}`} style={{ color: 'var(--color-burgundy)' }}>
                        {product.name}
                      </Link>
                    </h3>
                    {product.price && (
                      <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-gold)' }}>
                        {Number(product.price).toFixed(2).replace('.', ',')} €
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.25rem', flex: 1 }}>
                    {product.short_description || product.description?.slice(0, 100) + '...'}
                  </p>

                  {product.allergens && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-light)', marginBottom: '1.25rem' }}>
                      <strong>Allergènes :</strong> {product.allergens}
                    </div>
                  )}

                  <Link
                    to={`/produits/${product.slug}`}
                    className="btn btn-outline"
                    style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.9rem' }}
                  >
                    <span>Découvrir la recette</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
      `}</style>
    </div>
  );
}
