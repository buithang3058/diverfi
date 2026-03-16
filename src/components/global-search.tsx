import { getAllLessons } from "@/lib/lessons";
import { getAllTerms } from "@/lib/glossary";
import { SearchDialog } from "./search-dialog";

export function GlobalSearch() {
  const lessons = getAllLessons().map((l) => ({
    slug: l.slug,
    title: l.title,
    description: l.description,
    track: l.track,
  }));

  const terms = getAllTerms().map((t) => ({
    term: t.term,
    fullName: t.fullName,
    definition: t.definition,
  }));

  return <SearchDialog lessons={lessons} terms={terms} />;
}
