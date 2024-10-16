import Header from "./components/Header/Header";
import Books from "./components/BookList/BookList";
export default function App() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <Header />
      <main>
        <Books />
      </main>
    </section>
  );
}
