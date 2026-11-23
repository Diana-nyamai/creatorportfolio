import type { SVGProps } from "react";

type ArtProps = SVGProps<SVGSVGElement>;

export function Flower(props: ArtProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" aria-hidden="true" {...props}>
      <path d="M39 30C32 18 34 7 42 7c9 0 12 11 7 22 10-8 22-8 25 0 3 9-7 15-19 15 10 6 14 17 8 23-7 6-17-1-22-13-2 13-10 21-17 17-9-4-7-15 2-25C12 51 3 45 5 37c2-9 15-11 25-7C21 21 22 12 29 11c6-1 9 8 10 19Z" fill="var(--petal, currentColor)" stroke="var(--outline, none)" strokeWidth="2.2" strokeLinejoin="round"/>
      <circle cx="40" cy="41" r="8.4" fill="var(--center, #ffe296)" stroke="var(--outline, none)" strokeWidth="1.8"/>
    </svg>
  );
}

export function Spark(props: ArtProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" aria-hidden="true" {...props}>
      <path d="M30 2c1 18 8 25 28 28-20 2-27 9-28 28C27 39 20 32 2 30 20 27 27 20 30 2Z" fill="var(--spark, currentColor)" stroke="var(--outline, none)" strokeWidth="2.1" strokeLinejoin="round"/>
    </svg>
  );
}

export function CurvedArrow(props: ArtProps) {
  return (
    <svg viewBox="0 0 114 78" fill="none" aria-hidden="true" {...props}>
      <path d="M110 9C86 22 94 58 57 56 29 55 36 13 55 15c19 1 0 42-45 49m1 0 19 10M11 64l10-19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function Instagram(props: ArtProps) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

export function DarcyArt(props: ArtProps) {
  return (
    <svg viewBox="0 0 126 110" fill="none" aria-hidden="true" {...props}>
      <path className="darcy-tail" d="M90 91c31 0 37-31 17-29" stroke="#332c38" strokeWidth="10" strokeLinecap="round"/>
      <path d="M37 93c-2-18 7-30 27-30s30 12 30 30c0 9-11 11-28 11s-29-2-29-11Z" fill="#332c38"/>
      <path d="M31 44 30 17c0-3 3-4 5-2l23 17c6-2 13-2 20 0l21-17c3-2 5 0 5 3l-1 27c6 7 6 17 1 24-7 10-18 13-36 13-26 0-45-9-45-23 0-5 3-11 8-15Z" fill="#332c38"/>
      <path d="m35 24 2 17 13-6-15-11Zm63 0-2 17-12-6 14-11Z" fill="#e7a9bd"/>
      <path className="darcy-eye" d="M49 55v4m32-4v4" stroke="#fff5d5" strokeWidth="4.6" strokeLinecap="round"/>
      <path d="m62 61 3 3 3-3m-3 3c0 4-4 5-6 3m6-3c0 4 4 5 6 3" stroke="#f3aabc" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="m38 61-15-4m14 9-14 3m70-8 15-4m-14 9 14 3" stroke="#9d899e" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M51 100c1-5 6-6 9-3m19 3c-1-5-6-6-9-3" stroke="#74627e" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}
