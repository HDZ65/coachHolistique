import Articles from "./components/Articles/Articles";
import Ebook from "./components/Ebook/Ebook";
import Header from "./components/Header/Header";
import NewArticle from "./components/NewArticle/NewArticle";

export default function Blog() {
  return (
    <>
      <Header />
      <NewArticle />
      <Articles />
    </>
  );
}