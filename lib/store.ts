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

// ============ AUTH (tetap localStorage) ============

const ADMIN_USERNAME = 'akutelang'
const ADMIN_PASSWORD = '456789'

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
