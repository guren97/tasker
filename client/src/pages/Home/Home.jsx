import Article from "../../components/Article/Article.jsx";

const Home = () => {
  return (
    <div className="py-16 flex justify-between gap-4">
      <section id="article_section" className="">
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
      </section>
    </div>
  );
};

export default Home;
