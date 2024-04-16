import { useSuspenseQuery } from "@tanstack/react-query";
import { Image, Skeleton } from "antd";
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
        <Image
          key={movie.id}
          src={`${TMDB_IMG_BASE_URL}/${size === "sm" ? movie.backdrop_path : movie.poster_path}`}
          width={"100%"}
          preview={false}
          className={`row_img ${size === "lg" && "row_img_lg"}`}
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
                style={size === "lg" ? { height: 325 } : {}}
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
