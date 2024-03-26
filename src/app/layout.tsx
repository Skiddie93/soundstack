"use client";
import Header from "@/components/partials/_header";
import Search from "@/components/Search";
import Toast from "@/components/Toast";
import { ToastContext } from "@/utils/context";
import "../styles/global.scss";
import { PiPlaylistFill } from "react-icons/pi";
import { useState, useEffect, useContext } from "react";

interface children {
  children: React.ReactNode;
}

export default function RootLayout({ children }: children) {
  return (
    <html lang="en">
      <head>
        <title>Soundcheck</title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="Make album charts with song previews"
        />
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
        <Content children={children} />
      </body>
    </html>
  );
}

const Content = ({ children }: children) => {
  interface ToastOptions {
    id: number;
    message: string;
    type: "success" | "error" | "warning";
  }

  const [toastState, setToastState] = useState<ToastOptions[] | []>([]);

  const closeToast: any = (id: number) => {
    setToastState((prev: ToastOptions[] | []) => {
      const clone = [...prev];
      const updatedState = clone.filter(
        (toast: ToastOptions) => toast.id != id
      );
      return updatedState;
    });
  };

  const initToast = (
    message: string,
    type: "success" | "error" | "warning"
  ) => {
    const options: ToastOptions = {
      id: Date.now(),
      message: message,
      type: type,
    };

    setToastState((prev: ToastOptions[] | []) => {
      const updatedState = prev.length ? [...prev, options] : [options];
      return updatedState;
    });

    setTimeout(() => {
      closeToast(options.id);
    }, 5000);
  };

  return (
    <ToastContext.Provider value={initToast}>
      <Toast toasts={toastState} />
      <div className="container">{children}</div>
    </ToastContext.Provider>
  );
};
