import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnimes } from "../features/anime/animeSlice";
import { Pagination } from "antd";

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
      {loading && (
        <div className="flex items-center justify-center h-screen" role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
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
