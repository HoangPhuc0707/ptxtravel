"use client";

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (res.ok) {
        setIsSent(true);
        setTimeout(() => {
          setIsSent(false);
          setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to submit contact:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#fcfdfd] min-h-screen">
      {/* Hero Section */}
      <div className="bg-slate-900 pt-28 pb-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6">
            Liên hệ <span className="text-[var(--color-primary)]">PTX Travel</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Đừng ngần ngại liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc yêu cầu nào.<br />Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-28 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-5">
            
            <h1 className="mt-8 text-3xl md:text-4xl font-bold font-heading text-gray-900 leading-[1.2] mb-6">
              Bắt Đầu <span className="text-[var(--color-primary)]">Hành Trình</span><br />Của Bạn Ngay
            </h1>
            
            <p className="text-gray-500 mb-10 leading-relaxed text-[15px]">
              Liên hệ ngay để được tư vấn và nhận ưu đãi đặc biệt từ PTX Travel. Chúng tôi sẽ phản hồi trong thời gian sớm nhất!
            </p>

            {/* Info List */}
            <div className="flex flex-col gap-6 mb-12">
              {/* Item 1: Address */}
              <div className="flex gap-5">
                <div className="w-[52px] h-[52px] rounded-2xl bg-[#0b63e5] flex items-center justify-center shrink-0 shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Địa chỉ văn phòng</div>
                  <div className="text-gray-900 font-medium">15 Lê Quang Chiểu, phường Phú Thọ Hoà, TP.HCM</div>
                </div>
              </div>

              {/* Item 2: Phone */}
              <div className="flex gap-5">
                <div className="w-[52px] h-[52px] rounded-2xl bg-[#0b63e5] flex items-center justify-center shrink-0 shadow-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Hotline (24/7)</div>
                  <div className="text-[#0b63e5] font-bold text-lg">0839 837 891</div>
                  <div className="text-gray-700 font-medium text-sm mt-2 flex flex-col gap-1">
                    <div>Ms Vi: 0862.49.35.72</div>
                    <div>Ms Yến: 0949.369.874</div>
                    <div>Ms Trân: 0978.255.471</div>
                  </div>
                </div>
              </div>

              {/* Item 3: Email */}
              <div className="flex gap-5">
                <div className="w-[52px] h-[52px] rounded-2xl bg-[#0b63e5] flex items-center justify-center shrink-0 shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Email</div>
                  <div className="text-[#0b63e5] font-bold">info@ptxtravel.com</div>
                </div>
              </div>


              {/* Item 5: Social Media */}
              <div className="flex gap-5">
                <div className="w-[52px] h-[52px] rounded-2xl bg-[#0b63e5] flex items-center justify-center shrink-0 shadow-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Mạng xã hội</div>
                  <div className="text-[#0b63e5] font-bold">Facebook · Instagram · Zalo OA · YouTube</div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-[1.5rem] overflow-hidden border border-gray-100 shadow-sm h-[250px]">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=15%20Lê%20Quang%20Chiểu,%20Phú%20Thọ%20Hoà,%20Tân%20Phú,%20Hồ%20Chí%20Minh&t=&z=16&ie=UTF8&iwloc=&output=embed"
                title="Bản đồ vị trí PTX Travel"
              ></iframe>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-50 relative">
              <h2 className="text-[26px] font-bold font-heading text-[#1a2b49] mb-3 flex items-center gap-3">
                <span>📋</span> Đặt Tour / Yêu Cầu Tư Vấn
              </h2>
              <p className="text-gray-500 text-[15px] mb-8">Điền thông tin dưới đây và chúng tôi sẽ liên hệ bạn trong <strong className="text-gray-700">thời gian sớm nhất</strong>.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Họ và tên *</label>
                    <input required name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-[14px] rounded-xl border border-gray-200 focus:border-[#0b63e5] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-[15px]" placeholder="Nguyễn Văn A" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Số điện thoại *</label>
                    <input required name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-[14px] rounded-xl border border-gray-200 focus:border-[#0b63e5] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-[15px]" placeholder="0912 345 678" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-[14px] rounded-xl border border-gray-200 focus:border-[#0b63e5] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-[15px]" placeholder="email@example.com" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tiêu đề *</label>
                  <input required name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-[14px] rounded-xl border border-gray-200 focus:border-[#0b63e5] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-[15px]" placeholder="Tiêu đề liên hệ..." />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nội dung tin nhắn *</label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full px-4 py-[14px] rounded-xl border border-gray-200 focus:border-[#0b63e5] focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none text-[15px]" placeholder="Hãy cho chúng tôi biết bạn cần hỗ trợ gì..."></textarea>
                </div>

                <button type="submit" disabled={isSent} className={`w-full font-bold py-4 rounded-[14px] mt-2 transition-all flex items-center justify-center gap-2 text-lg ${isSent ? 'bg-green-500 hover:bg-green-600 text-white shadow-[0_8px_20px_-6px_rgba(34,197,94,0.6)]' : 'bg-[#f43f5e] hover:bg-[#e11d48] text-white shadow-[0_10px_25px_-8px_rgba(244,63,94,0.6)] hover:-translate-y-1'}`}>
                  {isSent ? '✓ Đã Gửi Thành Công' : <>🚀 Gửi Yêu Cầu Đặt Tour</>}
                </button>

                <div className="text-center mt-3 flex items-center justify-center gap-2 text-gray-500 text-xs">
                  <span>🔒</span> Thông tin của bạn được bảo mật. Phản hồi trong thời gian sớm nhất.
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
