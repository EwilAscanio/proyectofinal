import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/Roboto-Regular.ttf",
  variable: "--Roboto-Regular",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/Roboto-LightItalic.ttf",
  variable: "--Roboto-LightItalic",
  weight: "100 900",
});

export const metadata = {
  title: "Proyecto final",
  description: "Creado por EwilDev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
