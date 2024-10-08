import { RemixI18Next } from "remix-i18next";
import { FileSystemBackend } from "remix-i18next";

// You will need to provide a backend to load your translations, here we use the
// file system one and tell it where to find the translations.
let backend = new FileSystemBackend("./public/locales");

export let i18n = new RemixI18Next(backend, {
  fallbackLng: "heb", // here configure your default (fallback) language
  supportedLanguages: ["heb"], // here configure your supported languages
});
