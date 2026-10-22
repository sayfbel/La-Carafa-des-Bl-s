import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const isTest = process.env.NODE_ENV === 'test';
const targetDb = isTest ? (process.env.DB_TEST_NAME || 'la_carafa_test') : (process.env.DB_NAME || 'la_carafa_db');

console.log(`Seeding database: [${targetDb}]...`);

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: targetDb,
    charset: 'utf8mb4'
  });

  try {
    // 1. Seed Categories
    const categories = [
      {
        name: 'Pains de tradition',
        slug: 'pains-de-tradition',
        description: 'Façonnés à la main, cuits sur place, avec des farines de qualité.',
        display_order: 1
      },
      {
        name: 'Viennoiseries',
        slug: 'viennoiseries',
        description: 'Beurre de qualité, feuilletage pur beurre et dorure maison.',
        display_order: 2
      },
      {
        name: 'Pâtisseries maison',
        slug: 'patisseries-maison',
        description: 'Des créations gourmandes élaborées chaque jour avec soin.',
        display_order: 3
      }
    ];

    for (const cat of categories) {
      await connection.query(`
        INSERT INTO categories (name, slug, description, display_order, is_active)
        VALUES (?, ?, ?, ?, TRUE)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          description = VALUES(description),
          display_order = VALUES(display_order);
      `, [cat.name, cat.slug, cat.description, cat.display_order]);
    }
    console.log('✓ Categories seeded.');

    // Fetch category IDs
    const [catRows] = await connection.query('SELECT id, slug FROM categories');
    const catMap = Object.fromEntries(catRows.map(r => [r.slug, r.id]));

    // 2. Seed Products
    const products = [
      {
        category_id: catMap['pains-de-tradition'],
        name: 'Baguette de Tradition Française',
        slug: 'baguette-de-tradition-francaise',
        short_description: 'Croûte dorée croustillante, mie alvéolée et arômes délicats de froment.',
        description: 'Élaborée selon la pure tradition française sans additifs, issue d’une fermentation lente sur levain pour révéler une saveur authentique et une conservation remarquable.',
        price: 1.30,
        allergens: 'Gluten (blé)',
        image_url: '/assets/images/products/baguette-tradition.webp',
        is_available: true,
        is_featured: true,
        meta_title: 'Baguette de Tradition — La Carafa des Blés',
        meta_description: 'Découvrez notre baguette de tradition artisanale cuite chaque jour à Épinay-sur-Orge.'
      },
      {
        category_id: catMap['pains-de-tradition'],
        name: 'Pain de Campagne au Levain',
        slug: 'pain-de-campagne-au-levain',
        short_description: 'Pain rustique pétri à la farine de seigle et de blé, levain naturel.',
        description: 'Un grand classique rustique à la croûte épaisse et à la mie fondante délicatement acidulée, idéal pour accompagner vos repas gastronomiques et fromages.',
        price: 3.20,
        allergens: 'Gluten (blé, seigle)',
        image_url: '/assets/images/products/pain-campagne.webp',
        is_available: true,
        is_featured: true,
        meta_title: 'Pain de Campagne Artisanal — La Carafa des Blés',
        meta_description: 'Pain de campagne au levain naturel cuit sur sole de pierre.'
      },
      {
        category_id: catMap['pains-de-tradition'],
        name: 'Pain Complet aux Graines',
        slug: 'pain-complet-aux-graines',
        short_description: 'Riche en fibres, parsemé de graines de lin, tournesol et sésame toastées.',
        description: 'Un pain complet nutritif et croquant, confectionné avec des farines complètes sélectionnées et un mélange harmonieux de 5 graines torréfiées.',
        price: 3.60,
        allergens: 'Gluten, Sésame',
        image_url: '/assets/images/products/pain-graines.webp',
        is_available: true,
        is_featured: false,
        meta_title: 'Pain Complet aux Graines — La Carafa des Blés',
        meta_description: 'Pain complet riche en fibres et graines saines.'
      },
      {
        category_id: catMap['viennoiseries'],
        name: 'Croissant Pur Beurre AOP',
        slug: 'croissant-pur-beurre-aop',
        short_description: 'Feuilletage aérien et croustillant, élaboré au pur beurre de Charentes-Poitou.',
        description: 'Chaque croissant est façonné à la main et doré au jaune d’œuf frais pour offrir un feuilletage d’une légèreté incomparable et des arômes beurrés gourmands.',
        price: 1.40,
        allergens: 'Gluten, Lait, Œufs',
        image_url: '/assets/images/products/croissant.webp',
        is_available: true,
        is_featured: true,
        meta_title: 'Croissant Pur Beurre Artisanal — La Carafa des Blés',
        meta_description: 'Croissant au beurre AOP croustillant et fondant.'
      },
      {
        category_id: catMap['viennoiseries'],
        name: 'Pain au Chocolat Feuilleté',
        slug: 'pain-au-chocolat-feuillete',
        short_description: 'Deux barres de chocolat noir intense nichées au cœur d’un feuilletage doré.',
        description: 'Le compagnon parfait de vos matins : une pâte feuilletée levée croustillante renfermant deux bâtons de chocolat noir à 55% de cacao.',
        price: 1.50,
        allergens: 'Gluten, Lait, Œufs, Soja',
        image_url: '/assets/images/products/pain-chocolat.webp',
        is_available: true,
        is_featured: true,
        meta_title: 'Pain au Chocolat Pur Beurre — La Carafa des Blés',
        meta_description: 'Pain au chocolat artisanal au feuilletage d’or.'
      },
      {
        category_id: catMap['viennoiseries'],
        name: 'Brioche Tressée Pur Beurre',
        slug: 'brioche-tressee-pur-beurre',
        short_description: 'Moelleuse à souhait, parfumée à la fleur d’oranger et parsemée de sucre perlé.',
        description: 'Une brioche généreuse tressée à la main, enrichie en œufs frais et beurre fin, idéale pour les goûters en famille.',
        price: 4.80,
        allergens: 'Gluten, Lait, Œufs',
        image_url: '/assets/images/products/brioche.webp',
        is_available: true,
        is_featured: false,
        meta_title: 'Brioche Tressée Artisanale — La Carafa des Blés',
        meta_description: 'Brioche moelleuse au beurre fin et sucre perlé.'
      },
      {
        category_id: catMap['patisseries-maison'],
        name: 'Tartelette aux Framboises Fraîches',
        slug: 'tartelette-aux-framboises-fraiches',
        short_description: 'Pâte sablée croustillante, crème d’amande fondante et framboises fraîches.',
        description: 'Fond de tarte croustillant garni d’une crème diplomate légère à la vanille de Madagascar et recouvert de framboises fraîches délicatement lustrées.',
        price: 4.20,
        allergens: 'Gluten, Lait, Œufs, Fruits à coque',
        image_url: '/assets/images/products/tartelette-framboise.webp',
        is_available: true,
        is_featured: true,
        meta_title: 'Tartelette Framboises Fraîches — La Carafa des Blés',
        meta_description: 'Pâtisserie fine aux framboises fraîches et vanille.'
      },
      {
        category_id: catMap['patisseries-maison'],
        name: 'Éclair au Chocolat Grand Cru',
        slug: 'eclair-au-chocolat-grand-cru',
        short_description: 'Pâte à choux pur beurre garnie d’un crémeux au chocolat noir 70% et glaçage brillant.',
        description: 'L’incontournable de la pâtisserie française revisité avec un chocolat pure plantation intense et peu sucré, pour les véritables amateurs de cacao.',
        price: 3.80,
        allergens: 'Gluten, Lait, Œufs',
        image_url: '/assets/images/products/eclair-chocolat.webp',
        is_available: true,
        is_featured: true,
        meta_title: 'Éclair au Chocolat Grand Cru — La Carafa des Blés',
        meta_description: 'Éclair traditionnel au crémeux intense de chocolat noir.'
      },
      {
        category_id: catMap['patisseries-maison'],
        name: 'Paris-Brest Artisanal',
        slug: 'paris-brest-artisanal',
        short_description: 'Couronne de pâte à choux croustillante garnie d’une mousseline pralinée noisette.',
        description: 'Pâte à choux parsemée d’amandes effilées, garnie d’une onctueuse crème mousseline au praliné maison pur noisettes du Piémont.',
        price: 4.50,
        allergens: 'Gluten, Lait, Œufs, Fruits à coque',
        image_url: '/assets/images/products/paris-brest.webp',
        is_available: true,
        is_featured: false,
        meta_title: 'Paris-Brest Praliné Maison — La Carafa des Blés',
        meta_description: 'Pâtisserie signature au praliné noisette croustillant.'
      }
    ];

    for (const p of products) {
      await connection.query(`
        INSERT INTO products (
          category_id, name, slug, short_description, description,
          price, currency, allergens, image_url, is_available, is_featured, is_published,
          meta_title, meta_description
        )
        VALUES (?, ?, ?, ?, ?, ?, 'EUR', ?, ?, ?, ?, TRUE, ?, ?)
        ON DUPLICATE KEY UPDATE
          category_id = VALUES(category_id),
          name = VALUES(name),
          short_description = VALUES(short_description),
          description = VALUES(description),
          price = VALUES(price),
          allergens = VALUES(allergens),
          image_url = VALUES(image_url),
          is_available = VALUES(is_available),
          is_featured = VALUES(is_featured),
          meta_title = VALUES(meta_title),
          meta_description = VALUES(meta_description);
      `, [
        p.category_id, p.name, p.slug, p.short_description, p.description,
        p.price, p.allergens, p.image_url, p.is_available, p.is_featured,
        p.meta_title, p.meta_description
      ]);
    }
    console.log('✓ Products seeded.');

    // 3. Seed Site Settings
    const settings = {
      homepage_hero_kicker: 'BOULANGERIE • PÂTISSERIE ARTISANALE',
      homepage_hero_title: 'Le goût des bonnes choses.',
      homepage_hero_subtitle: 'Des produits artisanaux, préparés chaque jour avec des ingrédients sélectionnés et beaucoup de passion.',
      homepage_hero_cta: 'Découvrir nos créations',
      story_kicker: 'NOTRE HISTOIRE',
      story_title: 'Le savoir-faire, chaque jour.',
      story_text: 'Artisans boulangers-pâtissiers à Épinay-sur-Orge, nous mettons tout notre cœur dans la préparation de pains authentiques et de pâtisseries maison. Notre exigence : des produits savoureux, un accueil chaleureux et le respect des traditions artisanales.',
      story_signature: 'La Carafa des Blés',
      business_name: 'La Carafa des Blés',
      business_address: '15 Rue Pasteur, 91360 Épinay-sur-Orge, France',
      business_phone: '07 53 79 29 19',
      business_phone_verified: 'false',
      business_email: 'contact@lacarafadesbles.fr',
      google_maps_url: 'https://maps.google.com/?q=15+Rue+Pasteur+91360+Épinay-sur-Orge+France',
      opening_hours_note: 'Horaires en cours d’actualisation — contactez-nous par téléphone.'
    };

    for (const [key, val] of Object.entries(settings)) {
      await connection.query(`
        INSERT INTO site_settings (setting_key, setting_value)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);
      `, [key, typeof val === 'object' ? JSON.stringify(val) : String(val)]);
    }
    console.log('✓ Site settings seeded.');

    console.log('Database seeding successfully completed.');
  } finally {
    await connection.end();
  }
}

seed().catch((err) => {
  console.error('Fatal error during seed:', err);
  process.exit(1);
});
