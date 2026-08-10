import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';

import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'Về Chúng Tôi',
  description: 'Tìm hiểu về PTX Travel - Phú Thọ Xanh Travel.',
};

export default function AboutPage() {
  return <AboutContent />;
}
