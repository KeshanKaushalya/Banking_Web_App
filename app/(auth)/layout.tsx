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
          <div>
            <Image 
            src="/icons/backAuth.png"
            alt="Auth image"
            width={5000}
            height={5000}
            />
          </div>
        </div>
    </main>
  );
}
