'use client'

import { useState } from 'react'

interface Review {
  id: string
  name: string
  rating: number
  message: string
  timestamp: Date
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    // Simulate API call delay
    setTimeout(() => {
      const newReview: Review = {
        id: Date.now().toString(),
        name: formData.name,
        rating: formData.rating,
        message: formData.message,
        timestamp: new Date(),
      }

      setReviews((prev) => [newReview, ...prev])
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
            className={`w-4 h-4 ${
              i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 bg-clip-text text-transparent">
              Ulasan Pelanggan
            </span>
          </h2>
          <p className="text-purple-200/80">
            Bagikan pengalaman Anda berbelanja bersama kami
          </p>
        </div>

        {/* Review Form */}
        <div className="mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-2xl backdrop-blur-xl border border-purple-500/20"></div>
            <form onSubmit={handleSubmit} className="relative p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
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
                    className="w-full px-4 py-2 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 focus:bg-purple-950/60 transition-all duration-300"
                  />
                </div>

                {/* Rating Input */}
                <div>
                  <label className="block text-sm font-medium text-purple-200 mb-2">
                    Rating
                  </label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 focus:outline-none focus:border-purple-400/60 focus:bg-purple-950/60 transition-all duration-300"
                  >
                    <option value={5}>★★★★★ Sangat Puas</option>
                    <option value={4}>★★★★☆ Puas</option>
                    <option value={3}>★★★☆☆ Cukup</option>
                    <option value={2}>★★☆☆☆ Kurang Puas</option>
                    <option value={1}>★☆☆☆☆ Tidak Puas</option>
                  </select>
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Pesan Ulasan
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tulis pengalaman Anda berbelanja di toko kami..."
                  rows={5}
                  className="w-full px-4 py-2 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-100 placeholder-purple-300/50 focus:outline-none focus:border-purple-400/60 focus:bg-purple-950/60 transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
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

        {/* Reviews List */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-purple-100 mb-6">
            {reviews.length > 0
              ? `Ulasan Terbaru (${reviews.length})`
              : 'Belum ada ulasan. Jadilah yang pertama!'}
          </h3>

          {reviews.map((review) => (
            <div
              key={review.id}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-400/5 to-transparent rounded-xl backdrop-blur-xl border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300"></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-lg font-bold text-purple-100">
                      {review.name}
                    </h4>
                    <p className="text-xs text-purple-200/60 mt-1">
                      {formatDate(review.timestamp)}
                    </p>
                  </div>
                  {renderStars(review.rating)}
                </div>
                <p className="text-purple-200/80 leading-relaxed">
                  {review.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
