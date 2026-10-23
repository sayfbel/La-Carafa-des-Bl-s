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
    <div style={{ padding: '3rem 0 4.5rem' }}>
      <div className="container">
        {/* Header Title */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
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
          <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.4rem)', marginBottom: '1rem' }}>
            Le comptoir des saveurs
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.02rem', lineHeight: 1.6 }}>
            Tous nos produits sont façonnés à la main et cuits chaque jour sur place à Épinay-sur-Orge avec des farines de blé sélectionnées et du pur beurre français.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="products-filter-bar">
          {/* Category Pills */}
          <div className="products-category-pills">
            <button
              onClick={() => handleCategoryChange('')}
              className={`btn ${currentCategory === '' ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '0.45rem 1rem', fontSize: '0.86rem' }}
            >
              Tous ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`btn ${currentCategory === cat.slug ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '0.45rem 1rem', fontSize: '0.86rem' }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="products-search-form">
            <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
              <input
                type="text"
                placeholder="Rechercher un pain, une douceur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.5rem', borderRadius: 0 }}
              />
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-text-muted)',
                  pointerEvents: 'none'
                }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>
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
              borderRadius: 0,
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
          <div className="products-grid">
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 0,
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
                      borderRadius: 0,
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
                        borderRadius: 0,
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
        /* Products Filter Bar */
        .products-filter-bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          background-color: #FAF5EC;
          padding: 1.25rem 1.5rem;
          border: 1px solid var(--color-border);
          margin-bottom: 2.5rem;
        }

        .products-category-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          align-items: center;
        }

        .products-search-form {
          display: flex;
          gap: 0.5rem;
          width: 100%;
          max-width: 320px;
        }

        /* Products Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .products-filter-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
            padding: 1rem;
          }
          .products-search-form {
            max-width: 100%;
          }
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
        }

        @media (max-width: 500px) {
          .products-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .products-category-pills .btn {
            padding: 0.4rem 0.75rem !important;
            font-size: 0.82rem !important;
          }
        }

        /* Product Card */
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }

        @media (hover: none) {
          /* Disable hover lift on touch devices */
          .product-card:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
