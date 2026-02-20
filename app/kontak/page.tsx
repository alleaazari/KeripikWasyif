'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AdminFloatingButton } from '@/components/admin-floating-button'
import { addContactMessage, getContactMessages, type ContactMessage } from '@/lib/store'

export default function KontakPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [repliedMessages, setRepliedMessages] = useState<ContactMessage[]>([])

  useEffect(() => {
    const load = async () => {
      const msgs = await getContactMessages()
      setRepliedMessages(msgs.filter((m) => m.adminReply))
    }
    load()
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      alert('Mohon isi semua kolom yang diperlukan')
      return
    }

    setIsSubmitting(true)

    setTimeout(async () => {
      await addContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      })

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
      setIsSubmitting(false)
      setSubmitted(true)
      const msgs = await getContactMessages()
      setRepliedMessages(msgs.filter((m) => m.adminReply))

      setTimeout(() => setSubmitted(false), 4000)
    }, 300)
  }

  const formatDate = (timestamp: string) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(timestamp))
  }

  return (
    <div className="min-h-screen bg-black/50 relative">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar />

      {/* Header Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 bg-clip-text text-transparent">
              Hubungi Kami
            </span>
          </h1>
          <p className="text-lg text-purple-200/80">
            Punya pertanyaan atau laporan? Kirimkan pesan dan kami akan segera merespons.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Email */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300"></div>
            <div className="relative p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/25 mb-3">
                <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-purple-100 mb-1">Email</h3>
              <p className="text-purple-200/60 text-xs">kripikwasyif_store@gmail.com</p>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300"></div>
            <div className="relative p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-500/15 border border-green-500/25 mb-3">
                <svg className="w-6 h-6 text-green-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-purple-100 mb-1">WhatsApp</h3>
              <p className="text-purple-200/60 text-xs">+62 896-1744-7090</p>
            </div>
          </div>

          {/* Lokasi */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300"></div>
            <div className="relative p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/25 mb-3">
                <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-purple-100 mb-1">Lokasi</h3>
              <p className="text-purple-200/60 text-xs">Kuala Tanjung, Batu Bara, Sumatera Utara</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20 group-hover:border-purple-400/40 group-hover:shadow-[0_0_30px_-10px_rgba(168,85,247,0.3)] transition-all duration-500"></div>
            <div className="relative p-4">
              <div className="rounded-xl overflow-hidden border border-purple-500/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63750.0!2d99.4!3d3.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30316e67e0e6b8e7%3A0x4030bfbca7d2440!2sKuala%20Tanjung%2C%20Batu%20Bara%2C%20Sumatera%20Utara!5e0!3m2!1sid!2sid!4v1708434578000!5m2!1sid!2sid"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                ></iframe>
              </div>
              <div className="text-center mt-3">
                <a
                  href="https://maps.google.com/?q=Kuala+Tanjung,+Batu+Bara,+Sumatera+Utara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300/60 hover:text-purple-200 text-xs transition-colors inline-flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Replies Section */}
      {repliedMessages.length > 0 && (
        <section className="pb-12 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-purple-100 mb-2">Balasan Admin</h2>
            <p className="text-purple-200/60 text-sm mb-6">Balasan dari admin untuk pesan yang masuk</p>

            <div className="space-y-4">
              {repliedMessages.map((msg) => (
                <div key={msg.id} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300"></div>
                  <div className="relative p-6">
                    {/* User message */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-sm">
                        👤
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-purple-100">{msg.name}</span>
                          <span className="text-[10px] text-purple-300/40">{formatDate(msg.timestamp)}</span>
                        </div>
                        {msg.subject && <p className="text-xs font-medium text-purple-200/60 mb-1">📌 {msg.subject}</p>}
                        <p className="text-purple-200/70 text-sm">{msg.message}</p>
                      </div>
                    </div>

                    {/* Admin reply */}
                    <div className="ml-11 pl-4 border-l-2 border-purple-500/30">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-purple-300">Admin KripikWasyif</span>
                        <span className="text-[10px] text-purple-300/40">{msg.replyTimestamp && formatDate(msg.replyTimestamp)}</span>
                      </div>
                      <p className="text-purple-100 text-sm leading-relaxed">{msg.adminReply}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form Section */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20"></div>
            <form onSubmit={handleSubmit} className="relative p-8 md:p-12 space-y-6">
              <h2 className="text-2xl font-bold text-purple-100 mb-6">Kirim Pesan / Laporan</h2>

              {submitted && (
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300 text-sm text-center flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Pesan berhasil dikirim! Admin akan segera membalas.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Nama Lengkap <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama Anda"
                    className="w-full px-4 py-3 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 focus:bg-purple-950/60 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Masukkan email Anda"
                    className="w-full px-4 py-3 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 focus:bg-purple-950/60 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    No. Telepon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Nomor telepon Anda"
                    className="w-full px-4 py-3 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 focus:bg-purple-950/60 transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Subjek
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Subjek pesan Anda"
                    className="w-full px-4 py-3 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 focus:bg-purple-950/60 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Pesan <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tulis pesan atau laporan Anda di sini..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 focus:bg-purple-950/60 transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-500/80 to-purple-600/80 hover:from-purple-500 hover:to-purple-600 disabled:from-purple-500/50 disabled:to-purple-600/50 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm border border-purple-400/30 hover:border-purple-300/60 active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8m0 8l-6-4m6 4l6-4"
                      />
                    </svg>
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
      <AdminFloatingButton />
    </div>
  )
}
