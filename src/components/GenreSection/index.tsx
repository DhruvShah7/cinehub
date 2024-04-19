import { useSuspenseQuery } from "@tanstack/react-query";
import { Card, Skeleton } from "antd";
import axios from "axios";
import { Suspense } from "react";
import { TMDB_IMG_BASE_URL } from "../../constants/api-routes";
import { CineType, MovieType, TVSType } from "../../constants/types";
import "./genre-row-styles.css";

type GenreRowPropsType = {
  type: CineType;
  id: string | number;
  fetchUrl: string;
  size?: "sm" | "lg";
};

const GenreRow: React.FC<GenreRowPropsType> = ({
  type,
  id,
  fetchUrl,
  size,
}: GenreRowPropsType) => {
  const { error, data: items } = useSuspenseQuery({
    queryKey: [`${type}-by-genre`, id],
    queryFn: async () => {
      const response = await axios.get(fetchUrl);
      return response.data?.results;
    },
  });

  if (error) return <>Error!</>;

  return (
    <div className={"ganre_row"}>
      {items.map((item: MovieType | TVSType) => (
        <Card
          key={item.id}
          hoverable
          className={"item-card"}
          style={{ minWidth: 250 }}
          cover={
            <img
              alt="example"
              src={
                size === "lg"
                  ? `${TMDB_IMG_BASE_URL}/${item.poster_path}`
                  : `${TMDB_IMG_BASE_URL}/${item.backdrop_path}`
              }
            />
          }
        >
          <Card.Meta
            title={
              type === "movie"
                ? (item as MovieType).title
                : (item as TVSType).name
            }
            style={{ overflow: "hidden" }}
          />
        </Card>
      ))}
    </div>
  );
};

type GenreSectionPropsType = {
  id: string | number;
  type: CineType;
  title: string;
  fetchUrl: string;
  size?: "sm" | "lg";
};

const GenreSection: React.FC<GenreSectionPropsType> = ({
  id,
  type,
  title,
  fetchUrl,
  size = "sm",
}: GenreSectionPropsType) => {
  return (
    <div>
      <h3 style={{ textTransform: "capitalize", marginBottom: "8px" }}>
        {title}
      </h3>
      <Suspense
        fallback={
          <div className={"ganre_row"}>
            {[...Array(10).keys()].map((_, i) => (
              <Skeleton.Image
                key={i}
                active
                style={{ minWidth: 250, height: size === "lg" ? 440 : 205 }}
              />
            ))}
          </div>
        }
      >
        <GenreRow
          key={id}
          type={type}
          id={id}
          fetchUrl={fetchUrl}
          size={size}
        />
      </Suspense>
    </div>
  );
};

export default GenreSection;
