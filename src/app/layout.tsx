"use client";

import "../styles/main.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Provider } from "react-redux";
import { store } from "../store";
import { AuthProvider } from "@/context";
import { Amplify } from "aws-amplify";
import { SnackbarProvider } from "@/context/SnackbarContext";
import awsConfig from "@/aws-config";

Amplify.configure(awsConfig, { ssr: true });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <SnackbarProvider>
            <AuthProvider>{children}</AuthProvider>
          </SnackbarProvider>
        </Provider>
      </body>
    </html>
  );
}
