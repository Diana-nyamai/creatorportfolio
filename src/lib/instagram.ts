import "server-only";
import { unstable_cache } from "next/cache";
import { site } from "@/data/site-config";

type Snapshot = { followers: number; updatedAt: string };
export type InstagramStats = {
  followers: number;
  source: "instagram" | "manual";
  updatedAt?: string;
};

const configuredInterval = Number(process.env.INSTAGRAM_REVALIDATE_SECONDS);
const refreshSeconds = Number.isSafeInteger(configuredInterval) && configuredInterval >= 60
  ? configuredInterval
  : 21_600;

function connection() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const id = process.env.INSTAGRAM_USER_ID?.trim() || "me";
  const version = process.env.INSTAGRAM_API_VERSION?.trim() || "v26.0";
  return token && /^(me|[0-9]+)$/.test(id) && /^v[0-9]+\.[0-9]+$/.test(version) ? { token, id, version } : null;
}

async function fetchSnapshot(id: string, version: string): Promise<Snapshot> {
  try {
    const url = new URL(`https://graph.instagram.com/${version}/${id}`);
    url.searchParams.set("fields", "username,followers_count");
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${connection()?.token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(4_000),
    });
    if (response.ok) {
      const { followers_count: count, username } = await response.json();
      if (typeof count === "number" && Number.isSafeInteger(count) && count >= 0 &&
          typeof username === "string" && `@${username.toLowerCase()}` === site.instagram.handle.toLowerCase()) {
        return { followers: count, updatedAt: new Date().toISOString() };
      }
    }
  } catch {
    // Keep credentials and upstream responses out of errors returned to Next.
  }
  throw new Error("Instagram profile snapshot unavailable");
}

// Let Next revalidate in the background. A thrown refresh leaves the last
// successful result in the Data Cache, even across function instances on Vercel.
const cachedSnapshot = unstable_cache(fetchSnapshot, ["instagram-profile-v1", site.instagram.handle], { revalidate: refreshSeconds });
let mostRecent: Snapshot | undefined;

export async function getInstagramStats(): Promise<InstagramStats> {
  function present(snapshot: Snapshot): InstagramStats {
    return {
      followers: snapshot.followers,
      source: "instagram",
      updatedAt: process.env.SHOW_INSTAGRAM_UPDATED_AT === "false" ? undefined : snapshot.updatedAt,
    };
  }

  const credentials = connection();
  if (credentials) {
    try {
      const snapshot = await cachedSnapshot(credentials.id, credentials.version);
      if (!mostRecent || snapshot.updatedAt > mostRecent.updatedAt) mostRecent = snapshot;
      return present(snapshot);
    } catch {
      if (mostRecent) return present(mostRecent);
    }
  }
  return { followers: site.instagram.fallbackFollowers, source: "manual" };
}
