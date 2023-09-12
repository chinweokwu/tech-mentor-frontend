import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManga } from "../features/manga/mangaSlice";
import Loading from "./loading";

function Manga() {
  const dispatch = useDispatch();
  const mangas = useSelector((state) => state.mangas.mangas);
  const loading = useSelector((state) => state.mangas.loading);
  const error = useSelector((state) => state.mangas.error);

  useEffect(() => {
    dispatch(fetchManga());
  }, [dispatch]);

  return (
    <div>
      {loading && (<Loading />)}

      {error && <p>Error: {error}</p>}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-3/4 my-10">
        {mangas.map((manga) => (
          <div key={manga.id}>
            <div className="max-w-md bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:scale-105 duration-300">
              <img
                src={manga.attributes.posterImage.small}
                alt="manga"
                className="w-full h-auto"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {manga.attributes.titles.en}
                </h2>
                <p className="text-gray-600">
                  {manga.attributes.canonicalTitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Manga;
