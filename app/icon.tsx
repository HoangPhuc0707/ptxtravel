import { ImageResponse } from 'next/og';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default async function Icon() {
  const logoPath = path.join(process.cwd(), 'public/assets/Logo/2.png');
  const logoData = fs.readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '12px',
        }}
      >
        <img
          src={logoBase64}
          style={{ width: '85%', height: '85%', objectFit: 'contain' }}
        />
      </div>
    ),
    { ...size }
  );
}
