export interface CraftPillar {
  roman: string;
  code: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
}

export interface TimelineEntry {
  period: string;
  role: string;
  org: string;
  note: string;
  current?: boolean;
}

export interface EducationEntry {
  period: string;
  title: string;
  org: string;
}

export const PROFILE = {
  name: "Manuel Guillén",
  monogram: "M//GS",
  coordinates: "37°23'N · 05°59'W · SEVILLA",
  tagline: "Desarrollo de software",
  manifestoLead: "Identifico problemas lógicos reales y los resuelvo",
  manifestoItalic: "usando con cabeza las herramientas a mi alcance.",
  bio: "Desarrollador full-stack en Sevilla. Vengo de Literaturas Comparadas y DAW; me siento cómodo tanto creando aplicaciones desde cero como entrando en sistemas en marcha para entenderlos, ordenarlos y mejorarlos sin romper lo que ya funciona.",
  email: "manuelguillen93@gmail.com",
  linkedin: "https://linkedin.com/in/manuelguillensilva",
  github: "https://github.com/manuelgsil",
  cvUrl: "/cv-manuel-guillen.pdf",
};

export const MIRAGE_STATION = {
  code: "ARTEFACTO I",
  name: "Mirage Station",
  status: "PROYECTO PERSONAL · REPO PRIVADO",
  subtitle: "Un centro multimedia propio nacido de un problema cotidiano",
  summary:
    "Nació en ratos libres por cansancio de saltar entre varias apps de streaming, depender del PC encendido o pelear con Chromecast antiguos. Combinando Kotlin nativo, un agente Windows ligero en Node.js y mi flujo asistido por IA, monté una solución híbrida pensada para usarse a diario en casa sin fricción.",
  tabs: {
    vision: {
      label: "01 · Origen y uso",
      heading: "Resolver las limitaciones reales del salón",
      body: "La idea era sencilla: abrir una sola app en el móvil o la tablet y ver películas, series, anime o TDT sin pensar en dónde está el archivo. Si el PC de casa está encendido, se apoya en él; si no, sigue funcionando sola en modo nube.",
      bullets: [
        "Reproductor nativo (Media3 ExoPlayer) con gestos táctiles, ventana flotante, subtítulos ajustables y descargas offline.",
        "TV en directo con guía EPG en tiempo real, listas M3U propias y sincronización automática con Trakt.",
        "Envío a Chromecast con transcodificación al vuelo, control remoto del PC y copia de ajustes en un toque.",
      ],
    },
    architecture: {
      label: "02 · Cómo está hecha",
      heading: "Dos piezas simples y mantenibles",
      body: "Cliente Android y agente de escritorio hablan por red local sin depender de servicios pesados. Apoyarme en herramientas de IA me permitió iterar rápido sobre un terreno nuevo (Android nativo) manteniendo una base limpia y probada.",
      bullets: [
        "Cliente Android en Kotlin y Jetpack Compose (Material 3, DataStore cifrado, Media3 y Google Cast SDK).",
        "Agente Windows en Node.js 22 sin dependencias npm externas, descubrimiento UDP y vídeo con FFmpeg.",
        "Batería de pruebas automáticas en GitHub Actions para tocar el proyecto sin miedo a romper lo que ya iba bien.",
      ],
    },
    security: {
      label: "03 · Seguridad",
      heading: "Que sea de casa no significa dejar puertas abiertas",
      body: "Como la app controla el PC y mueve claves en red local, la seguridad fue requisito desde el primer día: ninguna credencial viaja en claro y cada petición va verificada.",
      bullets: [
        "Firma HMAC-SHA256 obligatoria con ventana temporal y protección anti-replay por nonce.",
        "TLS local opcional con certificado autofirmado y pinning SHA-256 en el cliente Android.",
        "Control SSRF ante redirecciones, bloqueo de path traversal, Android Keystore, logs sin secretos y acceso biométrico.",
      ],
    },
  },
  stack: ["Kotlin", "Jetpack Compose", "Node.js 22", "Media3 ExoPlayer", "FFmpeg", "HMAC-SHA256", "GitHub Actions"],
};

export const WHATBOOKIS = {
  code: "ARTEFACTO II",
  name: "whatbookis",
  subtitle: "Plataforma literaria y juego interactivo sobre 873 obras clásicas",
  demoUrl: "https://whatbookis-t3nw.onrender.com/",
  repoUrl: "https://github.com/manuelgsil/whatbookis",
  summary:
    "Nacido como TFG de DAW y refactorizado a Laravel 13. Propone adivinar una obra a partir de su primer párrafo, con filtros por época o categoría, pistas progresivas con IA y traducción bajo demanda.",
  highlights: [
    "Catálogo propio de 873 libros importados desde Standard Ebooks y enriquecidos mediante un pipeline asistido por IA.",
    "Fichas navegables y relacionadas de obras, autores y movimientos literarios.",
    "Panel de administración protegido con autenticación Breeze y middleware de roles sobre Livewire 3 y Volt.",
  ],
  stack: ["Laravel 13", "PHP 8.3", "Livewire 3 / Volt", "Breeze", "Tailwind CSS", "Vite 8"],
};

export const CRAFT_PILLARS: CraftPillar[] = [
  {
    roman: "I",
    code: "LÓGICA & BACKEND",
    title: "Entender el problema antes de tocar código",
    subtitle: "PHP · Laravel · Node.js · SQL",
    description:
      "Me centro en leer bien el contexto, detectar dónde falla la lógica o el rendimiento y aplicar soluciones limpias que la siguiente persona pueda mantener sin sufrir.",
    capabilities: [
      "Desarrollo en Laravel 12/13 y PHP moderno",
      "Consultas SQL claras, agregación y modelado relacional",
      "Integraciones por lotes, reintentos y consistencia de datos",
      "Trabajo sereno y ordenado sobre sistemas ya en marcha",
    ],
  },
  {
    roman: "II",
    code: "PRODUCTO & CLIENTE",
    title: "Aplicaciones útiles en condiciones reales",
    subtitle: "Kotlin · Compose · Flutter · Astro",
    description:
      "Construyo y mejoro interfaces pensadas para usarse de verdad: rápidas, claras y preparadas para responder bien incluso cuando la red o el entorno no acompañan.",
    capabilities: [
      "Android nativo con Kotlin y Jetpack Compose",
      "Clientes móviles y rediseño en Flutter / Dart",
      "Web ligera con Livewire, Tailwind CSS y Astro",
      "Sistemas visuales coherentes y fáciles de recorrer",
    ],
  },
  {
    roman: "III",
    code: "MÉTODO & SEGURIDAD",
    title: "Usar las herramientas actuales con red de seguridad",
    subtitle: "Gentle AI · Testing · Seguridad",
    description:
      "No uso la IA a ciegas: trabajo con flujos estructurados (ecosistema Gentle AI, reglas explícitas, memoria de proyecto y skills) y comprobaciones que evitan introducir fallos silenciosos.",
    capabilities: [
      "Adopción e implantación de flujos con agentes IA (Gentle AI y guardrails)",
      "Seguridad aplicada: sesiones, 2FA, firmas HMAC y logs limpios",
      "Tests automáticos y verificación continua en GitHub Actions",
      "Conventional Commits y documentación práctica",
    ],
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    period: "2025 — Actualidad",
    role: "Desarrollador Full-Stack",
    org: "Consejo Andaluz de Colegios Oficiales de Veterinarios",
    note: "Desarrollo transversal sobre plataformas web multi-región en producción. Nuevas aplicaciones en Laravel, evolución de módulos de gestión, optimización SQL, integraciones con organismos públicos, rediseño de cliente móvil en Flutter e impulso de un flujo asistido por IA (ecosistema Gentle AI) con convenciones y salvaguardas.",
    current: true,
  },
  {
    period: "2024 — 2025",
    role: "Desarrollador Web",
    org: "DSS Networks",
    note: "Refactorización, optimización de código y mantenimiento evolutivo de aplicaciones web y entornos de desarrollo.",
  },
  {
    period: "2022",
    role: "Técnico Informático",
    org: "Grupo EULEN",
    note: "Operaciones sobre bases de datos SQL y soporte técnico.",
  },
];

export const EDUCATION: EducationEntry[] = [
  {
    period: "2022 — 2025",
    title: "F.P.G.S. Desarrollo de Aplicaciones Web",
    org: "IES Punta del Verde · Sevilla",
  },
  {
    period: "2022",
    title: "Administración de Bases de Datos (IFCT0310 · 650 h)",
    org: "Core Networks · Sevilla",
  },
  {
    period: "2013 — 2017",
    title: "Grado en Literaturas Comparadas",
    org: "Universidad de Granada",
  },
];
