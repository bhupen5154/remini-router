export const onRequest = async ({ request }) => {
  const url = new URL(request.url);
  const path = url.pathname;

  // Colab routes
  if (path.startsWith("/colab/")) {
    return fetch("YOUR_COLAB_URL" + path.replace("/colab", ""));
  }

  // Cloudflare Worker fallback
  if (path.startsWith("/cf/")) {
    return fetch("YOUR_WORKER_URL" + path.replace("/cf", ""));
  }

  // WASM fallback
  if (path.startsWith("/wasm/")) {
    return fetch("YOUR_WASM_URL" + path.replace("/wasm", ""));
  }

  // ONNX fallback
  if (path.startsWith("/onnx/")) {
    return fetch("YOUR_ONNX_URL" + path.replace("/onnx", ""));
  }

  return new Response("Router OK", { status: 200 });
};
