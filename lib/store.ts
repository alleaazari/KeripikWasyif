// Shared data store using Supabase

import { supabase } from './supabase'

export interface Product {
    id: string
    name: string
    price: string
    description: string
    image: string
    whatsappNumber: string
}

export interface Review {
    id: string
    name: string
    rating: number
    message: string
    timestamp: string
    avatar: string
    adminReply?: string
    replyTimestamp?: string
}

export interface DailyStats {
    date: string
    visitors: number
    whatsappClicks: number
}

export interface ContactMessage {
    id: string
    name: string
    email: string
    phone: string
    subject: string
    message: string
    timestamp: string
    adminReply?: string
    replyTimestamp?: string
}

// ============ HELPER: DB ROW <-> TypeScript MAPPING ============

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapProduct(row: any): Product {
    return {
        id: row.id,
        name: row.name,
        price: row.price,
        description: row.description || '',
        image: row.image || '',
        whatsappNumber: row.whatsapp_number || '',
    }
}

function mapReview(row: any): Review {
    return {
        id: row.id,
        name: row.name,
        rating: row.rating,
        message: row.message || '',
        timestamp: row.created_at,
        avatar: row.avatar || '😊',
        adminReply: row.admin_reply || undefined,
        replyTimestamp: row.reply_timestamp || undefined,
    }
}

function mapContactMessage(row: any): ContactMessage {
    return {
        id: row.id,
        name: row.name,
        email: row.email || '',
        phone: row.phone || '',
        subject: row.subject || '',
        message: row.message || '',
        timestamp: row.created_at,
        adminReply: row.admin_reply || undefined,
        replyTimestamp: row.reply_timestamp || undefined,
    }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// ============ PRODUCTS ============

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true })

    if (error || !data) return []
    return data.map(mapProduct)
}

export async function addProduct(product: Omit<Product, 'id'>): Promise<Product | null> {
    const { data, error } = await supabase
        .from('products')
        .insert({
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
            whatsapp_number: product.whatsappNumber,
        })
        .select()
        .single()

    if (error || !data) return null
    return mapProduct(data)
}

export async function updateProduct(id: string, updates: Partial<Product>) {
    const row: Record<string, unknown> = {}
    if (updates.name !== undefined) row.name = updates.name
    if (updates.price !== undefined) row.price = updates.price
    if (updates.description !== undefined) row.description = updates.description
    if (updates.image !== undefined) row.image = updates.image
    if (updates.whatsappNumber !== undefined) row.whatsapp_number = updates.whatsappNumber

    await supabase.from('products').update(row).eq('id', id)
}

export async function deleteProduct(id: string) {
    await supabase.from('products').delete().eq('id', id)
}

// ============ REVIEWS ============

export async function getReviews(): Promise<Review[]> {
    const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })

    if (error || !data) return []
    return data.map(mapReview)
}

export async function addReview(review: Omit<Review, 'id' | 'timestamp'>): Promise<Review | null> {
    const { data, error } = await supabase
        .from('reviews')
        .insert({
            name: review.name,
            rating: review.rating,
            message: review.message,
            avatar: review.avatar,
        })
        .select()
        .single()

    if (error || !data) return null
    return mapReview(data)
}

export async function deleteReview(id: string) {
    await supabase.from('reviews').delete().eq('id', id)
}

export async function replyReview(id: string, reply: string) {
    await supabase
        .from('reviews')
        .update({
            admin_reply: reply,
            reply_timestamp: new Date().toISOString(),
        })
        .eq('id', id)
}

// ============ ANALYTICS ============

export async function trackVisitor() {
    if (typeof window === 'undefined') return
    const today = new Date().toISOString().split('T')[0]

    const { data } = await supabase
        .from('analytics')
        .select('visitors')
        .eq('date', today)
        .maybeSingle()

    if (data) {
        await supabase
            .from('analytics')
            .update({ visitors: data.visitors + 1 })
            .eq('date', today)
    } else {
        await supabase
            .from('analytics')
            .insert({ date: today, visitors: 1, whatsapp_clicks: 0 })
    }
}

export async function trackWhatsAppClick() {
    if (typeof window === 'undefined') return
    const today = new Date().toISOString().split('T')[0]

    const { data } = await supabase
        .from('analytics')
        .select('whatsapp_clicks')
        .eq('date', today)
        .maybeSingle()

    if (data) {
        await supabase
            .from('analytics')
            .update({ whatsapp_clicks: data.whatsapp_clicks + 1 })
            .eq('date', today)
    } else {
        await supabase
            .from('analytics')
            .insert({ date: today, visitors: 0, whatsapp_clicks: 1 })
    }
}

export async function getWeeklyStats(): Promise<DailyStats[]> {
    const stats: DailyStats[] = []
    const dates: string[] = []

    for (let i = 6; i >= 0; i--) {
        const d = new Date()
        d.setDate(d.getDate() - i)
        dates.push(d.toISOString().split('T')[0])
    }

    const { data } = await supabase
        .from('analytics')
        .select('*')
        .in('date', dates)

    const map = new Map<string, { visitors: number; whatsapp_clicks: number }>()
    if (data) {
        data.forEach((row) => map.set(row.date, row))
    }

    for (const date of dates) {
        const row = map.get(date)
        stats.push({
            date,
            visitors: row?.visitors || 0,
            whatsappClicks: row?.whatsapp_clicks || 0,
        })
    }

    return stats
}

export async function getTotalStats(): Promise<{ totalVisitors: number; totalClicks: number }> {
    const { data } = await supabase
        .from('analytics')
        .select('visitors, whatsapp_clicks')

    let totalVisitors = 0
    let totalClicks = 0

    if (data) {
        data.forEach((row) => {
            totalVisitors += row.visitors || 0
            totalClicks += row.whatsapp_clicks || 0
        })
    }

    return { totalVisitors, totalClicks }
}

// ============ CONTACT MESSAGES ============

export async function getContactMessages(): Promise<ContactMessage[]> {
    const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

    if (error || !data) return []
    return data.map(mapContactMessage)
}

export async function addContactMessage(msg: Omit<ContactMessage, 'id' | 'timestamp'>): Promise<ContactMessage | null> {
    const { data, error } = await supabase
        .from('contact_messages')
        .insert({
            name: msg.name,
            email: msg.email,
            phone: msg.phone,
            subject: msg.subject,
            message: msg.message,
        })
        .select()
        .single()

    if (error || !data) return null
    return mapContactMessage(data)
}

export async function replyContactMessage(id: string, reply: string) {
    await supabase
        .from('contact_messages')
        .update({
            admin_reply: reply,
            reply_timestamp: new Date().toISOString(),
        })
        .eq('id', id)
}

export async function deleteContactMessage(id: string) {
    await supabase.from('contact_messages').delete().eq('id', id)
}

// ============ HERO SETTINGS ============

export interface HeroSettings {
    id: string
    featured_image: string
    description: string
    grid_images: string[]
    grid_descriptions: string[]
}

const defaultGridDescriptions = [
    'Produk 1', 'Produk 2', 'Produk 3', 'Produk 4',
    'Produk 5', 'Produk 6', 'Produk 7', 'Produk 8',
]

const defaultHeroSettings: Omit<HeroSettings, 'id'> = {
    featured_image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop',
    description: 'Temukan produk pilihan dengan kualitas terjamin dan harga terbaik. Belanja sekarang dan nikmati pengalaman berbelanja yang luar biasa dengan layanan terbaik kami.',
    grid_images: [
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop',
    ],
    grid_descriptions: defaultGridDescriptions,
}

export async function uploadImage(file: File): Promise<string | null> {
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`

    const { error } = await supabase.storage
        .from('images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false })

    if (error) {
        console.error('Upload error:', error)
        return null
    }

    const { data: urlData } = supabase.storage
        .from('images')
        .getPublicUrl(fileName)

    return urlData.publicUrl
}

export async function getHeroSettings(): Promise<HeroSettings> {
    const { data } = await supabase
        .from('hero_settings')
        .select('*')
        .limit(1)
        .maybeSingle()

    if (data) {
        return {
            id: data.id,
            featured_image: data.featured_image,
            description: data.description,
            grid_images: data.grid_images || defaultHeroSettings.grid_images,
            grid_descriptions: data.grid_descriptions || defaultGridDescriptions,
        }
    }

    // Seed default if table empty
    const { data: newData } = await supabase
        .from('hero_settings')
        .insert(defaultHeroSettings)
        .select()
        .single()

    if (newData) {
        return {
            id: newData.id,
            featured_image: newData.featured_image,
            description: newData.description,
            grid_images: newData.grid_images || defaultHeroSettings.grid_images,
            grid_descriptions: newData.grid_descriptions || defaultGridDescriptions,
        }
    }

    return { id: '', ...defaultHeroSettings }
}

export async function updateHeroSettings(updates: Partial<Omit<HeroSettings, 'id'>>) {
    const current = await getHeroSettings()
    if (current.id) {
        await supabase.from('hero_settings').update(updates).eq('id', current.id)
    }
}

// ============ AUTH + SESSION TRACKING ============

const ADMIN_USERNAME = 'akutelang'
const ADMIN_PASSWORD = '456789'

export interface LoginSession {
    id: string
    device_id: string
    device_info: string
    location: string
    login_count: number
    last_login: string
    created_at: string
}

function getDeviceFingerprint(): string {
    if (typeof window === 'undefined') return ''
    const stored = localStorage.getItem('kw_device_id')
    if (stored) return stored
    const fp = `device_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`
    localStorage.setItem('kw_device_id', fp)
    return fp
}

function getDeviceInfo(): string {
    if (typeof window === 'undefined') return 'Unknown'
    const ua = navigator.userAgent
    let device = 'Unknown'
    if (/iPhone/i.test(ua)) device = 'iPhone'
    else if (/iPad/i.test(ua)) device = 'iPad'
    else if (/Android/i.test(ua)) device = 'Android'
    else if (/Windows/i.test(ua)) device = 'Windows PC'
    else if (/Mac/i.test(ua)) device = 'MacOS'
    else if (/Linux/i.test(ua)) device = 'Linux'

    let browser = 'Unknown Browser'
    if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome'
    else if (/Firefox/i.test(ua)) browser = 'Firefox'
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari'
    else if (/Edg/i.test(ua)) browser = 'Edge'

    return `${device} - ${browser}`
}

export async function getDeviceLoginCount(): Promise<number> {
    const deviceId = getDeviceFingerprint()
    if (!deviceId) return 0
    const { data } = await supabase
        .from('login_sessions')
        .select('login_count')
        .eq('device_id', deviceId)
        .maybeSingle()
    return data?.login_count || 0
}

export async function recordLoginSession() {
    const deviceId = getDeviceFingerprint()
    const deviceInfo = getDeviceInfo()
    const now = new Date().toISOString()

    // Get location via free API
    let location = 'Tidak diketahui'
    try {
        const res = await fetch('https://ipapi.co/json/')
        const geo = await res.json()
        if (geo.city && geo.region) {
            location = `${geo.city}, ${geo.region}, ${geo.country_name}`
        }
    } catch {
        // fallback
    }

    // Check if device already exists
    const { data: existing } = await supabase
        .from('login_sessions')
        .select('*')
        .eq('device_id', deviceId)
        .maybeSingle()

    if (existing) {
        await supabase
            .from('login_sessions')
            .update({
                login_count: existing.login_count + 1,
                last_login: now,
                device_info: deviceInfo,
                location: location,
            })
            .eq('device_id', deviceId)
    } else {
        await supabase
            .from('login_sessions')
            .insert({
                device_id: deviceId,
                device_info: deviceInfo,
                location: location,
                login_count: 1,
                last_login: now,
            })
    }
}

export async function getLoginSessions(): Promise<LoginSession[]> {
    const { data } = await supabase
        .from('login_sessions')
        .select('*')
        .order('last_login', { ascending: false })
    return (data || []) as LoginSession[]
}

export async function deleteLoginSession(id: string) {
    await supabase.from('login_sessions').delete().eq('id', id)
}

export function adminLogin(username: string, password: string): boolean {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem('tt_admin_auth', 'true')
        return true
    }
    return false
}

export function adminLogout() {
    localStorage.removeItem('tt_admin_auth')
}

export function isAdminLoggedIn(): boolean {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('tt_admin_auth') === 'true'
}

// ============ KEGIATAN KKN ============

export interface KegiatanKKN {
    id: string
    title: string
    description: string
    image: string
    date: string
    location: string
    created_at: string
}

export async function getKegiatanKKN(): Promise<KegiatanKKN[]> {
    const { data } = await supabase
        .from('kegiatan_kkn')
        .select('*')
        .order('date', { ascending: false })
    return (data || []) as KegiatanKKN[]
}

export async function addKegiatanKKN(kegiatan: Omit<KegiatanKKN, 'id' | 'created_at'>) {
    await supabase.from('kegiatan_kkn').insert({
        ...kegiatan,
        created_at: new Date().toISOString(),
    })
}

export async function updateKegiatanKKN(id: string, updates: Partial<KegiatanKKN>) {
    await supabase.from('kegiatan_kkn').update(updates).eq('id', id)
}

export async function deleteKegiatanKKN(id: string) {
    await supabase.from('kegiatan_kkn').delete().eq('id', id)
}
