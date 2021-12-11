import i18next from "i18next";
import { renderToString } from "react-dom/server";
import { initReactI18next } from "react-i18next";
import type { EntryContext } from "remix";
import { RemixServer } from "remix";
import { RemixI18NextProvider } from "remix-i18next";

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {

  await i18next.use(initReactI18next).init({
    supportedLngs: ["heb", "en"],
    defaultNS: "common",
    fallbackLng: "heb",
    react: { useSuspense: false },
  });

  let markup = renderToString(
    <RemixI18NextProvider i18n={i18next}>
      <RemixServer context={remixContext} url={request.url} />
    </RemixI18NextProvider>
  );

  responseHeaders.set("Content-Type", "text/html");
  
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
