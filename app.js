(() => {
  "use strict";

  const EXAMPLE_ID = "1081004946872352958";
  const JAPI = "https://japi.rest/discord/v1/user";
  const ITUNES = "https://itunes.apple.com";
  const SPOTIFY_OEMBED = "https://open.spotify.com/oembed";
  const JINA_YOUTUBE = "https://r.jina.ai/https://www.youtube.com/results?search_query=";
  const JINA_SOUNDCLOUD = "https://r.jina.ai/https://soundcloud.com/search/sounds?q=";
  const SC_WIDGET_API = "https://w.soundcloud.com/player/api.js";
  const SHORT_API = "https://rentry.co/api/new";
  const SHORT_EDIT = "https://rentry.co/api/edit/";
  const SHORT_BASE = "https://rentry.co/";
  const SHORT_MCLO_API = "https://api.mclo.gs/1/log";
  const SHORT_MCLO_RAW = "https://api.mclo.gs/1/raw/";
  const SHORT_NAMESPACE = "disbio-";
  const RESERVED_SHARE_NAMES = new Set([
    "index", "home", "card", "assets", "api", "docs", "favicon",
    "robots", "sitemap", "404", "styles", "app", "disbio"
  ]);
  const MAX_PHOTOS = 5;
  const PHOTON = "https://photon.komoot.io/api/";
  const PIPED_APIS = [
    "https://api.piped.private.coffee",
    "https://pipedapi.ducks.party"
  ];

  const SPOTIFY_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0Zm5.5 17.3a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 1 1-.33-1.46c4.57-1.04 8.5-.6 11.66 1.34.35.22.46.68.25 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 1 1-.55-1.8c4.36-1.32 9.78-.67 13.5 1.6.44.27.58.85.31 1.29Zm.13-3.4C15.24 8.34 8.83 8.12 5.13 9.24a1.13 1.13 0 1 1-.66-2.16c4.25-1.29 11.32-1.04 15.77 1.6a1.13 1.13 0 0 1-1.15 1.95Z"/></svg>`;

  const YOUTUBE_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z"/></svg>`;

  const SOUNDCLOUD_ICON = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M6.2 17.8a4.2 4.2 0 0 1-.3-8.4 5.8 5.8 0 0 1 11.2 1.4 3.6 3.6 0 0 1-.6 7H6.2Zm2.1-10.2c.2 0 .3.1.3.3v7.8c0 .2-.1.3-.3.3s-.3-.1-.3-.3V7.9c0-.2.1-.3.3-.3Zm2 .8c.2 0 .3.1.3.3v7c0 .2-.1.3-.3.3s-.3-.1-.3-.3v-7c0-.2.1-.3.3-.3Zm2.2-1.1c.2 0 .3.1.3.3v8.1c0 .2-.1.3-.3.3s-.3-.1-.3-.3V7.6c0-.2.1-.3.3-.3Z"/></svg>`;

  const SC_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect width='80' height='80' fill='%23ff5500'/%3E%3Cpath d='M22 51a10 10 0 0 1-.8-20 14 14 0 0 1 27 3.4A8.6 8.6 0 0 1 47 51H22Z' fill='%23fff'/%3E%3C/svg%3E";

  const FALLBACK_COVER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23232a36'/%3E%3Ccircle cx='15' cy='27' r='4.5' fill='%236b7280'/%3E%3Cpath d='M19.5 27V12l9-2v14' stroke='%236b7280' stroke-width='2.2' fill='none'/%3E%3Ccircle cx='24.5' cy='26' r='4.5' fill='%236b7280'/%3E%3C/svg%3E";

  const BADGE_ASSETS = {
    STAFF: { label: "Staff", src: "assets/badges/discord-staff.svg" },
    PARTNER: { label: "Parceiro", src: "assets/badges/discord-partner.svg" },
    HYPESQUAD: { label: "HypeSquad Events", src: "assets/badges/hype-squad-events.svg" },
    HYPESQUAD_EVENTS: { label: "HypeSquad Events", src: "assets/badges/hype-squad-events.svg" },
    BUG_HUNTER_LEVEL_1: { label: "Bug Hunter", src: "assets/badges/discord-bug-hunter-green.svg" },
    BUG_HUNTER_LEVEL_2: { label: "Bug Hunter Ouro", src: "assets/badges/discord-bug-hunter-gold.svg" },
    HOUSE_BRAVERY: { label: "HypeSquad Bravery", src: "assets/badges/hype-squad-bravery.svg" },
    HOUSE_BRILLIANCE: { label: "HypeSquad Brilliance", src: "assets/badges/hype-squad-brilliance.svg" },
    HOUSE_BALANCE: { label: "HypeSquad Balance", src: "assets/badges/hype-squad-balance.svg" },
    EARLY_SUPPORTER: { label: "Early Supporter", src: "assets/badges/discord-early-supporter.svg" },
    PREMIUM_EARLY_SUPPORTER: { label: "Early Supporter", src: "assets/badges/discord-early-supporter.svg" },
    NITRO: { label: "Nitro", src: "assets/badges/discord-nitro.svg" },
    NITRO_BOOSTER: { label: "Nitro Booster", src: "assets/badges/discord-nitro.svg" },
    VERIFIED_BOT: { label: "Bot verificado", src: "assets/badges/verified-bot.svg" },
    EARLY_VERIFIED_BOT_DEVELOPER: { label: "Dev de bot verificado", src: "assets/badges/discord-bot-dev.svg" },
    VERIFIED_DEVELOPER: { label: "Dev verificado", src: "assets/badges/discord-bot-dev.svg" },
    CERTIFIED_MODERATOR: { label: "Moderador", src: "assets/badges/discord-mod.svg" },
    ACTIVE_DEVELOPER: { label: "Dev ativo", src: "assets/badges/active-developer.svg" }
  };

  const STATUS_LABELS = {
    online: "Online",
    idle: "Ausente",
    dnd: "Não perturbe",
    offline: "Offline"
  };

  const TRACK_KIND = { album: "Álbum", playlist: "Playlist", episode: "Episódio" };

  const THEME_GRADIENTS = {
    sunset: {
      label: "Pôr do sol",
      dark: false,
      base: "#ffb7a0",
      css: "linear-gradient(135deg, #ffe8b8 0%, #ffb38a 42%, #e58fd8 100%)"
    },
    ocean: {
      label: "Oceano",
      dark: true,
      base: "#083b52",
      css: "linear-gradient(135deg, #04121e 0%, #083b52 52%, #0a6f80 100%)"
    },
    neon: {
      label: "Neon",
      dark: true,
      base: "#2a0a4a",
      css: "linear-gradient(135deg, #0d0022 0%, #3a0a5e 52%, #a0145a 100%)"
    },
    mint: {
      label: "Menta",
      dark: false,
      base: "#c9f2df",
      css: "linear-gradient(135deg, #e8fff4 0%, #a8e6cf 50%, #76c7b7 100%)"
    }
  };

  const MAX_LINKS = 6;

  const LOCATION_BASE = [
    "São Paulo, SP, Brasil", "Rio de Janeiro, RJ, Brasil", "Belo Horizonte, MG, Brasil",
    "Brasília, DF, Brasil", "Salvador, BA, Brasil", "Fortaleza, CE, Brasil",
    "Recife, PE, Brasil", "Porto Alegre, RS, Brasil", "Curitiba, PR, Brasil",
    "Manaus, AM, Brasil", "Belém, PA, Brasil", "Goiânia, GO, Brasil",
    "Campinas, SP, Brasil", "Florianópolis, SC, Brasil", "Vitória, ES, Brasil",
    "Natal, RN, Brasil", "João Pessoa, PB, Brasil", "Maceió, AL, Brasil",
    "Aracaju, SE, Brasil", "Teresina, PI, Brasil", "São Luís, MA, Brasil",
    "Cuiabá, MT, Brasil", "Campo Grande, MS, Brasil", "Porto Velho, RO, Brasil",
    "Rio Branco, AC, Brasil", "Macapá, AP, Brasil", "Boa Vista, RR, Brasil",
    "Palmas, TO, Brasil", "Londrina, PR, Brasil", "Santos, SP, Brasil",
    "Ribeirão Preto, SP, Brasil", "Uberlândia, MG, Brasil", "Lisboa, Portugal",
    "Porto, Portugal", "Madri, Espanha", "Barcelona, Espanha", "Paris, França",
    "Londres, Reino Unido", "Nova York, Estados Unidos", "Los Angeles, Estados Unidos",
    "Miami, Estados Unidos", "Tóquio, Japão", "Seul, Coreia do Sul",
    "Buenos Aires, Argentina", "Santiago, Chile", "Cidade do México, México",
    "Toronto, Canadá", "Vancouver, Canadá", "Berlim, Alemanha", "Roma, Itália",
    "Amsterdã, Países Baixos", "Dubai, Emirados Árabes Unidos", "Sydney, Austrália",
    "Joanesburgo, África do Sul"
  ];

  const COUNTRY_PT = {
    Brazil: "Brasil",
    "United States": "Estados Unidos",
    "United Kingdom": "Reino Unido",
    Spain: "Espanha",
    France: "França",
    Germany: "Alemanha",
    Italy: "Itália",
    Japan: "Japão",
    "South Korea": "Coreia do Sul",
    Canada: "Canadá",
    Mexico: "México",
    Netherlands: "Países Baixos",
    Portugal: "Portugal",
    Argentina: "Argentina",
    Chile: "Chile",
    Australia: "Austrália",
    "South Africa": "África do Sul",
    "United Arab Emirates": "Emirados Árabes Unidos",
    China: "China",
    India: "Índia",
    Russia: "Rússia",
    Poland: "Polônia",
    Ireland: "Irlanda",
    Switzerland: "Suíça",
    Sweden: "Suécia",
    Norway: "Noruega",
    Denmark: "Dinamarca",
    Finland: "Finlândia",
    "New Zealand": "Nova Zelândia",
    "São Tomé and Príncipe": "São Tomé e Príncipe",
    "Cape Verde": "Cabo Verde",
    Angola: "Angola",
    Mozambique: "Moçambique"
  };

  const LINK_PLATFORMS = {
    instagram: { label: "Instagram", icon: "assets/social/instagram.svg", prefix: "@" },
    tiktok: { label: "TikTok", icon: "assets/social/tiktok.svg", prefix: "@" },
    x: { label: "X", icon: "assets/social/x.svg", prefix: "@" },
    youtube: { label: "YouTube", icon: "assets/social/youtube.svg", prefix: "@" },
    twitch: { label: "Twitch", icon: "assets/social/twitch.svg", prefix: "@" },
    github: { label: "GitHub", icon: "assets/social/github.svg", prefix: "@" },
    spotify: { label: "Spotify", icon: "assets/social/spotify.svg", prefix: "" },
    website: { label: "Site", icon: "assets/social/globe.svg", prefix: "" }
  };

  const $ = (sel, root = document) => root.querySelector(sel);

  const els = {
    form: $("#profile-form"),
    idField: $("#id-field"),
    idInput: $("#discord-id"),
    idError: $("#id-error"),
    submit: $("#submit-btn"),
    musicField: $("#music-field"),
    musicInput: $("#music-input"),
    musicResults: $("#music-results"),
    musicSpinner: $("#music-spinner"),
    musicHint: $("#music-hint"),
    statusToggle: $("#status-toggle"),
    statusWrap: $("#status-wrap"),
    statusInput: $("#status-input"),
    statusCount: $("#status-count"),
    linksToggle: $("#links-toggle"),
    linksWrap: $("#links-wrap"),
    linkInput: $("#link-input"),
    linkAdd: $("#link-add"),
    linkError: $("#link-error"),
    linkChips: $("#link-chips"),
    card: $("#card"),
    cardLinks: $("#card-links"),
    banner: $("#card-banner"),
    avatar: $("#card-avatar"),
    decoration: $("#card-decoration"),
    dot: $("#card-status-dot"),
    name: $("#card-name"),
    handle: $("#card-handle"),
    badges: $("#card-badges"),
    divider: $("#card-divider"),
    statusEl: $("#card-status"),
    statusText: $("#card-status-text"),
    music: $("#music"),
    musicCover: $("#music-cover"),
    musicPlay: $("#music-play"),
    iconSpotify: $("#music-icon-spotify"),
    iconPreview: $("#music-icon-preview"),
    iconYouTube: $("#music-icon-youtube"),
    iconSoundCloud: $("#music-icon-soundcloud"),
    musicLabel: $("#music-label"),
    musicTitle: $("#music-title"),
    musicArtist: $("#music-artist"),
    musicExpand: $("#music-expand"),
    musicToggle: $("#music-toggle"),
    musicProgress: $("#music-progress"),
    musicBar: $("#music-bar"),
    musicFill: $("#music-fill"),
    musicThumb: $("#music-thumb"),
    musicCurrent: $("#music-current"),
    musicDuration: $("#music-duration"),
    spotify: $("#spotify-slot"),
    spotifyHost: $("#spotify-host"),
    youtubeHost: $("#yt-host"),
    scHost: $("#sc-host"),
    since: $("#card-since"),
    example: $("#example-btn"),
    actions: $("#card-actions"),
    download: $("#download-btn"),
    copy: $("#copy-btn"),
    clear: $("#clear-btn"),
    stageShare: $("#stage-share"),
    shareName: $("#share-name"),
    sharePrefix: $("#share-prefix"),
    shareNameHint: $("#share-name-hint"),
    glow: $("#stage-glow"),
    floatingPhotos: $("#floating-photos"),
    toast: $("#toast"),
    help: $("#help"),
    shareHeading: $("#share-heading"),
    bgCanvas: $("#bg-canvas"),
    bgPhoto: $("#bg-photo"),
    bgPicker: $("#bg-picker"),
    bgReactive: $("#bg-reactive"),
    bgImage: $("#bg-image"),
    bgImageThumbWrap: $("#bg-image-thumb-wrap"),
    bgImageThumb: $("#bg-image-thumb"),
    bgImageClear: $("#bg-image-clear"),
    bgImageLabel: $("#bg-image-label"),
    cardImageInput: $("#card-image"),
    cardImageLabel: $("#card-image-label"),
    cardImageUrlInput: $("#card-image-url"),
    cardImageUrlApply: $("#card-image-url-apply"),
    photoList: $("#photo-list"),
    photoCount: $("#photo-count"),
    photoDialog: $("#photo-dialog"),
    photoDialogImg: $("#photo-dialog-img"),
    photoDialogCaption: $("#photo-dialog-caption"),
    startAt: $("#start-at"),
    startInput: $("#start-input"),
    startUse: $("#start-use-current"),
    startWarning: $("#start-warning"),
    autoplayToggle: $("#autoplay-toggle"),
    detailsToggle: $("#details-toggle"),
    detailsWrap: $("#details-wrap"),
    pronounsInput: $("#pronouns-input"),
    locationInput: $("#location-input"),
    bioInput: $("#bio-input"),
    bioCount: $("#bio-count"),
    locationResults: $("#location-results"),
    locationSpinner: $("#location-spinner"),
    cardBio: $("#card-bio"),
    cardBioText: $("#card-bio-text"),
    cardLocation: $("#card-location"),
    cardLocationText: $("#card-location-text"),
    themePicker: $("#theme-picker"),
    themeColor: $("#theme-color"),
    themeColorLabel: $("#theme-color-label"),
    gradientStart: $("#gradient-start"),
    gradientEnd: $("#gradient-end"),
    gradientAngle: $("#gradient-angle"),
    gradientAngleValue: $("#gradient-angle-value"),
    gradientCustom: $("#gradient-custom")
  };

  const state = {
    profile: null,
    track: null,
    status: "",
    links: [],
    shareMode: false,
    startAt: 0,
    autoplay: false,
    startApplied: false,
    startSeeking: false,
    startSeekDeadline: 0,
    startSeekAttempts: 0,
    startLastSeek: 0,
    startSeekUiUntil: 0,
    pronouns: "",
    location: "",
    bio: "",
    theme: "light",
    themeColor: "#e8e9e3",
    themeGradient: "sunset",
    gradientStart: "#7c6cff",
    gradientEnd: "#ff7a9c",
    gradientAngle: 135,
    bg: "none",
    bgReactive: true,
    bgImage: "",
    photos: [],
    photoSeq: 0,
    audio: null,
    audioTrackId: null,
    loading: false,
    loadToken: 0,
    spotifyExpanded: false,
    playerMode: null,
    spotifyPosition: 0,
    spotifyDuration: 0,
    spotifyPaused: true,
    youtubeReady: false,
    youtubePlaying: false,
    youtubePosition: 0,
    youtubeDuration: 0,
    youtubeStartPending: false,
    youtubeStartDeadline: 0,
    youtubeStartLastSeek: 0,
    youtubeStartAttempts: 0,
    youtubeError: false,
    scReady: false,
    scPlaying: false,
    scPosition: 0,
    scDuration: 0,
    scStartPending: false,
    scStartDeadline: 0,
    scStartLastSeek: 0,
    scStartAttempts: 0,
    scError: false,
    scCandidates: [],
    scCandidateIndex: -1,
    scFailed: new Set(),
    canonicalDurationMs: 0,
    canonicalArtist: "",
    locationItems: [],
    locationOpen: false,
    locationPicked: false,
    pendingPlay: false,
    autoStartPending: false,
    autoplayNoticeShown: false,
    seeking: false,
    results: [],
    searchSeq: 0,
    musicTouched: false
  };

  const profileCache = new Map();
  const imageCache = new Map();
  let spotifyApi = null;
  let spotifyApiPromise = null;
  let spotifyController = null;
  let youtubeApi = null;
  let youtubeApiPromise = null;
  let youtubePlayer = null;
  let youtubeTimer = 0;
  let scApiPromise = null;
  let scWidget = null;
  let scFrame = null;
  let scPlayTimer = 0;
  let photoDragMoved = false;
  let shortLinkCache = { hash: "", url: "" };
  let activeShortCode = "";
  let seekPointerId = null;

  const BG_PRESETS = new Set(["none", "aurora", "waves", "bubbles", "pulse", "stars", "grid", "mesh", "rain", "vortex", "confetti", "blackhole", "riso", "marble", "glass", "blueprint"]);
  const BG_COLORS = [
    [124, 108, 255],
    [53, 214, 196],
    [255, 179, 92],
    [255, 122, 156]
  ];
  const bg = { preset: "none", reactive: false, playing: false, px: .5, py: .5, raf: 0, w: 0, h: 0, mediaPos: 0, mediaAt: 0 };
  let bgPreviewPreset = "";
  const bgCanvas = els.bgCanvas;
  const bgCtx = bgCanvas ? bgCanvas.getContext("2d") : null;
  const bgBubbles = Array.from({ length: 18 }, (_, i) => ({
    x: ((i * 73) % 100) / 100,
    y: ((i * 37) % 100) / 100,
    r: 18 + ((i * 19) % 60),
    s: 0.08 + ((i * 13) % 20) / 200,
    c: i % 4
  }));
  const bgStars = Array.from({ length: 96 }, (_, i) => ({
    x: ((i * 61 + 17) % 997) / 997,
    y: ((i * 89 + 41) % 991) / 991,
    r: 0.55 + ((i * 23) % 100) / 100 * 1.7,
    z: 0.25 + ((i * 31) % 100) / 100,
    p: ((i * 47) % 100) / 100 * Math.PI * 2,
    s: 0.45 + ((i * 19) % 100) / 100 * 1.2,
    c: i % 4
  }));
  const bgRain = Array.from({ length: 82 }, (_, i) => ({
    x: ((i * 53 + 7) % 997) / 997,
    y: ((i * 71 + 13) % 991) / 991,
    s: .1 + ((i * 29) % 100) / 100 * .24,
    len: 18 + ((i * 37) % 100) / 100 * 72,
    z: .3 + ((i * 17) % 100) / 100,
    p: ((i * 41) % 100) / 100 * Math.PI * 2,
    c: i % 4
  }));
  const bgConfetti = Array.from({ length: 72 }, (_, i) => ({
    x: ((i * 67 + 11) % 997) / 997,
    y: ((i * 83 + 29) % 991) / 991,
    s: .04 + ((i * 23) % 100) / 100 * .11,
    size: 5 + ((i * 31) % 100) / 100 * 9,
    rot: ((i * 43) % 360) / 57.3,
    spin: (.4 + ((i * 19) % 100) / 100 * 1.8) * (i % 2 ? 1 : -1),
    p: ((i * 61) % 100) / 100 * Math.PI * 2,
    c: i % 4
  }));
  const bgGlassShards = (() => {
    const shards = [];
    const slices = 12;
    const rings = 4;
    for (let ring = 0; ring < rings; ring += 1) {
      for (let slice = 0; slice < slices; slice += 1) {
        const offset = (ring % 2) * (Math.PI / slices);
        shards.push({
          a1: (slice / slices) * Math.PI * 2 + offset,
          a2: ((slice + 1) / slices) * Math.PI * 2 + offset,
          r1: .18 + (ring / rings) * .82,
          r2: .18 + ((ring + 1) / rings) * .82,
          c: (ring * 5 + slice) % 4,
          b: .4 + ((ring * 13 + slice * 7) % 100) / 160
        });
      }
    }
    return shards;
  })();
  const bgStarLinks = (() => {
    const links = [];
    for (let i = 0; i < bgStars.length; i += 1) {
      for (let j = i + 1; j < bgStars.length; j += 1) {
        const dx = bgStars[i].x - bgStars[j].x;
        const dy = bgStars[i].y - bgStars[j].y;
        if (dx * dx + dy * dy < .011 && links.length < 46) links.push([i, j]);
      }
    }
    return links;
  })();
  const youtubeSearchCache = new Map();
  const soundcloudSearchCache = new Map();
  const locationCache = new Map();
  let jinaBlocked = false;
  let musicHintDefault = "";
  let searchTimer = 0;
  let locationTimer = 0;
  let locationSeq = 0;
  let hashTimer = 0;
  let toastTimer = 0;
  let spotifyTimer = 0;

  /* ---------- utilitários ---------- */

  function fmtTime(value) {
    const s = Math.max(0, Math.floor(Number(value) || 0));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  }

  const dateFmt = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short", year: "numeric" });

  function fmtDate(iso) {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? "" : dateFmt.format(d);
  }

  function extractId(value) {
    const digits = String(value || "").replace(/\D/g, "");
    return /^\d{15,21}$/.test(digits) ? digits : null;
  }

  function withSize(url, size) {
    if (!url) return "";
    return `${url}${url.includes("?") ? "&" : "?"}size=${size}`;
  }

  function art(url) {
    return String(url || "").replace(/\/\d+x\d+bb\./, "/600x600bb.");
  }

  function norm(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\([^)]*\)|\[[^\]]*\]/g, " ")
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  }

  function parseSpotify(value) {
    const text = String(value || "").trim();
    if (!text) return null;
    let m = text.match(/^spotify:(track|album|playlist|episode):([A-Za-z0-9]{10,})$/i);
    if (m) return { type: m[1].toLowerCase(), id: m[2] };
    m = text.match(/(?:open\.)?spotify\.com\/(?:intl-[a-z-]+\/)?(track|album|playlist|episode)\/([A-Za-z0-9]{10,})/i);
    if (m) return { type: m[1].toLowerCase(), id: m[2] };
    return null;
  }

  function isSpotifyish(value) {
    const text = String(value || "").trim();
    return /^(https?:\/\/)?(open\.)?spotify\.(com|link)\//i.test(text) || /^spotify:/i.test(text);
  }

  function parseYouTube(value) {
    const text = String(value || "").trim();
    if (!text) return null;
    const match = text.match(/(?:youtube\.com\/watch\?[^#]*v=|youtu\.be\/|youtube\.com\/shorts\/|music\.youtube\.com\/watch\?[^#]*v=)([A-Za-z0-9_-]{11})/i);
    return match ? match[1] : null;
  }

  function isYouTubeish(value) {
    return /(?:youtube\.com|youtu\.be)/i.test(String(value || ""));
  }

  function parseSoundCloud(value) {
    const text = String(value || "").trim();
    const match = text.match(/^(?:https?:\/\/)?(?:www\.)?soundcloud\.com\/([^/?#]+)\/([^/?#]+)/i);
    if (!match) return null;
    const user = match[1].toLowerCase();
    if (["search", "tags", "discover", "feed", "you", "upload", "pages", "charts", "getstarted", "company", "settings", "notifications", "messages", "stream", "popular", "albums", "sets", "people"].includes(user)) {
      return null;
    }
    return { url: `https://soundcloud.com/${match[1]}/${match[2]}` };
  }

  function isSoundCloudish(value) {
    return /soundcloud\.com\//i.test(String(value || ""));
  }

  function prefersReduced() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function toast(message) {
    els.toast.textContent = message;
    els.toast.hidden = false;
    requestAnimationFrame(() => els.toast.classList.add("is-visible"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      els.toast.classList.remove("is-visible");
      setTimeout(() => { els.toast.hidden = true; }, 260);
    }, 3200);
  }

  function setError(message) {
    const text = String(message || "");
    els.idError.textContent = text;
    els.idError.hidden = !text;
    els.idField.classList.toggle("is-invalid", Boolean(text));
    els.idInput.setAttribute("aria-invalid", text ? "true" : "false");
  }

  async function getJson(url, timeout = 9000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const res = await fetch(url, { signal: controller.signal, headers: { accept: "application/json" } });
      if (!res.ok) {
        const err = new Error(`HTTP ${res.status}`);
        err.status = res.status;
        throw err;
      }
      return await res.json();
    } finally {
      clearTimeout(timer);
    }
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.append(area);
      area.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      area.remove();
      return ok;
    }
  }

  function saveId(id) {
    try { localStorage.setItem("disperfil:id", id); } catch {}
  }

  function readId() {
    try { return localStorage.getItem("disperfil:id"); } catch { return null; }
  }

  /* ---------- fundo animado ---------- */

  function resizeBg() {
    if (!bgCanvas || !bgCtx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    bg.w = window.innerWidth;
    bg.h = window.innerHeight;
    bgCanvas.width = Math.round(bg.w * dpr);
    bgCanvas.height = Math.round(bg.h * dpr);
    bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function playbackSeconds() {
    const track = state.track;
    if (!track) return 0;
    if (track.mode === "soundcloud") return (state.scPosition || 0) / 1000;
    if (track.mode === "spotify") return (state.spotifyPosition || 0) / 1000;
    if (track.mode === "youtube") return (state.youtubePosition || 0) / 1000;
    if (track.mode === "preview" && state.audio) return state.audio.currentTime || 0;
    return 0;
  }

  function mixColor(a, b, amount) {
    const k = Math.max(0, Math.min(1, amount));
    return a.map((value, index) => Math.round(value + (b[index] - value) * k));
  }

  function bgBeat(now) {
    if (!bg.reactive || !bg.playing) {
      bg.mediaAt = 0;
      return 0;
    }
    const raw = playbackSeconds();
    if (!bg.mediaAt) {
      bg.mediaPos = raw;
      bg.mediaAt = now;
      return 0;
    }
    const predicted = bg.mediaPos + (now - bg.mediaAt) / 1000;
    const seconds = Math.abs(predicted - raw) > .9 ? raw : predicted;
    bg.mediaPos = seconds;
    bg.mediaAt = now;

    const bpm = Math.max(60, Math.min(200, Number(state.track?.bpm) || 120));
    const pulse = seconds * bpm / 60;
    const phase = pulse - Math.floor(pulse);
    const accent = Math.floor(pulse) % 4 === 0 ? 1 : .62;
    const energy = .88 + .12 * Math.sin(seconds * .7);
    return Math.pow(Math.max(0, Math.sin(phase * Math.PI)), 3) * accent * energy;
  }

  function drawBg(now) {
    if (!bgCtx) return;
    const w = bg.w || window.innerWidth;
    const h = bg.h || window.innerHeight;
    const t = now / 1000;
    const beat = bgBeat(now);
    document.documentElement.style.setProperty("--beat", beat.toFixed(3));
    bgCtx.clearRect(0, 0, w, h);
    if (bg.preset === "none") return;

    if (bg.preset === "aurora") {
      for (let i = 0; i < 5; i++) {
        const color = mixColor(BG_COLORS[i % 4], BG_COLORS[(i + 1) % 4], .5 + .5 * Math.sin(t * .12 + i));
        const x = w * (0.5 + Math.sin(t * (0.11 + i * 0.028) + i * 1.7) * 0.4 + Math.cos(t * .05 + i) * .035) + (bg.px - .5) * w * .12;
        const y = h * (0.45 + Math.cos(t * (0.09 + i * 0.024) + i * 2.3) * 0.34 + Math.sin(t * .06 + i) * .035) + (bg.py - .5) * h * .12;
        const radius = Math.min(w, h) * (0.28 + i * 0.06) * (1 + beat * 0.28 + Math.sin(t * .25 + i) * .06);
        const gradient = bgCtx.createRadialGradient(x, y, 0, x, y, radius);
        const alpha = 0.15 + beat * 0.13 + Math.sin(t * .4 + i) * .025;
        gradient.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${Math.max(.04, alpha).toFixed(3)})`);
        gradient.addColorStop(.6, `rgba(${color[0]},${color[1]},${color[2]},${Math.max(.02, alpha * .45).toFixed(3)})`);
        gradient.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`);
        bgCtx.fillStyle = gradient;
        bgCtx.fillRect(0, 0, w, h);
      }
    } else if (bg.preset === "waves") {
      for (let i = 0; i < 4; i++) {
        const color = mixColor(BG_COLORS[(i + 1) % 4], BG_COLORS[(i + 2) % 4], .5 + .5 * Math.sin(t * .15 + i));
        const base = h * (0.55 + i * 0.11) + Math.sin(t * .18 + i) * 12 + (bg.py - .5) * 34;
        const amp = 26 + i * 14 + beat * 26;
        bgCtx.beginPath();
        bgCtx.moveTo(0, base);
        for (let x = 0; x <= w; x += 12) {
          const y = base
            + Math.sin(x * 0.004 + t * (0.55 + i * 0.14) + i + Math.sin(t * .2 + i) * .3 + (bg.px - .5) * .8) * amp
            + Math.sin(x * 0.0017 - t * 0.4 + i) * amp * 0.45;
          bgCtx.lineTo(x, y);
        }
        bgCtx.lineTo(w, h);
        bgCtx.lineTo(0, h);
        bgCtx.closePath();
        const gradient = bgCtx.createLinearGradient(0, base - amp, 0, h);
        gradient.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${(0.10 + beat * .04).toFixed(3)})`);
        gradient.addColorStop(.5, `rgba(${color[0]},${color[1]},${color[2]},0.045)`);
        gradient.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`);
        bgCtx.fillStyle = gradient;
        bgCtx.fill();
      }
    } else if (bg.preset === "bubbles") {
      bgBubbles.forEach((bubble, index) => {
        const y = ((bubble.y - t * bubble.s) % 1 + 1) % 1 + (bg.py - .5) * .03;
        const x = bubble.x + Math.sin(t * 0.35 + bubble.y * 12 + index) * 0.025 + (bg.px - .5) * .03;
        const radius = bubble.r * (1 + beat * 0.2 + Math.sin(t * .5 + index) * .08);
        const color = mixColor(BG_COLORS[bubble.c], BG_COLORS[(bubble.c + 1) % 4], .5 + .5 * Math.sin(t * .2 + index));
        bgCtx.beginPath();
        bgCtx.arc(x * w, y * h, Math.max(3, radius), 0, Math.PI * 2);
        bgCtx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${(0.05 + Math.sin(t * .4 + index) * .025 + beat * .03).toFixed(3)})`;
        bgCtx.fill();
        bgCtx.lineWidth = 1;
        bgCtx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${(0.11 + beat * .04).toFixed(3)})`;
        bgCtx.stroke();
      });
    } else if (bg.preset === "pulse") {
      const cx = w * 0.5 + Math.sin(t * .12) * w * .035 + (bg.px - .5) * w * .08;
      const cy = h * 0.45 + Math.cos(t * .1) * h * .03 + (bg.py - .5) * h * .08;
      const baseR = Math.min(w, h) * 0.42;
      const radius = baseR * (1 + beat * 0.24 + Math.sin(t * 0.5) * 0.05);
      const color = mixColor(BG_COLORS[0], BG_COLORS[1], .5 + .5 * Math.sin(t * .1));
      const gradient = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${(0.15 + beat * 0.15).toFixed(3)})`);
      gradient.addColorStop(.65, `rgba(${color[0]},${color[1]},${color[2]},${(0.05 + beat * .08).toFixed(3)})`);
      gradient.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`);
      bgCtx.fillStyle = gradient;
      bgCtx.fillRect(0, 0, w, h);

      for (let i = 0; i < 5; i++) {
        const phase = (t * .22 + i / 5) % 1;
        const ring = baseR * (0.3 + phase * 1.05) * (1 + beat * 0.08);
        bgCtx.beginPath();
        bgCtx.arc(cx, cy, ring, 0, Math.PI * 2);
        bgCtx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${((1 - phase) * 0.11 + beat * 0.035).toFixed(3)})`;
        bgCtx.lineWidth = 1 + (1 - phase) * .6;
        bgCtx.stroke();
      }

      const bars = 48;
      const inner = baseR * .63;
      bgCtx.save();
      bgCtx.translate(cx, cy);
      bgCtx.rotate(t * .08);
      for (let i = 0; i < bars; i += 1) {
        const angle = (i / bars) * Math.PI * 2;
        const wave = .5 + .5 * Math.sin(i * .66 + t * 2.4);
        const length = 5 + wave * 22 + beat * 30;
        const alpha = .1 + wave * .12 + beat * .12;
        bgCtx.beginPath();
        bgCtx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
        bgCtx.lineTo(Math.cos(angle) * (inner + length), Math.sin(angle) * (inner + length));
        bgCtx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha.toFixed(3)})`;
        bgCtx.lineWidth = 2;
        bgCtx.stroke();
      }
      bgCtx.restore();
    } else if (bg.preset === "stars") {
      const dark = document.documentElement.classList.contains("theme-dark");
      const tint = dark ? [214, 222, 255] : [91, 75, 255];
      const driftX = (bg.px - .5) * 52;
      const driftY = (bg.py - .5) * 38;
      const glowColor = mixColor([124, 108, 255], [53, 214, 196], .5 + .5 * Math.sin(t * .06));

      const glowX = w * (.5 + Math.sin(t * .035) * .12);
      const glowY = h * (.35 + Math.cos(t * .03) * .08);
      const glow = bgCtx.createRadialGradient(glowX, glowY, 0, glowX, glowY, Math.min(w, h) * (.52 + Math.sin(t * .1) * .04));
      glow.addColorStop(0, `rgba(${glowColor[0]},${glowColor[1]},${glowColor[2]},${(0.08 + beat * .07).toFixed(3)})`);
      glow.addColorStop(1, `rgba(${glowColor[0]},${glowColor[1]},${glowColor[2]},0)`);
      bgCtx.fillStyle = glow;
      bgCtx.fillRect(0, 0, w, h);

      for (const [i, j] of bgStarLinks) {
        const a = bgStars[i];
        const b = bgStars[j];
        const ax = a.x * w + Math.sin(t * .06 + a.p) * 12 * a.z + driftX * a.z;
        const ay = a.y * h + Math.cos(t * .05 + a.p * 1.3) * 9 * a.z + driftY * a.z;
        const bx = b.x * w + Math.sin(t * .06 + b.p) * 12 * b.z + driftX * b.z;
        const by = b.y * h + Math.cos(t * .05 + b.p * 1.3) * 9 * b.z + driftY * b.z;
        bgCtx.beginPath();
        bgCtx.moveTo(ax, ay);
        bgCtx.lineTo(bx, by);
        bgCtx.strokeStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},${(dark ? .07 : .045) + beat * .015})`;
        bgCtx.lineWidth = .6;
        bgCtx.stroke();
      }

      for (const star of bgStars) {
        const twinkle = .15 + .85 * Math.abs(Math.sin(t * star.s + star.p));
        const x = star.x * w + Math.sin(t * .06 + star.p) * 12 * star.z + driftX * star.z;
        const y = star.y * h + Math.cos(t * .05 + star.p * 1.3) * 9 * star.z + driftY * star.z;
        const radius = star.r * (.65 + twinkle * .7 + beat * .45);
        const color = mixColor(tint, BG_COLORS[star.c], .13 + .1 * Math.sin(t * .1 + star.p));
        const alpha = twinkle * (dark ? .82 : .36);

        if (star.r > 1.5) {
          const halo = bgCtx.createRadialGradient(x, y, 0, x, y, radius * 4);
          halo.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${(alpha * .18).toFixed(3)})`);
          halo.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`);
          bgCtx.fillStyle = halo;
          bgCtx.fillRect(x - radius * 4, y - radius * 4, radius * 8, radius * 8);
        }

        bgCtx.beginPath();
        bgCtx.arc(x, y, radius, 0, Math.PI * 2);
        bgCtx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha.toFixed(3)})`;
        bgCtx.fill();

        if (star.r > 2.1 && twinkle > .72) {
          bgCtx.save();
          bgCtx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${(alpha * .45).toFixed(3)})`;
          bgCtx.lineWidth = .7;
          bgCtx.beginPath();
          bgCtx.moveTo(x - radius * 4, y);
          bgCtx.lineTo(x + radius * 4, y);
          bgCtx.moveTo(x, y - radius * 4);
          bgCtx.lineTo(x, y + radius * 4);
          bgCtx.stroke();
          bgCtx.restore();
        }
      }

      const cycle = 6.5;
      const cycleIndex = Math.floor(t / cycle);
      const phase = (t % cycle) / cycle;
      if (phase < .16) {
        const progress = phase / .16;
        const seedX = ((cycleIndex * 37) % 100) / 100;
        const seedY = ((cycleIndex * 61) % 100) / 100;
        const startX = w * (.08 + seedX * .6);
        const startY = h * (.08 + seedY * .25);
        const endX = startX + w * .32;
        const endY = startY + h * .2;
        const x = startX + (endX - startX) * progress;
        const y = startY + (endY - startY) * progress;
        const tailX = x - (endX - startX) * .18;
        const tailY = y - (endY - startY) * .18;
        const tail = bgCtx.createLinearGradient(tailX, tailY, x, y);
        tail.addColorStop(0, "rgba(255,255,255,0)");
        tail.addColorStop(.7, "rgba(255,255,255,.45)");
        tail.addColorStop(1, "rgba(255,255,255,.95)");

        bgCtx.save();
        bgCtx.strokeStyle = tail;
        bgCtx.lineWidth = 1.7;
        bgCtx.lineCap = "round";
        bgCtx.beginPath();
        bgCtx.moveTo(tailX, tailY);
        bgCtx.lineTo(x, y);
        bgCtx.stroke();

        const head = bgCtx.createRadialGradient(x, y, 0, x, y, 13);
        head.addColorStop(0, "rgba(255,255,255,.8)");
        head.addColorStop(1, "rgba(255,255,255,0)");
        bgCtx.fillStyle = head;
        bgCtx.fillRect(x - 13, y - 13, 26, 26);
        bgCtx.restore();
      }
    } else if (bg.preset === "grid") {
      const dark = document.documentElement.classList.contains("theme-dark");
      const horizon = h * (.56 + Math.sin(t * .15) * .012 + (bg.py - .5) * .04);
      const cx = w * .5 + Math.sin(t * .12) * w * .055 + (bg.px - .5) * w * .12;
      const lineColor = mixColor(BG_COLORS[0], BG_COLORS[1], .5 + .5 * Math.sin(t * .12));
      const line = `rgba(${lineColor[0]},${lineColor[1]},${lineColor[2]},`;

      const glow = bgCtx.createRadialGradient(cx, horizon, 0, cx, horizon, Math.min(w, h) * (.52 + Math.sin(t * .18) * .05));
      glow.addColorStop(0, dark ? `rgba(${lineColor[0]},${lineColor[1]},${lineColor[2]},${(0.18 + beat * .06).toFixed(3)})` : `rgba(${lineColor[0]},${lineColor[1]},${lineColor[2]},.10)`);
      glow.addColorStop(1, `rgba(${lineColor[0]},${lineColor[1]},${lineColor[2]},0)`);
      bgCtx.fillStyle = glow;
      bgCtx.fillRect(0, 0, w, h);

      bgCtx.lineWidth = 1;
      for (let i = -12; i <= 12; i++) {
        const sway = Math.sin(t * .3 + i * .45) * w * .012;
        bgCtx.beginPath();
        bgCtx.moveTo(cx, horizon);
        bgCtx.lineTo(cx + i * w * .14 + sway, h + 20);
        bgCtx.strokeStyle = `${line}${(0.075 + beat * .05).toFixed(3)})`;
        bgCtx.stroke();
      }

      const speed = (t * .18) % 1;
      for (let i = 0; i < 16; i++) {
        const p = (i + speed) / 16;
        const y = horizon + Math.pow(p, 2.4) * (h - horizon + 30);
        bgCtx.beginPath();
        bgCtx.moveTo(0, y);
        bgCtx.lineTo(w, y);
        bgCtx.strokeStyle = `${line}${(0.05 + p * 0.11 + beat * .035).toFixed(3)})`;
        bgCtx.stroke();
      }

      bgCtx.beginPath();
      bgCtx.moveTo(0, horizon);
      bgCtx.lineTo(w, horizon);
      bgCtx.strokeStyle = `${line}${(0.24 + beat * .1).toFixed(3)})`;
      bgCtx.stroke();
    } else if (bg.preset === "mesh") {
      const c1 = mixColor(BG_COLORS[0], BG_COLORS[1], .5 + .5 * Math.sin(t * .07));
      const c2 = mixColor(BG_COLORS[1], BG_COLORS[3], .5 + .5 * Math.cos(t * .06));
      const base = bgCtx.createLinearGradient(0, 0, w, h);
      base.addColorStop(0, `rgba(${c1[0]},${c1[1]},${c1[2]},.045)`);
      base.addColorStop(1, `rgba(${c2[0]},${c2[1]},${c2[2]},.045)`);
      bgCtx.fillStyle = base;
      bgCtx.fillRect(0, 0, w, h);

      const points = [
        [.18 + Math.sin(t * .17) * .14 + (bg.px - .5) * .12, .24 + Math.cos(t * .2) * .14 + (bg.py - .5) * .1, 0, .55],
        [.78 + Math.cos(t * .15) * .15 + (bg.px - .5) * .12, .22 + Math.sin(t * .18) * .12 + (bg.py - .5) * .1, 1, .52],
        [.62 + Math.sin(t * .13) * .12 + (bg.px - .5) * .1, .76 + Math.cos(t * .16) * .14 + (bg.py - .5) * .1, 2, .62],
        [.24 + Math.cos(t * .19) * .13 + (bg.px - .5) * .1, .78 + Math.sin(t * .14) * .12 + (bg.py - .5) * .1, 3, .54],
        [.48 + Math.sin(t * .11) * .2 + (bg.px - .5) * .08, .48 + Math.cos(t * .12) * .2 + (bg.py - .5) * .08, 1, .46]
      ];

      for (const [x, y, c, scale] of points) {
        const color = mixColor(BG_COLORS[c], BG_COLORS[(c + 1) % 4], .5 + .5 * Math.sin(t * .15 + c));
        const radius = Math.min(w, h) * (scale + Math.sin(t * .22 + c) * .06) * (1 + beat * .2);
        const gradient = bgCtx.createRadialGradient(x * w, y * h, 0, x * w, y * h, radius);
        gradient.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${(0.13 + Math.sin(t * .3 + c) * .025 + beat * .08).toFixed(3)})`);
        gradient.addColorStop(.6, `rgba(${color[0]},${color[1]},${color[2]},${(0.06 + beat * .035).toFixed(3)})`);
        gradient.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`);
        bgCtx.fillStyle = gradient;
        bgCtx.fillRect(0, 0, w, h);
      }

      const sweepY = h * (.2 + Math.sin(t * .1) * .12);
      const sweep = bgCtx.createLinearGradient(0, sweepY, w, h - sweepY);
      sweep.addColorStop(0, `rgba(${c1[0]},${c1[1]},${c1[2]},.025)`);
      sweep.addColorStop(.5, `rgba(${c2[0]},${c2[1]},${c2[2]},.045)`);
      sweep.addColorStop(1, `rgba(${c1[0]},${c1[1]},${c1[2]},0)`);
      bgCtx.fillStyle = sweep;
      bgCtx.fillRect(0, 0, w, h);
    } else if (bg.preset === "rain") {
      const dark = document.documentElement.classList.contains("theme-dark");
      const tint = dark ? [143, 134, 255] : [75, 59, 255];
      const drift = (bg.px - .5) * 26;

      const glow = bgCtx.createLinearGradient(0, 0, 0, h * .45);
      glow.addColorStop(0, `rgba(${tint[0]},${tint[1]},${tint[2]},${(0.08 + beat * .05).toFixed(3)})`);
      glow.addColorStop(1, `rgba(${tint[0]},${tint[1]},${tint[2]},0)`);
      bgCtx.fillStyle = glow;
      bgCtx.fillRect(0, 0, w, h * .45);

      for (const drop of bgRain) {
        const y = ((drop.y + t * drop.s) % 1.12) - .06;
        const x = drop.x * w + Math.sin(t * .25 + drop.p) * 7 + drift * drop.z;
        const color = mixColor(tint, BG_COLORS[drop.c], .18 + .1 * Math.sin(t * .2 + drop.p));
        const len = drop.len * (.8 + beat * .5);
        const alpha = (.15 + drop.z * .17) * (dark ? 1 : .9);
        bgCtx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha.toFixed(3)})`;
        bgCtx.lineWidth = .9 + drop.z * 1;
        bgCtx.beginPath();
        bgCtx.moveTo(x, y * h);
        bgCtx.lineTo(x - 2, y * h + len);
        bgCtx.stroke();

        bgCtx.beginPath();
        bgCtx.arc(x, y * h, .8 + drop.z * .9, 0, Math.PI * 2);
        bgCtx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${(alpha * 2.2).toFixed(3)})`;
        bgCtx.fill();
      }
    } else if (bg.preset === "vortex") {
      const cx = w * .5 + Math.sin(t * .1) * w * .05 + (bg.px - .5) * w * .06;
      const cy = h * .45 + Math.cos(t * .08) * h * .04 + (bg.py - .5) * h * .06;
      const baseR = Math.min(w, h) * .46;
      const color = mixColor(BG_COLORS[0], BG_COLORS[1], .5 + .5 * Math.sin(t * .12));

      const glow = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.15);
      glow.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${(0.17 + beat * .11).toFixed(3)})`);
      glow.addColorStop(.55, `rgba(${color[0]},${color[1]},${color[2]},${(0.05 + beat * .04).toFixed(3)})`);
      glow.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`);
      bgCtx.fillStyle = glow;
      bgCtx.fillRect(0, 0, w, h);

      bgCtx.save();
      bgCtx.translate(cx, cy);
      bgCtx.rotate(t * .18);
      for (let i = 0; i < 96; i++) {
        const angle = i * .33 + Math.sin(t * .2 + i * .02) * .2;
        const radius = (i / 96) * baseR * (1 + beat * .12);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * .62;
        const dotColor = mixColor(color, BG_COLORS[i % 4], (i / 96) * .7);
        const alpha = .08 + (i / 96) * .4;
        bgCtx.beginPath();
        bgCtx.arc(x, y, 1 + (i % 5) * .45, 0, Math.PI * 2);
        bgCtx.fillStyle = `rgba(${dotColor[0]},${dotColor[1]},${dotColor[2]},${alpha.toFixed(3)})`;
        bgCtx.fill();
      }
      bgCtx.restore();

      for (let i = 0; i < 4; i++) {
        bgCtx.save();
        bgCtx.translate(cx, cy);
        bgCtx.rotate(-t * .1 + i * .45);
        bgCtx.beginPath();
        bgCtx.ellipse(0, 0, baseR * (.38 + i * .18) * (1 + beat * .08), baseR * (.2 + i * .1), 0, 0, Math.PI * 2);
        bgCtx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${(0.04 + beat * .025).toFixed(3)})`;
        bgCtx.lineWidth = 1;
        bgCtx.stroke();
        bgCtx.restore();
      }
    } else if (bg.preset === "confetti") {
      const drift = (bg.px - .5) * .05;
      for (const particle of bgConfetti) {
        const y = ((particle.y + t * particle.s) % 1.14) - .07;
        const x = particle.x + Math.sin(t * .35 + particle.p) * .035 + drift * (.5 + particle.size / 14);
        const color = mixColor(BG_COLORS[particle.c], BG_COLORS[(particle.c + 1) % 4], .5 + .5 * Math.sin(t * .25 + particle.p));
        const alpha = .38 + beat * .24 + .07 * Math.sin(t * .6 + particle.p);
        bgCtx.save();
        bgCtx.translate(x * w, y * h);
        bgCtx.rotate(particle.rot + t * particle.spin);
        bgCtx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha.toFixed(3)})`;
        bgCtx.fillRect(-particle.size / 2, -particle.size / 4, particle.size, particle.size / 2);
        bgCtx.restore();
      }
    } else if (bg.preset === "blackhole") {
      const cx = w * .5 + Math.sin(t * .08) * w * .035 + (bg.px - .5) * w * .06;
      const cy = h * .46 + Math.cos(t * .07) * h * .03 + (bg.py - .5) * h * .06;
      const R = Math.min(w, h) * .38;
      const disk = mixColor(BG_COLORS[2], BG_COLORS[0], .5 + .5 * Math.sin(t * .12));
      const disk2 = mixColor(BG_COLORS[3], BG_COLORS[1], .5 + .5 * Math.cos(t * .1));

      const haze = bgCtx.createRadialGradient(cx, cy, R * .2, cx, cy, Math.max(w, h) * .75);
      haze.addColorStop(0, "rgba(3,2,8,0)");
      haze.addColorStop(.45, "rgba(3,2,8,.22)");
      haze.addColorStop(1, "rgba(3,2,8,0)");
      bgCtx.fillStyle = haze;
      bgCtx.fillRect(0, 0, w, h);

      bgCtx.save();
      bgCtx.translate(cx, cy);
      bgCtx.rotate(t * .18);
      bgCtx.scale(1, .32);
      for (let i = 0; i < 7; i++) {
        const color = mixColor(disk, disk2, i / 7);
        const radius = R * (.68 + i * .14) * (1 + beat * .06);
        bgCtx.beginPath();
        bgCtx.arc(0, 0, radius, 0, Math.PI * 2);
        bgCtx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${(0.1 + beat * .055 + Math.sin(t * .4 + i) * .022).toFixed(3)})`;
        bgCtx.lineWidth = 2 + i * 1.1;
        bgCtx.stroke();
      }
      bgCtx.beginPath();
      bgCtx.arc(0, 0, R * .95, -.95, .95);
      bgCtx.strokeStyle = `rgba(255,226,184,${(0.52 + beat * .26).toFixed(3)})`;
      bgCtx.lineWidth = 6;
      bgCtx.stroke();
      bgCtx.beginPath();
      bgCtx.arc(0, 0, R * .95, Math.PI - .8, Math.PI + .8);
      bgCtx.strokeStyle = `rgba(255,181,120,${(0.2 + beat * .12).toFixed(3)})`;
      bgCtx.lineWidth = 4;
      bgCtx.stroke();
      bgCtx.restore();

      const glow = bgCtx.createRadialGradient(cx, cy, R * .2, cx, cy, R * 1.1);
      glow.addColorStop(0, `rgba(255,190,120,${(0.18 + beat * .1).toFixed(3)})`);
      glow.addColorStop(.55, `rgba(124,108,255,${(0.1 + beat * .06).toFixed(3)})`);
      glow.addColorStop(1, "rgba(124,108,255,0)");
      bgCtx.fillStyle = glow;
      bgCtx.fillRect(0, 0, w, h);

      bgCtx.beginPath();
      bgCtx.arc(cx, cy, R * .3, 0, Math.PI * 2);
      bgCtx.fillStyle = "#010104";
      bgCtx.fill();
      bgCtx.beginPath();
      bgCtx.arc(cx, cy, R * .31, 0, Math.PI * 2);
      bgCtx.strokeStyle = `rgba(255,232,200,${(0.78 + beat * .2).toFixed(3)})`;
      bgCtx.lineWidth = 2.4;
      bgCtx.stroke();

      bgCtx.save();
      bgCtx.translate(cx, cy);
      for (let i = 0; i < 84; i++) {
        const angle = i * 2.399 + t * (.2 + (i % 3) * .06);
        const phase = (i / 84 + t * .025) % 1;
        const radius = R * (1.5 - phase * 1.05);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * .38;
        const color = mixColor(disk, disk2, i / 84);
        const alpha = .08 + phase * .42;
        bgCtx.beginPath();
        bgCtx.arc(x, y, .7 + (i % 4) * .35, 0, Math.PI * 2);
        bgCtx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha.toFixed(3)})`;
        bgCtx.fill();
      }
      bgCtx.restore();
    } else if (bg.preset === "riso") {
      const dark = document.documentElement.classList.contains("theme-dark");
      const tint = bgCtx.createLinearGradient(0, 0, w, h);
      tint.addColorStop(0, `rgba(255,92,140,${dark ? .05 : .06})`);
      tint.addColorStop(.55, `rgba(255,196,87,${dark ? .035 : .045})`);
      tint.addColorStop(1, `rgba(58,160,220,${dark ? .055 : .07})`);
      bgCtx.fillStyle = tint;
      bgCtx.fillRect(0, 0, w, h);

      const step = Math.max(14, Math.round(Math.min(w, h) / 52));
      const layers = [
        { c: [255, 92, 140], x: .3, y: .36, ox: 8, oy: 5, phase: 0 },
        { c: [58, 160, 220], x: .7, y: .55, ox: -7, oy: 6, phase: 1.9 }
      ];
      for (const layer of layers) {
        const cx = w * (layer.x + Math.sin(t * .07 + layer.phase) * .05 + (bg.px - .5) * .06);
        const cy = h * (layer.y + Math.cos(t * .06 + layer.phase) * .045 + (bg.py - .5) * .06);
        const R = Math.min(w, h) * .52 * (1 + beat * .04);
        bgCtx.beginPath();
        bgCtx.arc(cx, cy, R * .92, 0, Math.PI * 2);
        bgCtx.fillStyle = `rgba(${layer.c[0]},${layer.c[1]},${layer.c[2]},${dark ? .035 : .045})`;
        bgCtx.fill();
        const path = new Path2D();
        for (let y = step / 2; y < h; y += step) {
          for (let x = step / 2; x < w; x += step) {
            const dx = (x - cx) / R;
            const dy = (y - cy) / R;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d > 1.3) continue;
            const wave = .5 + .5 * Math.sin(d * 9.5 - t * .55 + layer.phase);
            const r = step * (.14 + .4 * wave * (1 - d * .28));
            if (r < .7) continue;
            path.rect(
              x + Math.sin(t * .15 + y * .012) * 1.4 + layer.ox,
              y + Math.cos(t * .12 + x * .014) * 1.2 + layer.oy,
              r * 2,
              r * 2
            );
          }
        }
        bgCtx.fillStyle = `rgba(${layer.c[0]},${layer.c[1]},${layer.c[2]},${(dark ? .11 : .12) + beat * .025})`;
        bgCtx.fill(path);
      }

      for (let i = 0; i < 640; i += 1) {
        const x = ((i * 97 + Math.floor(t * 4) * 17) % 997) / 997 * w;
        const y = ((i * 53 + Math.floor(t * 3) * 11) % 991) / 991 * h;
        bgCtx.fillStyle = dark ? "rgba(255,255,255,.035)" : "rgba(28,24,36,.035)";
        bgCtx.fillRect(x, y, 1, 1);
      }
    } else if (bg.preset === "marble") {
      const dark = document.documentElement.classList.contains("theme-dark");
      const wash = bgCtx.createLinearGradient(0, 0, w, h);
      wash.addColorStop(0, dark ? "rgba(124,108,255,.07)" : "rgba(124,108,255,.05)");
      wash.addColorStop(.5, dark ? "rgba(53,214,196,.035)" : "rgba(53,214,196,.04)");
      wash.addColorStop(1, dark ? "rgba(255,122,156,.05)" : "rgba(255,122,156,.06)");
      bgCtx.fillStyle = wash;
      bgCtx.fillRect(0, 0, w, h);

      bgCtx.lineCap = "round";
      for (let i = 0; i < 16; i += 1) {
        const base = h * (i / 16) + Math.sin(t * .05 + i * 1.7) * h * .05;
        const amp = h * (.035 + (i % 4) * .014);
        const color = mixColor(BG_COLORS[i % 4], BG_COLORS[(i + 2) % 4], .5 + .5 * Math.sin(t * .06 + i * .9));
        bgCtx.beginPath();
        for (let x = -40; x <= w + 40; x += 34) {
          const y = base
            + Math.sin(x * .0022 + t * (.07 + (i % 3) * .025) + i * 1.3) * amp
            + Math.cos(x * .0011 - t * .045 + i * .7) * amp * .65
            + (bg.py - .5) * h * .05;
          if (x === -40) bgCtx.moveTo(x, y);
          else bgCtx.lineTo(x, y);
        }
        const alpha = (dark ? .05 : .05) + (i % 3) * .017 + beat * .022;
        bgCtx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha.toFixed(3)})`;
        bgCtx.lineWidth = h * (.012 + (i % 5) * .005);
        bgCtx.stroke();
      }

      for (let i = 0; i < 4; i += 1) {
        const x = w * (.18 + .22 * i) + Math.sin(t * .08 + i * 1.7) * w * .09;
        const y = h * (.28 + .14 * i) + Math.cos(t * .07 + i * 1.3) * h * .08;
        const r = Math.min(w, h) * (.18 + .04 * i);
        const color = mixColor(BG_COLORS[i % 4], BG_COLORS[(i + 2) % 4], .5 + .5 * Math.sin(t * .05 + i));
        const bloom = bgCtx.createRadialGradient(x, y, 0, x, y, r);
        bloom.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${(dark ? .05 : .042) + beat * .012})`);
        bloom.addColorStop(.55, `rgba(${color[0]},${color[1]},${color[2]},${dark ? .025 : .022})`);
        bloom.addColorStop(1, "rgba(0,0,0,0)");
        bgCtx.fillStyle = bloom;
        bgCtx.fillRect(x - r, y - r, r * 2, r * 2);
      }

      for (let i = 0; i < 6; i += 1) {
        const y = h * (.18 + i * .13) + Math.sin(t * .09 + i) * h * .03;
        const color = mixColor([255, 255, 255], BG_COLORS[(i + 1) % 4], .35);
        bgCtx.beginPath();
        bgCtx.moveTo(-20, y);
        for (let x = 0; x <= w + 20; x += 42) {
          bgCtx.lineTo(
            x,
            y + Math.sin(x * .004 + t * .12 + i * 2.1) * h * .022
              + Math.cos(x * .0016 - t * .07 + i) * h * .016
          );
        }
        bgCtx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${(dark ? .08 : .12) + beat * .02})`;
        bgCtx.lineWidth = 1.1;
        bgCtx.stroke();
      }
    } else if (bg.preset === "glass") {
      const dark = document.documentElement.classList.contains("theme-dark");
      const cx = w * .5 + Math.sin(t * .05) * w * .03 + (bg.px - .5) * w * .07;
      const cy = h * .46 + Math.cos(t * .04) * h * .025 + (bg.py - .5) * h * .07;
      const R = Math.min(w, h) * .44 * (1 + beat * .045);
      const wash = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.35);
      wash.addColorStop(0, dark ? "rgba(20,18,32,.2)" : "rgba(255,255,255,.12)");
      wash.addColorStop(.6, dark ? "rgba(12,10,22,.12)" : "rgba(240,238,230,.16)");
      wash.addColorStop(1, "rgba(0,0,0,0)");
      bgCtx.fillStyle = wash;
      bgCtx.fillRect(0, 0, w, h);

      bgCtx.save();
      bgCtx.translate(cx, cy);
      bgCtx.rotate(t * .025);
      bgCtx.lineJoin = "round";
      for (const shard of bgGlassShards) {
        const color = mixColor(BG_COLORS[shard.c], BG_COLORS[(shard.c + 1) % 4], .5 + .5 * Math.sin(t * .08 + shard.a1 * 3));
        const alpha = (dark ? .12 : .065) + shard.b * .055 + beat * .03;
        bgCtx.beginPath();
        bgCtx.moveTo(Math.cos(shard.a1) * R * shard.r1, Math.sin(shard.a1) * R * shard.r1);
        bgCtx.lineTo(Math.cos(shard.a1) * R * shard.r2, Math.sin(shard.a1) * R * shard.r2);
        bgCtx.lineTo(Math.cos(shard.a2) * R * shard.r2, Math.sin(shard.a2) * R * shard.r2);
        bgCtx.lineTo(Math.cos(shard.a2) * R * shard.r1, Math.sin(shard.a2) * R * shard.r1);
        bgCtx.closePath();
        bgCtx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha.toFixed(3)})`;
        bgCtx.fill();
        bgCtx.strokeStyle = dark ? "rgba(6,6,12,.34)" : "rgba(40,36,48,.18)";
        bgCtx.lineWidth = 1;
        bgCtx.stroke();
      }

      const glow = bgCtx.createRadialGradient(0, 0, 0, 0, 0, R * .38);
      glow.addColorStop(0, `rgba(255,255,255,${(dark ? .12 : .1) + beat * .04})`);
      glow.addColorStop(.5, `rgba(${BG_COLORS[0][0]},${BG_COLORS[0][1]},${BG_COLORS[0][2]},${(dark ? .06 : .04) + beat * .03})`);
      glow.addColorStop(1, "rgba(255,255,255,0)");
      bgCtx.fillStyle = glow;
      bgCtx.fillRect(-R * .4, -R * .4, R * .8, R * .8);

      bgCtx.beginPath();
      bgCtx.arc(0, 0, R * .19, 0, Math.PI * 2);
      bgCtx.fillStyle = dark ? "#0b0a14" : "#f6f3ea";
      bgCtx.fill();
      bgCtx.strokeStyle = dark ? "rgba(230,226,255,.36)" : "rgba(37,32,48,.3)";
      bgCtx.lineWidth = 1.4;
      bgCtx.stroke();
      bgCtx.restore();

      const edge = bgCtx.createRadialGradient(cx, cy, R * .82, cx, cy, R * 1.12);
      edge.addColorStop(0, "rgba(0,0,0,0)");
      edge.addColorStop(1, dark ? "rgba(0,0,0,.22)" : "rgba(40,32,40,.1)");
      bgCtx.fillStyle = edge;
      bgCtx.fillRect(0, 0, w, h);
    } else if (bg.preset === "blueprint") {
      const dark = document.documentElement.classList.contains("theme-dark");
      const paper = dark ? [7, 17, 31] : [232, 241, 246];
      const ink = dark ? [150, 214, 255] : [20, 68, 108];
      bgCtx.fillStyle = `rgba(${paper[0]},${paper[1]},${paper[2]},${dark ? .28 : .38})`;
      bgCtx.fillRect(0, 0, w, h);

      const cx = w * .5 + (bg.px - .5) * w * .05;
      const cy = h * .46 + (bg.py - .5) * h * .05;
      const step = 38;
      const drift = (t * 4) % step;
      bgCtx.lineWidth = 1;
      bgCtx.strokeStyle = `rgba(${ink[0]},${ink[1]},${ink[2]},${dark ? .1 : .075})`;
      bgCtx.beginPath();
      for (let x = -drift; x < w; x += step) {
        bgCtx.moveTo(x, 0);
        bgCtx.lineTo(x, h);
      }
      for (let y = -drift; y < h; y += step) {
        bgCtx.moveTo(0, y);
        bgCtx.lineTo(w, y);
      }
      bgCtx.stroke();

      bgCtx.strokeStyle = `rgba(${ink[0]},${ink[1]},${ink[2]},${dark ? .16 : .13})`;
      bgCtx.beginPath();
      for (let x = -drift; x < w; x += step * 5) {
        bgCtx.moveTo(x, 0);
        bgCtx.lineTo(x, h);
      }
      for (let y = -drift; y < h; y += step * 5) {
        bgCtx.moveTo(0, y);
        bgCtx.lineTo(w, y);
      }
      bgCtx.stroke();

      bgCtx.save();
      bgCtx.translate(cx, cy);
      bgCtx.strokeStyle = `rgba(${ink[0]},${ink[1]},${ink[2]},${(dark ? .3 : .24) + beat * .06})`;
      for (let i = 0; i < 4; i += 1) {
        const r = Math.min(w, h) * (.09 + i * .075) * (1 + beat * .02);
        bgCtx.beginPath();
        bgCtx.arc(0, 0, r, 0, Math.PI * 2);
        bgCtx.lineWidth = i === 0 ? 1.6 : 1;
        bgCtx.stroke();
      }
      const arcR = Math.min(w, h) * .34;
      const start = t * .12;
      bgCtx.beginPath();
      bgCtx.arc(0, 0, arcR, start, start + 1.7);
      bgCtx.lineWidth = 2.4;
      bgCtx.strokeStyle = `rgba(${ink[0]},${ink[1]},${ink[2]},.55)`;
      bgCtx.stroke();
      bgCtx.beginPath();
      bgCtx.arc(0, 0, arcR, start + Math.PI, start + Math.PI + .7);
      bgCtx.strokeStyle = `rgba(${ink[0]},${ink[1]},${ink[2]},.22)`;
      bgCtx.lineWidth = 1.2;
      bgCtx.stroke();

      const cross = Math.min(w, h) * .018;
      bgCtx.beginPath();
      bgCtx.moveTo(-cross, 0);
      bgCtx.lineTo(cross, 0);
      bgCtx.moveTo(0, -cross);
      bgCtx.lineTo(0, cross);
      bgCtx.strokeStyle = `rgba(${ink[0]},${ink[1]},${ink[2]},.6)`;
      bgCtx.lineWidth = 1;
      bgCtx.stroke();
      bgCtx.restore();

      bgCtx.strokeStyle = `rgba(${ink[0]},${ink[1]},${ink[2]},${dark ? .2 : .16})`;
      bgCtx.lineWidth = 1;
      bgCtx.strokeRect(22, 22, w - 44, h - 44);
      bgCtx.strokeRect(30, 30, w - 60, h - 60);

      const scan = ((t * 26) % (h + 120)) - 60;
      const scanGrad = bgCtx.createLinearGradient(0, scan - 40, 0, scan + 40);
      scanGrad.addColorStop(0, "rgba(0,0,0,0)");
      scanGrad.addColorStop(.5, dark ? "rgba(150,214,255,.05)" : "rgba(20,68,108,.04)");
      scanGrad.addColorStop(1, "rgba(0,0,0,0)");
      bgCtx.fillStyle = scanGrad;
      bgCtx.fillRect(0, scan - 40, w, 80);

      bgCtx.fillStyle = `rgba(${ink[0]},${ink[1]},${ink[2]},${dark ? .32 : .28})`;
      bgCtx.font = '600 9px "Switzer", sans-serif';
      bgCtx.fillText("DISPERFIL / PROFILE CARD", 40, 48);
      bgCtx.fillText("SCALE 1:1", w - 92, h - 38);
    }

    if (bg.reactive && bg.playing) {
      const cx = w * .5 + (bg.px - .5) * w * .04;
      const cy = h * .46 + (bg.py - .5) * h * .04;
      const color = mixColor(BG_COLORS[0], BG_COLORS[1], .5 + .5 * Math.sin(t * .2));
      for (let i = 0; i < 2; i += 1) {
        const phase = ((t * .24 + i * .5) % 1);
        const radius = Math.min(w, h) * (.14 + phase * .5);
        bgCtx.beginPath();
        bgCtx.arc(cx, cy, radius, 0, Math.PI * 2);
        bgCtx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${((1 - phase) * .05 + beat * .035).toFixed(3)})`;
        bgCtx.lineWidth = 1.2;
        bgCtx.stroke();
      }
    }
  }

  function bgLoop(now) {
    bg.raf = 0;
    drawBg(now);
    if ((bg.preset !== "none" || (bg.reactive && bg.playing)) && !prefersReduced()) {
      bg.raf = requestAnimationFrame(bgLoop);
    }
  }

  function startBg() {
    if (!bgCtx) return;
    if (bg.preset === "none") {
      if (bg.raf) {
        cancelAnimationFrame(bg.raf);
        bg.raf = 0;
      }
      document.body.classList.remove("has-bg");
      document.documentElement.style.setProperty("--beat", "0");
      resizeBg();
      bgCtx.clearRect(0, 0, bg.w, bg.h);
      if (bg.reactive && bg.playing && !prefersReduced()) {
        bg.raf = requestAnimationFrame(bgLoop);
      }
      return;
    }

    document.body.classList.add("has-bg");
    resizeBg();

    if (prefersReduced()) {
      if (bg.raf) {
        cancelAnimationFrame(bg.raf);
        bg.raf = 0;
      }
      drawBg(performance.now());
      return;
    }

    if (!bg.raf) bg.raf = requestAnimationFrame(bgLoop);
  }

  function syncBgUI() {
    document.querySelectorAll(".bg-option").forEach((button) => {
      const active = button.dataset.bg === state.bg;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if (els.bgReactive) {
      els.bgReactive.checked = state.bgReactive;
      els.bgReactive.disabled = state.bg === "none";
    }
  }

  function applyBgFromState() {
    bg.preset = BG_PRESETS.has(state.bg) ? state.bg : "none";
    bg.reactive = state.bgReactive;
    syncBgUI();
    startBg();
  }

  function setBgPreset(preset) {
    bgPreviewPreset = "";
    document.querySelectorAll(".bg-option.is-preview").forEach((button) => button.classList.remove("is-preview"));
    state.bg = BG_PRESETS.has(preset) ? preset : "none";
    applyBgFromState();
    writeHash();
  }

  function previewBgPreset(preset) {
    if (!BG_PRESETS.has(preset)) return;
    document.querySelectorAll(".bg-option").forEach((button) => {
      button.classList.toggle("is-preview", button.dataset.bg === preset && preset !== state.bg);
    });
    if (preset === state.bg) {
      bgPreviewPreset = "";
      applyBgFromState();
      return;
    }
    bgPreviewPreset = preset;
    bg.preset = preset;
    startBg();
  }

  function endBgPreview() {
    if (!bgPreviewPreset) return;
    bgPreviewPreset = "";
    document.querySelectorAll(".bg-option.is-preview").forEach((button) => button.classList.remove("is-preview"));
    applyBgFromState();
  }

  function setBgReactive(value) {
    state.bgReactive = Boolean(value);
    applyBgFromState();
    writeHash();
  }

  function setBgPlaying(playing) {
    bg.playing = Boolean(playing);
    if (bg.preset === "none") {
      if (bg.playing && bg.reactive && !bg.raf && !prefersReduced()) {
        bg.raf = requestAnimationFrame(bgLoop);
      } else if (!bg.playing && bg.raf) {
        cancelAnimationFrame(bg.raf);
        bg.raf = 0;
        document.documentElement.style.setProperty("--beat", "0");
        bg.mediaAt = 0;
      }
      return;
    }
    if (bg.reactive && !bg.raf && !prefersReduced()) {
      bg.raf = requestAnimationFrame(bgLoop);
    }
  }

  /* ---------- imagem de fundo ---------- */

  function applyBgImage() {
    const on = Boolean(state.bgImage);
    if (els.bgPhoto) {
      els.bgPhoto.style.backgroundImage = on ? `url("${state.bgImage}")` : "";
      els.bgPhoto.classList.toggle("is-on", on);
    }
    document.body.classList.toggle("has-photo", on);

    if (els.bgImageThumbWrap) els.bgImageThumbWrap.hidden = !on;
    if (els.bgImageThumb) {
      if (on) {
        if (els.bgImageThumb.getAttribute("src") !== state.bgImage) {
          els.bgImageThumb.src = state.bgImage;
        }
      } else {
        els.bgImageThumb.removeAttribute("src");
      }
    }
    if (els.bgImageClear) els.bgImageClear.hidden = !on;
    if (els.bgImageLabel) {
      els.bgImageLabel.textContent = on ? "Trocar imagem de fundo" : "Usar uma imagem de fundo";
    }
  }

  function clearBgImage() {
    state.bgImage = "";
    if (els.bgImage) els.bgImage.value = "";
    applyBgImage();
    scheduleHash();
    toast("Imagem de fundo removida.");
  }

  function loadBitmap(file) {
    if (typeof createImageBitmap === "function") {
      return createImageBitmap(file);
    }
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("imagem"));
      };
      img.src = url;
    });
  }

  function imageToDataUrl(source, maxSide, quality) {
    const width = source.width || source.naturalWidth || 0;
    const height = source.height || source.naturalHeight || 0;
    if (!width || !height) throw new Error("imagem");
    const scale = Math.min(1, maxSide / Math.max(width, height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(width * scale));
    canvas.height = Math.max(1, Math.round(height * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas");
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
    let dataUrl = canvas.toDataURL("image/webp", quality);
    if (!/^data:image\/webp/i.test(dataUrl)) {
      dataUrl = canvas.toDataURL("image/jpeg", quality);
    }
    return dataUrl;
  }

  async function compressImageFile(file, opts = {}) {
    const maxSide = opts.maxSide || 1500;
    const quality = opts.quality || .72;
    const softLimit = opts.softLimit || 420000;
    const hardLimit = opts.hardLimit || 480000;
    const source = await loadBitmap(file);
    try {
      let dataUrl = imageToDataUrl(source, maxSide, quality);
      if (dataUrl.length > softLimit) {
        dataUrl = imageToDataUrl(source, Math.round(maxSide * .73), Math.max(.45, quality - .1));
      }
      if (dataUrl.length > hardLimit) {
        dataUrl = imageToDataUrl(source, Math.round(maxSide * .6), Math.max(.4, quality - .17));
      }
      return dataUrl;
    } finally {
      if (typeof source.close === "function") source.close();
    }
  }

  function compressVariant(source, attempts, limit) {
    let dataUrl = "";
    for (const [side, quality] of attempts) {
      dataUrl = imageToDataUrl(source, side, quality);
      if (dataUrl.length <= limit) break;
    }
    return dataUrl;
  }

  async function compressPhotoVariants(file) {
    const source = await loadBitmap(file);
    try {
      const hd = compressVariant(source, [
        [1800, .87],
        [1600, .83],
        [1400, .79],
        [1200, .74],
        [1000, .68],
        [800, .62]
      ], 300000);
      const preview = compressVariant(source, [
        [480, .68],
        [420, .62],
        [360, .56],
        [300, .5],
        [240, .46]
      ], 35000);
      return { hd, preview };
    } finally {
      if (typeof source.close === "function") source.close();
    }
  }

  async function handleBgImageFile(file) {
    if (!file) return;
    if (!/^image\//i.test(file.type)) {
      toast("Escolha um arquivo de imagem.");
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      toast("Essa imagem é grande demais (máx. 25 MB).");
      return;
    }

    if (els.bgImageLabel) els.bgImageLabel.textContent = "Preparando imagem…";
    try {
      const dataUrl = await compressImageFile(file);
      state.bgImage = dataUrl;
      applyBgImage();
      writeHash();
      toast("Imagem de fundo aplicada.");
    } catch {
      toast("Não consegui usar essa imagem. Tenta outra.");
    } finally {
      if (els.bgImage) els.bgImage.value = "";
      if (els.bgImageLabel && !state.bgImage) {
        els.bgImageLabel.textContent = "Usar uma imagem de fundo";
      }
    }
  }

  /* ---------- imagem do card ---------- */

  function renderCardBanner() {
    const profile = state.profile;
    if (!profile) return;
    els.banner.style.background = profile.banner
      ? `url("${withSize(profile.banner, 600)}") center / cover no-repeat`
      : (profile.accent || "");
    updateGlow();
  }

  const PHOTO_SLOTS = [
    { x: "-36%", y: "4%", r: "-7deg" },
    { x: "-30%", y: "58%", r: "5deg" },
    { x: "62%", y: "-20%", r: "6deg" },
    { x: "70%", y: "60%", r: "-5deg" },
    { x: "26%", y: "80%", r: "3deg" }
  ];

  function photoPosition() {
    const used = new Set(state.photos.map((photo) => `${photo.x}|${photo.y}`));
    const free = PHOTO_SLOTS.find((slot) => !used.has(`${slot.x}|${slot.y}`));
    if (free) return free;
    const fallback = PHOTO_SLOTS[state.photos.length % PHOTO_SLOTS.length];
    return {
      x: fallback.x,
      y: fallback.y,
      r: `${(-7 + Math.random() * 14).toFixed(1)}deg`
    };
  }

  function validPhotoSrc(value) {
    return typeof value === "string"
      && (/^data:image\/(webp|jpeg|png);base64,/i.test(value) || /^https?:\/\/\S+$/i.test(value));
  }

  function photoPercent(value, fallback) {
    return typeof value === "string" && /^-?\d{1,4}(\.\d)?%$/.test(value) ? value : fallback;
  }

  function photoRotation(value, fallback) {
    return typeof value === "string" && /^-?\d{1,2}(\.\d)?deg$/.test(value) ? value : fallback;
  }

  function hdStorageKey(preview) {
    let hash = 2166136261;
    const text = String(preview || "");
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return `dp-hd-${(hash >>> 0).toString(36)}`;
  }

  function saveHdPhoto(photo) {
    if (!photo || !/^data:/i.test(photo.src) || photo.src === photo.preview) return;
    try { localStorage.setItem(hdStorageKey(photo.preview), photo.src); } catch {}
  }

  function readHdPhoto(preview) {
    if (!preview) return "";
    try {
      const stored = localStorage.getItem(hdStorageKey(preview));
      return validPhotoSrc(stored) ? stored : "";
    } catch {
      return "";
    }
  }

  function addPhoto(src, options = {}) {
    if (!validPhotoSrc(src)) return null;
    if (state.photos.length >= MAX_PHOTOS) {
      toast(`Você já tem ${MAX_PHOTOS} fotos. Remova uma para adicionar outra.`);
      return null;
    }
    const spot = options.spot || photoPosition();
    const photo = {
      id: (state.photoSeq += 1),
      src,
      preview: validPhotoSrc(options.preview) ? options.preview : src,
      caption: String(options.caption || "").slice(0, 60),
      x: photoPercent(options.x, spot.x),
      y: photoPercent(options.y, spot.y),
      r: photoRotation(options.r, spot.r),
      front: Boolean(options.front),
      fit: Boolean(options.fit)
    };
    saveHdPhoto(photo);
    state.photos.push(photo);
    renderPhotos();
    scheduleHash();
    return photo;
  }

  function removePhoto(id) {
    const removed = state.photos.find((photo) => photo.id === id);
    const next = state.photos.filter((photo) => photo.id !== id);
    if (next.length === state.photos.length) return;
    if (removed) {
      try { localStorage.removeItem(hdStorageKey(removed.preview)); } catch {}
    }
    state.photos = next;
    renderPhotos();
    scheduleHash();
    toast("Foto removida.");
  }

  function buildFloatingPhoto(photo) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "floating-photo";
    button.dataset.photoId = String(photo.id);
    button.style.setProperty("--photo-x", photo.x);
    button.style.setProperty("--photo-y", photo.y);
    button.style.setProperty("--photo-r", photo.r);
    button.classList.toggle("is-front", photo.front);
    button.classList.toggle("is-full", photo.fit);
    button.setAttribute("aria-label", photo.caption ? `Ver foto: ${photo.caption}` : "Ver foto flutuante");

    const img = document.createElement("img");
    img.alt = "";
    img.draggable = false;
    img.addEventListener("load", () => clampPhotoIntoView(button, photo));
    img.src = photo.src;

    const caption = document.createElement("span");
    caption.className = "floating-photo__caption";
    caption.textContent = photo.caption;

    const open = document.createElement("span");
    open.className = "floating-photo__open";
    open.setAttribute("aria-hidden", "true");
    open.innerHTML = PHOTO_OPEN_ICON;

    button.append(img, caption, open);
    button.style.setProperty("--photo-dur", `${(6.2 + (photo.id % 5) * .45).toFixed(1)}s`);
    button.style.setProperty("--photo-delay", `${(-((photo.id * .73) % 3.2)).toFixed(2)}s`);
    bindFloatingPhoto(button, photo);
    return button;
  }

  function renderFloatingPhotos() {
    if (!els.floatingPhotos) return;
    els.floatingPhotos.dataset.count = String(state.photos.length);
    els.floatingPhotos.replaceChildren(...state.photos.map(buildFloatingPhoto));
    updatePhotoUI();
    requestAnimationFrame(() => refreshFloatingPhotoPositions());
  }

  function clampPhotoIntoView(button, photo) {
    if (!button || !photo) return;
    const stage = button.offsetParent || button.parentElement;
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();
    const vh = document.documentElement.clientHeight;
    if (stageRect.bottom < -40 || stageRect.top > vh + 40) return;
    const rect = button.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const vw = document.documentElement.clientWidth;
    const edge = 8;
    const minLeft = edge - rect.width * .55;
    const maxLeft = vw - edge - rect.width * .45;
    const minTop = edge - rect.height * .55;
    const maxTop = vh - edge - rect.height * .45;
    let dx = 0;
    let dy = 0;
    if (rect.left < minLeft) dx = minLeft - rect.left;
    else if (rect.left > maxLeft) dx = maxLeft - rect.left;
    if (rect.top < minTop) dy = minTop - rect.top;
    else if (rect.top > maxTop) dy = maxTop - rect.top;
    if (!dx && !dy) return;
    const left = rect.left - stageRect.left + dx;
    const top = rect.top - stageRect.top + dy;
    photo.x = `${(left / Math.max(1, stageRect.width) * 100).toFixed(1)}%`;
    photo.y = `${(top / Math.max(1, stageRect.height) * 100).toFixed(1)}%`;
    button.style.setProperty("--photo-x", photo.x);
    button.style.setProperty("--photo-y", photo.y);
    scheduleHash();
  }

  function refreshFloatingPhotoPositions(options = {}) {
    if (!els.floatingPhotos) return;
    els.floatingPhotos.querySelectorAll(".floating-photo").forEach((button) => {
      const photo = state.photos.find((item) => String(item.id) === button.dataset.photoId);
      if (!photo) return;
      button.style.setProperty("--photo-x", photo.x);
      button.style.setProperty("--photo-y", photo.y);
      if (options.peek) {
        peekPhotoFromCard(button, photo);
      } else {
        clampPhotoIntoView(button, photo);
      }
    });
  }

  function peekPhotoFromCard(button, photo) {
    if (!button || !photo || photo.front || !els.card) return false;
    const stage = button.offsetParent || button.parentElement;
    if (!stage) return false;
    const stageRect = stage.getBoundingClientRect();
    const vh = document.documentElement.clientHeight;
    if (stageRect.bottom < -40 || stageRect.top > vh + 40) return false;
    const card = els.card.getBoundingClientRect();
    const rect = button.getBoundingClientRect();
    if (!card.width || !rect.width) return false;
    const overlapW = Math.max(0, Math.min(rect.right, card.right) - Math.max(rect.left, card.left));
    const overlapH = Math.max(0, Math.min(rect.bottom, card.bottom) - Math.max(rect.top, card.top));
    const hidden = (overlapW * overlapH) / (rect.width * rect.height);
    if (hidden < .62) {
      clampPhotoIntoView(button, photo);
      return false;
    }

    const moves = [
      { dx: card.left + rect.width * .4 - rect.right, dy: 0 },
      { dx: card.right - rect.width * .4 - rect.left, dy: 0 },
      { dx: 0, dy: card.top + rect.height * .4 - rect.bottom },
      { dx: 0, dy: card.bottom - rect.height * .4 - rect.top }
    ];
    moves.sort((a, b) => Math.abs(a.dx) + Math.abs(a.dy) - (Math.abs(b.dx) + Math.abs(b.dy)));
    let move = moves[0];
    if (!state.shareMode && move.dy > 0) {
      const sideways = moves.find((item) => item.dx !== 0);
      if (sideways) move = sideways;
    }
    if (!move || (Math.abs(move.dx) < 1 && Math.abs(move.dy) < 1)) return false;

    const vw = document.documentElement.clientWidth;
    let viewLeft = rect.left + move.dx;
    let viewTop = rect.top + move.dy;
    viewLeft = Math.max(-rect.width * .45, Math.min(vw - rect.width * .55, viewLeft));
    viewTop = Math.max(-rect.height * .45, Math.min(vh - rect.height * .55, viewTop));

    photo.x = `${((viewLeft - stageRect.left) / Math.max(1, stageRect.width) * 100).toFixed(1)}%`;
    photo.y = `${((viewTop - stageRect.top) / Math.max(1, stageRect.height) * 100).toFixed(1)}%`;

    button.classList.add("is-peeking");
    button.style.setProperty("--photo-x", photo.x);
    button.style.setProperty("--photo-y", photo.y);
    setTimeout(() => button.classList.remove("is-peeking"), 460);
    scheduleHash();
    return true;
  }

  function renderPhotoList() {
    if (!els.photoList) return;
    if (state.shareMode) {
      els.photoList.replaceChildren();
      return;
    }
    els.photoList.replaceChildren();
    state.photos.forEach((photo, index) => {
      const item = document.createElement("div");
      item.className = "photo-item";

      const img = document.createElement("img");
      img.src = photo.preview || photo.src;
      img.alt = "";
      img.draggable = false;

      const fields = document.createElement("div");
      fields.className = "photo-item__fields";

      const caption = document.createElement("input");
      caption.type = "text";
      caption.className = "photo-item__caption";
      caption.maxLength = 60;
      caption.placeholder = `Legenda da foto ${index + 1} (opcional)`;
      caption.value = photo.caption;
      caption.setAttribute("aria-label", `Legenda da foto ${index + 1}`);
      caption.addEventListener("input", () => {
        photo.caption = caption.value.slice(0, 60);
        syncFloatingPhoto(photo);
        scheduleHash();
      });

      const actions = document.createElement("div");
      actions.className = "photo-item__actions";

      const frontLabel = document.createElement("label");
      frontLabel.className = "photo-item__front";
      const front = document.createElement("input");
      front.type = "checkbox";
      front.checked = photo.front;
      front.setAttribute("aria-label", `Deixar a foto ${index + 1} na frente do card`);
      front.addEventListener("change", () => {
        photo.front = front.checked;
        const button = syncFloatingPhoto(photo);
        if (button && !photo.front) peekPhotoFromCard(button, photo);
        scheduleHash();
      });
      const frontText = document.createElement("span");
      frontText.textContent = "Na frente do card";
      frontLabel.append(front, frontText);

      const fullLabel = document.createElement("label");
      fullLabel.className = "photo-item__full";
      const full = document.createElement("input");
      full.type = "checkbox";
      full.checked = photo.fit;
      full.setAttribute("aria-label", `Ver a foto ${index + 1} inteira, sem cortar`);
      full.title = "Mostra a foto toda, sem cortar";
      full.addEventListener("change", () => {
        photo.fit = full.checked;
        const button = syncFloatingPhoto(photo);
        if (button && !photo.front) peekPhotoFromCard(button, photo);
        scheduleHash();
      });
      const fullText = document.createElement("span");
      fullText.textContent = "Foto inteira";
      fullLabel.append(full, fullText);

      const flags = document.createElement("div");
      flags.className = "photo-item__flags";
      flags.append(frontLabel, fullLabel);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "photo-item__remove";
      remove.textContent = "Remover";
      remove.setAttribute("aria-label", `Remover a foto ${index + 1}`);
      remove.addEventListener("click", () => removePhoto(photo.id));

      actions.append(flags, remove);
      fields.append(caption, actions);
      item.append(img, fields);
      els.photoList.append(item);
    });
    updatePhotoUI();
  }

  function syncFloatingPhoto(photo) {
    if (!els.floatingPhotos) return null;
    const button = els.floatingPhotos.querySelector(`[data-photo-id="${photo.id}"]`);
    if (!button) return null;
    button.classList.toggle("is-front", photo.front);
    button.classList.toggle("is-full", photo.fit);
    button.style.setProperty("--photo-x", photo.x);
    button.style.setProperty("--photo-y", photo.y);
    button.style.setProperty("--photo-r", photo.r);
    button.setAttribute("aria-label", photo.caption ? `Ver foto: ${photo.caption}` : "Ver foto flutuante");
    const caption = button.querySelector(".floating-photo__caption");
    if (caption) caption.textContent = photo.caption;
    clampPhotoIntoView(button);
    return button;
  }

  function updatePhotoUI() {
    const count = state.photos.length;
    const full = count >= MAX_PHOTOS;
    if (els.photoCount) els.photoCount.textContent = `${count}/${MAX_PHOTOS}`;
    if (els.cardImageLabel) {
      els.cardImageLabel.textContent = full ? "Limite de 5 fotos" : "Adicionar foto";
      const pick = els.cardImageLabel.closest("label");
      if (pick) pick.classList.toggle("is-disabled", full);
    }
    if (els.cardImageInput) els.cardImageInput.disabled = full;
    if (els.cardImageUrlInput) els.cardImageUrlInput.disabled = full;
    if (els.cardImageUrlApply) els.cardImageUrlApply.disabled = full;
  }

  function renderPhotos() {
    renderPhotoList();
    renderFloatingPhotos();
    updatePhotoUI();
  }

  function applyCardImage() {
    renderPhotos();
  }

  async function handleCardImageFile(file) {
    if (!file) return;
    if (!/^image\//i.test(file.type)) {
      toast("Escolha um arquivo de imagem.");
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      toast("Essa imagem é grande demais (máx. 25 MB).");
      return;
    }
    if (state.photos.length >= MAX_PHOTOS) {
      toast(`Você já tem ${MAX_PHOTOS} fotos. Remova uma para adicionar outra.`);
      if (els.cardImageInput) els.cardImageInput.value = "";
      return;
    }

    if (els.cardImageLabel) els.cardImageLabel.textContent = "Preparando imagem…";
    try {
      const { hd, preview } = await compressPhotoVariants(file);
      const photo = addPhoto(hd, { preview });
      if (photo) toast("Foto adicionada em HD. Escreva uma legenda se quiser.");
    } catch {
      toast("Não consegui usar essa imagem. Tenta outra.");
    } finally {
      if (els.cardImageInput) els.cardImageInput.value = "";
      updatePhotoUI();
    }
  }

  function applyCardImageUrl() {
    const value = els.cardImageUrlInput ? els.cardImageUrlInput.value.trim() : "";
    if (!/^https?:\/\/\S+$/i.test(value)) {
      toast("Cole um link de imagem começando com https://.");
      return;
    }
    if (state.photos.length >= MAX_PHOTOS) {
      toast(`Você já tem ${MAX_PHOTOS} fotos. Remova uma para adicionar outra.`);
      return;
    }
    const test = new Image();
    test.onload = () => {
      const photo = addPhoto(value);
      if (photo && els.cardImageUrlInput) els.cardImageUrlInput.value = "";
      if (photo) toast("Foto adicionada. Escreva uma legenda se quiser.");
    };
    test.onerror = () => toast("Não consegui carregar essa imagem.");
    test.src = value;
  }

  function openPhotoDialog(photo) {
    if (!photo || !els.photoDialog) return;
    if (els.photoDialogImg) {
      els.photoDialogImg.src = photo.src;
      els.photoDialogImg.alt = "Foto ampliada";
    }
    if (els.photoDialogCaption) {
      els.photoDialogCaption.textContent = photo.caption;
      els.photoDialogCaption.hidden = !photo.caption;
    }
    if (typeof els.photoDialog.showModal === "function") els.photoDialog.showModal();
    else els.photoDialog.setAttribute("open", "");
  }

  function cancelPhotoThrow(button) {
    if (!button) return;
    if (button._throwRaf) {
      cancelAnimationFrame(button._throwRaf);
      button._throwRaf = 0;
    }
    button.classList.remove("is-thrown");
    button.style.setProperty("--photo-tilt", "0deg");
  }

  function throwFloatingPhoto(button, photo, vx, vy) {
    if (!button || !photo) return;
    cancelPhotoThrow(button);
    if (Math.abs(vx) < .04 && Math.abs(vy) < .04) {
      peekPhotoFromCard(button, photo);
      return;
    }
    const stage = button.offsetParent || button.parentElement;
    if (!stage) return;
    const stageRect = stage.getBoundingClientRect();
    const rect = button.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;
    const edge = 8;
    const minLeft = edge - rect.width * .55;
    const maxLeft = vw - edge - rect.width * .45;
    const minTop = edge - rect.height * .55;
    const maxTop = vh - edge - rect.height * .45;
    let left = rect.left - stageRect.left;
    let top = rect.top - stageRect.top;
    let speedX = vx * 16;
    let speedY = vy * 16;
    const started = performance.now();
    let last = started;
    button.classList.add("is-thrown");

    const finish = () => {
      button._throwRaf = 0;
      cancelPhotoThrow(button);
      if (photo.front) clampPhotoIntoView(button, photo);
      else peekPhotoFromCard(button, photo);
      scheduleHash();
    };

    const step = (now) => {
      const dt = Math.min(32, now - last) / 16.67;
      last = now;
      left += speedX * dt;
      top += speedY * dt;

      const viewLeft = stageRect.left + left;
      const viewTop = stageRect.top + top;
      if (viewLeft < minLeft) {
        left = minLeft - stageRect.left;
        speedX = Math.abs(speedX) * .32;
      } else if (viewLeft > maxLeft) {
        left = maxLeft - stageRect.left;
        speedX = -Math.abs(speedX) * .32;
      }
      if (viewTop < minTop) {
        top = minTop - stageRect.top;
        speedY = Math.abs(speedY) * .32;
      } else if (viewTop > maxTop) {
        top = maxTop - stageRect.top;
        speedY = -Math.abs(speedY) * .32;
      }

      speedX *= .9;
      speedY *= .9;

      photo.x = `${(left / Math.max(1, stageRect.width) * 100).toFixed(1)}%`;
      photo.y = `${(top / Math.max(1, stageRect.height) * 100).toFixed(1)}%`;
      button.style.setProperty("--photo-x", photo.x);
      button.style.setProperty("--photo-y", photo.y);
      const tilt = Math.max(-6, Math.min(6, speedX * .45));
      button.style.setProperty("--photo-tilt", `${tilt.toFixed(1)}deg`);

      if ((Math.abs(speedX) > .18 || Math.abs(speedY) > .18) && now - started < 1150) {
        button._throwRaf = requestAnimationFrame(step);
      } else {
        finish();
      }
    };
    button._throwRaf = requestAnimationFrame(step);
  }

  function bindFloatingPhoto(button, photo) {
    let drag = null;

    button.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      cancelPhotoThrow(button);
      const stage = button.offsetParent || button.parentElement;
      if (!stage) return;
      const stageRect = stage.getBoundingClientRect();
      const rect = button.getBoundingClientRect();
      drag = {
        id: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        lastX: event.clientX,
        lastY: event.clientY,
        lastT: performance.now(),
        vx: 0,
        vy: 0,
        left: rect.left - stageRect.left,
        top: rect.top - stageRect.top,
        stageLeft: stageRect.left,
        stageTop: stageRect.top,
        stageW: stageRect.width,
        stageH: stageRect.height,
        photoW: rect.width,
        photoH: rect.height,
        moved: false
      };
      try { button.setPointerCapture(event.pointerId); } catch {}
      button.classList.add("is-dragging");
    });

    button.addEventListener("pointermove", (event) => {
      if (!drag || event.pointerId !== drag.id) return;
      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;
      if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 4) return;
      drag.moved = true;

      const now = performance.now();
      const dt = Math.max(1, now - drag.lastT);
      drag.vx = drag.vx * .62 + ((event.clientX - drag.lastX) / dt) * .38;
      drag.vy = drag.vy * .62 + ((event.clientY - drag.lastY) / dt) * .38;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      drag.lastT = now;

      const vw = document.documentElement.clientWidth;
      const vh = document.documentElement.clientHeight;
      const edge = 8;
      const minVLeft = edge - drag.photoW * .55;
      const maxVLeft = vw - edge - drag.photoW * .45;
      const minVTop = edge - drag.photoH * .55;
      const maxVTop = vh - edge - drag.photoH * .45;
      const viewLeft = Math.max(minVLeft, Math.min(maxVLeft, drag.stageLeft + drag.left + dx));
      const viewTop = Math.max(minVTop, Math.min(maxVTop, drag.stageTop + drag.top + dy));
      const left = viewLeft - drag.stageLeft;
      const top = viewTop - drag.stageTop;

      photo.x = `${(left / Math.max(1, drag.stageW) * 100).toFixed(1)}%`;
      photo.y = `${(top / Math.max(1, drag.stageH) * 100).toFixed(1)}%`;
      button.style.setProperty("--photo-x", photo.x);
      button.style.setProperty("--photo-y", photo.y);
      event.preventDefault();
    });

    const finishDrag = (event) => {
      if (!drag || (event.pointerId !== undefined && event.pointerId !== drag.id)) return;
      const moved = drag.moved;
      const idle = performance.now() - drag.lastT;
      const vx = idle > 120 ? 0 : drag.vx;
      const vy = idle > 120 ? 0 : drag.vy;
      drag = null;
      button.classList.remove("is-dragging");
      try { button.releasePointerCapture(event.pointerId); } catch {}
      if (moved) {
        photoDragMoved = true;
        throwFloatingPhoto(button, photo, vx, vy);
        setTimeout(() => { photoDragMoved = false; }, 160);
      }
    };

    button.addEventListener("pointerup", finishDrag);
    button.addEventListener("pointercancel", finishDrag);
    button.addEventListener("click", () => {
      if (photoDragMoved) return;
      openPhotoDialog(photo);
    });
  }

  /* ---------- começo da música ---------- */

  function parseStart(value) {
    const text = String(value || "").trim();
    if (!text) return 0;
    if (text.includes(":")) {
      const parts = text.split(":").map((part) => parseInt(part, 10));
      if (parts.some((part) => !Number.isFinite(part) || part < 0)) return null;
      return parts.reduce((total, part) => total * 60 + part, 0);
    }
    const seconds = parseInt(text, 10);
    return Number.isFinite(seconds) && seconds >= 0 ? seconds : null;
  }

  function renderStartField() {
    const track = state.track;
    const usable = Boolean(track) && (
      (track.mode === "preview" && Boolean(track.previewUrl))
      || (track.mode === "youtube" && !state.youtubeError)
      || (track.mode === "soundcloud" && !state.scError)
      || ((track.type === "track" || track.type === "episode") && !(track.mode === "spotify" && state.playerMode === "embed"))
    );
    els.startAt.hidden = !usable;
    if (!usable) return;
    if (document.activeElement !== els.startInput) {
      els.startInput.value = fmtTime(state.startAt);
    }

    let total = 0;
    if (track.mode === "preview" && track.previewUrl) {
      const audio = state.audio;
      total = audio && Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 30;
    } else if (track.mode === "spotify") {
      total = (track.durationMs || state.spotifyDuration || 0) / 1000;
    } else if (track.mode === "youtube") {
      total = (state.youtubeDuration || track.durationMs || 0) / 1000;
    } else if (track.mode === "soundcloud") {
      total = (state.scDuration || track.durationMs || 0) / 1000;
    }

    const over = total > 0 && state.startAt > total - 2;
    els.startWarning.hidden = !over;
    if (over) {
      els.startWarning.textContent = track.mode === "preview"
        ? `A prévia tem ${fmtTime(total)}. Escolha um ponto pelo menos 2 segundos antes do fim.`
        : track.mode === "youtube"
          ? `Esse vídeo tem ${fmtTime(total)}. Escolha um ponto pelo menos 2 segundos antes do fim.`
          : track.mode === "soundcloud"
            ? `Essa faixa tem ${fmtTime(total)}. Escolha um ponto pelo menos 2 segundos antes do fim.`
            : `Essa versão tem ${fmtTime(total)}. Entre no Spotify para ouvir a faixa completa ou escolha um ponto pelo menos 2 segundos antes do fim.`;
    }
  }

  function resetStartSeek() {
    state.startApplied = false;
    state.startSeeking = false;
    state.startSeekDeadline = 0;
    state.startSeekAttempts = 0;
    state.startLastSeek = 0;
    state.startSeekUiUntil = 0;
    state.youtubeStartPending = false;
    state.youtubeStartDeadline = 0;
    state.youtubeStartAttempts = 0;
    state.scStartPending = false;
    state.scStartDeadline = 0;
    state.scStartAttempts = 0;
  }

  function knownTrackDurationSeconds() {
    const track = state.track;
    if (!track) return 0;
    if (track.mode === "preview") {
      const audio = state.audio;
      return audio && state.audioTrackId === track.id && Number.isFinite(audio.duration) && audio.duration > 0
        ? audio.duration
        : 30;
    }
    if (track.mode === "spotify") return (track.durationMs || state.spotifyDuration || 0) / 1000;
    if (track.mode === "youtube") return (state.youtubeDuration || track.durationMs || 0) / 1000;
    if (track.mode === "soundcloud") return (state.scDuration || track.durationMs || 0) / 1000;
    return 0;
  }

  function autoplayNeedsTap() {
    return Boolean(state.autoplay && state.autoStartPending);
  }

  function armAutoplayNotice(track) {
    if (!track || state.autoplayNoticeShown) return;
    state.autoplayNoticeShown = true;
    setTimeout(() => {
      if (state.track !== track || !state.autoStartPending) return;
      const playing = (track.mode === "spotify" && !state.spotifyPaused)
        || (track.mode === "youtube" && state.youtubePlaying)
        || (track.mode === "soundcloud" && state.scPlaying)
        || (track.mode === "preview" && state.audio && !state.audio.paused);
      if (playing) return;
      toast("O navegador bloqueou o som automático. Toque na página ou no play para ouvir.");
    }, 1600);
  }

  function validateStartDuration(totalSeconds, announce = true) {
    const total = Number(totalSeconds) || 0;
    if (state.startAt <= 0 || total <= 2) return false;
    if (state.startAt < total - 2) return false;
    state.startAt = 0;
    resetStartSeek();
    renderStartField();
    scheduleHash();
    if (announce) toast(`Essa faixa tem ${fmtTime(total)}. Comecei do início.`);
    return true;
  }

  function setStartAt(seconds) {
    let value = Math.max(0, Math.min(6 * 3600, Math.round(Number(seconds) || 0)));
    const total = knownTrackDurationSeconds();
    if (total > 2 && value >= total - 2) {
      value = 0;
      toast(`Essa faixa tem ${fmtTime(total)}. Comecei do início.`);
    }
    state.startAt = value;
    resetStartSeek();
    renderStartField();
    writeHash();

    if (state.track?.mode === "preview" && state.audio && !state.audio.paused) {
      applyPreviewStart(state.audio);
    } else if (state.track?.mode === "spotify" && spotifyController && !state.spotifyPaused && state.startAt > 0) {
      requestSpotifyStart();
    } else if (state.track?.mode === "youtube" && youtubePlayer && state.youtubePlaying && state.startAt > 0) {
      applyYouTubeStart();
    } else if (state.track?.mode === "soundcloud" && scWidget && state.scPlaying && state.startAt > 0) {
      applySoundCloudStart();
    }
  }

  function currentPlaybackSeconds() {
    const track = state.track;
    if (!track) return 0;
    if (track.mode === "preview" && state.audio && state.audioTrackId === track.id) {
      return Number.isFinite(state.audio.currentTime) ? state.audio.currentTime : 0;
    }
    if (track.mode === "spotify" && state.playerMode !== "embed") {
      return (state.spotifyPosition || 0) / 1000;
    }
    if (track.mode === "youtube") {
      return (state.youtubePosition || 0) / 1000;
    }
    if (track.mode === "soundcloud") {
      return (state.scPosition || 0) / 1000;
    }
    return 0;
  }

  function applyPreviewStart(audio) {
    if (!audio || state.startApplied || state.startAt <= 0) return;
    if (state.audioTrackId !== state.track?.id) return;
    const duration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 30;
    const target = Math.max(0, Math.min(state.startAt, duration - 0.25));
    try {
      audio.currentTime = target;
      state.startApplied = true;
      setProgressUI(target * 1000, duration * 1000);
    } catch {}
  }

  function requestSpotifyStart() {
    if (!spotifyController || state.track?.mode !== "spotify" || state.startAt <= 0) return;
    state.startApplied = false;
    state.startSeeking = true;
    state.startSeekDeadline = 0;
    state.startSeekAttempts = 0;
    state.startLastSeek = 0;
    state.startSeekUiUntil = 0;
  }

  /* ---------- perfil ---------- */

  async function fetchProfile(id) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    try {
      const res = await fetch(`${JAPI}/${encodeURIComponent(id)}`, {
        signal: controller.signal,
        headers: { accept: "application/json" }
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json || !json.data || !json.data.id) {
        const err = new Error(json?.data?.message || json?.error || `HTTP ${res.status}`);
        err.status = res.status;
        err.reason = json?.data?.message || json?.error || "";
        throw err;
      }
      return json;
    } finally {
      clearTimeout(timer);
    }
  }

  function badgeList(flags) {
    if (!Array.isArray(flags)) return [];
    const out = [];
    const seen = new Set();
    for (const flag of flags) {
      const badge = BADGE_ASSETS[flag];
      if (!badge || seen.has(badge.src)) continue;
      seen.add(badge.src);
      out.push(badge);
    }
    return out;
  }

  function mapProfile(json) {
    const d = json.data || {};
    const presence = json.presence && !json.presence.error ? json.presence : null;
    const discriminator = d.discriminator && !/^0+$/.test(String(d.discriminator)) ? `#${d.discriminator}` : "";
    const accent = d.banner_color || (d.accent_color != null
      ? `#${Number(d.accent_color).toString(16).padStart(6, "0")}`
      : "");
    const decoration = d.avatar_decoration_data?.asset
      ? `https://cdn.discordapp.com/avatar-decoration-presets/${d.avatar_decoration_data.asset}.png?size=160`
      : "";
    return {
      id: String(d.id),
      username: d.username || "desconhecido",
      displayName: d.global_name || d.username || "Sem nome",
      handle: `${d.username || ""}${discriminator}`,
      avatar: d.avatarURL || d.defaultAvatarURL || "",
      banner: d.bannerURL || "",
      accent,
      decoration,
      badges: badgeList(d.public_flags_array),
      createdAt: d.createdAt || "",
      status: presence?.status || ""
    };
  }

  async function loadProfile(raw) {
    if (state.loading) return;
    const id = extractId(raw);
    if (!id) {
      setError("Esse não parece um ID do Discord. São só números, com 15 a 21 dígitos.");
      els.idInput.focus();
      return;
    }

    els.idInput.value = id;
    setError("");
    const token = ++state.loadToken;
    state.loading = true;
    els.submit.disabled = true;
    els.submit.textContent = "Buscando";
    els.card.classList.add("is-loading");
    els.card.setAttribute("aria-busy", "true");

    try {
      const cached = profileCache.get(id);
      const fresh = cached && Date.now() - cached.at < 300000;
      const json = fresh ? cached.json : await fetchProfile(id);
      if (!fresh) profileCache.set(id, { at: Date.now(), json });
      if (token !== state.loadToken) return;

      state.profile = mapProfile(json);
      renderProfile();
      saveId(id);

      if (window.matchMedia("(max-width: 980px)").matches) {
        setTimeout(() => els.card.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth", block: "center" }), 160);
      }
    } catch (err) {
      if (token !== state.loadToken) return;
      const reason = String(err.reason || err.message || "");
      let message = "Não consegui falar com a API agora. Tenta de novo em instantes.";
      if (/unknown user/i.test(reason)) message = "Não achei esse ID. Confere se copiou certo.";
      else if (err.status === 429) message = "Muitas buscas seguidas. Espera um pouco e tenta de novo.";
      else if (err.status === 400 || err.status === 404) message = "Esse ID não existe ou não é público.";
      setError(message);
      if (state.shareMode && !state.profile) {
        els.name.textContent = "Card indisponível";
        els.handle.textContent = "Não consegui carregar esse perfil.";
        els.example.hidden = true;
      }
    } finally {
      if (token === state.loadToken) {
        state.loading = false;
        els.submit.disabled = false;
        els.submit.textContent = "Montar";
        els.card.classList.remove("is-loading");
        els.card.setAttribute("aria-busy", "false");
      }
    }
  }

  /* ---------- render do card ---------- */

  function renderProfile() {
    const p = state.profile;
    if (!p) { renderEmpty(); return; }

    els.card.classList.remove("is-empty");
    els.name.textContent = p.displayName;
    els.handle.textContent = `@${p.handle}`;
    if (state.shareMode) {
      document.title = `${p.displayName} — disperfil`;
      els.shareHeading.textContent = `Perfil de ${p.displayName} no Discord`;
    }

    renderCardBanner();

    els.avatar.style.backgroundImage = p.avatar ? `url("${withSize(p.avatar, 256)}")` : "";

    if (p.decoration) {
      els.decoration.onerror = () => { els.decoration.hidden = true; };
      els.decoration.src = p.decoration;
      els.decoration.hidden = false;
    } else {
      els.decoration.hidden = true;
      els.decoration.removeAttribute("src");
    }

    if (p.status && STATUS_LABELS[p.status]) {
      els.dot.hidden = false;
      els.dot.dataset.status = p.status;
      els.dot.title = STATUS_LABELS[p.status];
      els.dot.setAttribute("aria-label", `Status: ${STATUS_LABELS[p.status]}`);
    } else {
      els.dot.hidden = true;
      els.dot.removeAttribute("data-status");
      els.dot.removeAttribute("aria-label");
    }

    els.badges.replaceChildren();
    if (p.badges.length) {
      for (const badge of p.badges.slice(0, 6)) {
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.src = badge.src;
        img.alt = badge.label;
        img.title = badge.label;
        img.width = 22;
        img.height = 22;
        img.decoding = "async";
        li.append(img);
        els.badges.append(li);
      }
      if (p.badges.length > 6) {
        const more = document.createElement("li");
        more.className = "card__badges-more";
        more.textContent = `+${p.badges.length - 6}`;
        els.badges.append(more);
      }
      els.badges.hidden = false;
    } else {
      els.badges.hidden = true;
    }

    els.divider.hidden = false;
    els.since.textContent = p.createdAt ? `No Discord desde ${fmtDate(p.createdAt)}` : "";
    els.since.hidden = !p.createdAt;
    els.example.hidden = true;
    els.actions.hidden = false;
    if (els.stageShare) els.stageShare.hidden = false;
    if (els.shareNameHint) els.shareNameHint.hidden = false;

    renderStatus();
    renderCardDetails();
    renderMusic();
    renderCardLinks();
    updateGlow();
    writeHash();
    refreshFloatingPhotoPositions({ peek: true });

    els.card.classList.remove("is-fresh");
    void els.card.offsetWidth;
    els.card.classList.add("is-fresh");
    setTimeout(() => els.card.classList.remove("is-fresh"), 720);
  }

  function renderEmpty() {
    els.card.classList.add("is-empty");
    els.card.classList.remove("is-fresh");
    els.name.textContent = "Seu card aparece aqui";
    els.handle.textContent = "Cole um ID pra começar";
    els.banner.style.background = "";
    els.avatar.style.backgroundImage = "";
    els.decoration.hidden = true;
    els.decoration.removeAttribute("src");
    els.dot.hidden = true;
    els.dot.removeAttribute("data-status");
    els.dot.removeAttribute("aria-label");
    els.badges.replaceChildren();
    els.badges.hidden = true;
    els.divider.hidden = true;
    els.statusEl.hidden = true;
    els.cardBio.hidden = true;
    els.cardBioText.textContent = "";
    els.cardLocation.hidden = true;
    els.cardLocationText.textContent = "";
    els.music.hidden = true;
    els.cardLinks.replaceChildren();
    els.cardLinks.hidden = true;
    els.since.hidden = true;
    els.example.hidden = false;
    els.actions.hidden = true;
    if (els.stageShare) els.stageShare.hidden = true;
    if (els.shareNameHint) els.shareNameHint.hidden = true;
    stopAudio(true);
    destroySpotifyPlayer();
    destroyYouTubePlayer();
    destroySoundCloudPlayer();
    hideSpotifyEmbed(true);
    updateGlow();
  }

  function updateGlow() {
    const p = state.profile;
    if (!p) {
      els.glow.style.backgroundImage = "";
      els.glow.style.backgroundColor = "#5b4bff";
      return;
    }
    if (p.banner) {
      els.glow.style.backgroundImage = `url("${withSize(p.banner, 600)}")`;
      els.glow.style.backgroundColor = "transparent";
    } else {
      els.glow.style.backgroundImage = "";
      els.glow.style.backgroundColor = p.accent || "#5b4bff";
    }
  }

  function renderStatus() {
    const text = state.status.trim();
    const show = Boolean(state.profile) && Boolean(text);
    els.statusEl.hidden = !show;
    els.statusText.textContent = text;
  }

  /* ---------- redes ---------- */

  function detectLink(raw) {
    let text = String(raw || "").trim();
    if (!text) return null;
    if (!/^https?:\/\//i.test(text)) text = `https://${text}`;

    let url;
    try { url = new URL(text); } catch { return null; }
    if (!/^https?:$/.test(url.protocol)) return null;
    if (!url.hostname || !url.hostname.includes(".")) return null;
    if (url.hostname === "localhost" || url.hostname.endsWith(".local")) return null;

    const host = url.hostname.replace(/^www\./i, "").toLowerCase();
    const segments = url.pathname.split("/").filter(Boolean).map((part) => {
      try { return decodeURIComponent(part); } catch { return part; }
    });

    let platform = "website";
    let handle = host;
    let prefix = "";

    const first = () => (segments[0] || "").replace(/^@/, "");

    if (host === "instagram.com" || host === "instagr.am") {
      platform = "instagram";
      handle = first();
      prefix = "@";
    } else if (host === "tiktok.com" || host.endsWith(".tiktok.com")) {
      platform = "tiktok";
      handle = first();
      prefix = "@";
    } else if (host === "x.com" || host === "twitter.com") {
      platform = "x";
      handle = first();
      prefix = "@";
    } else if (host === "youtube.com" || host === "m.youtube.com" || host === "youtu.be") {
      platform = "youtube";
      if (segments[0] === "channel" || segments[0] === "c" || segments[0] === "user") {
        handle = segments[1] || "YouTube";
        prefix = "";
      } else if (segments[0] === "watch" || host === "youtu.be") {
        handle = "YouTube";
        prefix = "";
      } else {
        handle = first();
        prefix = "@";
      }
    } else if (host === "twitch.tv") {
      platform = "twitch";
      handle = first();
      prefix = "@";
    } else if (host === "github.com") {
      platform = "github";
      handle = first();
      prefix = "@";
    } else if (host === "spotify.com" || host === "open.spotify.com" || host === "play.spotify.com") {
      platform = "spotify";
      const userIndex = segments.indexOf("user");
      handle = userIndex >= 0 ? (segments[userIndex + 1] || "") : "";
      if (!handle) handle = "Spotify";
      prefix = "";
    } else {
      platform = "website";
      handle = host;
      prefix = "";
    }

    const info = LINK_PLATFORMS[platform];
    const cleanHandle = String(handle || "").trim().slice(0, 30);
    if (cleanHandle) {
      handle = cleanHandle;
    } else {
      handle = info.label;
      prefix = "";
    }

    url.hash = "";
    const href = url.href.replace(/\/+$/, "");

    return {
      platform,
      label: info.label,
      handle: `${prefix}${handle}`,
      url: href,
      icon: info.icon
    };
  }

  function setLinkError(message) {
    const text = String(message || "");
    els.linkError.textContent = text;
    els.linkError.hidden = !text;
    els.linkInput.setAttribute("aria-invalid", text ? "true" : "false");
  }

  function renderLinkChips() {
    els.linkChips.replaceChildren();
    if (!state.links.length) {
      els.linkChips.hidden = true;
      return;
    }

    for (const link of state.links) {
      const li = document.createElement("li");
      li.className = "link-chip";

      const img = document.createElement("img");
      img.src = link.icon;
      img.alt = "";
      img.width = 16;
      img.height = 16;
      img.loading = "lazy";

      const text = document.createElement("span");
      text.textContent = link.handle;
      text.title = `${link.label}: ${link.handle}`;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "link-chip__remove";
      remove.dataset.url = link.url;
      remove.setAttribute("aria-label", `Remover ${link.label}`);
      remove.textContent = "×";

      li.append(img, text, remove);
      els.linkChips.append(li);
    }

    els.linkChips.hidden = false;
  }

  function renderCardLinks() {
    els.cardLinks.replaceChildren();
    const show = Boolean(state.profile) && state.links.length > 0;
    els.cardLinks.hidden = !show;
    if (!show) return;

    for (const link of state.links) {
      const anchor = document.createElement("a");
      anchor.className = "card__link";
      anchor.href = link.url;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.title = `${link.label}: ${link.handle} — abre em nova aba`;
      anchor.setAttribute("aria-label", `${link.label}: ${link.handle}. Abre em nova aba.`);

      const img = document.createElement("img");
      img.src = link.icon;
      img.alt = "";
      img.width = 16;
      img.height = 16;
      img.loading = "lazy";

      const text = document.createElement("span");
      text.textContent = link.handle;

      const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      arrow.setAttribute("class", "card__link-arrow");
      arrow.setAttribute("viewBox", "0 0 24 24");
      arrow.setAttribute("fill", "none");
      arrow.setAttribute("stroke", "currentColor");
      arrow.setAttribute("stroke-width", "2");
      arrow.setAttribute("stroke-linecap", "round");
      arrow.setAttribute("stroke-linejoin", "round");
      arrow.setAttribute("aria-hidden", "true");
      arrow.setAttribute("focusable", "false");
      arrow.innerHTML = '<path d="M7 17 17 7M9 7h8v8"/>';

      anchor.append(img, text, arrow);
      els.cardLinks.append(anchor);
    }
  }

  function addLink(raw, opts = {}) {
    const link = detectLink(raw);
    if (!link) {
      if (!opts.silent) setLinkError("Cole um link válido, tipo instagram.com/seunome.");
      return false;
    }
    if (state.links.length >= MAX_LINKS) {
      if (!opts.silent) toast("Dá pra adicionar até 6 links.");
      return false;
    }
    if (state.links.some((item) => item.url === link.url)) {
      if (!opts.silent) toast("Esse link já está no card.");
      return false;
    }

    state.links.push(link);
    setLinkError("");
    renderLinkChips();
    renderCardLinks();

    if (!opts.silent) {
      els.linkInput.value = "";
      writeHash();
      els.linkInput.focus();
    }

    return true;
  }

  function removeLink(url) {
    state.links = state.links.filter((link) => link.url !== url);
    renderLinkChips();
    renderCardLinks();
    writeHash();
  }

  function revealLinks(focus = true) {
    els.linksToggle.hidden = true;
    els.linksToggle.setAttribute("aria-expanded", "true");
    els.linksWrap.hidden = false;
    if (focus) els.linkInput.focus();
  }

  /* ---------- detalhes do perfil ---------- */

  function revealDetails(focus = true) {
    els.detailsToggle.hidden = true;
    els.detailsToggle.setAttribute("aria-expanded", "true");
    els.detailsWrap.hidden = false;
    if (focus) els.pronounsInput.focus();
  }

  function renderCardDetails() {
    const profile = state.profile;
    if (!profile) return;

    const pronouns = state.pronouns.trim();
    els.handle.textContent = `@${profile.handle}${pronouns ? ` · ${pronouns}` : ""}`;

    const bio = state.bio.trim();
    els.cardBio.hidden = !bio;
    els.cardBioText.textContent = bio;

    const location = state.location.trim();
    els.cardLocation.hidden = !location;
    els.cardLocationText.textContent = location;
  }

  /* ---------- sugestões de localização ---------- */

  const LOCATION_PIN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>`;

  const PHOTO_OPEN_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/><path d="M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>`;

  function baseLocationItem(value) {
    const text = String(value || "").trim().slice(0, 40);
    if (!text) return null;
    const parts = text.split(",").map((part) => part.trim()).filter(Boolean);
    const name = parts.shift() || text;
    return { value: text, name, detail: parts.join(", ") };
  }

  function baseLocationItems() {
    return LOCATION_BASE.map(baseLocationItem).filter(Boolean);
  }

  function locationItemFromFeature(feature) {
    const props = feature?.properties || {};
    const name = String(props.name || "").trim();
    if (!name) return null;
    const stateName = String(props.state || "").trim();
    const country = String(COUNTRY_PT[props.country] || props.country || "").trim();
    const detailParts = [];
    if (stateName && stateName.toLowerCase() !== name.toLowerCase()) detailParts.push(stateName);
    if (country && country.toLowerCase() !== name.toLowerCase() && country.toLowerCase() !== stateName.toLowerCase()) {
      detailParts.push(country);
    }
    const detail = [...new Set(detailParts)].join(", ");
    const value = [name, detail].filter(Boolean).join(", ").slice(0, 40).trim();
    return { value, name, detail };
  }

  function renderLocationRows(items) {
    if (!els.locationResults) return;    const seen = new Set();
    const rows = [];
    state.locationItems = [];

    for (const raw of items || []) {
      const item = typeof raw === "string" ? baseLocationItem(raw) : raw;
      if (!item || !item.value) continue;
      const key = item.value.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      state.locationItems.push(item);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "result location-result";
      button.dataset.index = String(state.locationItems.length - 1);
      button.setAttribute("role", "option");
      button.setAttribute("aria-selected", "false");

      const icon = document.createElement("span");
      icon.className = "result__icon result__icon--pin";
      icon.innerHTML = LOCATION_PIN;

      const meta = document.createElement("span");
      meta.className = "result__meta";
      const title = document.createElement("span");
      title.className = "result__title";
      title.textContent = item.name;
      const detail = document.createElement("span");
      detail.className = "result__artist";
      detail.textContent = item.detail || "Usar esta localização";
      meta.append(title, detail);

      button.append(icon, meta);
      rows.push(button);
    }

    els.locationResults.replaceChildren(...rows);
    const show = state.locationOpen && rows.length > 0;
    els.locationResults.hidden = !show;
    els.locationInput.setAttribute("aria-expanded", show ? "true" : "false");
    if (show) requestAnimationFrame(positionLocationResults);
  }

  function positionLocationResults() {
    if (!els.locationResults || els.locationResults.hidden || !els.locationInput) return;
    const combo = els.locationInput.closest(".location-combo");
    if (!combo) return;
    const rect = els.locationInput.getBoundingClientRect();
    const vh = document.documentElement.clientHeight;
    const spaceBelow = vh - rect.bottom - 18;
    const spaceAbove = rect.top - 18;
    const contentHeight = Math.min(360, els.locationResults.scrollHeight + 10);
    const up = spaceBelow < contentHeight && spaceAbove > spaceBelow;
    combo.classList.toggle("is-up", up);
    const max = Math.max(140, Math.min(360, up ? spaceAbove : spaceBelow));
    els.locationResults.style.maxHeight = `${max}px`;
  }

  function openLocationResults() {
    state.locationOpen = true;
    if (!state.locationItems.length) renderLocationRows(baseLocationItems());
    else renderLocationRows(state.locationItems);
  }

  function closeLocationResults() {
    state.locationOpen = false;
    clearTimeout(locationTimer);
    locationSeq += 1;
    if (els.locationResults) els.locationResults.hidden = true;
    if (els.locationInput) els.locationInput.setAttribute("aria-expanded", "false");
  }

  function setLocationValue(value) {
    const text = String(value || "").trim().slice(0, 40);
    els.locationInput.value = text;
    state.location = text;
    state.locationPicked = true;
    renderCardDetails();
    scheduleHash();
    els.locationInput.focus({ preventScroll: true });
    closeLocationResults();
    setTimeout(() => { state.locationPicked = false; }, 60);
  }

  async function fetchLocationSuggestions(term) {
    const key = norm(term);
    if (!key) return [];
    const cached = locationCache.get(key);
    if (cached && Date.now() - cached.at < 10 * 60 * 1000) return cached.items.slice();

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    try {
      const res = await fetch(`${PHOTON}?q=${encodeURIComponent(term)}&limit=7&lang=en`, {
        signal: controller.signal
      });
      if (!res.ok) throw new Error("localização");
      const data = await res.json();
      const items = (data.features || []).map(locationItemFromFeature).filter(Boolean);
      locationCache.set(key, { at: Date.now(), items: items.slice() });
      return items;
    } finally {
      clearTimeout(timer);
    }
  }

  function filteredBaseLocations(term) {
    const query = norm(term);
    const items = baseLocationItems();
    if (!query) return items;
    return items.filter((item) => norm(item.value).includes(query) || norm(item.name).includes(query));
  }

  function scheduleLocationSuggestions(term) {
    clearTimeout(locationTimer);
    const value = String(term || "").trim();
    const base = filteredBaseLocations(value);
    state.locationOpen = true;
    renderLocationRows(base);

    if (value.length < 3) {
      locationSeq += 1;
      if (els.locationSpinner) els.locationSpinner.hidden = true;
      return;
    }

    locationTimer = setTimeout(async () => {
      const seq = ++locationSeq;
      if (els.locationSpinner) els.locationSpinner.hidden = false;
      try {
        const items = await fetchLocationSuggestions(value);
        if (seq !== locationSeq) return;
        const remoteNames = new Set(items.map((item) => norm(item.name)));
        const cleanBase = base.filter((item) => !remoteNames.has(norm(item.name)));
        renderLocationRows([...items, ...cleanBase]);
      } catch {
        if (seq !== locationSeq) return;
        renderLocationRows(base);
      } finally {
        if (seq === locationSeq && els.locationSpinner) els.locationSpinner.hidden = true;
      }
    }, 380);
  }

  /* ---------- tema ---------- */

  function hexToRgb(value) {
    const match = /^#?([0-9a-f]{6})$/i.exec(String(value || ""));
    if (!match) return null;
    const number = parseInt(match[1], 16);
    return { r: (number >> 16) & 255, g: (number >> 8) & 255, b: number & 255 };
  }

  function colorLuminance(value) {
    const rgb = hexToRgb(value);
    if (!rgb) return 1;
    const channel = (part) => {
      const v = part / 255;
      return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4);
    };
    return .2126 * channel(rgb.r) + .7152 * channel(rgb.g) + .0722 * channel(rgb.b);
  }

  function mixHex(a, b, amount) {
    const first = hexToRgb(a);
    const second = hexToRgb(b);
    if (!first || !second) return first ? a : (second ? b : "#7c6cff");
    const k = Math.max(0, Math.min(1, amount));
    const channel = (one, two) => Math.round(one + (two - one) * k).toString(16).padStart(2, "0");
    return `#${channel(first.r, second.r)}${channel(first.g, second.g)}${channel(first.b, second.b)}`;
  }

  function syncThemeUI() {
    document.querySelectorAll(".theme-option").forEach((button) => {
      const active = button.dataset.theme === state.theme;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    document.querySelectorAll(".theme-gradient").forEach((button) => {
      const active = state.theme === "gradient" && button.dataset.gradient === state.themeGradient;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if (els.themeColor) {
      els.themeColor.value = state.themeColor;
      els.themeColorLabel.classList.toggle("is-active", state.theme === "custom");
    }
    if (els.gradientStart) els.gradientStart.value = state.gradientStart;
    if (els.gradientEnd) els.gradientEnd.value = state.gradientEnd;
    if (els.gradientAngle) els.gradientAngle.value = String(state.gradientAngle);
    if (els.gradientAngleValue) els.gradientAngleValue.textContent = `${state.gradientAngle}°`;
    if (els.gradientCustom) {
      els.gradientCustom.style.background = `linear-gradient(${state.gradientAngle}deg, ${state.gradientStart}, ${state.gradientEnd})`;
    }
  }

  function applyTheme() {
    const root = document.documentElement;
    let dark = state.theme === "dark";
    let themeColor = dark ? "#0c0d12" : "#e8e9e3";
    document.body.style.background = "";

    if (state.theme === "gradient") {
      let gradient;
      if (state.themeGradient === "custom") {
        const start = /^#[0-9a-f]{6}$/i.test(state.gradientStart) ? state.gradientStart : "#7c6cff";
        const end = /^#[0-9a-f]{6}$/i.test(state.gradientEnd) ? state.gradientEnd : "#ff7a9c";
        const angle = Math.max(0, Math.min(360, Number(state.gradientAngle) || 135));
        const mid = mixHex(start, end, .5);
        gradient = {
          dark: colorLuminance(mid) < .5,
          base: mid,
          css: `linear-gradient(${angle}deg, ${start}, ${end})`
        };
      } else {
        gradient = THEME_GRADIENTS[state.themeGradient] || THEME_GRADIENTS.sunset;
      }
      dark = Boolean(gradient.dark);
      root.style.setProperty("--bg", gradient.base);
      const veil = dark
        ? "linear-gradient(rgba(0,0,0,.22), rgba(0,0,0,.22))"
        : "linear-gradient(rgba(255,255,255,.12), rgba(255,255,255,.12))";
      document.body.style.background = `${veil}, ${gradient.css}`;
      themeColor = gradient.base;
    } else if (state.theme === "custom") {
      dark = colorLuminance(state.themeColor) < .5;
      root.style.setProperty("--bg", state.themeColor);
      themeColor = state.themeColor;
    } else {
      root.style.removeProperty("--bg");
      themeColor = dark ? "#0c0d12" : "#e8e9e3";
    }

    root.classList.toggle("theme-dark", dark);
    syncThemeUI();
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", themeColor);
  }

  function setTheme(theme) {
    state.theme = ["light", "dark", "custom"].includes(theme) ? theme : "light";
    applyTheme();
    writeHash();
  }

  function setGradient(key) {
    state.theme = "gradient";
    state.themeGradient = key === "custom" || Object.prototype.hasOwnProperty.call(THEME_GRADIENTS, key)
      ? key
      : "sunset";
    applyTheme();
    writeHash();
  }

  /* ---------- hash ---------- */

  function photoHashEntry(photo, includeHd) {
    const entry = {
      c: photo.caption || undefined,
      x: photo.x,
      y: photo.y,
      r: photo.r,
      f: photo.front ? 1 : undefined,
      t: photo.fit ? 1 : undefined
    };
    if (includeHd && /^data:/i.test(photo.src) && photo.src !== photo.preview) {
      entry.h = photo.src;
    } else {
      entry.s = includeHd ? photo.src : (photo.preview || photo.src);
    }
    return entry;
  }

  function hashParamsFor(includeHd = false) {
    const params = new URLSearchParams();
    params.set("u", state.profile.id);
    if (state.track) {
      if (state.track.mode === "spotify") {
        params.set("m", `sp:${state.track.type}:${state.track.id}`);
      } else if (state.track.mode === "youtube") {
        params.set("m", `yt:${state.track.id}`);
      } else if (state.track.mode === "soundcloud") {
        params.set("m", `sc:${state.track.url}`);
      } else {
        params.set("m", `it:${state.track.id}`);
      }
      if (state.track.mode !== "preview") {
        if (state.track.title) params.set("mt", state.track.title.slice(0, 120));
        if (state.track.artist) params.set("ma", state.track.artist.slice(0, 120));
        if (state.track.cover) params.set("mc", state.track.cover);
        if (state.track.durationMs) params.set("md", String(Math.round(state.track.durationMs)));
      }
    }
    const status = state.status.trim();
    if (status) params.set("s", status);
    for (const link of state.links) params.append("l", link.url);
    if (state.startAt > 0) params.set("st", String(Math.round(state.startAt)));
    if (state.autoplay) params.set("ap", "1");
    if (state.bg !== "none") params.set("bg", state.bg);
    params.set("bgm", state.bgReactive ? "1" : "0");
    if (state.pronouns.trim()) params.set("pr", state.pronouns.trim());
    if (state.location.trim()) params.set("loc", state.location.trim());
    if (state.bio.trim()) params.set("bio", state.bio.trim());
    if (state.theme !== "light") params.set("th", state.theme);
    if (state.theme === "custom") params.set("bgc", state.themeColor);
    if (state.theme === "gradient") {
      params.set("tg", state.themeGradient);
      if (state.themeGradient === "custom") {
        params.set("gs", state.gradientStart);
        params.set("ge", state.gradientEnd);
        params.set("ga", String(state.gradientAngle));
      }
    }
    if (state.bgImage) params.set("bgi", state.bgImage);
    if (state.photos.length) {
      params.set("ph", JSON.stringify(state.photos.slice(0, MAX_PHOTOS).map((photo) => photoHashEntry(photo, includeHd))));
    }
    if (state.shareMode) params.set("v", "card");
    return params;
  }

  function writeHash() {
    if (!state.profile) return;
    if (activeShortCode && state.shareMode) return;
    const params = hashParamsFor(false);
    const next = `#${params.toString()}`;
    if (location.hash === next) return;
    const write = (hash) => {
      try {
        history.replaceState(null, "", `${location.pathname}${location.search}${hash}`);
        return true;
      } catch {
        return false;
      }
    };
    if (!write(next)) {
      params.delete("bgi");
      params.delete("ph");
      write(`#${params.toString()}`);
    }
  }

  function scheduleHash() {
    clearTimeout(hashTimer);
    hashTimer = setTimeout(writeHash, 300);
  }

  function isLocalHost() {
    return /^(localhost|127\.0\.0\.1|\[::1\])$/i.test(location.hostname);
  }

  function shareStorageName(name) {
    return `${SHORT_NAMESPACE}${name}`;
  }

  function prettyCardUrl(code) {
    if (!code) return "";
    if (isLocalHost()) {
      return `${location.origin}/#k=${code}`;
    }
    const basePath = new URL(document.baseURI).pathname.replace(/\/+$/, "");
    return `${location.origin}${basePath}/${code}`;
  }

  function shareCodeFromPath() {
    const basePath = new URL(document.baseURI).pathname.replace(/\/+$/, "");
    let path = location.pathname;
    if (basePath && path.toLowerCase().startsWith(basePath.toLowerCase())) {
      path = path.slice(basePath.length);
    }
    const segments = path.split("/").filter(Boolean);
    if (segments.length !== 1) return "";
    const last = segments[0];
    if (/^index\.html?$/i.test(last) || last.includes(".")) return "";
    if (!/^[a-z0-9_-]{3,64}$/i.test(last)) return "";
    return last.toLowerCase();
  }

  

  function rentryArticleText(html) {
    const article = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    return article
      ? article[1].replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, "").trim()
      : "";
  }

  function editStorageKey(name) {
    return `dp-edit-${name}`;
  }

  function readEditCode(name) {
    try { return localStorage.getItem(editStorageKey(name)) || ""; } catch { return ""; }
  }

  function saveEditCode(name, code) {
    if (!code) return;
    try { localStorage.setItem(editStorageKey(name), code); } catch {}
  }

  async function inspectShareName(name) {
    try {
      const response = await fetch(`${SHORT_BASE}${shareStorageName(name)}`, {
        headers: { accept: "text/html" },
        cache: "no-store"
      });
      if (response.status === 200) {
        return { taken: true, owned: Boolean(readEditCode(name)) };
      }
      if (response.status !== 404) return { taken: false, unknown: true };
      const legacy = await fetch(`${SHORT_BASE}${name}`, {
        headers: { accept: "text/html" },
        cache: "no-store"
      });
      if (legacy.status !== 200) return { taken: false };
      const payload = rentryArticleText(await legacy.text());
      if (/^m-[a-z0-9_-]+$/i.test(payload)) return { taken: true, owned: false };
      if (/^[A-Za-z0-9+/=]+$/.test(payload)) {
        try {
          const params = new URLSearchParams(fromBase64(payload));
          if (params.get("u") || params.get("m")) return { taken: true, owned: false };
        } catch {}
      }
      return { taken: false };
    } catch {
      return { taken: false, unknown: true };
    }
  }

  function buildShareUrl() {
    if (activeShortCode) return prettyCardUrl(activeShortCode);
    const params = hashParamsFor(true);
    params.set("v", "card");
    const url = new URL(location.href);
    url.hash = params.toString();
    return url.href;
  }

  function toBase64(text) {
    const bytes = new TextEncoder().encode(text);
    let binary = "";
    for (let i = 0; i < bytes.length; i += 0x8000) {
      binary += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
    }
    return btoa(binary);
  }

  function fromBase64(value) {
    const binary = atob(value);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }

  async function postShortPayload(url, fields) {
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(fields)
    });
    if (!response.ok) throw new Error("short");
    return response.json().catch(() => null);
  }

  function normalizeShareName(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 32);
  }

  async function shortenShareLink(customName = "") {
    const params = hashParamsFor(true);
    params.set("v", "card");
    const hash = params.toString();
    if (!hash) throw new Error("short");
    const name = normalizeShareName(customName);
    if (name && (RESERVED_SHARE_NAMES.has(name) || /^(m|r)-/i.test(name))) {
      throw new Error("name-reserved");
    }
    const cacheKey = `${hash}|${name}`;
    if (shortLinkCache.hash === cacheKey && shortLinkCache.url) return shortLinkCache.url;

    let nameInfo = null;
    if (name) {
      nameInfo = await inspectShareName(name);
      if (nameInfo.taken && !nameInfo.owned) throw new Error("name-taken");
    }

    const payload = toBase64(hash);
    let mcloCode = "";
    try {
      const data = await postShortPayload(SHORT_MCLO_API, { content: payload });
      if (data && data.success && data.id) mcloCode = `m-${data.id}`;
    } catch {}

    if (name) {
      if (nameInfo.owned) {
        const editCode = readEditCode(name);
        try {
          const data = await postShortPayload(`${SHORT_EDIT}${shareStorageName(name)}`, {
            edit_code: editCode,
            text: mcloCode || payload
          });
          if (data && String(data.status) === "200") {
            const url = prettyCardUrl(name);
            shortLinkCache = { hash: cacheKey, url };
            return url;
          }
        } catch {}
      } else {
        try {
          const data = await postShortPayload(SHORT_API, {
            text: mcloCode || payload,
            url: shareStorageName(name)
          });
          if (data && String(data.url_short || "").toLowerCase() === shareStorageName(name).toLowerCase()) {
            saveEditCode(name, data.edit_code);
            const url = prettyCardUrl(name);
            shortLinkCache = { hash: cacheKey, url };
            return url;
          }
        } catch {}
      }
    }

    let code = mcloCode;
    if (!code) {
      try {
        const data = await postShortPayload(SHORT_API, { text: payload });
        if (data && data.url_short) code = `r-${data.url_short}`;
      } catch {}
    }

    if (!code) throw new Error("short");
    const url = prettyCardUrl(code);
    shortLinkCache = { hash: cacheKey, url };
    return url;
  }

  async function loadShortLink(code) {
    let payload = "";
    if (code.startsWith("m-")) {
      const id = code.slice(2);
      if (!/^[a-z0-9_-]+$/i.test(id)) throw new Error("short");
      const response = await fetch(`${SHORT_MCLO_RAW}${id}`, { headers: { accept: "text/plain" } });
      if (!response.ok) throw new Error("short");
      payload = (await response.text()).trim();
    } else if (code.startsWith("r-")) {
      const id = code.slice(2);
      if (!/^[a-z0-9_-]+$/i.test(id)) throw new Error("short");
      const response = await fetch(`${SHORT_BASE}${id}`, { headers: { accept: "text/html" } });
      if (!response.ok) throw new Error("short");
      payload = rentryArticleText(await response.text());
    } else {
      if (!/^[a-z0-9_-]+$/i.test(code)) throw new Error("short");
      let html = "";
      const namespaced = await fetch(`${SHORT_BASE}${shareStorageName(code)}`, {
        headers: { accept: "text/html" },
        cache: "no-store"
      });
      if (namespaced.status === 200) {
        html = await namespaced.text();
      } else if (namespaced.status === 404) {
        const legacy = await fetch(`${SHORT_BASE}${code}`, {
          headers: { accept: "text/html" },
          cache: "no-store"
        });
        if (!legacy.ok) throw new Error("short");
        html = await legacy.text();
      } else {
        throw new Error("short");
      }
      payload = rentryArticleText(html);
    }
    if (/^m-[a-z0-9_-]+$/i.test(payload)) {
      const partId = payload.slice(2);
      const part = await fetch(`${SHORT_MCLO_RAW}${partId}`, { headers: { accept: "text/plain" } });
      if (!part.ok) throw new Error("short");
      payload = (await part.text()).trim();
    }
    if (!payload || !/^[A-Za-z0-9+/=]+$/.test(payload)) throw new Error("short");
    const hash = fromBase64(payload);
    if (!hash) throw new Error("short");
    return hash;
  }

  /* ---------- música ---------- */

  function ensureAudio() {
    if (state.audio) return state.audio;
    const audio = new Audio();
    audio.preload = "metadata";

    audio.addEventListener("timeupdate", () => {
      const track = state.track;
      if (!track || track.mode !== "preview" || state.seeking) return;
      const duration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 30;
      setProgressUI(audio.currentTime * 1000, duration * 1000);
    });

    audio.addEventListener("loadedmetadata", () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0 && !state.seeking) {
        setProgressUI(audio.currentTime * 1000, audio.duration * 1000);
        validateStartDuration(audio.duration);
      }
      applyPreviewStart(audio);
      renderStartField();
    });

    audio.addEventListener("play", () => {
      state.autoStartPending = false;
      els.music.classList.remove("is-needs-tap");
      els.music.classList.add("is-playing");
      els.musicLabel.textContent = "Tocando agora";
      els.musicPlay.setAttribute("aria-label", "Pausar prévia");
      setBgPlaying(true);
    });

    audio.addEventListener("pause", () => {
      els.music.classList.remove("is-playing");
      els.musicLabel.textContent = autoplayNeedsTap() ? "Toque para ouvir" : "Prévia";
      els.music.classList.toggle("is-needs-tap", autoplayNeedsTap());
      els.musicPlay.setAttribute("aria-label", "Tocar prévia");
      setBgPlaying(false);
    });

    audio.addEventListener("ended", () => {
      els.music.classList.remove("is-playing");
      els.musicPlay.setAttribute("aria-label", "Tocar prévia");
      setBgPlaying(false);
      state.startApplied = false;
      const duration = Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 30;
      setProgressUI(0, duration * 1000);
    });

    audio.addEventListener("error", () => {
      if (!audio.currentSrc) return;
      toast("Essa prévia não carregou. Tenta outra música.");
    });

    state.audio = audio;
    return audio;
  }

  function playPreview() {
    const track = state.track;
    if (!track || track.mode !== "preview" || !track.previewUrl) return;
    const audio = ensureAudio();
    if (state.audioTrackId !== track.id) {
      audio.src = track.previewUrl;
      state.audioTrackId = track.id;
      audio.load();
    }
    applyPreviewStart(audio);
    audio.play().catch(() => {});
    armAutoplayNotice(track);
  }

  function togglePreview() {
    const track = state.track;
    if (!track || track.mode !== "preview") return;
    if (!track.previewUrl) {
      toast("Essa música não tem prévia. Tenta outra.");
      return;
    }
    const audio = ensureAudio();
    if (!audio.paused) {
      audio.pause();
      return;
    }
    if (state.audioTrackId !== track.id) {
      audio.src = track.previewUrl;
      state.audioTrackId = track.id;
      audio.load();
    }
    applyPreviewStart(audio);
    audio.play().catch(() => {
      toast("O navegador bloqueou o áudio. Toca no play de novo.");
    });
  }

  function stopAudio(reset) {
    if (state.audio) {
      state.audio.pause();
      if (reset) {
        state.audio.removeAttribute("src");
        state.audio.load();
        state.audioTrackId = null;
      }
    }
    els.music.classList.remove("is-playing");
    els.musicPlay.setAttribute("aria-label", "Tocar prévia");
    setBgPlaying(false);
    if (reset) {
      setProgressUI(0, 0);
      resetSeeking();
    }
  }

  function loadSpotifyApi() {
    if (spotifyApi) return Promise.resolve(spotifyApi);
    if (spotifyApiPromise) return spotifyApiPromise;

    spotifyApiPromise = new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("Spotify API")), 10000);
      window.onSpotifyIframeApiReady = (api) => {
        clearTimeout(timer);
        spotifyApi = api;
        resolve(api);
      };
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      script.onerror = () => {
        clearTimeout(timer);
        reject(new Error("Spotify API"));
      };
      document.head.append(script);
    }).catch((error) => {
      spotifyApiPromise = null;
      throw error;
    });

    return spotifyApiPromise;
  }

  function destroySpotifyPlayer() {
    if (spotifyController) {
      try { spotifyController.destroy(); } catch {}
      spotifyController = null;
    }
    if (els.spotifyHost) els.spotifyHost.replaceChildren();
    state.spotifyPosition = 0;
    state.spotifyDuration = 0;
    state.spotifyPaused = true;
    state.pendingPlay = false;
    state.startSeeking = false;
    state.startSeekDeadline = 0;
    state.startSeekAttempts = 0;
    state.startSeekUiUntil = 0;
    els.music.classList.remove("is-playing");
    setBgPlaying(false);
    if (state.playerMode === "inline" || state.playerMode === "loading") state.playerMode = null;
  }

  function updateSpotifyProgress(data) {
    const position = Math.max(0, Number(data.position) || 0);
    const duration = Math.max(0, Number(data.duration) || 0);
    const atEnd = duration > 0 && position >= duration - 400;
    const paused = Boolean(data.isPaused) || atEnd;

    state.spotifyPosition = position;
    state.spotifyDuration = duration;
    state.spotifyPaused = paused;

    const canonical = Math.max(state.track?.durationMs || 0, state.canonicalDurationMs || 0);
    if (!paused) {
      state.autoStartPending = false;
      els.music.classList.remove("is-needs-tap");
    }
    if (duration > 0) {
      const shortTrackPreview = duration < 60000 && canonical > 90000 && state.track?.type === "track";
      if (shortTrackPreview) {
        if (!state.track.fallbackTried) fallbackSpotifyToFull(state.track);
      } else if (canonical > 0) {
        validateStartDuration(canonical / 1000);
      }
    }

    if (atEnd) {
      state.startApplied = false;
      state.startSeeking = false;
      state.startSeekDeadline = 0;
      state.startSeekAttempts = 0;
    }

    if (state.startSeeking && state.startAt > 0) {
      if (paused) {
        state.startSeekDeadline = 0;
      } else if (duration > 0) {
        const now = Date.now();
        if (!state.startSeekDeadline) state.startSeekDeadline = now + 15000;
        const target = Math.min(state.startAt * 1000, Math.max(0, duration - 1000));
        const distance = Math.abs(position - target);

        if (distance <= 2500) {
          state.startSeeking = false;
          state.startApplied = true;
          state.startSeekDeadline = 0;
        } else if (now >= state.startSeekDeadline || state.startSeekAttempts >= 18) {
          state.startSeeking = false;
          state.startApplied = true;
          state.startSeekDeadline = 0;
        } else if (now - state.startLastSeek > 750) {
          try { spotifyController?.seek(target / 1000); } catch {}
          state.startLastSeek = now;
          state.startSeekAttempts += 1;
          state.spotifyPosition = target;
          state.startSeekUiUntil = now + 1400;
          if (!state.seeking) setProgressUI(target, duration);
        }
      }
    }

    const showPosition = state.startSeeking && state.startSeekUiUntil > Date.now()
      ? Math.min(state.startAt * 1000, Math.max(0, duration - 1000))
      : state.spotifyPosition;

    if (duration > 0 && !state.seeking) {
      setProgressUI(showPosition, duration);
    }

    setBgPlaying(!paused);
    els.music.classList.toggle("is-playing", !paused);
    els.musicLabel.textContent = paused
      ? (autoplayNeedsTap() ? "Toque para ouvir" : "Spotify")
      : "Tocando agora";
    els.music.classList.toggle("is-needs-tap", paused && autoplayNeedsTap());
    els.musicToggle.setAttribute("aria-label", paused ? "Tocar no Spotify" : "Pausar");
    renderStartField();
  }

  async function setupSpotifyPlayer(track) {
    try {
      const api = await loadSpotifyApi();
      if (state.track !== track || state.playerMode !== "loading") return;

      const controller = await new Promise((resolve, reject) => {
        let settled = false;
        const timer = setTimeout(() => {
          if (settled) return;
          settled = true;
          reject(new Error("controller"));
        }, 8000);

        try {
          if (!els.spotifyHost) throw new Error("sem host");
          els.spotifyHost.replaceChildren();
          const mount = document.createElement("div");
          els.spotifyHost.append(mount);

          api.createController(mount, {
            uri: `spotify:${track.type}:${track.id}`,
            width: "320",
            height: "80"
          }, (ctrl) => {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            resolve(ctrl);
          });
        } catch (error) {
          settled = true;
          clearTimeout(timer);
          reject(error);
        }
      });

      if (state.track !== track || state.playerMode !== "loading") {
        try { controller.destroy(); } catch {}
        return;
      }

      spotifyController = controller;
      state.playerMode = "inline";
      controller.addListener("playback_update", (event) => {
        if (state.track !== track) return;
        updateSpotifyProgress(event.data || {});
      });

      renderMusic();

      if (state.startAt > 0) {
        const canonical = Math.max(track.durationMs || 0, state.canonicalDurationMs || 0);
        const total = canonical || state.spotifyDuration || 0;
        if (total > 0 && state.startAt >= total / 1000 - 2) {
          validateStartDuration(total / 1000);
        } else {
          const target = total > 0
            ? Math.min(state.startAt * 1000, Math.max(0, total - 1000))
            : state.startAt * 1000;
          try { controller.seek(target / 1000); } catch {}
          state.spotifyPosition = target;
          if (total > 0) setProgressUI(target, total);
        }
      }

      if (state.pendingPlay) {
        state.pendingPlay = false;
        if (state.startAt > 0 && !state.startApplied) requestSpotifyStart();
        controller.play();
        armAutoplayNotice(track);
      }
    } catch {
      if (state.track !== track) return;
      els.spotifyHost.replaceChildren();
      state.playerMode = "embed";
      renderMusic();
    }
  }

  function toggleSpotifyPlayback() {
    const track = state.track;
    if (!track || track.mode !== "spotify") return;

    if (state.playerMode === "embed") {
      toggleSpotifyEmbed();
      return;
    }

    if (!spotifyController) {
      state.pendingPlay = true;
      if (state.playerMode !== "loading") setupSpotifyPlayer(track);
      toast("Preparando o player do Spotify…");
      return;
    }

    if (state.spotifyPaused) {
      const duration = state.spotifyDuration;
      const atEnd = duration > 0 && state.spotifyPosition >= duration - 500;

      if (atEnd) {
        state.startApplied = false;
        state.startSeeking = false;
        state.startSeekDeadline = 0;
        try { spotifyController.seek(0); } catch {}
        state.spotifyPosition = 0;
        if (duration > 0) setProgressUI(0, duration);
      }

      if (!state.startApplied && state.startAt > 0) {
        requestSpotifyStart();
      }

      spotifyController.play();
    } else {
      spotifyController.pause();
    }
  }

  /* ---------- player do YouTube ---------- */

  function loadYouTubeApi() {
    if (youtubeApi) return Promise.resolve(youtubeApi);
    if (window.YT && window.YT.Player) {
      youtubeApi = window.YT;
      return Promise.resolve(youtubeApi);
    }
    if (youtubeApiPromise) return youtubeApiPromise;

    youtubeApiPromise = new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("YouTube API")), 12000);
      window.onYouTubeIframeAPIReady = () => {
        clearTimeout(timer);
        youtubeApi = window.YT;
        resolve(window.YT);
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = () => {
        clearTimeout(timer);
        reject(new Error("YouTube API"));
      };
      document.head.append(script);
    }).catch((error) => {
      youtubeApiPromise = null;
      throw error;
    });

    return youtubeApiPromise;
  }

  function stopYouTubeTimer() {
    if (youtubeTimer) {
      clearInterval(youtubeTimer);
      youtubeTimer = 0;
    }
  }

  function destroyYouTubePlayer() {
    stopYouTubeTimer();
    if (youtubePlayer) {
      try { youtubePlayer.destroy(); } catch {}
      youtubePlayer = null;
    }
    if (els.youtubeHost) els.youtubeHost.replaceChildren();
    state.youtubeReady = false;
    state.youtubePlaying = false;
    state.youtubePosition = 0;
    state.youtubeDuration = 0;
    state.youtubeStartPending = false;
    state.youtubeStartDeadline = 0;
    state.youtubeStartAttempts = 0;
    state.youtubeError = false;
    els.music.classList.remove("is-playing");
    setBgPlaying(false);
  }

  function applyYouTubeStart() {
    if (!youtubePlayer || state.track?.mode !== "youtube" || state.startAt <= 0) return;
    if (state.startApplied && !state.youtubeStartPending) return;
    const duration = youtubePlayer.getDuration() || 0;
    const target = duration > 0 ? Math.min(state.startAt, Math.max(0, duration - 1)) : state.startAt;
    try { youtubePlayer.seekTo(target, true); } catch {}
    state.startApplied = true;
    state.youtubeStartPending = true;
    state.youtubeStartDeadline = Date.now() + 5000;
    state.youtubeStartLastSeek = Date.now();
    state.youtubeStartAttempts = 1;
    state.youtubePosition = target * 1000;
    if (duration > 0) state.youtubeDuration = duration * 1000;
    setProgressUI(state.youtubePosition, state.youtubeDuration || state.track.durationMs || 0);
    renderStartField();
  }

  function startYouTubeTimer() {
    stopYouTubeTimer();
    youtubeTimer = setInterval(() => {
      if (!youtubePlayer || typeof youtubePlayer.getCurrentTime !== "function") return;
      const track = state.track;
      if (!track || track.mode !== "youtube") return;
      const current = Math.max(0, youtubePlayer.getCurrentTime() || 0);
      const duration = Math.max(0, youtubePlayer.getDuration() || 0);
      let showPosition = current * 1000;
      if (duration > 0) state.youtubeDuration = duration * 1000;

      if (state.youtubeStartPending && state.startAt > 0) {
        const target = duration > 0 ? Math.min(state.startAt, Math.max(0, duration - 1)) : state.startAt;
        if (duration > 0 && Math.abs(current - target) <= 1.5) {
          state.youtubeStartPending = false;
        } else if (Date.now() - state.youtubeStartLastSeek > 800 && Date.now() < state.youtubeStartDeadline && state.youtubeStartAttempts < 10) {
          try { youtubePlayer.seekTo(target, true); } catch {}
          state.youtubeStartLastSeek = Date.now();
          state.youtubeStartAttempts += 1;
          showPosition = target * 1000;
        } else if (Date.now() >= state.youtubeStartDeadline) {
          state.youtubeStartPending = false;
        }
        if (state.youtubeStartPending && Date.now() - state.youtubeStartLastSeek < 1400) {
          showPosition = target * 1000;
        }
      }

      state.youtubePosition = showPosition;
      if (!state.seeking) {
        setProgressUI(showPosition, state.youtubeDuration || track.durationMs || 0);
      }
      renderStartField();
    }, 250);
  }

  function playYouTube() {
    if (!youtubePlayer || !state.youtubeReady) return;
    if (state.startAt > 0 && !state.startApplied) {
      state.startApplied = false;
      state.youtubeStartPending = true;
    }
    youtubePlayer.playVideo();
    setTimeout(() => {
      if (state.track?.mode !== "youtube" || !youtubePlayer) return;
      if (state.startAt > 0 && !state.startApplied) applyYouTubeStart();
    }, 120);
  }

  function toggleYouTubePlayback() {
    const track = state.track;
    if (!track || track.mode !== "youtube") return;

    if (!youtubePlayer || !state.youtubeReady) {
      state.pendingPlay = !state.youtubePlaying;
      if (state.playerMode !== "youtube-loading") {
        destroyYouTubePlayer();
        state.playerMode = "youtube-loading";
        setupYouTubePlayer(track);
      }
      toast("Preparando o player do YouTube…");
      return;
    }

    if (state.youtubePlaying) {
      youtubePlayer.pauseVideo();
    } else {
      playYouTube();
    }
  }

  async function setupYouTubePlayer(track) {
    try {
      const YT = await loadYouTubeApi();
      if (state.track !== track || state.playerMode !== "youtube-loading") return;
      if (!els.youtubeHost) throw new Error("sem host");

      els.youtubeHost.replaceChildren();
      const mount = document.createElement("div");
      els.youtubeHost.append(mount);

      youtubePlayer = new YT.Player(mount, {
        videoId: track.id,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          origin: location.origin
        },
        events: {
          onReady: (event) => {
            if (state.track !== track) return;
            state.youtubeReady = true;
            state.playerMode = "youtube";
            const duration = event.target.getDuration() || 0;
            state.youtubeDuration = duration > 0 ? duration * 1000 : (track.durationMs || 0);
            validateStartDuration(state.youtubeDuration / 1000);
            renderMusic();
            if (state.startAt > 0 && !state.startApplied) applyYouTubeStart();
            if (state.pendingPlay) {
              state.pendingPlay = false;
              playYouTube();
              armAutoplayNotice(track);
            }
          },
          onStateChange: (event) => {
            if (state.track !== track) return;
            if (event.data === YT.PlayerState.PLAYING) {
              state.youtubePlaying = true;
              state.autoStartPending = false;
              els.music.classList.remove("is-needs-tap");
              setBgPlaying(true);
              els.music.classList.add("is-playing");
              els.musicLabel.textContent = "Tocando agora";
              els.musicToggle.setAttribute("aria-label", "Pausar");
              startYouTubeTimer();
            } else if (event.data === YT.PlayerState.PAUSED) {
              state.youtubePlaying = false;
              stopYouTubeTimer();
              setBgPlaying(false);
              els.music.classList.remove("is-playing");
              els.musicLabel.textContent = autoplayNeedsTap() ? "Toque para ouvir" : "YouTube";
              els.music.classList.toggle("is-needs-tap", autoplayNeedsTap());
              els.musicToggle.setAttribute("aria-label", "Tocar no YouTube");
              const duration = youtubePlayer?.getDuration() || 0;
              if (duration > 0) state.youtubeDuration = duration * 1000;
              setProgressUI(state.youtubePosition, state.youtubeDuration || track.durationMs || 0);
            } else if (event.data === YT.PlayerState.ENDED) {
              state.youtubePlaying = false;
              stopYouTubeTimer();
              setBgPlaying(false);
              els.music.classList.remove("is-playing");
              els.musicLabel.textContent = autoplayNeedsTap() ? "Toque para ouvir" : "YouTube";
              els.music.classList.toggle("is-needs-tap", autoplayNeedsTap());
              els.musicToggle.setAttribute("aria-label", "Tocar no YouTube");
              state.startApplied = false;
              state.youtubeStartPending = false;
              state.youtubePosition = 0;
              setProgressUI(0, state.youtubeDuration || track.durationMs || 0);
              renderStartField();
            }
          },
          onError: () => {
            if (state.track !== track) return;
            state.youtubeError = true;
            state.youtubeReady = false;
            state.youtubePlaying = false;
            state.playerMode = null;
            stopYouTubeTimer();
            setBgPlaying(false);
            els.music.classList.remove("is-playing");
            renderMusic();
            toast("Esse vídeo não toca incorporado. Escolha outro resultado.");
          }
        }
      });
    } catch {
      if (state.track !== track) return;
      state.youtubeError = true;
      state.youtubeReady = false;
      state.playerMode = null;
      renderMusic();
      toast("Não consegui abrir o player do YouTube.");
    }
  }

  /* ---------- player do SoundCloud ---------- */

  function loadSoundCloudApi() {
    if (window.SC && window.SC.Widget) return Promise.resolve(window.SC);
    if (scApiPromise) return scApiPromise;

    scApiPromise = new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("SoundCloud API")), 12000);
      const script = document.createElement("script");
      script.src = SC_WIDGET_API;
      script.async = true;
      script.onload = () => {
        clearTimeout(timer);
        if (window.SC && window.SC.Widget) resolve(window.SC);
        else reject(new Error("SoundCloud API"));
      };
      script.onerror = () => {
        clearTimeout(timer);
        reject(new Error("SoundCloud API"));
      };
      document.head.append(script);
    }).catch((error) => {
      scApiPromise = null;
      throw error;
    });

    return scApiPromise;
  }

  function destroySoundCloudPlayer() {
    clearTimeout(scPlayTimer);
    scPlayTimer = 0;
    if (scWidget) {
      try { scWidget.pause(); } catch {}
      scWidget = null;
    }
    if (scFrame) {
      scFrame.remove();
      scFrame = null;
    }
    if (els.scHost) els.scHost.replaceChildren();
    state.scReady = false;
    state.scPlaying = false;
    state.scPosition = 0;
    state.scDuration = 0;
    state.scStartPending = false;
    state.scStartDeadline = 0;
    state.scStartAttempts = 0;
    state.scError = false;
    els.music.classList.remove("is-playing");
    setBgPlaying(false);
  }

  function applySoundCloudStart() {
    if (!scWidget || state.track?.mode !== "soundcloud" || state.startAt <= 0) return;
    if (state.startApplied && !state.scStartPending) return;
    const duration = state.scDuration || 0;
    const target = duration > 0 ? Math.min(state.startAt * 1000, Math.max(0, duration - 1000)) : state.startAt * 1000;
    try { scWidget.seekTo(target); } catch {}
    state.startApplied = true;
    state.scStartPending = true;
    state.scStartDeadline = Date.now() + 5000;
    state.scStartLastSeek = Date.now();
    state.scStartAttempts = 1;
    state.scPosition = target;
    setProgressUI(target, duration || state.track.durationMs || 0);
    renderStartField();
  }

  function playSoundCloud(explicit = false) {
    if (!scWidget || !state.scReady) return;
    if (state.startAt > 0 && !state.startApplied) {
      state.startApplied = false;
      state.scStartPending = true;
    }
    try { scWidget.play(); } catch {}
    clearTimeout(scPlayTimer);
    if (explicit) {
      scPlayTimer = setTimeout(() => {
        if (state.track?.mode !== "soundcloud" || state.scPlaying) return;
        if (state.scCandidateIndex >= 0) {
          tryNextSoundCloudCandidate("Essa versão não tocou; tentei outra.");
        }
      }, 6000);
    }
    setTimeout(() => {
      if (state.track?.mode !== "soundcloud" || !scWidget) return;
      if (state.startAt > 0 && !state.startApplied) applySoundCloudStart();
    }, 150);
  }

  function toggleSoundCloudPlayback() {
    const track = state.track;
    if (!track || track.mode !== "soundcloud") return;

    if (!scWidget || !state.scReady) {
      state.pendingPlay = !state.scPlaying;
      if (state.playerMode !== "sc-loading") {
        destroySoundCloudPlayer();
        state.playerMode = "sc-loading";
        setupSoundCloudPlayer(track);
      }
      toast("Preparando o player do SoundCloud…");
      return;
    }

    if (state.scPlaying) {
      try { scWidget.pause(); } catch {}
    } else {
      playSoundCloud(true);
    }
  }

  function tryNextSoundCloudCandidate(message) {
    const currentUrl = state.track?.url || state.track?.id;
    if (currentUrl) state.scFailed.add(currentUrl);
    const candidates = state.scCandidates || [];
    if (!candidates.length) {
      renderMusic();
      toast("Não achei outra versão. Tenta outra busca ou cola um link do Spotify.");
      return;
    }

    let nextIndex = -1;
    for (let offset = 1; offset <= candidates.length; offset++) {
      const index = (Math.max(0, state.scCandidateIndex) + offset) % candidates.length;
      const item = candidates[index];
      if (!item?.url || state.scFailed.has(item.url)) continue;
      nextIndex = index;
      break;
    }

    if (nextIndex < 0) {
      state.scCandidateIndex = -1;
      renderMusic();
      toast("Não achei uma versão completa. Tenta outra busca ou cola um link do Spotify.");
      return;
    }
    state.scCandidateIndex = nextIndex;
    const item = candidates[nextIndex];
    toast(message || "Tentei outra versão.");
    const artist = state.canonicalArtist || item.artist || "SoundCloud";
    const track = {
      mode: "soundcloud",
      id: item.url,
      url: item.url,
      title: cleanTrackTitle(stripSoundCloudBy(item.title, item.artist), artist) || "Faixa do SoundCloud",
      artist,
      cover: item.cover || SC_FALLBACK,
      durationMs: item.durationMs || state.canonicalDurationMs || 0
    };
    setTrack(track);
    if (els.musicInput) {
      els.musicInput.value = `${track.title}${track.artist ? ` — ${track.artist}` : ""}`;
    }
  }

  async function setupSoundCloudPlayer(track) {
    try {
      const SC = await loadSoundCloudApi();
      if (state.track !== track || state.playerMode !== "sc-loading") return;
      if (!els.scHost) throw new Error("sem host");

      els.scHost.replaceChildren();
      const iframe = document.createElement("iframe");
      iframe.width = "1";
      iframe.height = "1";
      iframe.allow = "autoplay";
      iframe.title = "SoundCloud";
      iframe.src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=false`;
      els.scHost.append(iframe);
      scFrame = iframe;
      scWidget = SC.Widget(iframe);

      scWidget.bind(SC.Widget.Events.READY, () => {
        if (state.track !== track) return;
        state.scReady = true;
        state.playerMode = "soundcloud";
        scWidget.getDuration((ms) => {
          if (state.track !== track) return;
          state.scDuration = Math.max(0, Number(ms) || 0);
          track.durationMs = state.scDuration;
          const canonical = state.canonicalDurationMs || 0;
          if (state.scDuration > 0 && canonical > 0 && state.scDuration < canonical * 0.55 && state.scCandidateIndex >= 0) {
            tryNextSoundCloudCandidate("Essa versão é curta; tentei outra.");
            return;
          }
          validateStartDuration(state.scDuration / 1000);
          if (state.startAt > 0 && !state.startApplied) {
            applySoundCloudStart();
          }
          renderMusic();
          renderStartField();
          scheduleHash();
        });
        scWidget.getCurrentSound((sound) => {
          if (state.track !== track || !sound) return;
          const uploader = sound.user && sound.user.username ? sound.user.username : "";
          const cleanArtist = state.canonicalArtist
            || (track.artist && track.artist !== "SoundCloud" ? track.artist : uploader);
          const cleaned = cleanTrackTitle(stripSoundCloudBy(sound.title, uploader), cleanArtist);
          if (cleaned) track.title = cleaned;
          if (uploader && !state.canonicalArtist && (!track.artist || track.artist === "SoundCloud")) {
            track.artist = uploader;
          }
          if (sound.artwork_url && !/\/images\/fb_placeholder\.png/i.test(sound.artwork_url)) {
            track.cover = sound.artwork_url;
          }
          if (sound.bpm) track.bpm = Number(sound.bpm) || 0;
          renderMusic();
          scheduleHash();
        });
        renderMusic();
        if (state.pendingPlay) {
          state.pendingPlay = false;
          playSoundCloud();
          armAutoplayNotice(track);
        }
      });

      scWidget.bind(SC.Widget.Events.PLAY, () => {
        if (state.track !== track) return;
        clearTimeout(scPlayTimer);
        scPlayTimer = 0;
        state.scPlaying = true;
        state.autoStartPending = false;
        els.music.classList.remove("is-needs-tap");
        els.music.classList.add("is-playing");
        setBgPlaying(true);
        els.musicLabel.textContent = "Tocando agora";
        els.musicToggle.setAttribute("aria-label", "Pausar");
      });

      scWidget.bind(SC.Widget.Events.PAUSE, () => {
        if (state.track !== track) return;
        clearTimeout(scPlayTimer);
        scPlayTimer = 0;
        state.scPlaying = false;
        els.music.classList.remove("is-playing");
        setBgPlaying(false);
        els.musicLabel.textContent = autoplayNeedsTap() ? "Toque para ouvir" : "SoundCloud";
        els.music.classList.toggle("is-needs-tap", autoplayNeedsTap());
        els.musicToggle.setAttribute("aria-label", "Tocar no SoundCloud");
        setProgressUI(state.scPosition, state.scDuration || track.durationMs || 0);
      });

      scWidget.bind(SC.Widget.Events.FINISH, () => {
        if (state.track !== track) return;
        clearTimeout(scPlayTimer);
        scPlayTimer = 0;
        state.scPlaying = false;
        els.music.classList.remove("is-playing");
        setBgPlaying(false);
        state.startApplied = false;
        state.scStartPending = false;
        state.scPosition = 0;
        setProgressUI(0, state.scDuration || track.durationMs || 0);
        renderStartField();
      });

      scWidget.bind(SC.Widget.Events.PLAY_PROGRESS, (data) => {
        if (state.track !== track) return;
        const pos = Math.max(0, Number(data?.currentPosition) || 0);
        state.scPosition = pos;
        if (state.scStartPending && state.startAt > 0) {
          const total = state.scDuration || 0;
          const target = total > 0 ? Math.min(state.startAt * 1000, Math.max(0, total - 1000)) : state.startAt * 1000;
          if (Math.abs(pos - target) <= 1500) {
            state.scStartPending = false;
          } else if (Date.now() - state.scStartLastSeek > 800 && Date.now() < state.scStartDeadline && state.scStartAttempts < 10) {
            try { scWidget.seekTo(target); } catch {}
            state.scStartLastSeek = Date.now();
            state.scStartAttempts += 1;
            state.scPosition = target;
          } else if (Date.now() >= state.scStartDeadline) {
            state.scStartPending = false;
          }
        }
        if (!state.seeking) {
          setProgressUI(state.scPosition, state.scDuration || track.durationMs || 0);
        }
        renderStartField();
      });

      scWidget.bind(SC.Widget.Events.ERROR, () => {
        if (state.track !== track) return;
        state.scError = true;
        state.scReady = false;
        state.scPlaying = false;
        els.music.classList.remove("is-playing");
        setBgPlaying(false);
        if (state.scCandidateIndex >= 0) {
          tryNextSoundCloudCandidate("Essa faixa não abriu; tentei outra.");
        } else {
          renderMusic();
          toast("Essa faixa não abriu no SoundCloud.");
        }
      });
    } catch {
      if (state.track !== track) return;
      state.scError = true;
      state.scReady = false;
      state.playerMode = null;
      renderMusic();
      toast("Não consegui abrir o player do SoundCloud.");
    }
  }

  function hideSpotifyEmbed(instant) {
    state.spotifyExpanded = false;
    els.spotify.classList.remove("is-open");
    els.musicExpand.setAttribute("aria-expanded", "false");
    els.musicExpand.setAttribute("aria-label", "Abrir player do Spotify");
    clearTimeout(spotifyTimer);
    if (instant) {
      els.spotify.replaceChildren();
      els.spotify.hidden = true;
      return;
    }
    spotifyTimer = setTimeout(() => {
      if (!state.spotifyExpanded) {
        els.spotify.replaceChildren();
        els.spotify.hidden = true;
      }
    }, 380);
  }

  function toggleSpotifyEmbed() {
    const track = state.track;
    if (!track || track.mode !== "spotify" || state.playerMode !== "embed") return;

    if (state.spotifyExpanded) {
      hideSpotifyEmbed(false);
      return;
    }

    state.spotifyExpanded = true;
    els.spotify.hidden = false;

    if (!els.spotify.hasChildNodes()) {
      const iframe = document.createElement("iframe");
      iframe.src = `https://open.spotify.com/embed/${encodeURIComponent(track.type)}/${encodeURIComponent(track.id)}?utm_source=generator`;
      iframe.width = "100%";
      iframe.height = "80";
      iframe.loading = "lazy";
      iframe.title = `${track.title || "Música"} no Spotify`;
      iframe.allow = "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture";
      els.spotify.append(iframe);
    }

    els.musicExpand.setAttribute("aria-expanded", "true");
    els.musicExpand.setAttribute("aria-label", "Fechar player do Spotify");
    requestAnimationFrame(() => els.spotify.classList.add("is-open"));
  }

  /* ---------- progresso / seek ---------- */

  function progressSnapshot() {
    const track = state.track;
    if (!track) return { current: 0, total: 0 };

    if (track.mode === "preview") {
      const audio = state.audio;
      const total = track.previewUrl
        ? (audio && Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration * 1000 : 30000)
        : 0;
      const current = audio && state.audioTrackId === track.id ? audio.currentTime * 1000 : 0;
      return { current, total };
    }

    if (track.mode === "spotify" && state.playerMode !== "embed") {
      return { current: state.spotifyPosition, total: state.spotifyDuration || track.durationMs || 0 };
    }

    if (track.mode === "youtube") {
      return { current: state.youtubePosition, total: state.youtubeDuration || track.durationMs || 0 };
    }

    if (track.mode === "soundcloud") {
      return { current: state.scPosition, total: state.scDuration || track.durationMs || 0 };
    }

    return { current: 0, total: 0 };
  }

  function setProgressUI(currentMs, totalMs) {
    const total = Math.max(0, Number(totalMs) || 0);
    const raw = Math.max(0, Number(currentMs) || 0);
    const current = total > 0 ? Math.min(raw, total) : raw;
    const pct = total > 0 ? (current / total) * 100 : 0;

    els.musicFill.style.width = `${pct}%`;
    els.musicThumb.style.left = `${pct}%`;
    els.musicCurrent.textContent = fmtTime(current / 1000);
    els.musicDuration.textContent = total > 0 ? fmtTime(total / 1000) : "0:00";
    els.musicBar.setAttribute("aria-valuenow", String(Math.round(pct)));
    els.musicBar.setAttribute("aria-valuetext", `${fmtTime(current / 1000)} de ${fmtTime(total / 1000)}`);
    els.musicBar.setAttribute("aria-disabled", total > 0 ? "false" : "true");
  }

  function resetSeeking() {
    state.seeking = false;
    els.musicBar.classList.remove("is-seeking");
    try {
      if (seekPointerId !== null) els.musicBar.releasePointerCapture(seekPointerId);
    } catch {}
    seekPointerId = null;
  }

  function seekToPercent(pct, commit) {
    const snapshot = progressSnapshot();
    const track = state.track;
    if (!track || snapshot.total <= 0) return;

    const clamped = Math.min(100, Math.max(0, pct));

    if (track.mode === "preview") {
      const audio = state.audio;
      if (!audio || state.audioTrackId !== track.id) return;
      const duration = snapshot.total / 1000;
      const target = (clamped / 100) * duration;
      setProgressUI(target * 1000, snapshot.total);
      if (commit) {
        state.startApplied = true;
        state.startSeeking = false;
        try { audio.currentTime = target; } catch {}
      }
      return;
    }

    if (track.mode === "youtube" && youtubePlayer) {
      const total = state.youtubeDuration || track.durationMs || 0;
      if (total <= 0) return;
      const targetMs = (clamped / 100) * total;
      setProgressUI(targetMs, total);
      if (commit) {
        state.startApplied = true;
        state.youtubeStartPending = false;
        state.youtubePosition = targetMs;
        try { youtubePlayer.seekTo(targetMs / 1000, true); } catch {}
      }
      return;
    }

    if (track.mode === "soundcloud" && scWidget) {
      const total = state.scDuration || track.durationMs || 0;
      if (total <= 0) return;
      const targetMs = (clamped / 100) * total;
      setProgressUI(targetMs, total);
      if (commit) {
        state.startApplied = true;
        state.scStartPending = false;
        state.scPosition = targetMs;
        try { scWidget.seekTo(targetMs); } catch {}
      }
      return;
    }

    if (track.mode === "spotify" && spotifyController) {
      const total = state.spotifyDuration || track.durationMs || 0;
      if (total <= 0) return;
      const targetMs = (clamped / 100) * total;
      setProgressUI(targetMs, total);
      if (commit) {
        state.startApplied = true;
        state.startSeeking = false;
        state.startSeekDeadline = 0;
        state.startSeekAttempts = 0;
        state.spotifyPosition = targetMs;
        try { spotifyController.seek(targetMs / 1000); } catch {}
      }
    }
  }

  function percentFromPointer(event) {
    const rect = els.musicBar.getBoundingClientRect();
    if (!rect.width) return 0;
    return Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100));
  }

  function toggleCurrentPlayback() {
    const track = state.track;
    if (!track) return;
    if (track.mode === "preview") {
      togglePreview();
    } else if (track.mode === "soundcloud") {
      toggleSoundCloudPlayback();
    } else if (track.mode === "youtube") {
      toggleYouTubePlayback();
    } else if (track.mode === "spotify" && state.playerMode === "embed") {
      toggleSpotifyEmbed();
    } else {
      toggleSpotifyPlayback();
    }
  }

  function beginSeek(event) {
    if (!progressSnapshot().total) return;
    event.preventDefault();
    event.stopPropagation();
    state.seeking = true;
    seekPointerId = event.pointerId;
    els.musicBar.classList.add("is-seeking");
    els.musicBar.focus({ preventScroll: true });
    try { els.musicBar.setPointerCapture(event.pointerId); } catch {}
    seekToPercent(percentFromPointer(event), false);
  }

  function moveSeek(event) {
    if (!state.seeking || event.pointerId !== seekPointerId) return;
    event.preventDefault();
    seekToPercent(percentFromPointer(event), false);
  }

  function finishSeek(event) {
    if (!state.seeking) return;
    if (event.pointerId !== undefined && event.pointerId !== seekPointerId) return;
    const pct = percentFromPointer(event);
    state.seeking = false;
    els.musicBar.classList.remove("is-seeking");
    try {
      if (seekPointerId !== null) els.musicBar.releasePointerCapture(seekPointerId);
    } catch {}
    seekPointerId = null;
    seekToPercent(pct, true);
  }

  function cancelSeek() {
    resetSeeking();
    const snapshot = progressSnapshot();
    setProgressUI(snapshot.current, snapshot.total);
  }

  function onSeekKeydown(event) {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      toggleCurrentPlayback();
      return;
    }

    const snapshot = progressSnapshot();
    if (!snapshot.total) return;

    let pct = (snapshot.current / snapshot.total) * 100;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") pct += 5;
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") pct -= 5;
    else if (event.key === "Home") pct = 0;
    else if (event.key === "End") pct = 100;
    else return;

    event.preventDefault();
    event.stopPropagation();
    seekToPercent(Math.min(100, Math.max(0, pct)), true);
  }

  function renderMusic() {
    const track = state.track;
    const show = Boolean(state.profile) && Boolean(track);
    els.music.hidden = !show;
    if (!show) return;

    const isSpotify = track.mode === "spotify";
    const isYouTube = track.mode === "youtube";
    const isSoundCloud = track.mode === "soundcloud";
    const embedMode = isSpotify && state.playerMode === "embed";
    const inlineMode = (isSpotify && !embedMode) || isYouTube || isSoundCloud;
    els.music.dataset.mode = track.mode;
    els.musicCover.onerror = () => {
      els.musicCover.onerror = null;
      els.musicCover.src = FALLBACK_COVER;
    };
    els.musicCover.src = track.cover || FALLBACK_COVER;
    els.musicTitle.textContent = track.title || "Música";
    if (isYouTube || isSoundCloud) {
      els.musicArtist.textContent = track.artist || "";
    } else {
      els.musicArtist.textContent = !isSpotify && !track.previewUrl
        ? (track.artist ? `${track.artist} · sem prévia` : "Sem prévia disponível")
        : (track.artist || "");
    }
    const previewPlaying = track.mode === "preview" && state.audio
      && state.audioTrackId === track.id && !state.audio.paused;
    els.musicLabel.textContent = isSpotify
      ? (state.spotifyPaused ? (autoplayNeedsTap() ? "Toque para ouvir" : "Spotify") : "Tocando agora")
      : isYouTube
        ? (state.youtubePlaying ? "Tocando agora" : (autoplayNeedsTap() ? "Toque para ouvir" : "YouTube"))
        : isSoundCloud
          ? (state.scPlaying ? "Tocando agora" : (autoplayNeedsTap() ? "Toque para ouvir" : "SoundCloud"))
          : (track.previewUrl ? (previewPlaying ? "Tocando agora" : (autoplayNeedsTap() ? "Toque para ouvir" : "Prévia")) : "Sem prévia");
    els.iconSpotify.hidden = !isSpotify;
    els.iconPreview.hidden = isSpotify || isYouTube || isSoundCloud;
    if (els.iconYouTube) els.iconYouTube.hidden = !isYouTube;
    if (els.iconSoundCloud) els.iconSoundCloud.hidden = !isSoundCloud;
    els.musicPlay.hidden = isSpotify || isYouTube || isSoundCloud;
    els.musicToggle.hidden = !inlineMode;
    els.musicExpand.hidden = !embedMode;
    els.musicProgress.hidden = embedMode;
    els.musicExpand.setAttribute("aria-expanded", String(embedMode && state.spotifyExpanded));

    if (isSoundCloud) {
      if (!state.seeking) {
        setProgressUI(state.scPosition, state.scDuration || track.durationMs || 0);
      }
      els.music.classList.toggle("is-playing", state.scPlaying);
      els.musicToggle.setAttribute("aria-label", state.scPlaying ? "Pausar" : "Tocar no SoundCloud");
    } else if (isYouTube) {
      if (!state.seeking) {
        setProgressUI(state.youtubePosition, state.youtubeDuration || track.durationMs || 0);
      }
      els.music.classList.toggle("is-playing", state.youtubePlaying);
      els.musicToggle.setAttribute("aria-label", state.youtubePlaying ? "Pausar" : "Tocar no YouTube");
    } else if (!isSpotify) {
      els.musicPlay.disabled = !track.previewUrl;
      els.musicPlay.title = track.previewUrl ? "" : "Essa música não tem prévia";
      if (!state.seeking) {
        const audio = state.audio;
        const usesAudio = audio && state.audioTrackId === track.id;
        const total = track.previewUrl
          ? (usesAudio && Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration * 1000 : 30000)
          : 0;
        setProgressUI(usesAudio ? audio.currentTime * 1000 : 0, total);
      }
    } else if (inlineMode) {
      if (!state.seeking) {
        setProgressUI(state.spotifyPosition, state.spotifyDuration || track.durationMs || 0);
      }
      els.music.classList.toggle("is-playing", !state.spotifyPaused && Boolean(spotifyController));
      els.musicToggle.setAttribute("aria-label", state.spotifyPaused ? "Tocar no Spotify" : "Pausar");
    } else {
      els.music.classList.remove("is-playing");
      setProgressUI(0, 0);
    }

    const pausedNow = !els.music.classList.contains("is-playing");
    els.music.classList.toggle("is-needs-tap", autoplayNeedsTap() && pausedNow);
    renderStartField();
  }

  function setTrack(track, opts = {}) {
    stopAudio(true);
    destroySpotifyPlayer();
    destroyYouTubePlayer();
    destroySoundCloudPlayer();
    hideSpotifyEmbed(true);
    state.playerMode = null;
    state.spotifyPosition = 0;
    state.spotifyDuration = 0;
    state.spotifyPaused = true;
    state.pendingPlay = false;
    state.autoStartPending = Boolean(state.autoplay);
    state.autoplayNoticeShown = false;
    state.track = track;
    resetStartSeek();

    if (track.mode === "soundcloud") {
      state.playerMode = "sc-loading";
      state.scDuration = track.durationMs || 0;
      state.scError = false;
      if (state.autoplay) state.pendingPlay = true;
      setupSoundCloudPlayer(track);
    } else if (track.mode === "youtube") {
      state.playerMode = "youtube-loading";
      state.youtubeDuration = track.durationMs || 0;
      state.youtubeError = false;
      if (state.autoplay) state.pendingPlay = true;
      setupYouTubePlayer(track);
    } else if (track.mode === "spotify") {
      if (track.type === "track" || track.type === "episode") {
        state.playerMode = "loading";
        if (state.autoplay) state.pendingPlay = true;
        setupSpotifyPlayer(track);
      } else {
        state.playerMode = "embed";
        state.autoStartPending = false;
      }
    }

    renderMusic();
    writeHash();
    if (opts.autoplay) playPreview();
  }

  function clearTrack() {
    stopAudio(true);
    destroySpotifyPlayer();
    destroyYouTubePlayer();
    destroySoundCloudPlayer();
    hideSpotifyEmbed(true);
    state.playerMode = null;
    state.track = null;
    renderMusic();
    writeHash();
  }

  /* ---------- busca ---------- */

  async function itunesSearch(term, country) {
    const url = `${ITUNES}/search?term=${encodeURIComponent(term)}&media=music&entity=song&limit=8&country=${country}`;
    const data = await getJson(url);
    return (data.results || []).filter((item) => item.kind === "song" && item.trackName);
  }

  async function itunesLookup(id) {
    const data = await getJson(`${ITUNES}/lookup?id=${encodeURIComponent(id)}`);
    return (data.results || [])[0] || null;
  }

  function normalizeItunesResults(items) {
    return (items || []).map((item) => ({
      source: "itunes",
      id: String(item.trackId),
      title: item.trackName || "",
      artist: item.artistName || "",
      cover: item.artworkUrl100 ? art(item.artworkUrl100) : "",
      durationMs: item.trackTimeMillis || 0,
      previewUrl: item.previewUrl || "",
      raw: item
    })).filter((item) => item.id && item.title);
  }

  function safeCoverUrl(url) {
    const value = String(url || "").trim();
    if (!value) return "";
    if (/^data:image\/(webp|jpeg|png);base64,/i.test(value)) return value;
    try {
      const parsed = new URL(value);
      if (parsed.protocol !== "https:") return "";
      if (/(^|\.)(scdn\.co|spotifycdn\.com)$/i.test(parsed.hostname)) return value;
    } catch {}
    return "";
  }

  function escapeRegExp(value) {
    return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function stripSoundCloudBy(title, uploader) {
    let out = String(title || "").trim();
    const name = String(uploader || "").trim();
    if (!name) return out;
    const suffix = ` by ${name}`;
    if (out.toLowerCase().endsWith(suffix.toLowerCase())) {
      out = out.slice(0, -suffix.length).trim();
    }
    return out;
  }

  function cleanTrackTitle(title, artist) {
    let out = String(title || "").trim();
    const name = String(artist || "").trim();
    if (!name) return out;
    const escaped = escapeRegExp(name);
    out = out.replace(new RegExp(`^${escaped}\\s*[-–—]\\s*`, "i"), "");
    out = out.replace(new RegExp(`\\s*[-–—]\\s*${escaped}\\s*$`, "i"), "");
    return out.trim() || String(title || "").trim();
  }

  function parseSoundCloudCount(value) {
    const raw = String(value || "").trim();
    const match = raw.match(/([\d.,]+)\s*([KM])?/i);
    if (!match) return 0;
    if (match[2]) {
      const number = parseFloat(match[1].replace(/,/g, "."));
      if (!Number.isFinite(number)) return 0;
      return Math.round(number * (match[2].toUpperCase() === "M" ? 1000000 : 1000));
    }
    return parseInt(match[1].replace(/[.,]/g, ""), 10) || 0;
  }

  function parseSoundCloudSearch(markdown) {
    const text = String(markdown || "");
    const re = /\[\]\((https:\/\/soundcloud\.com\/([^/)\s]+)\/([^/)\s]+))\)\s*\[\]\([^)]*"(Play|Unavailable)"\)\s*\[([^\]]+)\]\(https:\/\/soundcloud\.com\/\2\)\s*\[([^\]]+)\]\(\1\)/g;
    const items = [];
    const seen = new Set();
    for (const match of text.matchAll(re)) {
      if (match[4] !== "Play") continue;
      const url = match[1];
      if (seen.has(url)) continue;
      seen.add(url);
      const tail = text.slice(match.index, Math.min(text.length, match.index + 1400));
      const plays = tail.match(/([\d.,]+[KM]?)\s*plays/i);
      items.push({
        source: "soundcloud",
        id: url,
        url,
        title: match[6].replace(/\s+/g, " ").trim(),
        artist: match[5].replace(/\s+/g, " ").trim(),
        cover: "",
        durationMs: 0,
        plays: plays ? parseSoundCloudCount(plays[1]) : 0,
        previewUrl: ""
      });
    }
    return items;
  }

  function rankSoundCloud(items, term) {
    const junk = /\b(remix|edit|slowed|sped up|speed up|cover|loop|nightcore|8d|best part|mashup|reverb)\b/i;
    const queryHasJunk = junk.test(term);
    const labelish = (item) => /\b(records|music|official|label|entertainment|interscope|atlantic|universal|sony|warner)\b/i.test(`${item.artist} ${item.url}`) ? 1 : 0;
    const clean = items.filter((item) => queryHasJunk || !junk.test(item.title));
    return (clean.length ? clean : items)
      .slice()
      .sort((a, b) => labelish(a) - labelish(b) || b.plays - a.plays);
  }

  async function enrichSoundCloudItems(items) {
    const selected = items.slice(0, 8);
    await Promise.all(selected.map(async (item) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 6000);
      try {
        const res = await fetch(`https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(item.url)}`, {
          signal: controller.signal
        });
        if (!res.ok) return;
        const data = await res.json();
        if (data.title) item.title = stripSoundCloudBy(data.title, data.author_name);
        if (data.author_name) item.artist = data.author_name;
        if (data.thumbnail_url && !/\/images\/fb_placeholder\.png/i.test(data.thumbnail_url)) {
          item.cover = data.thumbnail_url;
        }
      } catch {
        // mantém os dados da busca
      } finally {
        clearTimeout(timer);
      }
    }));
    return selected;
  }

  async function soundcloudSearch(term) {
    const key = norm(term);
    if (!key) return [];
    if (jinaBlocked) return [];
    const cached = soundcloudSearchCache.get(key);
    if (cached && Date.now() - cached.at < 10 * 60 * 1000) return cached.items.slice();

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const res = await fetch(`${JINA_SOUNDCLOUD}${encodeURIComponent(term)}`, {
        signal: controller.signal,
        headers: { accept: "text/plain" }
      });
      if (res.status === 401) jinaBlocked = true;
      if (!res.ok) throw new Error("SoundCloud search");
      const parsed = parseSoundCloudSearch(await res.text());
      const ranked = rankSoundCloud(parsed, term);
      const items = await enrichSoundCloudItems(ranked);
      if (items.length) soundcloudSearchCache.set(key, { at: Date.now(), items: items.slice() });
      return items;
    } finally {
      clearTimeout(timer);
    }
  }

  function youtubeThumb(id) {
    return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  }

  function parsePipedItems(data) {
    const items = [];
    const seen = new Set();
    for (const item of data?.items || []) {
      if (!item || item.type !== "stream" || !item.url) continue;
      const match = /[?&]v=([A-Za-z0-9_-]{11})/.exec(item.url);
      if (!match) continue;
      const id = match[1];
      if (seen.has(id)) continue;
      seen.add(id);
      items.push({
        source: "youtube",
        id,
        title: item.title || "Vídeo do YouTube",
        artist: item.uploaderName || item.uploader || "",
        durationMs: Math.max(0, Number(item.duration) || 0) * 1000,
        cover: youtubeThumb(id),
        previewUrl: ""
      });
    }
    return items.slice(0, 8);
  }

  async function pipedSearch(base, term, signal) {
    const search = async (filter) => {
      const suffix = filter ? `&filter=${encodeURIComponent(filter)}` : "";
      const res = await fetch(`${base}/search?q=${encodeURIComponent(term)}${suffix}`, { signal });
      if (!res.ok) throw new Error("Piped");
      return parsePipedItems(await res.json());
    };
    let items = await search("music_songs");
    if (!items.length) items = await search("");
    return items;
  }

  function parseJinaYouTube(markdown) {
    const text = String(markdown || "");
    const items = [];
    const seen = new Set();
    const re = /###\s*\[([^\]]+)\]\((https:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})[^)]*)\)/g;
    const matches = [...text.matchAll(re)];
    for (const match of matches) {
      const id = match[3];
      if (seen.has(id)) continue;
      const title = match[1].replace(/\s+/g, " ").trim();
      if (!title) continue;
      const before = text.slice(Math.max(0, match.index - 800), match.index);
      const after = text.slice(match.index, Math.min(text.length, match.index + 600));
      const durations = [...before.matchAll(/\b(\d{1,2}):([0-5]\d)\b/g)];
      const duration = durations[durations.length - 1];
      const channel = after.match(/\[([^\]]+)\]\(https:\/\/www\.youtube\.com\/(?:channel|@)[^)]*\)/);
      seen.add(id);
      items.push({
        source: "youtube",
        id,
        title,
        artist: channel ? channel[1].replace(/\s+/g, " ").trim() : "",
        durationMs: duration ? (Number(duration[1]) * 60 + Number(duration[2])) * 1000 : 0,
        cover: youtubeThumb(id),
        previewUrl: ""
      });
      if (items.length >= 8) break;
    }
    return items;
  }

  async function jinaYouTubeSearch(term) {
    if (jinaBlocked) return [];
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    try {
      const res = await fetch(`${JINA_YOUTUBE}${encodeURIComponent(term)}`, {
        signal: controller.signal,
        headers: { accept: "text/plain" }
      });
      if (res.status === 401) jinaBlocked = true;
      if (!res.ok) throw new Error("YouTube search");
      return parseJinaYouTube(await res.text());
    } finally {
      clearTimeout(timer);
    }
  }

  async function youtubeSearch(term) {
    const key = norm(term);
    if (!key) return [];
    const cached = youtubeSearchCache.get(key);
    if (cached && Date.now() - cached.at < 10 * 60 * 1000) return cached.items.slice();

    const controller = new AbortController();
    const piped = await new Promise((resolve) => {
      let settled = false;
      let pending = PIPED_APIS.length;
      const finish = (items) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        controller.abort();
        resolve(items);
      };
      const timer = setTimeout(() => finish([]), 7500);
      for (const base of PIPED_APIS) {
        pipedSearch(base, term, controller.signal)
          .then((items) => {
            if (items.length) finish(items);
          })
          .catch(() => {})
          .finally(() => {
            pending -= 1;
            if (pending === 0) finish([]);
          });
      }
    });

    if (piped.length) {
      youtubeSearchCache.set(key, { at: Date.now(), items: piped.slice() });
      return piped;
    }

    try {
      const items = await jinaYouTubeSearch(term);
      if (items.length) youtubeSearchCache.set(key, { at: Date.now(), items: items.slice() });
      return items;
    } catch {
      return [];
    }
  }

  function setMusicHint(text) {
    if (!els.musicHint) return;
    els.musicHint.textContent = text || musicHintDefault;
  }

  function noteRow(text) {
    const p = document.createElement("p");
    p.className = "results__empty";
    p.textContent = text;
    return p;
  }

  function showResults(nodes) {
    els.musicResults.replaceChildren(...nodes);
    els.musicResults.hidden = false;
  }

  function closeResults() {
    state.searchSeq += 1;
    clearTimeout(searchTimer);
    els.musicSpinner.hidden = true;
    els.musicResults.hidden = true;
    els.musicResults.replaceChildren();
    state.results = [];
    setMusicHint("");
  }

  function resultRow(item, index) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "result";
    button.dataset.index = String(index);

    const img = document.createElement("img");
    img.src = item.cover || FALLBACK_COVER;
    img.alt = "";
    img.loading = "lazy";
    img.width = 38;
    img.height = 38;
    img.onerror = () => {
      img.onerror = null;
      img.src = FALLBACK_COVER;
    };

    const meta = document.createElement("span");
    meta.className = "result__meta";
    const title = document.createElement("span");
    title.className = "result__title";
    title.textContent = item.title;
    const artist = document.createElement("span");
    artist.className = "result__artist";
    artist.textContent = item.artist || "";
    meta.append(title, artist);

    const tail = document.createElement("span");
    tail.className = "result__tail";
    const badge = document.createElement("span");
    const full = item.source === "soundcloud" || item.source === "youtube";
    badge.className = `result__badge${full ? " result__badge--sc" : ""}`;
    badge.textContent = full ? "Completa" : "30s";
    const time = document.createElement("span");
    time.className = "result__time";
    time.textContent = item.durationMs ? fmtTime(item.durationMs / 1000) : "";
    tail.append(badge, time);

    button.append(img, meta, tail);
    return button;
  }

  function renderResults(items) {
    state.results = items;
    const rows = items.map((item, index) => resultRow(item, index));
    showResults(rows);
  }

  function renderLinkRow() {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "result result--link";
    button.dataset.action = "spotify-link";

    const icon = document.createElement("span");
    icon.className = "result__icon";
    icon.innerHTML = SPOTIFY_ICON;

    const meta = document.createElement("span");
    meta.className = "result__meta";
    const title = document.createElement("span");
    title.className = "result__title";
    title.textContent = "Usar este link do Spotify";
    const sub = document.createElement("span");
    sub.className = "result__artist";
    sub.textContent = "Abre o player oficial dentro do card";
    meta.append(title, sub);

    button.append(icon, meta);
    state.results = [];
    showResults([button]);
  }

  function renderYouTubeLinkRow() {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "result result--link";
    button.dataset.action = "youtube-link";

    const icon = document.createElement("span");
    icon.className = "result__icon result__icon--yt";
    icon.innerHTML = YOUTUBE_ICON;

    const meta = document.createElement("span");
    meta.className = "result__meta";
    const title = document.createElement("span");
    title.className = "result__title";
    title.textContent = "Usar este link do YouTube";
    const sub = document.createElement("span");
    sub.className = "result__artist";
    sub.textContent = "Toca o vídeo completo na barra do card";
    meta.append(title, sub);

    button.append(icon, meta);
    state.results = [];
    showResults([button]);
  }

  function renderSoundCloudLinkRow() {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "result result--link";
    button.dataset.action = "soundcloud-link";

    const icon = document.createElement("span");
    icon.className = "result__icon result__icon--sc";
    icon.innerHTML = SOUNDCLOUD_ICON;

    const meta = document.createElement("span");
    meta.className = "result__meta";
    const title = document.createElement("span");
    title.className = "result__title";
    title.textContent = "Usar este link do SoundCloud";
    const sub = document.createElement("span");
    sub.className = "result__artist";
    sub.textContent = "Toca a faixa completa na barra do card";
    meta.append(title, sub);

    button.append(icon, meta);
    state.results = [];
    showResults([button]);
  }

  async function searchMusic(term) {
    const seq = ++state.searchSeq;
    state.canonicalArtist = "";
    state.canonicalDurationMs = 0;
    els.musicSpinner.hidden = false;
    setMusicHint("Buscando a versão completa…");

    const itunesPromise = (async () => {
      let items = await itunesSearch(term, "BR");
      if (!items.length) items = await itunesSearch(term, "US");
      const normalized = normalizeItunesResults(items);
      if (seq === state.searchSeq && normalized.length) {
        state.canonicalDurationMs = normalized[0].durationMs || 0;
        state.canonicalArtist = normalized[0].artist || "";
      }
      return normalized;
    })().catch(() => []);

    const youtubePromise = youtubeSearch(term).catch(() => []);

    try {
      const soundcloudItems = await soundcloudSearch(term).catch(() => []);
      if (seq !== state.searchSeq) return;
      if (soundcloudItems.length) {
        renderResults(soundcloudItems);
        setMusicHint("");
        return;
      }

      const youtubeItems = await youtubePromise;
      if (seq !== state.searchSeq) return;
      if (youtubeItems.length) {
        renderResults(youtubeItems);
        setMusicHint("Versões completas no YouTube. Escolha uma e dê play.");
        return;
      }

      const items = await itunesPromise;
      if (seq !== state.searchSeq) return;
      if (items.length) {
        renderResults(items.slice(0, 6));
        setMusicHint("Sem versão completa agora. Estas são prévias de 30s.");
      } else {
        showResults([noteRow("Nada encontrado. Tenta com o nome do artista junto.")]);
        setMusicHint("");
      }
    } catch {
      if (seq !== state.searchSeq) return;
      const items = await itunesPromise;
      if (seq !== state.searchSeq) return;
      if (items.length) {
        renderResults(items.slice(0, 6));
        setMusicHint("Sem resposta dos serviços agora. Estas são prévias de 30s.");
      } else {
        showResults([noteRow("A busca falhou agora. Tenta de novo.")]);
        setMusicHint("");
      }
    } finally {
      if (seq === state.searchSeq) els.musicSpinner.hidden = true;
    }
  }

  function onMusicInput() {
    const value = els.musicInput.value.trim();
    state.musicTouched = true;

    if (isSoundCloudish(value)) {
      state.searchSeq += 1;
      clearTimeout(searchTimer);
      els.musicSpinner.hidden = true;
      setMusicHint("");
      if (parseSoundCloud(value)) {
        renderSoundCloudLinkRow();
      } else {
        showResults([noteRow("Cole o link de uma faixa do SoundCloud.")]);
      }
      return;
    }

    if (isSpotifyish(value)) {
      state.searchSeq += 1;
      clearTimeout(searchTimer);
      els.musicSpinner.hidden = true;
      setMusicHint("");
      if (parseSpotify(value)) {
        renderLinkRow();
      } else if (/spotify\.link/i.test(value)) {
        showResults([noteRow("Link curto não abre aqui. No Spotify, toque em Compartilhar e depois em Copiar link da música.")]);
      } else {
        showResults([noteRow("Cole o link de uma música, álbum ou playlist do Spotify.")]);
      }
      return;
    }

    if (value.length < 2) {
      closeResults();
      return;
    }

    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => searchMusic(value), 420);
  }

  async function selectItunes(item, opts = {}) {
    if (!item || !item.trackId) return;
    if (opts.silent && state.musicTouched) return;
    if (!opts.silent) state.musicTouched = true;

    const track = {
      mode: "preview",
      id: String(item.trackId),
      title: item.trackName,
      artist: item.artistName || "",
      cover: art(item.artworkUrl100),
      previewUrl: item.previewUrl || "",
      durationMs: item.trackTimeMillis || 30000
    };
    setTrack(track, { autoplay: state.autoplay });
    if (!opts.silent) {
      els.musicInput.value = `${item.trackName} — ${item.artistName}`;
      els.musicInput.blur();
      closeResults();
      toast("Prévia adicionada ao card.");
    }
  }

  function selectSoundCloudResult(item, opts = {}) {
    if (!item || !item.url) return;
    if (opts.silent && state.musicTouched) return;
    if (!opts.silent) {
      state.musicTouched = true;
      state.scCandidates = state.results.filter((result) => result.source === "soundcloud");
      state.scCandidateIndex = state.scCandidates.findIndex((result) => result.url === item.url);
      state.scFailed = new Set();
    }

    const artist = state.canonicalArtist || item.artist || "SoundCloud";
    const track = {
      mode: "soundcloud",
      id: item.url,
      url: item.url,
      title: cleanTrackTitle(stripSoundCloudBy(item.title, item.artist), artist) || "Faixa do SoundCloud",
      artist,
      cover: item.cover || SC_FALLBACK,
      durationMs: item.durationMs || state.canonicalDurationMs || 0
    };
    setTrack(track);

    if (!opts.silent) {
      els.musicInput.value = `${track.title}${track.artist ? ` — ${track.artist}` : ""}`;
      els.musicInput.blur();
      closeResults();
      toast("Faixa completa no SoundCloud. Dá play para ouvir.");
    }
  }

  function selectResult(item, opts = {}) {
    if (!item) return;
    if (item.source === "soundcloud") {
      selectSoundCloudResult(item, opts);
    } else if (item.source === "youtube") {
      loadYouTubeTrack(item.id, {
        silent: opts.silent,
        meta: {
          title: item.title,
          artist: item.artist,
          cover: item.cover,
          durationMs: item.durationMs
        }
      });
      if (!opts.silent) toast("Versão completa no YouTube. Dá play para ouvir.");
    } else {
      selectItunes(item.raw || item, opts);
    }
  }

  async function enrichSpotifyTrack(track) {
    if (track.artist && track.cover && track.durationMs) return;
    try {
      const items = await itunesSearch(track.title, "BR");
      const wanted = norm(track.title);
      if (!wanted) return;
      const hit = items.find((item) => norm(item.trackName) === wanted);
      if (!hit || state.track !== track) return;
      track.artist = track.artist || hit.artistName || "";
      track.cover = track.cover || (hit.artworkUrl100 ? art(hit.artworkUrl100) : "");
      track.durationMs = track.durationMs || hit.trackTimeMillis || 0;
      renderMusic();
      scheduleHash();
    } catch {}
  }

  async function fallbackSpotifyToFull(track) {
    if (!track || track.mode !== "spotify" || track.type !== "track" || track.fallbackTried) return;
    track.fallbackTried = true;
    const canonical = Math.max(track.durationMs || 0, state.canonicalDurationMs || 0);
    const term = `${track.title} ${track.artist || ""}`.trim();
    const resetPreviewStart = () => {
      if (state.track !== track || state.startAt <= 0) return;
      const previewDuration = (state.spotifyDuration || 0) / 1000;
      if (!(previewDuration > 0 && previewDuration < 60000)) return;
      state.startAt = 0;
      resetStartSeek();
      renderStartField();
      scheduleHash();
      try { spotifyController?.seek(0); } catch {}
      toast("Sem versão completa agora. A prévia vai começar do início.");
    };
    try {
      const items = await youtubeSearch(term);
      if (state.track !== track) return;
      const wanted = norm(track.title);
      const ranked = items
        .filter((item) => item.source === "youtube" && (!item.durationMs || item.durationMs >= 60000))
        .map((item) => {
          let score = 0;
          const title = norm(item.title);
          const artist = norm(item.artist);
          if (title.includes(wanted) || wanted.includes(title)) score += 4;
          if (track.artist && artist.includes(norm(track.artist))) score += 2;
          if (canonical > 0 && item.durationMs > 0) {
            score += Math.max(0, 2 - Math.abs(item.durationMs - canonical) / canonical * 4);
          }
          return { item, score };
        })
        .sort((a, b) => b.score - a.score);
      const best = ranked.find((entry) => entry.score >= 4)?.item || ranked[0]?.item;
      if (!best) {
        resetPreviewStart();
        return;
      }
      loadYouTubeTrack(best.id, {
        silent: true,
        force: true,
        meta: {
          title: track.title,
          artist: track.artist,
          cover: track.cover,
          durationMs: canonical || best.durationMs
        }
      });
      if (state.track?.mode === "youtube") {
        toast("O Spotify liberou só a prévia; usei a versão completa no YouTube.");
      }
    } catch {
      resetPreviewStart();
    }
  }

  async function loadSpotifyLink(raw, opts = {}) {
    const parsed = parseSpotify(raw);
    if (!parsed) {
      toast("Esse link do Spotify não é válido.");
      return;
    }
    if (!opts.silent) state.musicTouched = true;

    const meta = opts.meta || null;
    els.musicSpinner.hidden = false;
    try {
      const url = `https://open.spotify.com/${parsed.type}/${parsed.id}`;
      let data = null;

      if (meta && meta.title) {
        data = {
          title: meta.title,
          artist: meta.artist || "",
          cover: safeCoverUrl(meta.cover),
          durationMs: meta.durationMs || 0
        };
      } else {
        const oembed = await getJson(`${SPOTIFY_OEMBED}?url=${encodeURIComponent(url)}`);
        if (!oembed || !oembed.title) throw new Error("Sem dados");
        data = {
          title: oembed.title,
          artist: "",
          cover: safeCoverUrl(oembed.thumbnail_url),
          durationMs: 0
        };
        if (meta) {
          data.artist = meta.artist || "";
          data.cover = data.cover || safeCoverUrl(meta.cover);
          data.durationMs = meta.durationMs || 0;
        }
      }

      if (opts.silent && state.musicTouched) return;

      const track = {
        mode: "spotify",
        type: parsed.type,
        id: parsed.id,
        title: data.title,
        artist: data.artist || TRACK_KIND[parsed.type] || "",
        cover: data.cover || "",
        durationMs: data.durationMs || 0,
        spotifyUrl: url
      };

      setTrack(track);

      if (!opts.silent) {
        els.musicInput.value = data.title;
        els.musicInput.blur();
        closeResults();
        if (state.playerMode === "embed") {
          toggleSpotifyEmbed();
          toast("Player do Spotify aberto no card.");
        } else {
          toast("Música do Spotify na barra.");
        }
      }

      if (parsed.type === "track") enrichSpotifyTrack(track);
    } catch {
      toast("Não consegui abrir esse link. Confere se ele é público.");
    } finally {
      els.musicSpinner.hidden = true;
    }
  }

  async function fetchYouTubeMeta(id) {
    const oembed = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}&format=json`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 9000);
    try {
      const res = await fetch(`https://r.jina.ai/${oembed}`, {
        signal: controller.signal,
        headers: { accept: "text/plain" }
      });
      if (!res.ok) return null;
      const text = await res.text();
      const start = text.indexOf("{");
      const end = text.lastIndexOf("}");
      if (start < 0 || end <= start) return null;
      const data = JSON.parse(text.slice(start, end + 1));
      return {
        title: data.title || "",
        artist: data.author_name || "",
        cover: data.thumbnail_url || "",
        durationMs: 0
      };
    } catch {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  async function loadYouTubeLink(raw, opts = {}) {
    const id = parseYouTube(raw);
    if (!id) {
      toast("Esse link do YouTube não é válido.");
      return;
    }
    if (!opts.silent) state.musicTouched = true;
    els.musicSpinner.hidden = false;
    try {
      const meta = await fetchYouTubeMeta(id);
      if (opts.silent && state.musicTouched) return;
      loadYouTubeTrack(id, { ...opts, meta: meta || opts.meta });
    } finally {
      els.musicSpinner.hidden = true;
    }
  }

  function loadSoundCloudLink(raw, opts = {}) {
    const parsed = parseSoundCloud(raw);
    if (!parsed) {
      toast("Esse link do SoundCloud não é válido.");
      return;
    }
    if (!opts.silent) state.musicTouched = true;
    loadSoundCloudTrack(parsed.url, opts);
  }

  function loadSoundCloudTrack(url, opts = {}) {
    if (!/^https:\/\/soundcloud\.com\/[^/]+\/[^/]+/i.test(String(url || ""))) {
      if (!opts.silent) toast("Esse link do SoundCloud não é válido.");
      return;
    }
    if (opts.silent && state.musicTouched) return;

    const meta = opts.meta || null;
    if (!meta) {
      state.canonicalArtist = "";
      state.canonicalDurationMs = 0;
    }
    const track = {
      mode: "soundcloud",
      id: url,
      url,
      title: (meta && meta.title) || "Faixa do SoundCloud",
      artist: (meta && meta.artist) || "SoundCloud",
      cover: (meta && meta.cover) || SC_FALLBACK,
      durationMs: (meta && meta.durationMs) || 0
    };
    state.scCandidates = [{
      source: "soundcloud",
      url,
      title: track.title,
      artist: track.artist,
      cover: track.cover
    }];
    state.scCandidateIndex = 0;
    state.scFailed = new Set();

    setTrack(track);
    if (!opts.silent) {
      els.musicInput.value = `${track.title}${track.artist ? ` — ${track.artist}` : ""}`;
      els.musicInput.blur();
      closeResults();
      toast("Faixa do SoundCloud no card. Dá play para ouvir.");
    }
  }

  function loadYouTubeTrack(id, opts = {}) {
    if (!/^[A-Za-z0-9_-]{11}$/.test(String(id || ""))) {
      if (!opts.silent) toast("Esse link do YouTube não é válido.");
      return;
    }
    if (opts.silent && !opts.force && state.musicTouched) return;

    const meta = opts.meta || null;
    const savedCover = meta && meta.cover && /^https:\/\/i\.ytimg\.com\/vi\//i.test(meta.cover)
      ? meta.cover
      : "";
    const track = {
      mode: "youtube",
      id,
      title: (meta && meta.title) || "Vídeo do YouTube",
      artist: (meta && meta.artist) || "YouTube",
      cover: savedCover || youtubeThumb(id),
      durationMs: (meta && meta.durationMs) || 0
    };

    setTrack(track);
    if (!opts.silent) {
      state.musicTouched = true;
      els.musicInput.value = `${track.title}${track.artist ? ` — ${track.artist}` : ""}`;
      els.musicInput.blur();
      closeResults();
      toast("Vídeo do YouTube no card. Dá play para ouvir.");
    }
  }

  /* ---------- exportar ---------- */

  function roundRect(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function drawCover(ctx, img, x, y, w, h) {
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    if (!iw || !ih) return;
    const ir = iw / ih;
    const r = w / h;
    let sw = iw;
    let sh = ih;
    let sx = 0;
    let sy = 0;
    if (ir > r) {
      sw = ih * r;
      sx = (iw - sw) / 2;
    } else {
      sh = iw / r;
      sy = (ih - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
  }

  function loadImage(url) {
    if (!url) return Promise.reject(new Error("sem imagem"));
    if (imageCache.has(url)) return imageCache.get(url);
    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.decoding = "async";
      const timer = setTimeout(() => {
        imageCache.delete(url);
        reject(new Error("tempo esgotado"));
      }, 8000);
      img.onload = () => { clearTimeout(timer); resolve(img); };
      img.onerror = () => { clearTimeout(timer); imageCache.delete(url); reject(new Error("falhou")); };
      img.src = url;
    });
    imageCache.set(url, promise);
    return promise;
  }

  function truncateText(ctx, text, maxWidth) {
    let value = String(text || "");
    if (ctx.measureText(value).width <= maxWidth) return value;
    while (value.length > 1 && ctx.measureText(`${value}…`).width > maxWidth) {
      value = value.slice(0, -1);
    }
    return `${value}…`;
  }

  function wrapLines(ctx, text, maxWidth, font, maxLines) {
    ctx.save();
    ctx.font = font;
    const words = String(text || "").split(/\s+/).filter(Boolean);
    const lines = [];
    let current = "";
    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = word;
        if (lines.length === maxLines) break;
      } else {
        current = test;
      }
    }
    if (lines.length < maxLines && current) lines.push(current);
    ctx.restore();
    return lines.slice(0, maxLines);
  }

  function layoutLinkRows(ctx, links, maxWidth) {
    ctx.save();
    ctx.font = '500 12px "Switzer", Arial, sans-serif';
    const rows = [];
    let row = [];
    let used = 0;

    for (const link of links) {
      const width = 16 + 6 + ctx.measureText(link.handle).width;
      if (row.length && used + 12 + width > maxWidth) {
        rows.push(row);
        row = [];
        used = 0;
      }
      row.push({ link, width });
      used += (row.length > 1 ? 12 : 0) + width;
    }

    if (row.length) rows.push(row);
    ctx.restore();
    return rows;
  }

  async function exportCard() {
    const p = state.profile;
    if (!p) return;

    const previous = els.download.innerHTML;
    els.download.disabled = true;
    els.download.textContent = "Gerando…";

    try {
      if (document.fonts?.ready) {
        await Promise.race([
          document.fonts.ready,
          new Promise((resolve) => setTimeout(resolve, 1500))
        ]);
      }

      const W = 380;
      const PAD = 16;
      const BANNER = 108;
      const AV = 88;
      const track = state.track;
      const status = state.status.trim();
      const pronouns = state.pronouns.trim();
      const bio = state.bio.trim();
      const location = state.location.trim();
      const hasBadges = p.badges.length > 0;
      const hasStatus = Boolean(status);
      const hasBio = Boolean(bio);
      const hasLocation = Boolean(location);
      const hasMusic = Boolean(track);
      const hasLinks = state.links.length > 0;
      const isSpotify = track?.mode === "spotify";
      const isYouTube = track?.mode === "youtube";
      const isSoundCloud = track?.mode === "soundcloud";
      const musicH = 81;

      const measureCtx = document.createElement("canvas").getContext("2d");
      const statusLines = hasStatus
        ? wrapLines(measureCtx, status, W - PAD * 2 - 22, '400 13px "Switzer", Arial, sans-serif', 2)
        : [];
      const bioLines = hasBio
        ? wrapLines(measureCtx, bio, W - PAD * 2, '400 13px "Switzer", Arial, sans-serif', 3)
        : [];
      const linkRows = hasLinks
        ? layoutLinkRows(measureCtx, state.links, W - PAD * 2)
        : [];

      let height = BANNER + AV - 44;
      height += 12 + 27 + 18;
      if (hasBadges) height += 8 + 22;
      height += 13 + 1;
      if (hasStatus) height += 12 + statusLines.length * 19;
      if (hasBio) height += 12 + 15 + bioLines.length * 19;
      if (hasLocation) height += 10 + 17;
      if (hasMusic) height += 14 + musicH;
      if (hasLinks) height += 14 + linkRows.length * 22;
      height += 14 + 15 + 18;
      height = Math.ceil(height);

      const [bannerImg, avatarImg, decorationImg] = await Promise.all([
        p.banner ? loadImage(withSize(p.banner, 600)).catch(() => null) : null,
        p.avatar ? loadImage(withSize(p.avatar, 256)).catch(() => null) : null,
        p.decoration ? loadImage(p.decoration).catch(() => null) : null
      ]);
      const coverImg = hasMusic && track.cover ? await loadImage(track.cover).catch(() => null) : null;
      const badgeImgs = hasBadges
        ? await Promise.all(p.badges.slice(0, 6).map((badge) => loadImage(badge.src).catch(() => null)))
        : [];
      const linkImages = new Map();
      if (hasLinks) {
        await Promise.all(state.links.map(async (link) => {
          const img = await loadImage(link.icon).catch(() => null);
          if (img) linkImages.set(link.url, img);
        }));
      }

      const scale = 2;
      const canvas = document.createElement("canvas");
      canvas.width = W * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext("2d");
      ctx.scale(scale, scale);
      ctx.textBaseline = "top";

      ctx.fillStyle = "#111318";
      roundRect(ctx, 0, 0, W, height, 18);
      ctx.fill();

      ctx.save();
      roundRect(ctx, 0, 0, W, height, 18);
      ctx.clip();

      if (bannerImg) {
        drawCover(ctx, bannerImg, 0, 0, W, BANNER);
      } else if (p.accent) {
        ctx.fillStyle = p.accent;
        ctx.fillRect(0, 0, W, BANNER);
      } else {
        const gradient = ctx.createLinearGradient(0, 0, W, BANNER);
        gradient.addColorStop(0, "#262133");
        gradient.addColorStop(.55, "#1b2130");
        gradient.addColorStop(1, "#1a242a");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, W, BANNER);
      }

      const sheen = ctx.createLinearGradient(0, 0, 0, BANNER);
      sheen.addColorStop(0, "rgba(255,255,255,.10)");
      sheen.addColorStop(1, "rgba(0,0,0,.16)");
      ctx.fillStyle = sheen;
      ctx.fillRect(0, 0, W, BANNER);

      const cx = PAD + AV / 2;
      const cy = BANNER + AV / 2 - 44;

      ctx.beginPath();
      ctx.arc(cx, cy, AV / 2 + 5, 0, Math.PI * 2);
      ctx.fillStyle = "#111318";
      ctx.fill();

      if (avatarImg) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, AV / 2, 0, Math.PI * 2);
        ctx.clip();
        drawCover(ctx, avatarImg, cx - AV / 2, cy - AV / 2, AV, AV);
        ctx.restore();
      } else {
        ctx.beginPath();
        ctx.arc(cx, cy, AV / 2, 0, Math.PI * 2);
        ctx.fillStyle = "#262a34";
        ctx.fill();
      }

      if (decorationImg) {
        ctx.drawImage(decorationImg, cx - AV / 2 - 9, cy - AV / 2 - 9, AV + 18, AV + 18);
      }

      if (p.status && STATUS_LABELS[p.status]) {
        const colors = { online: "#23a55a", idle: "#f0b232", dnd: "#f23f43", offline: "#80848e" };
        ctx.beginPath();
        ctx.arc(cx + 30, cy + 30, 12, 0, Math.PI * 2);
        ctx.fillStyle = "#111318";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cx + 30, cy + 30, 9, 0, Math.PI * 2);
        ctx.fillStyle = colors[p.status] || colors.offline;
        ctx.fill();
      }

      let y = BANNER + AV - 44 + 12;

      ctx.fillStyle = "#f4f5f7";
      ctx.font = '600 22px "Switzer", Arial, sans-serif';
      ctx.fillText(truncateText(ctx, p.displayName, W - PAD * 2), PAD, y);
      y += 27;

      ctx.fillStyle = "#9aa0ae";
      ctx.font = '400 13.5px "Switzer", Arial, sans-serif';
      ctx.fillText(truncateText(ctx, `@${p.handle}${pronouns ? ` · ${pronouns}` : ""}`, W - PAD * 2), PAD, y);
      y += 18;

      if (hasBadges) {
        y += 8;
        let x = PAD;
        for (const img of badgeImgs) {
          if (!img) continue;
          if (x + 22 > W - PAD) break;
          ctx.drawImage(img, x, y, 22, 22);
          x += 26;
        }
        y += 22;
      }

      y += 13;
      ctx.fillStyle = "rgba(255,255,255,.08)";
      ctx.fillRect(PAD, y, W - PAD * 2, 1);
      y += 1;

      if (hasStatus) {
        y += 12;
        ctx.save();
        ctx.translate(PAD + 1, y + 2);
        ctx.scale(14 / 24, 14 / 24);
        ctx.strokeStyle = "#8b91a0";
        ctx.lineWidth = 1.9;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke(new Path2D("M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"));
        ctx.restore();
        ctx.fillStyle = "#c9cdd8";
        ctx.font = '400 13px "Switzer", Arial, sans-serif';
        for (const line of statusLines) {
          ctx.fillText(line, PAD + 22, y);
          y += 19;
        }
      }

      if (hasBio) {
        y += 12;
        ctx.fillStyle = "#8b91a0";
        ctx.font = '600 9.5px "Switzer", Arial, sans-serif';
        ctx.fillText("SOBRE MIM", PAD, y);
        y += 15;
        ctx.fillStyle = "#c9cdd8";
        ctx.font = '400 13px "Switzer", Arial, sans-serif';
        for (const line of bioLines) {
          ctx.fillText(line, PAD, y);
          y += 19;
        }
      }

      if (hasLocation) {
        y += 10;
        ctx.save();
        ctx.translate(PAD, y + 2);
        ctx.scale(13 / 24, 13 / 24);
        ctx.strokeStyle = "#8b91a0";
        ctx.lineWidth = 1.9;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke(new Path2D("M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z"));
        ctx.beginPath();
        ctx.arc(12, 10, 2.6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        ctx.fillStyle = "#9aa0ae";
        ctx.font = '400 12px "Switzer", Arial, sans-serif';
        ctx.fillText(truncateText(ctx, location, W - PAD * 2 - 20), PAD + 20, y + 2);
        y += 17;
      }

      if (hasMusic) {
        y += 14;
        const mx = PAD;
        const my = y;
        const mw = W - PAD * 2;

        ctx.fillStyle = "#1a1d24";
        roundRect(ctx, mx, my, mw, musicH, 10);
        ctx.fill();

        if (coverImg) {
          ctx.save();
          roundRect(ctx, mx + 10, my + 10, 40, 40, 6);
          ctx.clip();
          drawCover(ctx, coverImg, mx + 10, my + 10, 40, 40);
          ctx.restore();
        } else {
          ctx.fillStyle = "#2a2e38";
          roundRect(ctx, mx + 10, my + 10, 40, 40, 6);
          ctx.fill();
        }

        const tx = mx + 60;
        const maxWidth = mw - 70;

        ctx.fillStyle = "#b9bec9";
        ctx.font = '600 9.5px "Switzer", Arial, sans-serif';
        ctx.fillText("TOCANDO AGORA", tx, my + 9);

        ctx.fillStyle = "#f4f5f7";
        ctx.font = '600 13px "Switzer", Arial, sans-serif';
        ctx.fillText(truncateText(ctx, track.title || "", maxWidth), tx, my + 22);

        if (track.artist) {
          ctx.fillStyle = "#9aa0ae";
          ctx.font = '400 11px "Switzer", Arial, sans-serif';
          ctx.fillText(truncateText(ctx, track.artist, maxWidth), tx, my + 38);
        }

        const barWidth = mw - 20;
        const totalMs = isSpotify
          ? (state.spotifyDuration || track.durationMs || 0)
          : isYouTube
            ? (state.youtubeDuration || track.durationMs || 0)
            : isSoundCloud
              ? (state.scDuration || track.durationMs || 0)
              : 30000;
        const currentMs = isSpotify
          ? state.spotifyPosition
          : isYouTube
            ? state.youtubePosition
            : isSoundCloud
              ? state.scPosition
              : (state.audio ? state.audio.currentTime * 1000 : 0);
        const progress = totalMs > 0 ? Math.min(1, currentMs / totalMs) : 0;

        ctx.fillStyle = "rgba(255,255,255,.14)";
        roundRect(ctx, mx + 10, my + 56, barWidth, 3, 2);
        ctx.fill();

        if (progress > 0) {
          ctx.fillStyle = "#f4f5f7";
          roundRect(ctx, mx + 10, my + 56, Math.max(3, barWidth * progress), 3, 2);
          ctx.fill();
        }

        ctx.fillStyle = "#8b91a0";
        ctx.font = '500 9px "Switzer", Arial, sans-serif';
        ctx.fillText(fmtTime(currentMs / 1000), mx + 10, my + 63);

        const end = fmtTime(totalMs / 1000);
        ctx.fillText(end, mx + mw - 10 - ctx.measureText(end).width, my + 63);

        y += musicH;
      }

      if (hasLinks) {
        y += 14;
        for (const row of linkRows) {
          let x = PAD;
          for (const item of row) {
            const icon = linkImages.get(item.link.url);
            if (icon) ctx.drawImage(icon, x, y + 3, 16, 16);
            ctx.fillStyle = "#c9cdd8";
            ctx.font = '500 12px "Switzer", Arial, sans-serif';
            ctx.fillText(item.link.handle, x + 22, y + 4);
            x += item.width + 12;
          }
          y += 22;
        }
      }

      y += 14;
      ctx.fillStyle = "#7f8594";
      ctx.font = '400 11px "Switzer", Arial, sans-serif';
      ctx.fillText(
        truncateText(ctx, p.createdAt ? `No Discord desde ${fmtDate(p.createdAt)}` : "", W - PAD * 2),
        PAD,
        y
      );

      ctx.restore();

      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((value) => value ? resolve(value) : reject(new Error("sem blob")), "image/png");
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const safeName = (p.username || "card").replace(/[^a-z0-9_-]+/gi, "-");
      link.download = `disperfil-${safeName}.png`;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      toast("Card salvo em PNG.");
    } catch {
      toast("Não consegui gerar o PNG. Tenta de novo.");
    } finally {
      els.download.disabled = false;
      els.download.innerHTML = previous;
    }
  }

  /* ---------- limpar ---------- */

  function clearAll() {
    state.profile = null;
    state.track = null;
    state.status = "";
    state.spotifyExpanded = false;
    state.playerMode = null;
    state.spotifyPosition = 0;
    state.spotifyDuration = 0;
    state.spotifyPaused = true;
    state.pendingPlay = false;
    state.musicTouched = true;
    state.loading = false;
    state.loadToken += 1;

    stopAudio(true);
    destroySpotifyPlayer();
    destroyYouTubePlayer();
    destroySoundCloudPlayer();
    hideSpotifyEmbed(true);
    closeResults();
    try { els.photoDialog?.close(); } catch {}

    els.idInput.value = "";
    els.musicInput.value = "";
    els.statusInput.value = "";
    els.statusCount.textContent = "0/60";
    els.statusWrap.hidden = true;
    els.statusToggle.hidden = false;
    els.statusToggle.setAttribute("aria-expanded", "false");
    state.links = [];
    els.linkInput.value = "";
    setLinkError("");
    els.linkChips.replaceChildren();
    els.linkChips.hidden = true;
    els.linksWrap.hidden = true;
    els.linksToggle.hidden = false;
    els.linksToggle.setAttribute("aria-expanded", "false");
    state.startAt = 0;
    state.autoplay = false;
    if (els.autoplayToggle) els.autoplayToggle.checked = false;
    resetStartSeek();
    state.bg = "none";
    state.bgReactive = true;
    state.bgImage = "";
    state.photos = [];
    state.photoSeq = 0;
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith("dp-hd-"))
        .forEach((key) => localStorage.removeItem(key));
    } catch {}
    if (els.bgImage) els.bgImage.value = "";
    if (els.cardImageInput) els.cardImageInput.value = "";
    if (els.cardImageUrlInput) els.cardImageUrlInput.value = "";
    if (els.shareName) els.shareName.value = "";
    applyBgImage();
    applyCardImage();
    els.startAt.hidden = true;
    els.startInput.value = "0:00";
    state.pronouns = "";
    state.location = "";
    state.bio = "";
    els.pronounsInput.value = "";
    els.locationInput.value = "";
    els.bioInput.value = "";
    els.bioCount.textContent = "0/160";
    els.detailsWrap.hidden = true;
    els.detailsToggle.hidden = false;
    els.detailsToggle.setAttribute("aria-expanded", "false");
    els.cardBio.hidden = true;
    els.cardBioText.textContent = "";
    els.cardLocation.hidden = true;
    els.cardLocationText.textContent = "";
    state.theme = "light";
    state.themeColor = "#e8e9e3";
    state.themeGradient = "sunset";
    state.gradientStart = "#7c6cff";
    state.gradientEnd = "#ff7a9c";
    state.gradientAngle = 135;
    applyTheme();
    applyBgFromState();
    applyBgImage();
    applyCardImage();
    renderCardLinks();
    els.submit.disabled = false;
    els.submit.textContent = "Montar";
    els.card.classList.remove("is-loading");
    els.card.setAttribute("aria-busy", "false");
    setError("");

    renderEmpty();

    try {
      history.replaceState(null, "", `${location.pathname}${location.search}`);
    } catch {}
    try { localStorage.removeItem("disperfil:id"); } catch {}

    els.idInput.focus();
  }

  /* ---------- status ---------- */

  function revealStatus(focus = true) {
    els.statusToggle.hidden = true;
    els.statusToggle.setAttribute("aria-expanded", "true");
    els.statusWrap.hidden = false;
    if (focus) els.statusInput.focus();
  }

  /* ---------- eventos ---------- */

  function bindEvents() {
    els.form.addEventListener("submit", (event) => {
      event.preventDefault();
      loadProfile(els.idInput.value);
    });

    els.idInput.addEventListener("input", () => {
      if (!els.idError.hidden) setError("");
    });

    els.musicInput.addEventListener("input", onMusicInput);

    els.musicInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const value = els.musicInput.value.trim();
        if (isSoundCloudish(value)) {
          if (parseSoundCloud(value)) loadSoundCloudLink(value);
          else toast("Esse link do SoundCloud não é válido.");
          return;
        }
        if (isSpotifyish(value)) {
          if (parseSpotify(value)) loadSpotifyLink(value);
          else toast("Esse link do Spotify não é válido.");
          return;
        }
        if (state.results.length) {
          selectResult(state.results[0]);
          return;
        }
        if (value.length >= 2) searchMusic(value);
        return;
      }

      if (event.key === "Escape") {
        closeResults();
        return;
      }

      if (event.key === "ArrowDown" && !els.musicResults.hidden) {
        const first = els.musicResults.querySelector("button.result");
        if (first) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    els.musicResults.addEventListener("click", (event) => {
      const button = event.target.closest("button.result");
      if (!button) return;

      if (button.dataset.action === "spotify-link") {
        loadSpotifyLink(els.musicInput.value);
        return;
      }

      if (button.dataset.action === "soundcloud-link") {
        loadSoundCloudLink(els.musicInput.value);
        return;
      }

      const index = Number(button.dataset.index);
      const item = state.results[index];
      if (item) selectResult(item);
    });

    els.musicResults.addEventListener("keydown", (event) => {
      const items = Array.from(els.musicResults.querySelectorAll("button.result"));
      const index = items.indexOf(document.activeElement);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        (items[index + 1] || items[0])?.focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        (items[index - 1] || items[items.length - 1])?.focus();
      } else if (event.key === "Escape") {
        event.preventDefault();
        closeResults();
        els.musicInput.focus();
      }
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest("#music-field")) closeResults();
    });

    els.musicPlay.addEventListener("click", (event) => {
      event.stopPropagation();
      togglePreview();
    });

    els.musicToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleCurrentPlayback();
    });

    window.addEventListener("pointerdown", (event) => {
      if (!state.autoplay || !state.autoStartPending || !state.track) return;
      if (event.target instanceof Element && event.target.closest("#music")) return;
      const track = state.track;
      let attempted = false;
      if (track.mode === "spotify" && spotifyController && state.spotifyPaused) {
        if (state.startAt > 0 && !state.startApplied) requestSpotifyStart();
        try { spotifyController.play(); } catch {}
        attempted = true;
      } else if (track.mode === "soundcloud" && scWidget && state.scReady && !state.scPlaying) {
        playSoundCloud(true);
        attempted = true;
      } else if (track.mode === "youtube" && youtubePlayer && state.youtubeReady && !state.youtubePlaying) {
        playYouTube();
        attempted = true;
      } else if (track.mode === "preview" && state.audio && state.audio.paused) {
        playPreview();
        attempted = true;
      }
      if (attempted) state.autoStartPending = false;
    }, true);

    els.musicExpand.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleSpotifyEmbed();
    });

    els.musicBar.addEventListener("pointerdown", beginSeek);
    els.musicBar.addEventListener("pointermove", moveSeek);
    els.musicBar.addEventListener("pointerup", finishSeek);
    els.musicBar.addEventListener("pointercancel", cancelSeek);
    els.musicBar.addEventListener("keydown", onSeekKeydown);

    els.statusToggle.addEventListener("click", () => revealStatus(true));

    els.statusInput.addEventListener("input", () => {
      state.status = els.statusInput.value.slice(0, 60);
      els.statusCount.textContent = `${state.status.length}/60`;
      renderStatus();
      scheduleHash();
    });

    els.statusInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        els.statusInput.blur();
      }
    });

    els.linksToggle.addEventListener("click", () => revealLinks(true));

    els.linkAdd.addEventListener("click", () => addLink(els.linkInput.value));

    els.linkInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        addLink(els.linkInput.value);
      }
    });

    els.linkInput.addEventListener("input", () => {
      if (!els.linkError.hidden) setLinkError("");
    });

    els.linkChips.addEventListener("click", (event) => {
      const button = event.target.closest(".link-chip__remove");
      if (button) removeLink(button.dataset.url);
    });

    document.querySelectorAll(".bg-option").forEach((button) => {
      button.addEventListener("click", () => setBgPreset(button.dataset.bg));
      button.addEventListener("mouseenter", () => previewBgPreset(button.dataset.bg));
      button.addEventListener("focus", () => previewBgPreset(button.dataset.bg));
    });
    if (els.bgPicker) {
      els.bgPicker.addEventListener("mouseleave", endBgPreview);
      els.bgPicker.addEventListener("focusout", (event) => {
        if (!els.bgPicker.contains(event.relatedTarget)) endBgPreview();
      });
    }

    els.bgReactive.addEventListener("change", () => setBgReactive(els.bgReactive.checked));

    if (els.bgImage) {
      els.bgImage.addEventListener("change", () => {
        const file = els.bgImage.files && els.bgImage.files[0];
        if (file) handleBgImageFile(file);
      });
    }

    if (els.bgImageClear) {
      els.bgImageClear.addEventListener("click", clearBgImage);
    }

    if (els.cardImageInput) {
      els.cardImageInput.addEventListener("change", () => {
        const file = els.cardImageInput.files && els.cardImageInput.files[0];
        if (file) handleCardImageFile(file);
      });
    }

    if (els.cardImageUrlApply) {
      els.cardImageUrlApply.addEventListener("click", applyCardImageUrl);
    }

    if (els.cardImageUrlInput) {
      els.cardImageUrlInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          applyCardImageUrl();
        }
      });
    }

    els.startInput.addEventListener("change", () => {
      const parsed = parseStart(els.startInput.value);
      if (parsed === null) {
        els.startInput.value = fmtTime(state.startAt);
        toast("Use um tempo tipo 0:17.");
        return;
      }
      setStartAt(parsed);
    });

    els.startInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        els.startInput.blur();
      }
    });

    els.autoplayToggle.addEventListener("change", () => {
      state.autoplay = els.autoplayToggle.checked;
      scheduleHash();
    });

    els.startUse.addEventListener("click", () => {
      const current = currentPlaybackSeconds();
      if (current <= 0.4) {
        toast("Dá play primeiro para pegar o momento.");
        return;
      }
      setStartAt(Math.floor(current));
      toast(`A música vai começar em ${fmtTime(state.startAt)}.`);
    });

    els.detailsToggle.addEventListener("click", () => revealDetails(true));

    const syncDetails = () => {
      state.pronouns = els.pronounsInput.value.slice(0, 24);
      state.location = els.locationInput.value.slice(0, 40);
      state.bio = els.bioInput.value.slice(0, 160);
      els.bioCount.textContent = `${state.bio.length}/160`;
      renderCardDetails();
      scheduleHash();
    };
    [els.pronounsInput, els.locationInput, els.bioInput].forEach((input) => {
      input.addEventListener("input", syncDetails);
    });

    els.locationInput.addEventListener("input", () => {
      scheduleLocationSuggestions(els.locationInput.value);
    });

    els.locationInput.addEventListener("focus", () => {
      if (state.locationPicked) return;
      if (!els.locationInput.value.trim()) {
        state.locationOpen = true;
        renderLocationRows(baseLocationItems());
        return;
      }
      openLocationResults();
      if (els.locationInput.value.trim().length >= 3) {
        scheduleLocationSuggestions(els.locationInput.value);
      }
    });

    els.locationInput.addEventListener("blur", () => {
      setTimeout(() => {
        if (!els.locationResults || !els.locationResults.contains(document.activeElement)) {
          closeLocationResults();
        }
      }, 180);
    });

    els.locationInput.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        openLocationResults();
        const first = els.locationResults.querySelector("button.location-result");
        if (first) first.focus();
      } else if (event.key === "Escape") {
        closeLocationResults();
      }
    });

    els.locationResults.addEventListener("click", (event) => {
      const button = event.target.closest("button.location-result");
      if (!button) return;
      const item = state.locationItems[Number(button.dataset.index)];
      if (item) setLocationValue(item.value);
    });

    els.locationResults.addEventListener("keydown", (event) => {
      const buttons = Array.from(els.locationResults.querySelectorAll("button.location-result"));
      const index = buttons.indexOf(document.activeElement);
      if (event.key === "ArrowDown") {
        event.preventDefault();
        (buttons[index + 1] || buttons[0])?.focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        (buttons[index - 1] || buttons[buttons.length - 1])?.focus();
      } else if (event.key === "Escape") {
        event.preventDefault();
        closeLocationResults();
        els.locationInput.focus();
      }
    });

    let locationRepositionRaf = 0;
    const repositionLocation = () => {
      if (!els.locationResults || els.locationResults.hidden) return;
      cancelAnimationFrame(locationRepositionRaf);
      locationRepositionRaf = requestAnimationFrame(positionLocationResults);
    };
    window.addEventListener("resize", repositionLocation);
    window.addEventListener("scroll", repositionLocation, { passive: true });

    document.querySelectorAll(".theme-option").forEach((button) => {
      button.addEventListener("click", () => setTheme(button.dataset.theme));
    });

    document.querySelectorAll(".theme-gradient").forEach((button) => {
      button.addEventListener("click", () => setGradient(button.dataset.gradient));
    });

    const applyCustomGradient = () => {
      state.theme = "gradient";
      state.themeGradient = "custom";
      state.gradientStart = els.gradientStart.value;
      state.gradientEnd = els.gradientEnd.value;
      state.gradientAngle = Math.max(0, Math.min(360, Number(els.gradientAngle.value) || 135));
      applyTheme();
      scheduleHash();
    };

    [els.gradientStart, els.gradientEnd].forEach((input) => {
      input.addEventListener("input", applyCustomGradient);
    });
    els.gradientAngle.addEventListener("input", applyCustomGradient);
    els.gradientCustom.addEventListener("click", () => setGradient("custom"));

    els.themeColor.addEventListener("input", () => {
      state.theme = "custom";
      state.themeColor = els.themeColor.value;
      applyTheme();
      scheduleHash();
    });

    window.addEventListener("pointermove", (event) => {
      bg.px = event.clientX / window.innerWidth;
      bg.py = event.clientY / window.innerHeight;
    }, { passive: true });

    window.addEventListener("resize", () => {
      if (bg.preset === "none") return;
      resizeBg();
      if (prefersReduced()) drawBg(performance.now());
    });

    let photoResizeTimer = 0;
    window.addEventListener("resize", () => {
      clearTimeout(photoResizeTimer);
      photoResizeTimer = setTimeout(() => refreshFloatingPhotoPositions({ peek: true }), 150);
    });

    els.example.addEventListener("click", () => {
      els.idInput.value = EXAMPLE_ID;
      loadProfile(EXAMPLE_ID);
    });

    els.download.addEventListener("click", exportCard);

    const copyShare = async () => {
      if (els.copy.disabled) return;
      const rawName = els.shareName ? els.shareName.value.trim() : "";
      const name = normalizeShareName(rawName);
      if (rawName && name.length < 3) {
        toast("Use pelo menos 3 letras ou números no nome do link.");
        return;
      }
      if (/^(m|r)-/i.test(name)) {
        toast("Escolha um nome que não comece com m- ou r-.");
        return;
      }
      if (RESERVED_SHARE_NAMES.has(name)) {
        toast("Esse nome é reservado pelo site. Escolha outro.");
        return;
      }
      if (els.shareName && rawName) els.shareName.value = name;
      writeHash();
      els.copy.disabled = true;
      if (els.shareName) els.shareName.disabled = true;
      els.copy.setAttribute("aria-busy", "true");
      toast("Gerando link curto…");
      let focusName = false;
      try {
        const shortUrl = await shortenShareLink(name);
        const usedName = Boolean(name) && (shortUrl.endsWith(`/${name}`) || shortUrl.endsWith(`#k=${name}`));
        const ok = await copyText(shortUrl);
        toast(ok
          ? (usedName
            ? "Link personalizado copiado."
            : (name ? "Não consegui usar esse nome agora; copiei um link curto com código." : "Link curto copiado. Ele abre o mesmo card."))
          : "Link curto gerado, mas não consegui copiar. Tente de novo.");
      } catch (error) {
        if (error && error.message === "name-taken") {
          toast(`O nome "${name}" já está em uso. Escolha outro.`);
          focusName = true;
          return;
        }
        if (error && error.message === "name-reserved") {
          toast("Esse nome é reservado pelo site. Escolha outro.");
          focusName = true;
          return;
        }
        const ok = await copyText(buildShareUrl());
        toast(ok
          ? "Não consegui encurtar agora. Copiei o link completo — ele abre o mesmo card."
          : "Não consegui copiar. Copia da barra de endereço.");
      } finally {
        els.copy.disabled = false;
        if (els.shareName) {
          els.shareName.disabled = false;
          if (focusName) els.shareName.focus();
        }
        els.copy.removeAttribute("aria-busy");
      }
    };

    els.copy.addEventListener("click", copyShare);

    if (els.shareName) {
      els.shareName.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          copyShare();
        }
      });
      els.shareName.addEventListener("input", () => {
        const value = els.shareName.value;
        const clean = value.toLowerCase().replace(/[^a-z0-9_-]+/g, "-");
        if (clean !== value) {
          const pos = els.shareName.selectionStart;
          els.shareName.value = clean;
          try { els.shareName.setSelectionRange(pos, pos); } catch {}
        }
      });
    }

    els.clear.addEventListener("click", clearAll);

    document.querySelectorAll("[data-open-help]").forEach((button) => {
      button.addEventListener("click", () => {
        if (typeof els.help.showModal === "function") els.help.showModal();
        else els.help.setAttribute("open", "");
      });
    });

    document.querySelectorAll("[data-close-help]").forEach((button) => {
      button.addEventListener("click", () => els.help.close());
    });

    els.help.addEventListener("click", (event) => {
      if (event.target === els.help) els.help.close();
    });

    document.querySelectorAll("[data-close-photo]").forEach((button) => {
      button.addEventListener("click", () => {
        if (els.photoDialog) els.photoDialog.close();
      });
    });

    if (els.photoDialog) {
      els.photoDialog.addEventListener("click", (event) => {
        if (event.target === els.photoDialog) els.photoDialog.close();
      });
    }
  }

  /* ---------- boot ---------- */

  async function boot() {
    musicHintDefault = els.musicHint ? els.musicHint.textContent : "";
    bindEvents();

    let params = new URLSearchParams(location.hash.slice(1));
    const pathCode = shareCodeFromPath();
    const shortCode = params.get("k") || pathCode;
    if (shortCode) {
      toast("Abrindo link curto…");
      try {
        const decoded = await loadShortLink(shortCode);
        activeShortCode = shortCode;
        shortLinkCache = {
          hash: decoded,
          url: prettyCardUrl(shortCode)
        };
        params = new URLSearchParams(decoded);
      } catch {
        toast("Não consegui abrir esse link curto. Confira se ele está completo.");
      }
    }
    state.shareMode = params.get("v") === "card" || Boolean(shortCode);
    if (state.shareMode) {
      document.body.classList.add("is-sharing");
      els.shareHeading.hidden = false;
    }
    const basePath = new URL(document.baseURI).pathname.replace(/\/+$/, "");
    if (els.sharePrefix) {
      els.sharePrefix.textContent = isLocalHost() ? "#k=" : `${location.host}${basePath}/`;
    }
    if (els.shareNameHint) {
      els.shareNameHint.textContent = isLocalHost()
        ? "Opcional. Sem nome, o link curto usa um código aleatório. O nome precisa estar livre."
        : `Opcional. No site publicado, o link fica ${location.host}${basePath}/seu-nome. O nome precisa estar livre.`;
    }

    const savedBg = params.get("bg");
    if (savedBg && BG_PRESETS.has(savedBg) && savedBg !== "none") state.bg = savedBg;
    state.bgReactive = params.get("bgm") !== "0";
    const savedBgImage = params.get("bgi");
    if (savedBgImage && /^data:image\/(webp|jpeg|png);base64,/i.test(savedBgImage)) {
      state.bgImage = savedBgImage;
    }
    const savedPhotos = params.get("ph");
    if (savedPhotos) {
      try {
        const list = JSON.parse(savedPhotos);
        if (Array.isArray(list)) {
          list.slice(0, MAX_PHOTOS).forEach((entry) => {
            if (!entry || typeof entry !== "object") return;
            const preview = validPhotoSrc(entry.s) ? entry.s : "";
            const storedHd = preview ? readHdPhoto(preview) : "";
            const entrySrc = validPhotoSrc(entry.h) ? entry.h : (validPhotoSrc(storedHd) ? storedHd : entry.s);
            if (!validPhotoSrc(entrySrc)) return;
            addPhoto(entrySrc, {
              preview: preview || entrySrc,
              caption: entry.c,
              x: entry.x,
              y: entry.y,
              r: entry.r,
              front: entry.f === 1 || entry.f === true,
              fit: entry.t === 1 || entry.t === true
            });
          });
        }
      } catch {}
    } else {
      const savedCardImage = params.get("ci");
      if (validPhotoSrc(savedCardImage || "")) {
        const legacyX = parseFloat(params.get("px") || "");
        const legacyY = parseFloat(params.get("py") || "");
        addPhoto(savedCardImage, {
          caption: params.get("cc"),
          x: Number.isFinite(legacyX) ? `${legacyX}%` : undefined,
          y: Number.isFinite(legacyY) ? `${legacyY}%` : undefined,
          front: params.get("pf") === "1"
        });
      }
    }
    const savedStart = parseInt(params.get("st") || "", 10);
    if (Number.isFinite(savedStart) && savedStart > 0) state.startAt = savedStart;
    state.autoplay = params.get("ap") === "1";
    if (els.autoplayToggle) els.autoplayToggle.checked = state.autoplay;
    applyBgFromState();
    applyBgImage();
    applyCardImage();

    const savedStatus = params.get("s");
    if (savedStatus) {
      state.status = savedStatus.slice(0, 60);
      els.statusInput.value = state.status;
      els.statusCount.textContent = `${state.status.length}/60`;
      revealStatus(false);
    }

    const savedLinks = params.getAll("l");
    if (savedLinks.length) {
      revealLinks(false);
      savedLinks.slice(0, MAX_LINKS).forEach((url) => addLink(url, { silent: true }));
    }

    const savedPronouns = params.get("pr");
    if (savedPronouns) state.pronouns = savedPronouns.slice(0, 24);
    const savedLocation = params.get("loc");
    if (savedLocation) state.location = savedLocation.slice(0, 40);
    const savedBio = params.get("bio");
    if (savedBio) state.bio = savedBio.slice(0, 160);
    if (state.pronouns || state.location || state.bio) revealDetails(false);
    els.pronounsInput.value = state.pronouns;
    els.locationInput.value = state.location;
    els.bioInput.value = state.bio;
    els.bioCount.textContent = `${state.bio.length}/160`;

    const savedTheme = params.get("th");
    state.theme = ["light", "dark", "custom", "gradient"].includes(savedTheme) ? savedTheme : "light";
    const savedColor = params.get("bgc");
    if (/^#[0-9a-f]{6}$/i.test(savedColor || "")) state.themeColor = savedColor;
    const savedGradient = params.get("tg");
    if (savedGradient === "custom" || Object.prototype.hasOwnProperty.call(THEME_GRADIENTS, savedGradient || "")) {
      state.themeGradient = savedGradient;
    }
    const savedGradientStart = params.get("gs");
    if (/^#[0-9a-f]{6}$/i.test(savedGradientStart || "")) state.gradientStart = savedGradientStart;
    const savedGradientEnd = params.get("ge");
    if (/^#[0-9a-f]{6}$/i.test(savedGradientEnd || "")) state.gradientEnd = savedGradientEnd;
    const savedGradientAngle = parseInt(params.get("ga") || "", 10);
    if (Number.isFinite(savedGradientAngle)) state.gradientAngle = Math.max(0, Math.min(360, savedGradientAngle));
    applyTheme();

    const id = extractId(params.get("u") || "");
    if (id) {
      els.idInput.value = id;
      loadProfile(id);
    } else {
      const saved = readId();
      if (saved && extractId(saved)) els.idInput.value = saved;
    }

    const trackParam = params.get("m");
    const hashTrackMeta = {
      title: (params.get("mt") || "").slice(0, 120),
      artist: (params.get("ma") || "").slice(0, 120),
      cover: params.get("mc") || "",
      durationMs: parseInt(params.get("md") || "", 10) || 0
    };
    if (trackParam) resolveTrackParam(trackParam, hashTrackMeta);

    window.addEventListener("hashchange", () => location.reload());
  }

  async function resolveTrackParam(raw, meta) {
    if (state.musicTouched) return;
    try {
      if (raw.startsWith("sp:")) {
        const [, type, id] = raw.split(":");
        if (!type || !id) return;
        await loadSpotifyLink(`https://open.spotify.com/${type}/${id}`, { silent: true, meta });
        if (!state.musicTouched && !els.musicInput.value.trim() && state.track) {
          els.musicInput.value = state.track.title;
        }
      } else if (raw.startsWith("yt:")) {
        const id = raw.slice(3).trim();
        if (!id) return;
        loadYouTubeTrack(id, { silent: true, meta });
        if (!state.musicTouched && !els.musicInput.value.trim() && state.track) {
          els.musicInput.value = `${state.track.title}${state.track.artist ? ` — ${state.track.artist}` : ""}`;
        }
      } else if (raw.startsWith("sc:")) {
        const url = raw.slice(3).trim();
        if (!url) return;
        loadSoundCloudTrack(url, { silent: true, meta });
        if (!state.musicTouched && !els.musicInput.value.trim() && state.track) {
          els.musicInput.value = `${state.track.title}${state.track.artist ? ` — ${state.track.artist}` : ""}`;
        }
      } else if (raw.startsWith("it:")) {
        const item = await itunesLookup(raw.slice(3));
        if (!item || state.musicTouched) return;
        await selectItunes(item, { silent: true });
        if (!state.musicTouched && !els.musicInput.value.trim() && state.track) {
          els.musicInput.value = `${item.trackName} — ${item.artistName}`;
        }
      }
    } catch {}
  }

  boot().catch(() => {});
})();
