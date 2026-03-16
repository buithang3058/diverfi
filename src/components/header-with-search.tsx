import { getAllLessons } from "@/lib/lessons";
import { getAllTerms } from "@/lib/glossary";
import { HeaderClient } from "./header-client";

export function HeaderWithSearch() {
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

  return <HeaderClient lessons={lessons} terms={terms} />;
}
