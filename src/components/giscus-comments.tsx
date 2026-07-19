"use client";

import Giscus from "@giscus/react";

export function GiscusComments() {
  return (
    <div className="mt-10">
      <Giscus
        id="giscus-comments"
        repo="abena07/bennett-eghan"
        repoId="R_kgDON4R-JA"
        category="comments"
        categoryId="DIC_kwDON4R-JM4Czgvp"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="en"
      />
    </div>
  );
}
