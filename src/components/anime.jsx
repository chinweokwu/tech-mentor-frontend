import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimes } from "../features/anime/animeSlice";
import { Pagination } from "antd";
import Loading from "./loading";

function Animes() {
  const dispatch = useDispatch();
  const animes = useSelector((state) => state.animes.animes);
  const loading = useSelector((state) => state.animes.loading);
  const error = useSelector((state) => state.animes.error);

  useEffect(() => {
    dispatch(fetchAnimes({ page: 1, perPage: 5 }));
  }, [dispatch]);

  const handlePageChange = (page, pageSize) => {
    dispatch(fetchAnimes({ page, perPage: pageSize }));
  };

  return (
    <div>
      {loading && (<Loading />)}
      {error && <p>Error: {error}</p>}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-3/4 mt-5">
        {animes.map((anime) => (
          <div key={anime.id}>
            <div className="max-w-md bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-transform hover:scale-105 duration-300">
              <img
                src={anime.attributes.posterImage.small}
                alt="anime"
                className="w-full h-auto"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  {anime.attributes.titles.en}
                </h2>
                <p className="text-gray-600">{anime.attributes.titles.ja_jp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="my-8 flex justify-center">
        <Pagination
          total={10}
          onChange={handlePageChange}
          onShowSizeChange={handlePageChange}
          pageSize={5}
          defaultPageSize={5}
        />
      </div>
    </div>
  );
}

export default Animes;
