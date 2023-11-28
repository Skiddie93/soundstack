import Header from "@/components/partials/_header";
import Search from "@/components/Search";
import "../styles/global.scss";
import { PiPlaylistFill } from "react-icons/pi";

interface children {
  children: React.ReactNode;
}

export default function RootLayout({ children }: children) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="container head-tools ">
          <Search />
          <div className="profile">
            <a href="/profile">
              <PiPlaylistFill />
            </a>
          </div>
        </div>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
