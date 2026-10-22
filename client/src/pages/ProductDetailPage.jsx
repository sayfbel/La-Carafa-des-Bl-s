import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, Wheat, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

export function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.getProductBySlug(slug);
        if (res?.success) {
          setProduct(res.data);
        }
      } catch (err) {
        setError(err.message || 'Produit introuvable.');
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '8rem 0', color: 'var(--color-text-muted)' }}>
        <Wheat size={40} className="spin-slow" style={{ color: 'var(--color-gold)', margin: '0 auto 1rem' }} />
        <p>Préparation des détails de cette création...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Produit introuvable</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          La création demandée n'existe pas ou n'est plus disponible sur notre carte.
        </p>
        <Link to="/produits" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Retourner au catalogue</span>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '3rem 0 5rem' }}>
      <div className="container">
        {/* Breadcrumb / Back Link */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link
            to="/produits"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--color-burgundy)',
              fontWeight: 600,
              fontSize: '0.92rem'
            }}
          >
            <ArrowLeft size={16} />
            <span>Retour aux créations</span>
          </Link>
        </div>

        {/* Product Hero Details Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 1.1fr) minmax(320px, 1.25fr)',
            gap: '3.5rem',
            alignItems: 'start',
            marginBottom: '5rem'
          }}
          className="product-detail-grid"
        >
          {/* Left: Product Image */}
          <div>
            <div
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--color-border)',
                backgroundColor: '#FAF5EC'
              }}
            >
              <img
                src={product.image_url || '/assets/images/hero-bread.webp'}
                alt={product.name}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          </div>

          {/* Right: Product Narrative & Specs */}
          <div>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: 'var(--color-badge-bg)',
                color: 'var(--color-burgundy)',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              {product.category_name}
            </div>

            <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.2rem)', marginBottom: '1rem' }}>
              {product.name}
            </h1>

            {product.price && (
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--color-gold)',
                  marginBottom: '1.5rem'
                }}
              >
                {Number(product.price).toFixed(2).replace('.', ',')} €
              </div>
            )}

            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--color-text-main)', marginBottom: '2rem' }}>
              {product.description || product.short_description}
            </p>

            {/* Availability & Quality Badges */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                padding: '1.5rem',
                backgroundColor: '#FAF5EC',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                marginBottom: '2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                {product.is_available ? (
                  <>
                    <CheckCircle2 size={18} color="var(--color-success)" />
                    <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-success)' }}>
                      Disponible en boutique aujourd'hui
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle size={18} color="var(--color-danger)" />
                    <span style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-danger)' }}>
                      Momentanément indisponible (selon fournée)
                    </span>
                  </>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ShieldCheck size={18} color="var(--color-gold)" />
                <span style={{ fontSize: '0.92rem', color: 'var(--color-text-main)' }}>
                  Façonné sur place à Épinay-sur-Orge • Ingrédients 100% naturels
                </span>
              </div>

              {product.allergens && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '0.75rem' }}>
                  <AlertTriangle size={18} color="var(--color-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                    <strong>Allergènes signalés :</strong> {product.allergens}
                  </span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary">
                <span>Commander ou réserver au fournil</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {product.related && product.related.length > 0 && (
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '3.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>
              Dans la même fournée
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem'
              }}
            >
              {product.related.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/produits/${rel.slug}`}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'block'
                  }}
                >
                  <div style={{ height: '160px', overflow: 'hidden' }}>
                    <img
                      src={rel.image_url || '/assets/images/hero-bread.webp'}
                      alt={rel.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--color-burgundy)', marginBottom: '0.4rem' }}>{rel.name}</h3>
                    {rel.price && (
                      <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.1rem' }}>
                        {Number(rel.price).toFixed(2).replace('.', ',')} €
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}
