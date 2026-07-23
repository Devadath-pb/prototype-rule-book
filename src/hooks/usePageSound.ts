import { useCallback, useRef, useState } from "react";

const STORAGE_KEY = "pq-sound-muted";

/**
 * Plays a very subtle synthesized "paper" tick on page turns.
 * No external audio file is required. Muted by default, as specified.
 */
export function usePageSound() {
  const [muted, setMuted] = useState<boolean>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw === null ? true : raw === "true";
  });
  const ctxRef = useRef<AudioContext | null>(null);

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const playFlip = useCallback(() => {
    if (muted) return;
    try {
      if (!ctxRef.current) {
        ctxRef.current = new AudioContext();
      }
      const ctx = ctxRef.current;
      const bufferSize = ctx.sampleRate * 0.12;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const decay = 1 - i / bufferSize;
        data[i] = (Math.random() * 2 - 1) * decay * 0.15;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 800;
      const gain = ctx.createGain();
      gain.gain.value = 0.4;
      noise.connect(filter).connect(gain).connect(ctx.destination);
      noise.start();
    } catch {
      // Audio isn't critical to the experience; fail silently.
    }
  }, [muted]);

  return { muted, toggleMuted, playFlip };
}
