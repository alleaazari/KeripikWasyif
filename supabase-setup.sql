-- ============================================
-- SQL untuk membuat tabel di Supabase
-- Jalankan di Supabase Dashboard > SQL Editor
-- ============================================

-- 1. Tabel Products
CREATE TABLE IF NOT EXISTS products (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    price text NOT NULL,
    description text DEFAULT '',
    image text DEFAULT '',
    whatsapp_number text DEFAULT '',
    created_at timestamptz DEFAULT now()
);

-- 2. Tabel Reviews
CREATE TABLE IF NOT EXISTS reviews (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    rating integer NOT NULL DEFAULT 5,
    message text DEFAULT '',
    avatar text DEFAULT '😊',
    admin_reply text,
    reply_timestamp timestamptz,
    created_at timestamptz DEFAULT now()
);

-- 3. Tabel Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text DEFAULT '',
    phone text DEFAULT '',
    subject text DEFAULT '',
    message text DEFAULT '',
    admin_reply text,
    reply_timestamp timestamptz,
    created_at timestamptz DEFAULT now()
);

-- 4. Tabel Analytics
CREATE TABLE IF NOT EXISTS analytics (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    date date UNIQUE NOT NULL,
    visitors integer DEFAULT 0,
    whatsapp_clicks integer DEFAULT 0
);

-- ============================================
-- Disable RLS (Row Level Security) agar bisa baca/tulis bebas
-- ============================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all for products" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for reviews" ON reviews FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for contact_messages" ON contact_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for analytics" ON analytics FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- Seed Data: Produk Default
-- ============================================
INSERT INTO products (name, price, description, image, whatsapp_number) VALUES
('Nike Air Max 90', 'Rp 250.000', 'Sepatu klasik dengan desain timeless dan kenyamanan maksimal.', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', '6289617447090'),
('Adidas Ultraboost', 'Rp 350.000', 'Teknologi boost untuk performa lari terbaik.', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop', '6289617447090'),
('Puma RS-X', 'Rp 450.000', 'Desain retro-futuristik yang bold dan stylish.', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop', '6289617447090'),
('New Balance 574', 'Rp 320.000', 'Sneakers heritage dengan kenyamanan modern.', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop', '6289617447090'),
('Nike Dunk Low', 'Rp 380.000', 'Ikon streetwear yang selalu jadi pilihan utama.', 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=300&h=300&fit=crop', '6289617447090'),
('Converse Chuck 70', 'Rp 400.000', 'Klasik sepanjang masa dengan material premium.', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&h=300&fit=crop', '6289617447090'),
('Vans Old Skool', 'Rp 280.000', 'Sepatu skate legendaris yang cocok untuk semua gaya.', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300&h=300&fit=crop', '6289617447090'),
('Reebok Classic', 'Rp 310.000', 'Retro vibes dengan teknologi modern.', 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=300&h=300&fit=crop', '6289617447090'),
('Jordan 1 High', 'Rp 520.000', 'Sneakers ikonik dengan sejarah panjang di dunia basket.', 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=300&h=300&fit=crop', '6289617447090'),
('Asics Gel-Lyte', 'Rp 370.000', 'Perpaduan sempurna antara gaya dan performa.', 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300&h=300&fit=crop', '6289617447090'),
('Saucony Shadow', 'Rp 340.000', 'Running shoes premium dengan cushioning lembut.', 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=300&h=300&fit=crop', '6289617447090'),
('Nike Blazer Mid', 'Rp 290.000', 'Mid-top klasik yang selalu tampil keren.', 'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=300&h=300&fit=crop', '6289617447090'),
('Adidas Stan Smith', 'Rp 260.000', 'Minimalis, clean, dan cocok untuk segala kesempatan.', 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=300&h=300&fit=crop', '6289617447090'),
('Nike Air Force 1', 'Rp 330.000', 'Sneakers all-white yang wajib dimiliki.', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300&h=300&fit=crop', '6289617447090'),
('Puma Suede Classic', 'Rp 275.000', 'Material suede premium yang elegan.', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&h=300&fit=crop', '6289617447090'),
('NB 990v5', 'Rp 480.000', 'Made in USA, kualitas tak tertandingi.', 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=300&h=300&fit=crop', '6289617447090'),
('Nike React Element', 'Rp 410.000', 'Desain futuristik dengan React foam.', 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=300&h=300&fit=crop', '6289617447090'),
('Adidas NMD R1', 'Rp 390.000', 'Lifestyle sneakers dengan Boost technology.', 'https://images.unsplash.com/photo-1520256862855-398228c41684?w=300&h=300&fit=crop', '6289617447090'),
('Converse Run Star', 'Rp 360.000', 'Platform sole untuk tampilan yang bold.', 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=300&h=300&fit=crop', '6289617447090'),
('Vans Sk8-Hi', 'Rp 300.000', 'High-top skate shoes yang timeless.', 'https://images.unsplash.com/photo-1494496195158-c3becb4f2475?w=300&h=300&fit=crop', '6289617447090'),
('Jordan 4 Retro', 'Rp 550.000', 'Desain legendaris Michael Jordan era 89.', 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=300&h=300&fit=crop', '6289617447090'),
('Nike Waffle One', 'Rp 310.000', 'Heritage running dengan sentuhan transparansi.', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=300&h=300&fit=crop', '6289617447090'),
('Adidas Samba OG', 'Rp 340.000', 'Sepatu indoor football jadi fashion staple.', 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=300&h=300&fit=crop', '6289617447090'),
('Reebok Club C 85', 'Rp 270.000', 'Tennis shoes retro yang versatile.', 'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?w=300&h=300&fit=crop', '6289617447090'),
('Nike Cortez', 'Rp 250.000', 'Sepatu running pertama Nike, tetap stylish.', 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=300&h=300&fit=crop', '6289617447090'),
('Puma Cali Star', 'Rp 320.000', 'California vibes dengan platform modern.', 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=300&h=300&fit=crop', '6289617447090'),
('Adidas Forum Low', 'Rp 350.000', 'Basketball heritage dari era 80-an.', 'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=300&h=300&fit=crop', '6289617447090'),
('Nike Pegasus 40', 'Rp 430.000', 'Running shoes terlaris untuk daily use.', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', '6289617447090');

-- ============================================
-- Seed Data: Ulasan Default
-- ============================================
INSERT INTO reviews (name, rating, message, avatar, created_at) VALUES
('Budi Santoso', 5, 'Produk berkualitas tinggi, pengiriman cepat, dan pelayanan sangat memuaskan. Saya akan beli lagi!', '😊', now() - interval '2 days'),
('Siti Nurhaliza', 5, 'Barang sampai dengan aman dan sesuai dengan deskripsi. Seller sangat responsif dan helpful.', '🤩', now() - interval '5 days'),
('Ahmad Wijaya', 4, 'Produk bagus tapi ada sedikit delay dalam pengiriman. Secara keseluruhan puas dengan pembelian ini.', '👍', now() - interval '8 days');
