import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Masonry from "masonry-layout";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import "swiper/css";
import {
  publrPhotosUrl,
  toPlaceholderUrl,
  PUBLR_USER_ID_DEFAULT,
  type PublrPhotosResponse,
} from "@/lib/publr";

/** Codrops AnimOnScroll: random duration bounds used on scroll (GridLoadingEffects demo 2 path). */
const DEMO2_MIN_DURATION = 0.4;
const DEMO2_MAX_DURATION = 0.7;

function getViewportHeight(): number {
  const client = document.documentElement.clientHeight;
  const inner = window.innerHeight;
  return Math.min(inner, client) || inner || client || 0;
}

function scrollYPos(): number {
  return window.pageYOffset || document.documentElement.scrollTop;
}

/** Same geometry as Codrops `inViewport` (`h` defaults to `0`). */
function codropsInViewport(el: HTMLElement, h?: number): boolean {
  const elH = el.offsetHeight;
  const scrolled = scrollYPos();
  const viewed = scrolled + getViewportHeight();
  const rect = el.getBoundingClientRect();
  const elTop = rect.top + scrolled;
  const elBottom = elTop + elH;
  const factor = h ?? 0;
  return (
    elTop + elH * factor <= viewed && elBottom - elH * factor >= scrolled
  );
}


type PhotoLightboxProps = {
  urls: string[];
  initialIndex: number;
  onClose: () => void;
};

function PhotoLightbox({ urls, initialIndex, onClose }: PhotoLightboxProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const startIndex = Math.max(
    0,
    Math.min(initialIndex, Math.max(0, urls.length - 1)),
  );
  const multiple = urls.length > 1;

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    closeBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      const s = swiperRef.current;
      if (!multiple || !s) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        s.slidePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        s.slideNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [multiple, onClose]);

  const scrollPrev = useCallback(() => swiperRef.current?.slidePrev(), []);
  const scrollNext = useCallback(() => swiperRef.current?.slideNext(), []);

  return createPortal(
    <div
      className="fixed inset-0 z-[200]"
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
    >
      <button
        type="button"
        className="absolute inset-0 z-0 cursor-default border-0 bg-black p-0 outline-none focus:outline-none"
        onClick={onClose}
        aria-label="Close gallery"
      />

      <button
        ref={closeBtnRef}
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-30 flex size-11 items-center justify-center rounded-full border border-white/12 bg-white/95 text-[#0B0F1F] shadow-md outline-none transition-[background-color,transform] hover:bg-white hover:scale-105 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]/90 active:scale-95"
        aria-label="Close"
      >
        <X className="size-5" strokeWidth={2} aria-hidden />
      </button>

      {multiple ? (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              scrollPrev();
            }}
            className="absolute left-2 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/95 text-[#0B0F1F] shadow-md outline-none transition-[background-color,transform] hover:bg-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]/90 sm:left-3 sm:size-12"
            aria-label="Previous photo"
          >
            <ChevronLeft className="size-6" strokeWidth={1.75} aria-hidden />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              scrollNext();
            }}
            className="absolute right-2 top-1/2 z-30 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/95 text-[#0B0F1F] shadow-md outline-none transition-[background-color,transform] hover:bg-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]/90 sm:right-3 sm:size-12"
            aria-label="Next photo"
          >
            <ChevronRight className="size-6" strokeWidth={1.75} aria-hidden />
          </button>
        </>
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-3 pb-10 pt-14 sm:px-10 sm:pb-12"
      >
        <div
          className="photo-lightbox-swiper pointer-events-auto w-full max-w-[min(96vw,1200px)] max-h-[min(85vh,880px)] [--swiper-theme-color:rgb(255_255_255/0.35)] [&_.swiper]:outline-none [&_.swiper-wrapper]:outline-none [&_.swiper-slide]:outline-none"
        >
          <Swiper
            autoHeight
            className="photo-lightbox-swiper-inner w-full max-h-[min(85vh,880px)]"
            slidesPerView={1}
            spaceBetween={0}
            initialSlide={startIndex}
            loop={multiple}
            speed={320}
            onSwiper={(instance) => {
              swiperRef.current = instance;
            }}
          >
            {urls.map((url, i) => (
              <SwiperSlide
                key={`${i}-${url}`}
                className="!flex !h-auto items-center justify-center bg-transparent"
              >
                <div className="flex items-center justify-center px-1 sm:px-2">
                  <img
                    src={url}
                    alt=""
                    className="max-h-[min(85vh,880px)] max-w-full w-auto rounded-xl border-0 bg-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)]"
                    draggable={false}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>,
    document.body,
  );
}

const CACHE_KEY = (userId: string) => `publr_photos_${userId}`;

function readCache(userId: string): string[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY(userId));
    return raw ? (JSON.parse(raw) as string[]) : null;
  } catch { return null; }
}

function writeCache(userId: string, urls: string[]): void {
  try { localStorage.setItem(CACHE_KEY(userId), JSON.stringify(urls)); } catch { /* quota exceeded */ }
}

function PhotoTile({ url, index, onOpen }: { url: string; index: number; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="block w-full cursor-zoom-in rounded-[2px] border-0 bg-transparent p-0 text-left outline-none outline-offset-0 ring-2 ring-transparent transition-[opacity,box-shadow] duration-200 hover:opacity-[0.92] hover:shadow-md hover:ring-[#0B0F1F]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B0F1F]/25"
      aria-label={`View photo ${index + 1} in gallery`}
    >
      <div
        className="relative overflow-hidden rounded-[2px] animate-pulse"
        style={{ minHeight: "180px", backgroundColor: "#E8E8E8" }}
      >
        <img
          src={toPlaceholderUrl(url)}
          aria-hidden
          className="block h-auto w-full opacity-0 transition-opacity duration-300"
          onLoad={(e) => {
            const img = e.currentTarget;
            const wrap = img.parentElement!;
            wrap.style.minHeight = "";
            wrap.style.backgroundColor = "";
            wrap.classList.remove("animate-pulse");
            img.style.opacity = "1";
            img.style.filter = "blur(12px)";
            img.style.transform = "scale(1.08)";
          }}
          onError={(e) => {
            const wrap = e.currentTarget.parentElement!;
            wrap.style.minHeight = "";
            wrap.style.backgroundColor = "";
            wrap.classList.remove("animate-pulse");
          }}
        />
        <img
          src={url}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700"
          onLoad={(e) => { e.currentTarget.style.opacity = "1"; }}
        />
      </div>
    </button>
  );
}

export default function Photos() {
  const envRaw =
    typeof import.meta.env.VITE_PUBLR_USER_ID === "string"
      ? import.meta.env.VITE_PUBLR_USER_ID.trim()
      : "";
  const userId = envRaw || PUBLR_USER_ID_DEFAULT;
  const [photos, setPhotos] = useState<string[] | null>(() =>
    userId ? null : [],
  );
  const [loadError, setLoadError] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{
    index: number;
    id: number;
  } | null>(null);

  const openLightbox = useCallback((index: number) => {
    setLightbox((prev) => ({
      index,
      id: (prev?.id ?? 0) + 1,
    }));
  }, []);

  const gridRef = useRef<HTMLUListElement>(null);
  const masonryRef = useRef<Masonry | null>(null);
  const observersRef = useRef<{
    io: IntersectionObserver | null;
    ro: ResizeObserver | null;
  }>({ io: null, ro: null });

  useEffect(() => {
    if (!userId) { setPhotos([]); return; }

    const cached = readCache(userId);
    if (cached) setPhotos(cached);

    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch(publrPhotosUrl(userId));
        if (!res.ok) throw new Error(`photos request failed (${res.status})`);
        const data = (await res.json()) as PublrPhotosResponse;
        const list = Array.isArray(data.photos) ? data.photos : [];
        if (!cancelled) {
          writeCache(userId, list);
          setPhotos(list);
          setLoadError(null);
        }
      } catch (e) {
        if (!cancelled && !cached) {
          setLoadError(e instanceof Error ? e.message : "could not load photos.");
          setPhotos([]);
        }
      }
    })();

    return () => { cancelled = true; };
  }, [userId]);

  const teardownMasonryEffects = useCallback(() => {
    observersRef.current.io?.disconnect();
    observersRef.current.ro?.disconnect();
    observersRef.current.io = null;
    observersRef.current.ro = null;
    masonryRef.current?.destroy?.();
    masonryRef.current = null;

    gridRef.current
      ?.querySelectorAll(".publr-photo-tile")
      .forEach((el) => {
        el.classList.remove(
          "publr-photo-shown",
          "publr-photo-animate",
          "publr-photo-pending-io",
        );
        (el as HTMLElement).style.removeProperty("animation-duration");
      });
  }, []);

  useEffect(() => {
    if (photos === null || !photos.length) {
      teardownMasonryEffects();
      return;
    }

    const grid = gridRef.current;
    if (!grid) {
      teardownMasonryEffects();
      return;
    }

    let alive = true;

    void (async () => {
      teardownMasonryEffects();
      // Wait for tiny placeholder images to load so masonry gets real tile heights.
      // 2s timeout as safety net if Cloudinary transforms fail.
      await new Promise<void>((resolve) => {
        const placeholders = Array.from(
          grid.querySelectorAll<HTMLImageElement>("img:not([loading='lazy'])")
        );
        if (!placeholders.length) { resolve(); return; }
        const timer = setTimeout(resolve, 2000);
        let remaining = placeholders.length;
        const done = () => { if (--remaining === 0) { clearTimeout(timer); resolve(); } };
        for (const img of placeholders) {
          if (img.complete && img.naturalHeight > 0) done();
          else {
            img.addEventListener("load", done, { once: true });
            img.addEventListener("error", done, { once: true });
          }
        }
      });
      // One extra frame so onLoad DOM mutations (height/style changes) are painted before masonry measures.
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      if (!alive || !gridRef.current) return;

      const masonry = new Masonry(grid, {
        itemSelector: ".publr-photo-tile",
        columnWidth: ".publr-sizer",
        gutter: 12,
        percentPosition: true,
        transitionDuration: 0,
      });
      masonryRef.current = masonry;
      masonry.reloadItems?.();
      masonry.layout?.();

      window.requestAnimationFrame(() => {
        if (!alive || !gridRef.current) return;

        const tiles =
          gridRef.current.querySelectorAll<HTMLLIElement>(
            ".publr-photo-tile",
          );
        if (!tiles.length) return;

        tiles.forEach((tile) => {
          if (codropsInViewport(tile)) {
            tile.classList.add("publr-photo-shown");
          } else {
            tile.classList.add("publr-photo-pending-io");
          }
        });

        const io = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;

              const tile = entry.target as HTMLLIElement;
              if (
                tile.classList.contains("publr-photo-animate") ||
                tile.classList.contains("publr-photo-shown")
              ) {
                continue;
              }

              const durSeconds =
                Math.random() *
                  (DEMO2_MAX_DURATION - DEMO2_MIN_DURATION) +
                DEMO2_MIN_DURATION;
              tile.style.animationDuration = `${durSeconds}s`;
              tile.classList.remove("publr-photo-pending-io");

              window.requestAnimationFrame(() => {
                tile.classList.add("publr-photo-animate");
              });

              tile.addEventListener(
                "animationend",
                () => {
                  tile.classList.remove("publr-photo-animate");
                  tile.classList.add("publr-photo-shown");
                  tile.style.removeProperty("animation-duration");
                },
                { once: true },
              );

              io.unobserve(tile);
            }
          },
          {
            root: null,
            rootMargin: "0px 0px -12% 0px",
            threshold: [0, 0.05, 0.15],
          },
        );

        observersRef.current.io = io;

        tiles.forEach((tile) => {
          if (
            tile.classList.contains("publr-photo-pending-io") &&
            !tile.classList.contains("publr-photo-shown")
          ) {
            io.observe(tile);
          }
        });

        const ro = new ResizeObserver(() => {
          masonryRef.current?.layout?.();
        });
        ro.observe(grid);
        observersRef.current.ro = ro;
      });
    })();

    const onResize = (): void => {
      masonryRef.current?.layout?.();
    };
    window.addEventListener("resize", onResize);

    return () => {
      alive = false;
      window.removeEventListener("resize", onResize);
      teardownMasonryEffects();
    };
  }, [photos, teardownMasonryEffects]);

  const subtitle = useMemo(() => {
    if (!userId) {
      return (
        <>
          To load your photos, add{" "}
          <code className="rounded-sm bg-[#E1E4EA]/70 px-1 py-0.5 text-[11px]">
            VITE_PUBLR_USER_ID=&lt;your id&gt;
          </code>{" "}
          in a <span className="font-medium">`.env`</span> file (same id from
          Publr settings) and rebuild. API:{" "}
          <span className="font-mono text-[11px] break-all">
            {publrPhotosUrl("YOUR_USER_ID")}
          </span>
          .
        </>
      );
    }
    if (loadError) {
      return (
        <>
          Something went wrong:{" "}
          <span className="font-medium">{loadError}</span>
        </>
      );
    }
    return null;
  }, [userId, loadError]);

  return (
    <>
      <Helmet>
        <title>phil | keepsakes</title>
        <meta name="description" content="keepsakes from publr" />
        <meta property="og:title" content="keepsakes | phil" />
        <meta property="og:description" content="keepsakes from publr" />
        <meta
          property="og:image"
          content="https://www.bennett-eghan.com/og-main.png?v=2"
        />
        <meta
          property="og:url"
          content="https://www.bennett-eghan.com/photos"
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full"
      >
        <p className="text-[16px] font-extrabold text-[#0B0F1F] mb-1">
          keepsakes
        </p>
        <div className="mb-6 space-y-2">
          <p className="text-[12px] leading-snug text-[#0B0F1F]/75">
            photos of people, moments & things. powered by{" "}
            <a
              href="https://publr.bennett-eghan.com/"
              className="font-medium hover-underline hover-underline-muted"
            >
              publr
            </a>
            .
          </p>
          {photos !== null && photos.length > 0 ? (
            <p className="text-[11px] leading-snug text-[#0B0F1F]/55 tabular-nums">
              {photos.length} photo{photos.length === 1 ? "" : "s"}
            </p>
          ) : null}
        </div>

        {subtitle !== null ? (
          <p className="mb-6 text-[12px] leading-relaxed text-[#0B0F1F]/80">
            {subtitle}
          </p>
        ) : null}

        {userId && photos === null ? (
          <p className="mb-6 text-[12px] text-[#0B0F1F]/70">
            Loading photos…
          </p>
        ) : null}

        {photos !== null && photos.length > 0 ? (
          <ul ref={gridRef} className="publr-masonry effect-2 w-full pb-24">
            <li className="publr-sizer" aria-hidden="true" />
            {photos.map((url, index) => (
              <li
                key={`${index}-${url}`}
                className="publr-photo-tile"
              >
                <PhotoTile url={url} index={index} onOpen={() => openLightbox(index)} />
              </li>
            ))}
          </ul>
        ) : photos !== null && userId && !photos.length ? (
          <p className="text-[13px] text-[#0B0F1F]/70">
            no photos yet.
          </p>
        ) : null}
      </motion.div>

      {lightbox !== null &&
      photos !== null &&
      photos.length > 0 ? (
        <PhotoLightbox
          key={lightbox.id}
          urls={photos}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </>
  );
}
