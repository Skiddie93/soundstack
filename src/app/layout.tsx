
import Header from "@/components/partials/_header";
import "../styles/global.scss";

interface children {
  children: React.ReactNode;
}

export default function RootLayout({ children }: children) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
