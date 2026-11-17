"use client";

import { useRef, useState } from "react";

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      className="py-24 md:py-32 xl:py-40 px-6 md:px-12"
      aria-labelledby="video-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2
          id="video-heading"
          className="font-heading text-4xl md:text-5xl xl:text-6xl text-text text-center mb-12 md:mb-16"
        >
          Experience Our Craft
        </h2>

        {/* Video Container */}
        <div>
          <div className="relative aspect-[16/9] min-h-[60vh] rounded-2xl overflow-hidden shadow-2xl">
            {/* Video Element with Background Fallback */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0a0f1a] via-[#111827] to-[#1a1a2e]">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/showcase.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/30 pointer-events-none" />
            </div>

            {/* Play/Pause & Sound Toggle Buttons */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <button
                onClick={togglePlay}
                className="group relative w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/80 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-black/60 focus:outline-none"
                aria-label={isPlaying ? "Pause video showcase" : "Play video showcase"}
              >
                {/* Icon */}
                {isPlaying ? (
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Mute/Unmute Button */}
              <button
                onClick={toggleMute}
                className="absolute bottom-6 right-6 p-3 rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
                  </svg>
                )}
              </button>
            </div>

            {/* Bottom text overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-10 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white/70 text-sm md:text-base tracking-wide text-center">
                A cinematic journey through our portfolio
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
