import { NextPage } from "next";
import Head from "next/head";
import { useLanguage } from "@/lib/LanguageContext";
import { Contact } from "@/components/sections/Contact";

const ContactPage: NextPage = () => {
  const { isEnglish } = useLanguage();

  return (
    <>
      <Head>
        <title>
          {isEnglish ? "Contact | Elis 1234567" : "Контакти | Елис 1234567"}
        </title>
        <meta
          name="description"
          content={
            isEnglish
              ? "Get in touch with Elis Pavlova. Contact me for inquiries about books, services, workshops, or collaborations."
              : "Свържете се с Елис Павлова. Пишете ми за въпроси относно книги, услуги, уъркшопове или съвместна работа."
          }
        />
      </Head>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <Contact />
        </div>
      </div>
    </>
  );
};

export default ContactPage; 