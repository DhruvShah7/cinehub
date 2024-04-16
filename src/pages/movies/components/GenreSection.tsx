import { useSuspenseQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import axios from "axios";
import { Suspense } from "react";
import { TMDB_IMG_BASE_URL } from "../../../constants/api-routes";
import "../styles/genre-row-styles.css";
import { MovieType } from "../types";

const GenreRow = ({
  id,
  fetchUrl,
  size = "sm",
}: {
  id: string | number;
  fetchUrl: string;
  size?: "sm" | "lg";
}) => {
  const { error, data: movies } = useSuspenseQuery({
    queryKey: ["movies-by-genre", id],
    queryFn: async () => {
      const response = await axios.get(fetchUrl);
      return response.data?.results;
    },
  });

  if (error) return <>Error!</>;
  return (
    <div className={"ganre_row"}>
      {movies.map((movie: MovieType) => (
        <div
          key={movie.id}
          style={{
            backgroundImage: `url(${size === "sm" ? `${TMDB_IMG_BASE_URL}/${movie.backdrop_path}` : `${TMDB_IMG_BASE_URL}/${movie.poster_path}`})`,
            backgroundSize: "cover",
            objectFit: "contain",
            backgroundPosition: "center",
            minWidth: 225,
            height: size === "lg" ? 335 : 140,
          }}
          className={"row_img"}
        />
      ))}
    </div>
  );
};

const GenreSection = ({
  id,
  title,
  fetchUrl,
  size = "sm",
}: {
  id: string | number;
  title: string;
  fetchUrl: string;
  size?: "sm" | "lg";
}) => {
  return (
    <div style={{ marginTop: "32px" }}>
      <h2 style={{ textTransform: "uppercase", marginBottom: "8px" }}>
        {title}
      </h2>
      <Suspense
        fallback={
          <div className={"ganre_row"}>
            {[...Array(10).keys()].map((_, i) => (
              <Skeleton.Image
                key={i}
                active
                className={"row_img"}
                style={{ height: size === "lg" ? 335 : 140 }}
              />
            ))}
          </div>
        }
      >
        <GenreRow key={id} id={id} fetchUrl={fetchUrl} size={size} />
      </Suspense>
    </div>
  );
};

export default GenreSection;
