import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
        {children}
        <div className="auth-asset">
          <div className="flex justify-left">
            <Image 
            src="/icons/Backauth.png"
            alt="Auth image"
            width={400}
            height={400}
            />
          </div>
        </div>
    </main>
  );
}
