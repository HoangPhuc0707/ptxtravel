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
            Hành trình hơn 20 năm mang đến những trải nghiệm du lịch tuyệt vời nhất cho người Việt.
          </p>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Section 1: Hành trình phát triển */}
          <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
            <div className="w-full lg:w-1/2">
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-xl">
                <Image src="/assets/hero_banner.png" alt="PTX Travel Team" fill className="object-cover" />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Sứ Mệnh & Tầm Nhìn</h2>
              <p className="text-gray-700 mb-4 leading-relaxed font-medium">
                Thành lập từ năm 2005, <strong>PTX Travel (Phú Thọ Xanh Travel)</strong> tự hào là một trong những đơn vị lữ hành uy tín hàng đầu, với sứ mệnh: <em>“Tối đa hóa giá trị gia tăng cho các khách hàng, cho đội ngũ nhân viên, cho các nhà đầu tư, xã hội và cộng đồng”</em>.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Chúng tôi không chỉ bán tour du lịch, chúng tôi mang đến những <strong>trải nghiệm, cảm xúc và kỷ niệm</strong> đáng nhớ cho mỗi khách hàng trên từng nẻo đường.
              </p>
              <ul className="flex flex-col gap-3 mt-6 text-gray-700">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-bold">✓</div>
                  Chất lượng dịch vụ là ưu tiên hàng đầu
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-bold">✓</div>
                  Giá cả cạnh tranh, minh bạch
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-bold">✓</div>
                  Đội ngũ hướng dẫn viên giàu kinh nghiệm, tận tâm
                </li>
              </ul>
            </div>
          </div>

          {/* Section 2: Ý nghĩa Logo */}
          <div className="flex flex-col lg:flex-row gap-12 items-center bg-blue-50/50 p-8 md:p-12 rounded-3xl border border-blue-100">
            <div className="w-full lg:w-1/3 flex justify-center">
              <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
                <Image src="/assets/Logo/2.png" alt="Logo PTX Travel" fill className="object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
            <div className="w-full lg:w-2/3">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">Ý Nghĩa Logo Phú Thọ Xanh</h2>
              <h3 className="text-xl font-bold text-[var(--color-primary)] mb-4">“Chúng tôi tự hào giúp bạn thực hiện ươm mầm cho những ước mơ vươn xa”</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Đó chính là ý nghĩa LOGO của Công Ty Du Lịch Phú Thọ Xanh, biểu tượng mà chúng tôi hàng ngày vẫn mang trên ngực trái của mình, thể hiện sự Khắc ghi – Quyết tâm & Quyết thắng.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Logo là hình oval thể hiện sự quan tâm, bao bọc, chở che của Công Ty đối với khách hàng và đội ngũ nhân viên. Khối hình tạo một sự bao bọc vững chắc và an toàn để nâng đỡ <strong>“Valued Customer”</strong> bên trong – những người đã đồng hành cùng Phú Thọ Xanh trong suốt quá trình phát triển. Đó là đội ngũ nhân viên mang đầy nhiệt huyết cống hiến; là tập thể quản lý ngày đêm phấn đấu lèo lái con tàu từ những ngày mới thành lập đầy gian nan đến thành công rạng rỡ hôm nay; và là các nhà đầu tư đã đặt trọn niềm tin vào Phú Thọ Xanh.
              </p>
              <div className="bg-white p-5 rounded-xl border border-gray-100 mt-6 shadow-sm">
                <p className="text-gray-800 font-semibold mb-3">Mầm non này được gói tròn trong 3 chữ “PT xanh”, nghĩa là PHÚ-THỌ-XANH:</p>
                <ul className="flex flex-col gap-2 text-gray-700">
                  <li><span className="font-bold text-[var(--color-primary)]">PHÚ</span>: Thể hiện sự giàu sang, phú quý.</li>
                  <li><span className="font-bold text-[var(--color-primary)]">THỌ</span>: Thể hiện sự trường tồn, vĩnh cửu.</li>
                  <li><span className="font-bold text-[var(--color-primary)]">XANH</span>: Thể hiện niềm đam mê, tươi trẻ, yêu đời.</li>
                </ul>
              </div>
              <p className="text-gray-700 mt-5 font-medium italic">
                Đến với chúng tôi, các bạn sẽ ngày càng giàu kiến thức, giàu sức khỏe và đi lên không ngừng trong sự xanh tươi yêu đời, xứng đáng với niềm tin và lời hứa của Phú Thọ Xanh.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
