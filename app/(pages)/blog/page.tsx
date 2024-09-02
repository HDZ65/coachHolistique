import { Metadata } from "next";
import Articles from "./components/Articles/Articles";
import Ebook from "./components/Ebook/Ebook";
import Header from "./components/Header/Header";
import NewArticle from "./components/NewArticle/NewArticle";


export const metadata: Metadata = {
  title: "Blog - Elisabeth Coach Holistique",
  description: "Lisez les derniers articles sur le coaching holistique, le bien-être et le développement personnel par Elisabeth Coach Holistique.",
  keywords: ["blog", "articles", "coaching holistique", "bien-être", "développement personnel", "Elisabeth Coach"],
  authors: [{ name: "Elisabeth Coach Holistique" }],
  openGraph: {
    title: "Blog - Elisabeth Coach Holistique",
    description: "Lisez les derniers articles sur le coaching holistique, le bien-être et le développement personnel par Elisabeth Coach Holistique.",
    url: "https://www.elisabethcoachholistique.com/blog",
    type: "website",
    images: [
      {
        url: "https://www.elisabethcoachholistique.com/public/logoElisabeth.png",
        width: 1200,
        height: 630,
        alt: "Elisabeth Coach Holistique"
      }
    ]
  }
};

export default function Blog() {
  return (
    <>
      <Header />
      <NewArticle />
      <Articles />
    </>
  );
}