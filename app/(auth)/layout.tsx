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
          <div className="">
            <Image 
            src="/Backauth.png"
            alt="Auth image"
            width={700}
            height={600}
            className="mx-auto"
            />
          </div>
        </div>
    </main>
  );
}
