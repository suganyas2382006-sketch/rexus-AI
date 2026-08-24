import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Rexus AI Visual Interface',
  description: 'Holographic Vision and Voice AI Engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground select-none">
        {children}
      </body>
    </html>
  );
}
