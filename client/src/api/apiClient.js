const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "");

export default async function apiClient(endpoint, options = {}) {
  if (!backendUrl) {
    throw new Error("VITE_BACKEND_URL is not configured");
  }

  const requestEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const headers = new Headers(options.headers);
  let requestBody = options.body;

  // Let the browser set multipart boundaries automatically for file uploads.
  const isFormData = requestBody instanceof FormData;

  if (requestBody != null && !isFormData && typeof requestBody !== "string") {
    requestBody = JSON.stringify(requestBody);
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(`${backendUrl}${requestEndpoint}`, {
    ...options,
    method: options.method ?? "GET",
    headers,
    body: requestBody,
    credentials: "include",
  });

  const contentType = response.headers.get("content-type");
  let data = null;

  // Some successful responses, like 204 No Content, do not have JSON to parse.
  if (response.status !== 204) {
    data = contentType?.includes("application/json")
      ? await response.json()
      : (await response.text()) || null;
  }

  if (!response.ok) {
    // Keep backend validation messages available to the UI.
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
