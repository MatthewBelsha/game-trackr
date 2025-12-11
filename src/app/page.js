import SearchBar from "../components/SearchBar"; 
export default function Home() {
  return (
    <main className="flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">GameTrackr</h1>
      <p className="text-gray-600 max-w-xl text-center mb-8">
        Search for video games, learn more about them, and save them to your personal library.
      </p>

      <SearchBar />
    </main>
  );
}
