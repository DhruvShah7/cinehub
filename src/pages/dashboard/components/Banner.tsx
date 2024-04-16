import { useSuspenseQuery } from "@tanstack/react-query";
import { Carousel, Image } from "antd";
import axios from "axios";
import { NOW_PLAYING, TMDB_IMG_BASE_URL } from "../../../constants/api-routes";
import { MovieType } from "../types";

const Banner = () => {
  const { error, data: nowPlayingList } = useSuspenseQuery({
    queryKey: ["movies-data"],
    queryFn: async () => {
      const response = await axios.get(NOW_PLAYING);
      return response.data?.results?.slice(0, 5);
    },
  });

  if (error) return <>Error!</>;

  return (
    <Carousel autoplay autoplaySpeed={6000}>
      {nowPlayingList?.map((ele: MovieType) => (
        <div key={ele.id}>
          <Image
            preview={false}
            width={"100%"}
            height={450}
            src={`${TMDB_IMG_BASE_URL}/${ele.backdrop_path}`}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
