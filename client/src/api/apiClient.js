const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "");

export default async function apiClient(endpoint, options = {}) {
  const requestEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const headers = new Headers(options.headers);
  let requestBody = options.body;

  const isFormData = requestBody instanceof FormData;

  if (isFormData) {
    headers.delete("Content-Type");
  } else if (requestBody != null && typeof requestBody !== "string") {
    requestBody = JSON.stringify(requestBody);
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(requestEndpoint, {
    ...options,
    method: options.method ?? "GET",
    headers,
    body: requestBody,
    credentials: "include",
  });

  const contentType = response.headers.get("content-type");
  let data = null;

  if (response.status !== 204) {
    data = contentType?.includes("application/json")
      ? await response.json()
      : (await response.text()) || null;
  }

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? data.message
        : typeof data === "string" && data
          ? data
          : `Request failed with status ${response.status}`;

    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}