"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { hero } from "@/content/site";

const HERO_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4";
const SCRUB_SENSITIVITY = 0.8;

export function Hero() {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [isPillsVisible, setIsPillsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previousXRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const isSeekingRef = useRef(false);

  const attemptSeek = useCallback(() => {
    const video = videoRef.current;
    if (
      !video ||
      isSeekingRef.current ||
      !Number.isFinite(video.duration) ||
      video.duration <= 0
    ) {
      return;
    }

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.01) {
      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  }, []);

  const handleSeeked = useCallback(() => {
    isSeekingRef.current = false;
    attemptSeek();
  }, [attemptSeek]);

  useEffect(() => {
    let index = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1;
        setDisplayed(hero.typewriterText.slice(0, index));

        if (index >= hero.typewriterText.length) {
          if (intervalId) {
            clearInterval(intervalId);
          }
          setIsDone(true);
        }
      }, 38);
    }, 600);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => setIsPillsVisible(true), 400);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const scrubTo = (clientX: number) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
        previousXRef.current = clientX;
        return;
      }

      if (previousXRef.current === null) {
        previousXRef.current = clientX;
        return;
      }

      const delta = clientX - previousXRef.current;
      previousXRef.current = clientX;
      targetTimeRef.current = Math.min(
        Math.max(
          0,
          targetTimeRef.current +
            (delta / window.innerWidth) * SCRUB_SENSITIVITY * video.duration,
        ),
        video.duration,
      );
      attemptSeek();
    };

    const handleMouseMove = (event: MouseEvent) => scrubTo(event.clientX);
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) scrubTo(touch.clientX);
    };
    const resetPosition = () => {
      previousXRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", resetPosition);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", resetPosition);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", resetPosition);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", resetPosition);
    };
  }, [attemptSeek]);

  return (
    <section className="relative flex min-h-screen overflow-hidden text-black">
      <video
        ref={videoRef}
        src={HERO_VIDEO_URL}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        onSeeked={handleSeeked}
        onLoadedMetadata={() => {
          targetTimeRef.current = videoRef.current?.currentTime ?? 0;
        }}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "70% center" }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-end px-5 pb-12 pt-28 sm:px-8 md:justify-center md:px-10 lg:px-12">
        <div className="max-w-2xl">
          <div
            className="mb-5 select-none text-[clamp(1.125rem,4vw,1.625rem)] font-normal leading-[1.3] text-black"
            style={{ filter: "blur(4px)" }}
          >
            {hero.intro[0]}
            <br />
            {hero.intro[1]}
          </div>

          <p
            className="mb-5 select-text text-[clamp(1.125rem,4vw,1.625rem)] font-normal leading-[1.35] text-black"
            style={{ minHeight: "54px" }}
          >
            <span>{displayed}</span>
            {!isDone && (
              <span
                className="ml-[2px] inline-block h-[1.1em] w-[2px] animate-pulse align-middle bg-black"
                aria-hidden="true"
              />
            )}
          </p>

          <div
            className={`flex flex-wrap items-center gap-y-1 transition-all duration-400 ease-out ${
              isPillsVisible ? "translate-y-0 opacity-100" : "translate-y-[8px] opacity-0"
            }`}
          >
            {hero.actions.map((action) => {
              const isOutline = action.variant === "outline";
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`inline-flex items-center justify-center rounded-full border px-4 py-[0.3em] text-[13px] sm:text-[15px] ${
                    isOutline
                      ? "border-black/40 bg-white/30 text-black backdrop-blur-sm transition-colors duration-200 hover:bg-black hover:text-white"
                      : "border-black/10 bg-white text-black shadow-sm transition-colors duration-200 hover:bg-black hover:text-white"
                  } mx-[0.2em] mb-[0.4em] whitespace-nowrap`}
                >
                  {action.label.startsWith("Say hello") ? (
                    <span>
                      Say hello:{" "}
                      <span className="underline underline-offset-1">
                        {action.label.split(": ")[1]}
                      </span>
                    </span>
                  ) : (
                    action.label
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
