import Article from "../../components/Article/Article.jsx";
import { IoFilter } from "react-icons/io5";

const Home = () => {
  return (
    <div className="py-16 flex flex-col lg:flex-row lg:justify-between lg:gap-16">
      <section id="article_section" className="lg:w-3/4">
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
        <Article />
      </section>
      <section className="lg:w-1/4">
        <h1 className="text-sm font-bold mb-4 flex justify-left items-center gap-2">
          <span>
            <IoFilter />
          </span>{" "}
          Filter
        </h1>
        <nav>
          <button
            to="/"
            className="block mb-2 px-2 py-1 border rounded-md text-xs hover:bg-gray-200"
          >
            category sample
          </button>
          <button
            to="/"
            className="block mb-2 px-2 py-1 border rounded-md text-xs hover:bg-gray-200"
          >
            category sample
          </button>
          <button
            to="/"
            className="block mb-2 px-2 py-1 border rounded-md text-xs hover:bg-gray-200"
          >
            category sample
          </button>
        </nav>
      </section>
    </div>
  );
};

export default Home;
