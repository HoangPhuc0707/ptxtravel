import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Về Chúng Tôi',
  description: 'Tìm hiểu về PTX Travel - Phú Thọ Xanh Travel.',
};

export default function AboutPage() {
  return (
    <>
      <div className="bg-slate-900 pt-24 pb-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Về <span className="text-[var(--color-primary)]">PTX Travel</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Hành trình hơn 15 năm kinh nghiệm mang đến những trải nghiệm du lịch tuyệt vời nhất cho người Việt.
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-12">
            <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
              <div className="relative w-full max-w-[400px] aspect-square">
                <Image 
                  src="/assets/Logo/1.png" 
                  alt="PTX Travel & Services Logo" 
                  fill 
                  className="object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500" 
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-heading font-bold text-[var(--color-primary)] mb-6 uppercase">Giới thiệu Công ty PTX Travel & Services</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed font-medium text-[15px]">
                <p>
                  <strong>PTX Travel & Services</strong>, tiền thân là Công ty Du lịch Phú Thọ Xanh, được thành lập từ năm 2005. Trải qua nhiều giai đoạn phát triển và điều chỉnh chức năng hoạt động để phù hợp với xu hướng của thị trường du lịch, PTX từng bước hoàn thiện hệ thống dịch vụ theo hướng linh hoạt, chuyên nghiệp và lấy khách hàng làm trung tâm.
                </p>
                <p>
                  PTX phục vụ đa dạng nhu cầu của khách lẻ, khách đoàn, khách nội địa và quốc tế, với các dịch vụ chính gồm tổ chức tour du lịch, cho thuê xe, vé máy bay, hỗ trợ visa, đặt phòng khách sạn và các dịch vụ du lịch liên quan.
                </p>
                <p>
                  Kế thừa tinh thần của thương hiệu Phú Thọ Xanh, PTX hướng đến sự tin cậy, an toàn, tận tâm và gia tăng giá trị cho khách hàng, đồng thời không ngừng đổi mới để đồng hành cùng khách hàng trên mỗi hành trình.
                </p>
              </div>
              
              <div className="mt-8 p-6 bg-blue-50/50 border-l-4 border-[var(--color-primary)] rounded-r-2xl">
                <h3 className="font-heading font-bold text-xl text-gray-900 mb-1">PTX TRAVEL & SERVICES</h3>
                <p className="italic text-[var(--color-primary)] font-semibold text-lg">"Đồng hành cùng bạn trên mỗi hành trình."</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
