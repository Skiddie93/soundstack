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
      <head>
        <title>Soundcheck</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Make album charts with song previews" />
        <meta name="author" content="Skiddie" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </head>
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
