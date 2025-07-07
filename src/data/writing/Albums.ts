import { LEFT_ALIGN } from "./Constants";
import { BASE_PATH } from "../../services/utils";

export const albums = {
  my_favourite_albums: {
    preamble: "These are some of my favourite albums, mostly in no particular order.",
    items: [
      {
        title: "Deathconsciousness",
        image: `${BASE_PATH}/images/albums/deathconsciousness.jpg`,
        align: LEFT_ALIGN
      }
    ]
  }
};
