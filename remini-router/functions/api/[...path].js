export async function onRequest(context) {
  // context.params.path is an array of path segments
  const path = (context.params && context.params.path) ? context.params.path.join("/") : "";

  // ---- REPLACE these with your real backend URLs when ready ----
  const COLAB = "https://REPLACE_WITH_YOUR_COLAB_URL";            // e.g. https://xxx.ngrok.io
  const CF    = "https://REPLACE_WITH_YOUR_CF_WORKER.workers.dev";
  const WASM  = "https://REPLACE_WITH_YOUR_WASM_URL.vercel.app/api/enhance";
  const ONNX  = "https://REPLACE_WITH_YOUR_ONNX_URL.vercel.app/api/enhance";
  // ---------------------------------------------------------------

  const req = context.request;

  // Forward request to appropriate backend based on prefix
  try {
    if (path.startsWith("colab/")) {
      const sub = path.replace(/^colab\//, "");
      return fetch(`${COLAB}/${sub}`, {
        method: req.method,
        headers: req.headers,
        body: req.body,
      });
    }

    if (path.startsWith("cf/")) {
      const sub = path.replace(/^cf\//, "");
      return fetch(`${CF}/${sub}`, {
        method: req.method,
        headers: req.headers,
        body: req.body,
      });
    }

    if (path.startsWith("wasm/")) {
      // wasm endpoint usually is a single /enhance endpoint
      return fetch(WASM, {
        method: req.method,
        headers: req.headers,
        body: req.body,
      });
    }

    if (path.startsWith("onnx/")) {
      return fetch(ONNX, {
        method: req.method,
        headers: req.headers,
        body: req.body,
      });
    }

    return new Response(JSON.stringify({ ok:false, error:"Unknown route" }), {
      headers: { "Content-Type":"application/json" },
      status: 404
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok:false, error: String(err) }), {
      headers: { "Content-Type":"application/json" },
      status: 500
    });
  }
}
