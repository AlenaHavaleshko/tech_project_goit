import React from 'react';
import Header from '@/components/Header/Header';


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div >
      <Header />
      <main>{children}</main>
    </div>
  );
}
  