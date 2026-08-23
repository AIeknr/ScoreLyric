import { CatalogHome } from "../components/catalog-home";
import { featuredSongSlugs } from "../lib/catalog";

export default function Home() {
  return <CatalogHome featuredSlugs={[...featuredSongSlugs]} />;
}
