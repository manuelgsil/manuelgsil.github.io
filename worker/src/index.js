const ALLOWED_ORIGINS = new Set([
  "https://manuelgsil.github.io",
  "http://localhost:4321",
]);

const NOMBRE_MAX = 40;
const MENSAJE_MAX = 200;
const TTL_SECONDS = 60 * 60 * 24; // 24h — las firmas se autoborran solas
const RATE_LIMIT_SECONDS = 60; // KV exige un TTL mínimo de 60s
const MAX_ENTRIES_RETURNED = 100;

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.has(origin) ? origin : "";
  return {
    "Access-Control-Allow-Origin": allowed,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function json(data, status, origin) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(origin),
    },
  });
}

// Corta cualquier intento de HTML/markup — se guarda y se muestra como texto plano.
function sanitizar(valor, maxLen) {
  if (typeof valor !== "string") return "";
  return valor
    .replace(/[<>&"']/g, "")
    .trim()
    .slice(0, maxLen);
}

const PALABRAS_PROHIBIDAS = [
  "puta",
  "puto",
  "gilipollas",
  "cabron",
  "cabrona",
  "mierda",
  "hijo de puta",
  "hijoputa",
  "hdp",
  "subnormal",
  "imbecil",
  "idiota",
  "maricon",
  "marica",
  "zorra",
  "capullo",
  "retrasado",
  "pendejo",
  "estupido",
  "estupida",
  "malparido",
  "andate a la mierda",
  "vete a la mierda",
];

function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function contieneInsulto(texto) {
  const norm = normalizar(texto);
  return PALABRAS_PROHIBIDAS.some((p) => norm.includes(p));
}

async function turnstileValido(token, ip, secretKey) {
  if (!token) return false;
  const form = new FormData();
  form.append("secret", secretKey);
  form.append("response", token);
  form.append("remoteip", ip);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });
  const data = await res.json();
  return data.success === true;
}

function fechaRelativa(timestampMs) {
  const diffMin = Math.floor((Date.now() - timestampMs) / 60000);
  if (diffMin < 1) return "justo ahora";
  if (diffMin < 60) return `hace ${diffMin} min`;
  const diffHoras = Math.floor(diffMin / 60);
  if (diffHoras < 24) return `hace ${diffHoras} h`;
  return "hace más de 1 día";
}

async function notificar(env, nombre, mensaje) {
  if (!env.NTFY_TOPIC) return;
  try {
    await fetch(`https://ntfy.sh/${env.NTFY_TOPIC}`, {
      method: "POST",
      headers: {
        Title: "Nueva firma en el libro de visitas",
        "Content-Type": "text/plain; charset=utf-8",
      },
      body: `${nombre}: ${mensaje}`,
    });
  } catch {
    // si falla la notificación no debe tumbar el guardado de la firma
  }
}

async function listarFirmas(env) {
  const listado = await env.GUESTBOOK.list({ prefix: "firma:", limit: MAX_ENTRIES_RETURNED });
  const valores = await Promise.all(
    listado.keys.map(async (k) => {
      const raw = await env.GUESTBOOK.get(k.name);
      return raw ? JSON.parse(raw) : null;
    })
  );
  return valores
    .filter(Boolean)
    .sort((a, b) => b.ts - a.ts)
    .map((v) => ({ nombre: v.nombre, mensaje: v.mensaje, fecha: fechaRelativa(v.ts) }));
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) });
    }

    if (url.pathname !== "/firmas") {
      return json({ error: "not found" }, 404, origin);
    }

    if (request.method === "GET") {
      const firmas = await listarFirmas(env);
      return json({ firmas }, 200, origin);
    }

    if (request.method === "POST") {
      if (!ALLOWED_ORIGINS.has(origin)) {
        return json({ error: "origin no permitido" }, 403, origin);
      }

      const ip = request.headers.get("CF-Connecting-IP") || "desconocida";
      const rateKey = `rate:${ip}`;
      const yaFirmoHaceNada = await env.GUESTBOOK.get(rateKey);
      if (yaFirmoHaceNada) {
        return json({ error: "espera un poco antes de firmar de nuevo" }, 429, origin);
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: "JSON inválido" }, 400, origin);
      }

      const humano = await turnstileValido(body.turnstileToken, ip, env.TURNSTILE_SECRET_KEY);
      if (!humano) {
        return json({ error: "verificación anti-bot fallida" }, 403, origin);
      }

      const nombre = sanitizar(body.nombre, NOMBRE_MAX) || "anónimo";
      const mensaje = sanitizar(body.mensaje, MENSAJE_MAX);
      if (!mensaje) {
        return json({ error: "el mensaje no puede estar vacío" }, 400, origin);
      }
      if (contieneInsulto(nombre) || contieneInsulto(mensaje)) {
        return json({ error: "Vete a insultar a tu puta casa." }, 400, origin);
      }

      const ts = Date.now();
      const key = `firma:${ts}:${crypto.randomUUID()}`;
      await env.GUESTBOOK.put(key, JSON.stringify({ nombre, mensaje, ts }), {
        expirationTtl: TTL_SECONDS,
      });
      await env.GUESTBOOK.put(rateKey, "1", { expirationTtl: RATE_LIMIT_SECONDS });
      await notificar(env, nombre, mensaje);

      return json({ nombre, mensaje, fecha: "justo ahora" }, 201, origin);
    }

    return json({ error: "método no permitido" }, 405, origin);
  },
};
