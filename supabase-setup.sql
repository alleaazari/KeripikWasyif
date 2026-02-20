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
-- 5. Tabel Kegiatan KKN & Konfigurasi Baleri/Fotonya
-- ============================================

-- 1. Buat Tabel (Jika belum ada)
CREATE TABLE IF NOT EXISTS kegiatan_kkn (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL,
    image text DEFAULT '',
    date date NOT NULL,
    location text DEFAULT '',
    created_at timestamptz DEFAULT now()
);

-- 2. Atur Izin Akses Tabel
ALTER TABLE kegiatan_kkn ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all for kegiatan_kkn" ON kegiatan_kkn;
CREATE POLICY "Allow all for kegiatan_kkn" ON kegiatan_kkn FOR ALL USING (true) WITH CHECK (true);

-- 3. Buat "Folder" (Bucket) untuk Simpan Foto
INSERT INTO storage.buckets (id, name, public) 
VALUES ('kegiatan-images', 'kegiatan-images', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Izin Akses Upload & Lihat Foto (Storage Policies)
DO $$
BEGIN
    DROP POLICY IF EXISTS "Public Read" ON storage.objects;
    DROP POLICY IF EXISTS "Public Write" ON storage.objects;
    DROP POLICY IF EXISTS "Public Update" ON storage.objects;
    DROP POLICY IF EXISTS "Public Delete" ON storage.objects;
    
    CREATE POLICY "Public Read" ON storage.objects FOR SELECT USING (true);
    CREATE POLICY "Public Write" ON storage.objects FOR INSERT WITH CHECK (true);
    CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING (true);
    CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING (true);
END $$;

-- ============================================
-- Seed Data: Produk Default
-- ============================================
INSERT INTO products (name, price, description, image, whatsapp_number) VALUES
('Nike Air Max 90', 'Rp 250.000', 'Sepatu klasik dengan desain timeless dan kenyamanan maksimal.', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', '6289617447090'),
('Adidas Ultraboost', 'Rp 350.000', 'Teknologi boost untuk performa lari terbaik.', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop', '6289617447090'),
('Puma RS-X', 'Rp 450.000', 'Desain retro-futuristik yang bold dan stylish.', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=300&fit=crop', '6289617447090'),
('New Balance 574', 'Rp 320.000', 'Sneakers heritage dengan kenyamanan modern.', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop', '6289617447090');

-- ============================================
-- Seed Data: Ulasan Default
-- ============================================
INSERT INTO reviews (name, rating, message, avatar, created_at) VALUES
('Budi Santoso', 5, 'Produk berkualitas tinggi, pengiriman cepat, and pelayanan sangat memuaskan. Saya akan beli lagi!', '😊', now() - interval '2 days'),
('Siti Nurhaliza', 5, 'Barang sampai dengan aman dan sesuai dengan deskripsi. Seller sangat responsif and helpful.', '🤩', now() - interval '5 days'),
('Ahmad Wijaya', 4, 'Produk bagus tapi ada sedikit delay dalam pengiriman. Secara keseluruhan puas dengan pembelian ini.', '👍', now() - interval '8 days');
