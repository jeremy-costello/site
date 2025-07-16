import { LEFT_ALIGN } from "./Constants";
import { BASE_PATH } from "../../services/utils";

export const albums = {
  my_favourite_albums: {
    preamble: "These are some of my favourite albums, mostly in no particular order.",
    items: [
      {
        title: "Deathconsciousness - Have a Nice Life",
        image: `${BASE_PATH}/images/albums/deathconsciousness.jpg`,
        link: "https://en.wikipedia.org/wiki/Deathconsciousness",
        align: LEFT_ALIGN
      },
      {
        title: "Spiderland - Slint",
        image: `${BASE_PATH}/images/albums/spiderland.jpg`,
        link: "https://en.wikipedia.org/wiki/Spiderland",
        align: LEFT_ALIGN
      },
      {
        title: "Norman Fucking Rockwell! - Lana Del Rey",
        link: "https://en.wikipedia.org/wiki/Norman_Fucking_Rockwell!",
        image: `${BASE_PATH}/images/albums/nfr.png`,
        align: LEFT_ALIGN
      }
    ]
  }
};
