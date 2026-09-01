import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PrismShot 棱镜定格",
    short_name: "PrismShot",
    description: "A creative home for VRChat photographers and video makers.",
    start_url: "/",
    display: "standalone",
    background_color: "#050609",
    theme_color: "#050609",
    icons: [
      {
        src: "/images/brand/prismshot-mark.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
