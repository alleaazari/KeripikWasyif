'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AdminFloatingButton } from '@/components/admin-floating-button'
import { getReviews, addReview, type Review } from '@/lib/store'

export default function UlasanPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    getReviews().then(setReviews)
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.message.trim()) {
      alert('Mohon isi semua kolom')
      return
    }

    setIsSubmitting(true)

    setTimeout(async () => {
      const avatars = ['😊', '🤩', '👍', '✨', '💫', '🌟', '🎉', '💜']
      await addReview({
        name: formData.name,
        rating: formData.rating,
        message: formData.message,
        avatar: avatars[Math.floor(Math.random() * avatars.length)],
      })

      setReviews(await getReviews())
      setFormData({
        name: '',
        rating: 5,
        message: '',
      })
      setIsSubmitting(false)
    }, 300)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
              }`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    )
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60))
      if (hours === 0) {
        const minutes = Math.floor(diff / (1000 * 60))
        return `${minutes} menit lalu`
      }
      return `${hours} jam lalu`
    } else if (days === 1) {
      return 'Kemarin'
    } else if (days < 7) {
      return `${days} hari lalu`
    } else {
      return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(date)
    }
  }

  return (
    <div className="min-h-screen bg-black/50 relative">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <Navbar />

      {/* Header Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 bg-clip-text text-transparent">
              Apa Kata Mereka?
            </span>
          </h1>
          <p className="text-lg text-purple-200/80">
            Baca ulasan pelanggan kami dan bagikan pengalaman Anda berbelanja
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20"></div>
            <form onSubmit={handleSubmit} className="relative p-8 md:p-12 space-y-6">
              <h2 className="text-2xl font-bold text-purple-100 mb-6">Tulis Ulasan Anda</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Nama Anda
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
                    Rating
                  </label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 focus:outline-none focus:border-purple-400/60 focus:bg-purple-950/60 transition-all duration-300"
                  >
                    <option value={5}>★★★★★ Sangat Puas</option>
                    <option value={4}>★★★★☆ Puas</option>
                    <option value={3}>★★★☆☆ Cukup</option>
                    <option value={2}>★★☆☆☆ Kurang Puas</option>
                    <option value={1}>★☆☆☆☆ Tidak Puas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Ulasan Anda
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tulis pengalaman Anda berbelanja di toko kami..."
                  rows={5}
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
                    Kirim Ulasan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Reviews List Section */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-purple-100 mb-2">Ulasan Pelanggan</h2>
          <p className="text-purple-200/70 mb-8">
            {reviews.length} ulasan dari pelanggan puas kami
          </p>

          <div className="grid gap-6">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className="group relative animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300"></div>

                <div className="relative p-8 md:p-10">
                  <div className="flex items-start gap-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/30 to-purple-600/30 flex items-center justify-center text-3xl border border-purple-400/30">
                        {review.avatar}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="text-lg font-bold text-purple-100">
                          {review.name}
                        </h3>
                        {renderStars(review.rating)}
                      </div>

                      <p className="text-xs text-purple-200/60 mb-4">
                        {formatDate(review.timestamp)}
                      </p>

                      <p className="text-purple-200/80 leading-relaxed text-base">
                        {review.message}
                      </p>

                      {/* Admin Reply */}
                      {review.adminReply && (
                        <div className="mt-4 pl-4 border-l-2 border-purple-500/30">
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-xs font-semibold text-purple-300">Admin KripikWasyif</span>
                            {review.replyTimestamp && (
                              <span className="text-[10px] text-purple-300/40">{formatDate(review.replyTimestamp)}</span>
                            )}
                          </div>
                          <p className="text-purple-100/90 text-sm leading-relaxed">{review.adminReply}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
      <AdminFloatingButton />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}
      </style>
    </div>
  )
}
