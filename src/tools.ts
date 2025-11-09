export interface ListReleasesParams {
  version?: string;
  stream?: "LTS" | "BETA" | "ALPHA" | "TECH";
  order?: "RELEASE_DATE_ASC" | "RELEASE_DATE_DESC";
  limit?: number;
}

const API_BASE_URL = "https://services.api.unity.com";
const RELEASES_ENDPOINT = "/unity/editor/release/v1/releases";

async function getRelease(version: string): Promise<any> {
  const url = new URL(API_BASE_URL + RELEASES_ENDPOINT);
  url.searchParams.set("version", version);
  url.searchParams.set("limit", "1");

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (data.total === 0 || data.results.length === 0) {
    throw new Error(`Version '${version}' not found.`);
  }
  
  return data.results[0];
}

export async function getUnityReleaseNotesContent(version: string): Promise<string> {
  const release = await getRelease(version);
  const notesUrl = release?.releaseNotes?.url;

  if (!notesUrl) {
    throw new Error(`Release notes URL not found for version '${version}'.`);
  }

  const res = await fetch(notesUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch release notes content from ${notesUrl}`);
  }
  
  return await res.text();
}

export async function listUnityReleases(params: ListReleasesParams): Promise<any[]> {
  const url = new URL(API_BASE_URL + RELEASES_ENDPOINT);

  if (params.version) url.searchParams.set("version", params.version);
  if (params.stream) url.searchParams.set("stream", params.stream);
  if (params.order) url.searchParams.set("order", params.order);
  
  url.searchParams.set("limit", String(params.limit ?? 5));
  url.searchParams.set("offset", "0");
  
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  
  return data.results;
}

export async function getUnityDownloadLinks(version: string): Promise<any> {
  const release = await getRelease(version);

  const hubLink = release.unityHubDeepLink;
  const installers = release.downloads.map((d: any) => ({
    platform: d.platform,
    architecture: d.architecture,
    url: d.url,
  }));

  return {
    version: release.version,
    unityHubDeepLink: hubLink,
    installers: installers,
  };
}