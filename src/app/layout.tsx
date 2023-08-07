import "../styles/global.scss";

interface children {
  children: React.ReactNode;
}

export default function RootLayout({ children }: children) {

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
