/**
 * Utility functions for the Yemeni Assistant application.
 */

/**
 * Returns the fully qualified API URL depending on the current runtime environment.
 * If running inside a Capacitor native app WebView, it routes the API request to the
 * live Cloud Run backend. Otherwise, it uses the relative path for browser environments.
 */
export function getApiUrl(path: string): string {
  const origin = window.location.origin || "";
  const hostname = window.location.hostname || "";

  // Capacitor WebViews use 'http://localhost', 'capacitor://localhost', or 'file://'
  const isNativeCapacitor =
    (window as any).Capacitor !== undefined ||
    origin === "http://localhost" ||
    origin.startsWith("capacitor://") ||
    origin.startsWith("file://") ||
    hostname === "";

  if (isNativeCapacitor) {
    // The deployed Cloud Run backend URL
    const deployedBackendUrl = "https://ais-dev-bwkoi5edisaxbogaj436ap-984808933663.europe-west2.run.app";
    // Ensure we don't have double slashes
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${deployedBackendUrl}${cleanPath}`;
  }

  return path;
}
