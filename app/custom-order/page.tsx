'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Upload, Instagram } from 'lucide-react';

export default function CustomOrderPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    orderType: '',
    description: '',
    budget: '',
    deadline: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Redirect to Instagram DM
    const instagramUrl = 'https://www.instagram.com/direct/t/your_instagram_handle';
    window.open(instagramUrl, '_blank');
    
    // Show alert with order details for user to copy
    const message = `
🎨 Custom Order Request

👤 Customer Details:
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || 'Not provided'}

📦 Order Details:
Type: ${formData.orderType}
Description: ${formData.description}
Budget: ${formData.budget ? `₹${formData.budget}` : 'Not specified'}
Deadline: ${formData.deadline || 'Flexible'}

Please confirm availability and pricing.
    `.trim();
    
    alert('Please send us the following details via Instagram DM:\n\n' + message);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Custom Order Request
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl">
            Have something special in mind? Let us create a unique piece just for you!
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Your Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Order Details */}
              <div className="pt-6 border-t border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="orderType" className="block text-sm font-semibold text-gray-900 mb-2">
                      What would you like to order? *
                    </label>
                    <select
                      id="orderType"
                      name="orderType"
                      required
                      value={formData.orderType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      <option value="Flower Bouquet">Flower Bouquet</option>
                      <option value="Keychain">Keychain</option>
                      <option value="Ribbon & Clips">Ribbon & Clips</option>
                      <option value="Mixed Items">Mixed Items</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                      Describe your custom order *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      value={formData.description}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      placeholder="Please describe what you'd like us to create. Include details about colors, size, style, and any special requirements..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-semibold text-gray-900 mb-2">
                        Budget (Optional)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                        <input
                          type="number"
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="1000"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="deadline" className="block text-sm font-semibold text-gray-900 mb-2">
                        Deadline (Optional)
                      </label>
                      <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Upload className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">
                          Have reference images?
                        </p>
                        <p className="text-sm text-gray-600">
                          You can share images via Instagram DM after submitting this form
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-105"
                >
                  <Instagram className="w-6 h-6" />
                  Contact via Instagram
                </button>
                <p className="text-sm text-gray-600 text-center mt-4">
                  We'll respond to your request within 24 hours
                </p>
              </div>
            </form>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Response</h3>
              <p className="text-sm text-gray-600">
                We typically respond within 24 hours
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3">💎</div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-sm text-gray-600">
                Handcrafted with premium materials
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-semibold text-gray-900 mb-2">Fully Customizable</h3>
              <p className="text-sm text-gray-600">
                Tailored exactly to your preferences
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
