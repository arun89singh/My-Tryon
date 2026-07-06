// ═══════════════════════════════════════════════════════════════
//  House of Zuri — cus-app.js (bundled for Shopify)
//  Single file, no ES6 module dependencies.
//  In theme liquid: <script src="{{ 'cus-app.js' | asset_url }}" defer="defer"></script>
// ═══════════════════════════════════════════════════════════════

(function () {
'use strict';

// ── utils ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
//  utils.js — Shared helpers
// ═══════════════════════════════════════════════════════════════

function hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m ? { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) }
             : { r: 210, g: 25, b: 139 };
}

function fmt(n) {
    return '\u20B9' + n.toLocaleString('en-IN');
}

function setTryonStatus(msg, type = 'info') {
    const el = document.getElementById('tryon-status');
    if (!el) return;
    el.textContent = msg;
    el.style.display = msg ? 'block' : 'none';
    el.className = `tryon-status tryon-status--${type}`;
}

// ── product-config ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
//  product-config.js — Product definitions (single source of truth)
// ═══════════════════════════════════════════════════════════════
//  To add a new product:
//    1. Add an entry to PRODUCTS below
//    2. Add a face-region renderer in face-renderer.js (if new region)
//    3. That's it — form, pricing, preview all auto-generate from config
// ═══════════════════════════════════════════════════════════════

const PRODUCTS = {
    lipstick: {
        id: 'lipstick',
        name: 'Lipstick',
        icon: 'lipstick',
        basePrice: 1180,
        faceRegion: 'lips_matte',
        shadePresets: {
            'Glamor Pink': '#D2198B',
            'Berry Crush': '#6B0F3A',
            'Warm Nude':   '#C4845A',
            'Ruby Red':    '#A61C1C',
            'Coral Kiss':  '#D95F3B',
        },
        fields: [
            { type: 'select', key: 'finish',   label: 'Finish',             options: ['Matte', 'Satin', 'Gloss', 'Creamy', 'Shimmer'] },
            { type: 'select', key: 'coverage', label: 'Coverage Intensity', options: ['Sheer', 'Medium', 'Full'] },
        ],
        ingredients: [
            { id: 'ing-vit-e',      name: 'Vitamin E',   price: 150, checked: true },
            { id: 'ing-hyaluronic', name: 'Hyaluronic',  price: 300 },
            { id: 'ing-spf',        name: 'SPF 15',      price: 300 },
            { id: 'ing-jojoba',     name: 'Jojoba oil',  price: 150, checked: true },
            { id: 'ing-shea',       name: 'Shea Butter', price: 200, checked: true },
        ],
        fragrances: ['Unscented', 'Vanilla', 'Rose', 'Coconut'],
        defaultFragrance: 'Rose',
    },

    lip_gloss: {
        id: 'lip_gloss',
        name: 'Lip Gloss',
        icon: 'gloss',
        basePrice: 980,
        faceRegion: 'lips_gloss',
        shadePresets: {
            'Glamor Pink': '#D2198B',
            'Berry Crush': '#6B0F3A',
            'Warm Nude':   '#C4845A',
            'Crystal Clear':'#F5C6D0',
            'Coral Kiss':  '#D95F3B',
        },
        fields: [
            { type: 'select', key: 'finish',   label: 'Finish',             options: ['Glossy', 'Shimmer', 'Metallic'] },
            { type: 'select', key: 'coverage', label: 'Coverage Intensity', options: ['Sheer', 'Medium', 'Full'] },
        ],
        ingredients: [
            { id: 'ing-shea',       name: 'Shea Butter', price: 200, checked: true },
            { id: 'ing-vit-e',      name: 'Vitamin E',   price: 150, checked: true },
            { id: 'ing-hyaluronic', name: 'Hyaluronic Acid', price: 300 },
            { id: 'ing-coconut',    name: 'Coconut Oil', price: 150, checked: true },
        ],
        fragrances: ['Unscented', 'Vanilla', 'Berry', 'Coconut'],
        defaultFragrance: 'Vanilla',
    },

    lip_oil: {
        id: 'lip_oil',
        name: 'Lip Oil',
        icon: 'gloss',
        basePrice: 1050,
        faceRegion: 'lips_oil',
        shadePresets: {
            'Signature Pink': '#fd5a99',
            'Natural Glow': '#A45C40',
            'Rose Quartz':  '#E8A0BF',
            'Honey Drip':   '#C68642',
            'Berry Tint':   '#8B2252',
            'Clear':        '#F5D5D5',
        },
        fields: [
            { type: 'select', key: 'finish',   label: 'Finish',   options: ['Glossy', 'Satin'] },
            { type: 'select', key: 'coverage', label: 'Coverage', options: ['Sheer', 'Medium'] },
        ],
        ingredients: [
            { id: 'ing-jojoba',   name: 'Jojoba Oil',   price: 150, checked: true },
            { id: 'ing-rosehip',  name: 'Rosehip Oil',  price: 250, checked: true },
            { id: 'ing-vit-e',    name: 'Vitamin E',    price: 150, checked: true },
            { id: 'ing-niacinamide',    name: 'Niacinamide',    price: 150, checked: true },
            { id: 'ing-licorice',    name: 'Licorice root extract',    price: 150, checked: true },
            { id: 'ing-hyaluronic',    name: 'Hyaluronic Acid',    price: 150, checked: true },
            { id: 'ing-shea-butter',    name: 'Shea butter',    price: 150, checked: true },
        ],
        fragrances: ['Unscented', 'Vanilla', 'Rose', 'Honey'],
        defaultFragrance: 'Rose',
    },

    skin_tint: {
        id: 'skin_tint',
        name: 'Skin Tint',
        icon: 'foundation',
        basePrice: 1450,
        faceRegion: 'face',
        shadePresets: {
            'Porcelain':  '#F5DEB3',
            'Fair':       '#F0D5B8',
            'Light':      '#DEB887',
            'Medium':     '#C4A574',
            'Tan':        '#A67B5B',
            'Deep':       '#6B4226',
        },
        fields: [
            { type: 'select', key: 'undertone', label: 'Undertone',  options: ['Warm', 'Cool', 'Neutral', 'Olive'] },
            { type: 'select', key: 'coverage',  label: 'Coverage',   options: ['Light', 'Medium', 'Buildable'] },
            { type: 'select', key: 'finish',    label: 'Finish',     options: ['Dewy', 'Natural', 'Matte'] },
            { type: 'select', key: 'skinType',  label: 'Skin Type',  options: ['Oily', 'Dry', 'Combination', 'Sensitive'] },
            { type: 'toggle', key: 'spf',       label: 'SPF Protection' },
            { type: 'toggle', key: 'hydration', label: 'Hydration Boost' },
        ],
        ingredients: [
            { id: 'ing-ha',         name: 'Hyaluronic Acid', price: 300, checked: true },
            { id: 'ing-niacinamide',name: 'Niacinamide',     price: 250, checked: true },
            { id: 'ing-squalane',   name: 'Squalane',        price: 200 },
            { id: 'ing-vit-e',      name: 'Vitamin E',       price: 150, checked: true },
        ],
        fragrances: ['Unscented'],
        defaultFragrance: 'Unscented',
    },

    liquid_blush: {
        id: 'liquid_blush',
        name: 'Liquid Blush',
        icon: 'blush',
        basePrice: 890,
        faceRegion: 'cheeks',
        shadePresets: {
            'Peach Glow':   '#FFAA80',
            'Rose Flush':   '#E8687D',
            'Berry Pop':    '#C74375',
            'Coral Sunset': '#FF7F50',
            'Mauve Dream':  '#C08497',
        },
        fields: [
            { type: 'select', key: 'undertone', label: 'Undertone', options: ['Warm', 'Cool', 'Neutral'] },
            { type: 'select', key: 'intensity', label: 'Intensity', options: ['Light', 'Medium', 'High'] },
            { type: 'select', key: 'finish',    label: 'Finish',    options: ['Dewy', 'Matte', 'Radiant'] },
            { type: 'toggle', key: 'shimmer',   label: 'Add Shimmer' },
        ],
        ingredients: [
            { id: 'ing-glycerin',  name: 'Glycerin',    price: 100, checked: true },
            { id: 'ing-jojoba',    name: 'Jojoba Oil',  price: 150, checked: true },
            { id: 'ing-vit-c',     name: 'Vitamin C',   price: 200 },
            { id: 'ing-silica',    name: 'Silica',       price: 150 },
            { id: 'ing-Niacinamide',    name: 'Niacinamide',       price: 150 },
            { id: 'ing-Panthenol',    name: 'Panthenol (Vitamin B5) ',       price: 150 },
            { id: 'ing-Squalane',    name: 'Squalane',       price: 150 },
        ],
        fragrances: ['Unscented', 'Rose'],
        defaultFragrance: 'Unscented',
    },

    eyeshadow: {
        id: 'eyeshadow',
        name: 'Eyeshadow',
        icon: 'highlighter',
        basePrice: 950,
        faceRegion: 'eyelids',
        shadePresets: {
            'Champagne':   '#F7E7CE',
            'Bronze':      '#CD7F32',
            'Smoky Plum':  '#5C3A6E',
            'Forest':      '#2E5A3E',
            'Midnight':    '#191970',
        },
        fields: [
            { type: 'select', key: 'finish',       label: 'Finish',       options: ['Matte', 'Shimmer', 'Metallic', 'Glitter'] },
            { type: 'select', key: 'pigmentation', label: 'Pigmentation', options: ['Soft', 'Medium', 'Intense'] },
            { type: 'select', key: 'paletteSize',  label: 'Palette Size', options: ['1', '4', '9', '12'] },
        ],
        ingredients: [
            { id: 'ing-talc',     name: 'Talc-free base', price: 100, checked: true },
            { id: 'ing-vit-e',    name: 'Vitamin E',      price: 150, checked: true },
            { id: 'ing-jojoba',   name: 'Jojoba Oil',     price: 150 },
        ],
        fragrances: ['Unscented'],
        defaultFragrance: 'Unscented',
    },
};

// Ordered list for UI rendering
const PRODUCT_ORDER = [
    'lipstick', 'lip_gloss', 'lip_oil', 'skin_tint', 'liquid_blush', 'eyeshadow'
];

// Quick lookup: product id → face region
function getFaceRegion(productId) {
    return PRODUCTS[productId]?.faceRegion || 'lips_matte';
}

// Quick lookup: product id → config
function getProduct(productId) {
    return PRODUCTS[productId] || PRODUCTS.lipstick;
}

// ── face-renderer ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
//  face-renderer.js — Face region rendering (Phase 3 complete)
// ═══════════════════════════════════════════════════════════════
//  4 face regions fully implemented:
//    lips     — polygon fill with inner cutout (teeth)
//    cheeks   — soft radial gradient blush on each cheek
//    face     — face oval tint with eye + mouth cutouts
//    eyelids  — upper eyelid bands (crease to brow edge)
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
//  LANDMARK INDICES (MediaPipe 478-point model)
// ═══════════════════════════════════════════════════════════════

// ─── Lips ────────────────────────────────────────────────────
const LIP_OUTER = [
    61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291,
    375, 321, 405, 314, 17, 84, 181, 91, 146,
];
const LIP_INNER = [
    78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308,
    324, 318, 402, 317, 14, 87, 178, 88, 95,
];
const UPPER_OUTER = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291];
const UPPER_INNER = [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308];

// ─── Face oval ───────────────────────────────────────────────
const FACE_OVAL = [
    10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288,
    397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136,
    172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109,
];

// ─── Eyes (full contour — used as cutout in skin tint) ───────
const LEFT_EYE = [
    362, 382, 381, 380, 374, 373, 390, 249,
    263, 466, 388, 387, 386, 385, 384, 398,
];
const RIGHT_EYE = [
    33, 7, 163, 144, 145, 153, 154, 155,
    133, 173, 157, 158, 159, 160, 161, 246,
];

// ─── Eyebrows ────────────────────────────────────────────────
const LEFT_EYEBROW  = [336, 296, 334, 293, 300, 276, 283, 282, 295, 285];
const RIGHT_EYEBROW = [70, 63, 105, 66, 107, 55, 65, 52, 53, 46];

// ─── Cheek center landmarks (for computing blush placement) ──
// We average a few landmarks in each cheek region to find center
const CHEEK_LEFT_CENTER  = [123, 50, 36, 205, 187, 147];
const CHEEK_RIGHT_CENTER = [352, 280, 266, 425, 411, 376];

// ─── Eyelid upper region (upper eye edge — crease line) ──────
// Upper half of each eye contour (the arc above the eye opening)
const LEFT_EYE_UPPER  = [362, 398, 384, 385, 386, 387, 388, 466, 263];
const RIGHT_EYE_UPPER = [33, 246, 161, 160, 159, 158, 157, 173, 133];

// ─── Exported for dead-zone measurement ──────────────────────
const FACE_LANDMARK_INDICES = {
    lips:     [...new Set([...LIP_OUTER, ...LIP_INNER])],
    cheeks:   [...new Set([...CHEEK_LEFT_CENTER, ...CHEEK_RIGHT_CENTER])],
    eyelids:  [...new Set([...LEFT_EYE_UPPER, ...RIGHT_EYE_UPPER, ...LEFT_EYEBROW, ...RIGHT_EYEBROW])],
    face:     [...new Set(FACE_OVAL)],
};

// ═══════════════════════════════════════════════════════════════
//  SHARED DRAWING HELPERS
// ═══════════════════════════════════════════════════════════════

function getPts(lm, w, h, idx) {
    return idx.map(i => ({ x: lm[i].x * w, y: lm[i].y * h }));
}

function tracePath(ctx, pts) {
    if (!pts.length) return;
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.closePath();
}

// Trace a CLOSED, SMOOTH curve through a ring of points using quadratic
// segments between consecutive midpoints. Turns a sparse, faceted polygon
// (e.g. 9 eye landmarks) into a clean continuous outline.
function traceSmoothClosed(ctx, pts) {
    const n = pts.length;
    if (n < 3) { tracePath(ctx, pts); return; }
    const start = { x: (pts[n - 1].x + pts[0].x) / 2, y: (pts[n - 1].y + pts[0].y) / 2 };
    ctx.moveTo(start.x, start.y);
    for (let i = 0; i < n; i++) {
        const cur = pts[i];
        const nxt = pts[(i + 1) % n];
        ctx.quadraticCurveTo(cur.x, cur.y, (cur.x + nxt.x) / 2, (cur.y + nxt.y) / 2);
    }
    ctx.closePath();
}

function expandContour(pts, factor, cornerBoost = 0) {
    let cx = 0, cy = 0;
    for (let i = 0; i < pts.length; i++) { cx += pts[i].x; cy += pts[i].y; }
    cx /= pts.length; cy /= pts.length;
    const maxDx = Math.max(...pts.map(q => Math.abs(q.x - cx))) || 1;
    return pts.map(p => {
        const dx = p.x - cx, dy = p.y - cy;
        let hF = factor;
        if (cornerBoost > 0) hF = factor + cornerBoost * (Math.abs(dx) / maxDx);
        return { x: cx + dx * hF, y: cy + dy * factor };
    });
}

// Expand a contour by independent horizontal / vertical factors around its
// centroid. Lets an eye cutout keep vertical margin without bulging sideways
// toward the nose.
function expandXY(pts, fx, fy) {
    let cx = 0, cy = 0;
    for (let i = 0; i < pts.length; i++) { cx += pts[i].x; cy += pts[i].y; }
    cx /= pts.length; cy /= pts.length;
    return pts.map(p => ({ x: cx + (p.x - cx) * fx, y: cy + (p.y - cy) * fy }));
}

// Compute centroid of a set of landmark points
function centroid(lm, w, h, indices) {
    let sx = 0, sy = 0;
    for (const i of indices) { sx += lm[i].x * w; sy += lm[i].y * h; }
    return { x: sx / indices.length, y: sy / indices.length };
}

// ═══════════════════════════════════════════════════════════════
//  1. LIP RENDERER — 3 separate pipelines for lipstick / gloss / oil
// ═══════════════════════════════════════════════════════════════

function renderLipMask(ctx, landmarks, w, h, hexColor, blurPx) {
    const c = hexToRgb(hexColor);
    // new-vt drawLipstick() shape: RAW outer contour (no 4% expansion),
    // inner ALWAYS cut out (mouth seam), no baseline blur. Shared by
    // lipstick / gloss / oil so all three sit on the identical lip shape.
    const outer = getPts(landmarks, w, h, LIP_OUTER);
    const inner = getPts(landmarks, w, h, LIP_INNER);

    ctx.clearRect(0, 0, w, h);
    if (blurPx > 0) ctx.filter = `blur(${blurPx.toFixed(1)}px)`;

    ctx.fillStyle = `rgb(${c.r},${c.g},${c.b})`;
    ctx.beginPath();
    tracePath(ctx, outer);
    tracePath(ctx, [...inner].reverse());
    ctx.fill('evenodd');
    ctx.filter = 'none';
}

/**
 * Returns the bounding box of the upper and lower lip areas.
 * Used for placing catchlights and sheen gradients.
 */
function getLipRegions(landmarks, w, h) {
    const upper = getPts(landmarks, w, h, UPPER_OUTER);
    const lower = getPts(landmarks, w, h, [291, 375, 321, 405, 314, 17, 84, 181, 91, 146, 61]);

    const upBounds = {
        minX: Math.min(...upper.map(p => p.x)),
        maxX: Math.max(...upper.map(p => p.x)),
        minY: Math.min(...upper.map(p => p.y)),
        maxY: Math.max(...upper.map(p => p.y)),
    };
    const loBounds = {
        minX: Math.min(...lower.map(p => p.x)),
        maxX: Math.max(...lower.map(p => p.x)),
        minY: Math.min(...lower.map(p => p.y)),
        maxY: Math.max(...lower.map(p => p.y)),
    };
    return { upper, lower, upBounds, loBounds };
}

/**
 * Clip to the lip mask shape so highlights/sheen don't leak outside the lips.
 * Call this before drawing highlights, then ctx.restore() after.
 */
function clipToLipMask(ctx, landmarks, w, h) {
    // Match new-vt lip shape exactly: raw outer contour, inner always cut.
    // Effects (gloss specular, oil pink wash) are unchanged — only the
    // lip outline they clip to is unified with renderLipMask.
    const outer = getPts(landmarks, w, h, LIP_OUTER);
    const inner = getPts(landmarks, w, h, LIP_INNER);

    ctx.beginPath();
    tracePath(ctx, outer);
    tracePath(ctx, [...inner].reverse());
    ctx.clip('evenodd');
}

// ─── LIPSTICK: opaque matte/satin finish (current behavior) ──
function compositeLipstick(ctx, maskCanvas, landmarks, w, h, opacity, shine) {
    // ── Read the lipstick form selections (lipstick only; gloss/oil unchanged) ──
    const finish   = state.finish   || '';
    const coverage = state.coverage || '';

    // ── D: Coverage Intensity → opacity multiplier ──
    //   Sheer = a translucent tint, Full = bold opaque. The slider still
    //   acts as a master scale on top of this.
    const COVERAGE_MUL = { Sheer: 0.6, Medium: 0.9, Full: 1.15 };
    const covMul    = COVERAGE_MUL[coverage] ?? 1.0;
    const fillAlpha = Math.min(opacity * covMul, 1.0);

    // ── C: Finish → shine amount, edge contrast, sparkle ──
    //   Matte = no shine + strong rim; Gloss = high shine + soft rim;
    //   Shimmer adds sparkle flecks. Default (no finish picked) ≈ satin-ish.
    const FINISH = {
        Matte:   { shine: 0.0, edge: 1.0, sparkle: false },
        Satin:   { shine: 0.4, edge: 0.8, sparkle: false },
        Creamy:  { shine: 0.7, edge: 0.7, sparkle: false },
        Gloss:   { shine: 1.3, edge: 0.5, sparkle: false },
        Shimmer: { shine: 0.8, edge: 0.7, sparkle: true  },
    };
    const fin    = FINISH[finish] || { shine: 1.0, edge: 0.8, sparkle: false };
    const fShine = Math.min(shine * fin.shine, 1.0);

    // No landmarks (shouldn't happen for camera/photo) → plain fill fallback.
    if (!landmarks) {
        ctx.save();
        ctx.globalAlpha = fillAlpha;
        ctx.drawImage(maskCanvas, 0, 0);
        ctx.restore();
        return;
    }

    const { upBounds, loBounds } = getLipRegions(landmarks, w, h);
    const lipW = Math.max(upBounds.maxX - upBounds.minX, 1);

    // ── A: Soft feathered edge ──
    //   Blur the colored mask a touch so the color melts into the natural
    //   lip line instead of stopping as a hard pink block.
    ctx.save();
    const feather = Math.max(lipW * 0.008, 1.2);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = fillAlpha;
    ctx.filter = `blur(${feather.toFixed(1)}px)`;
    ctx.drawImage(maskCanvas, 0, 0);
    ctx.filter = 'none';
    ctx.globalAlpha = 1;

    // ── B: Dimension — darken the rim ──
    //   A blurred, translucent dark stroke along the lip outline (multiply,
    //   clipped to the lip) gives the edges depth so lips look 3D, not flat.
    if (fin.edge > 0 && fillAlpha > 0.15) {
        ctx.save();
        clipToLipMask(ctx, landmarks, w, h);
        const outer = getPts(landmarks, w, h, LIP_OUTER);
        ctx.globalCompositeOperation = 'multiply';
        ctx.strokeStyle = `rgba(0,0,0,${(0.22 * fin.edge).toFixed(2)})`;
        ctx.lineWidth = Math.max(lipW * 0.05, 3);
        ctx.filter = `blur(${(lipW * 0.02).toFixed(1)}px)`;
        ctx.beginPath();
        tracePath(ctx, outer);
        ctx.stroke();
        ctx.filter = 'none';
        ctx.restore();
    }

    // ── B/C: Dimension — center highlight + finish sheen ──
    //   Screen-blended white highlights: a sheen band on the upper lip and a
    //   soft glow on the lower-lip center for a plump look. Scaled by finish.
    if (fShine > 0.02) {
        ctx.save();
        clipToLipMask(ctx, landmarks, w, h);
        ctx.globalCompositeOperation = 'screen';

        const upOuter = expandContour(getPts(landmarks, w, h, UPPER_OUTER), 1.02, 0.02);
        const upInner = getPts(landmarks, w, h, UPPER_INNER);
        const xs = upOuter.map(p => p.x), ys = upOuter.map(p => p.y);
        const grd = ctx.createLinearGradient(
            Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)
        );
        grd.addColorStop(0,    `rgba(255,255,255,${(fShine * 0.30).toFixed(2)})`);
        grd.addColorStop(0.35, `rgba(255,255,255,${(fShine * 0.10).toFixed(2)})`);
        grd.addColorStop(1,    'rgba(255,255,255,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        tracePath(ctx, upOuter);
        tracePath(ctx, [...upInner].reverse());
        ctx.fill('evenodd');

        // Lower-lip center glow (the natural light catch that plumps lips)
        const loW = loBounds.maxX - loBounds.minX;
        const loH = loBounds.maxY - loBounds.minY;
        drawOilHighlight(
            ctx,
            loBounds.minX + loW * 0.5,
            loBounds.minY + loH * 0.55,
            loW * 0.28, loH * 0.32,
            fShine * 0.9
        );
        ctx.restore();
    }

    // ── C: Shimmer finish — scattered sparkle flecks ──
    if (fin.sparkle) {
        ctx.save();
        clipToLipMask(ctx, landmarks, w, h);
        ctx.globalCompositeOperation = 'screen';
        const loW = loBounds.maxX - loBounds.minX;
        const loH = loBounds.maxY - loBounds.minY;
        const loCy = loBounds.minY + loH * 0.5;
        for (let i = 0; i < 7; i++) {
            const fx = loBounds.minX + loW * (0.15 + 0.7 * (i / 6));
            const fy = loCy + (i % 2 ? -loH * 0.12 : loH * 0.14);
            drawOilHighlight(ctx, fx, fy, loW * 0.03, loH * 0.05, 0.9);
        }
        const upW  = upBounds.maxX - upBounds.minX;
        const upCy = upBounds.minY + (upBounds.maxY - upBounds.minY) * 0.5;
        for (let i = 0; i < 5; i++) {
            const fx = upBounds.minX + upW * (0.2 + 0.6 * (i / 4));
            drawOilHighlight(ctx, fx, upCy, upW * 0.025,
                (upBounds.maxY - upBounds.minY) * 0.06, 0.8);
        }
        ctx.restore();
    }

    ctx.restore();
}

// ─── LIP GLOSS: clear/transparent finish — only specular highlights ──
//  No color tint applied. The selected shade is ignored.
//  The user sees their natural lips with just the wet/glossy reflection.
function compositeLipGloss(ctx, maskCanvas, landmarks, w, h, opacity, shine) {
    if (!landmarks) return;

    // Sheer color wash from the selected shade. Gloss is translucent, so we
    // draw the colored lip mask at reduced alpha (not fully clear like before
    // — picking a shade now actually shows up), then layer the wet specular
    // highlights on top.
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = Math.min(opacity * 0.55, 0.7);
    ctx.drawImage(maskCanvas, 0, 0);
    ctx.restore();

    ctx.save();
    clipToLipMask(ctx, landmarks, w, h);

    const s = Math.max(shine, 0.5);

    // ── SPECULAR: Curved highlight following lip contour ──
    // A specular reflection on a curved wet surface appears as a thin band
    // that follows the surface curvature. For lips, this means:
    //  - Upper lip: thin curved band just below its upper edge
    //  - Lower lip: thin curved band just below its top edge (mouth seam area)
    //
    // By tracing the ACTUAL upper contour of each lip and offsetting, we get
    // a shape that naturally follows the lip curve — not a flat line/ellipse.

    const upOuter = getPts(landmarks, w, h, UPPER_OUTER);
    const upInner = getPts(landmarks, w, h, UPPER_INNER);

    // Lower lip outer & inner
    const loOuter = getPts(landmarks, w, h, [291, 375, 321, 405, 314, 17, 84, 181, 91, 146, 61]);
    const loInner = getPts(landmarks, w, h, [308, 324, 318, 402, 317, 14, 87, 178, 88, 95, 78]);

    // Apply heavy blur so the highlight softens into the lip rather than
    // looking like a painted line. Blur amount scales with lip size.
    const lipW = upOuter[upOuter.length - 1].x - upOuter[0].x;
    const blurAmt = Math.max(lipW * 0.025, 4);
    ctx.filter = `blur(${blurAmt.toFixed(1)}px)`;

    // Screen blend = additive light (physically correct for reflection)
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 1;

    // ── UPPER LIP HIGHLIGHT ──
    // Band between upper outer edge (lip top) and 30% down toward inner edge
    // Horizontal fade at ends so it's brightest in center, dim at corners.
    drawSpecularBand(ctx, upOuter, upInner, 0.35, s * 0.55);

    // ── LOWER LIP HIGHLIGHT ──
    // Band between inner edge (mouth seam) and 35% down toward outer edge
    // Lower lip catches more light — make slightly brighter
    drawSpecularBand(ctx, loInner, loOuter, 0.38, s * 0.70);

    ctx.filter = 'none';
    ctx.restore();
}

/**
 * Draws a thin curved specular highlight band between two contour edges.
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} topEdge - Array of {x,y} forming the TOP of the band
 * @param {Array} bottomEdge - Reference contour BELOW the highlight area
 * @param {number} depth - How far down from topEdge toward bottomEdge (0-1)
 * @param {number} brightness - Peak alpha (0-1)
 *
 * The band is drawn as a closed polygon between topEdge and an interpolated
 * line that's `depth` of the way toward bottomEdge. A gradient fades the
 * brightness from center toward the corners horizontally.
 */
function drawSpecularBand(ctx, topEdge, bottomEdge, depth, brightness) {
    // Compute the lower boundary of the band by interpolating toward bottomEdge
    // For each top point, find the closest bottom point and move toward it.
    const lowerEdge = topEdge.map((tp, i) => {
        // Find corresponding bottom point (similar x position)
        let closest = bottomEdge[0];
        let minDist = Math.abs(bottomEdge[0].x - tp.x);
        for (let j = 1; j < bottomEdge.length; j++) {
            const d = Math.abs(bottomEdge[j].x - tp.x);
            if (d < minDist) { minDist = d; closest = bottomEdge[j]; }
        }
        return {
            x: tp.x + (closest.x - tp.x) * depth,
            y: tp.y + (closest.y - tp.y) * depth,
        };
    });

    // Compute horizontal span for the gradient (brighter center, faded corners)
    const xs = topEdge.map(p => p.x);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const centerX = (minX + maxX) / 2;
    const halfW = (maxX - minX) / 2;

    // Use a radial gradient to fade brightness toward edges
    const centerY = topEdge.reduce((s, p) => s + p.y, 0) / topEdge.length;
    const grd = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, halfW);
    grd.addColorStop(0,   `rgba(255,255,255,${brightness.toFixed(2)})`);
    grd.addColorStop(0.5, `rgba(255,255,255,${(brightness * 0.6).toFixed(2)})`);
    grd.addColorStop(1,   'rgba(255,255,255,0)');

    ctx.fillStyle = grd;
    ctx.beginPath();
    // Trace top edge left-to-right
    ctx.moveTo(topEdge[0].x, topEdge[0].y);
    for (let i = 1; i < topEdge.length; i++) {
        ctx.lineTo(topEdge[i].x, topEdge[i].y);
    }
    // Trace lower edge right-to-left (closes the polygon)
    for (let i = lowerEdge.length - 1; i >= 0; i--) {
        ctx.lineTo(lowerEdge[i].x, lowerEdge[i].y);
    }
    ctx.closePath();
    ctx.fill();
}

// ─── LIP OIL: fixed light-pink tint + diffuse sheen ──
//  Always uses a universal soft-pink color, regardless of which shade
//  the user selects. The selected shade does NOT affect Lip Oil rendering.
function compositeLipOil(ctx, maskCanvas, landmarks, w, h, opacity, shine) {
    if (!landmarks) return;

    // ── Universal light-pink color (fixed, ignores selected shade) ──
    const OIL_PINK = 'rgba(253, 90, 153, 1)';  // #fd5a99 — client-specified pink

    ctx.save();
    clipToLipMask(ctx, landmarks, w, h);

    const { upBounds, loBounds } = getLipRegions(landmarks, w, h);
    const allMinX = Math.min(upBounds.minX, loBounds.minX);
    const allMaxX = Math.max(upBounds.maxX, loBounds.maxX);
    const allMinY = upBounds.minY;
    const allMaxY = loBounds.maxY;

    // Light pink wash with soft-light blend — barely tints the natural lip
    ctx.globalCompositeOperation = 'soft-light';
    ctx.globalAlpha = Math.min(opacity * 0.7, 0.7);
    ctx.fillStyle = OIL_PINK;
    ctx.fillRect(allMinX - 5, allMinY - 5,
                 (allMaxX - allMinX) + 10, (allMaxY - allMinY) + 10);

    // Extra pigment for visibility (raised from 0.08 — the soft-light wash
    // alone barely showed on the camera feed)
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = opacity * 0.20;
    ctx.fillStyle = OIL_PINK;
    ctx.fillRect(allMinX - 5, allMinY - 5,
                 (allMaxX - allMinX) + 10, (allMaxY - allMinY) + 10);

    // ── Diffuse oily sheen (white highlights) ──
    const s = Math.max(shine, 0.4);

    const wash = ctx.createLinearGradient(0, allMinY, 0, allMaxY);
    wash.addColorStop(0,   `rgba(255,255,255,${(s * 0.28).toFixed(2)})`);
    wash.addColorStop(0.3, `rgba(255,255,255,${(s * 0.18).toFixed(2)})`);
    wash.addColorStop(0.6, `rgba(255,255,255,${(s * 0.22).toFixed(2)})`);
    wash.addColorStop(1,   `rgba(255,255,255,${(s * 0.10).toFixed(2)})`);

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = wash;
    ctx.fillRect(allMinX - 5, allMinY - 5,
                 (allMaxX - allMinX) + 10, (allMaxY - allMinY) + 10);

    // Scattered soft highlights on upper lip (oily droplet look)
    const upW = upBounds.maxX - upBounds.minX;
    const upH = upBounds.maxY - upBounds.minY;
    const upCY = upBounds.minY + upH * 0.45;

    drawOilHighlight(ctx, upBounds.minX + upW * 0.22, upCY, upW * 0.10, upH * 0.28, s);
    drawOilHighlight(ctx, upBounds.minX + upW * 0.50, upCY, upW * 0.13, upH * 0.30, s);
    drawOilHighlight(ctx, upBounds.minX + upW * 0.78, upCY, upW * 0.10, upH * 0.28, s);

    // Soft highlight on lower lip
    const loW = loBounds.maxX - loBounds.minX;
    const loH = loBounds.maxY - loBounds.minY;
    drawOilHighlight(ctx,
        loBounds.minX + loW * 0.50,
        loBounds.minY + loH * 0.50,
        loW * 0.20, loH * 0.28, s * 0.8);

    ctx.restore();
}

/**
 * Soft diffuse oil highlight — no hard edges.
 * Much softer gradient than gloss catchlights.
 */
function drawOilHighlight(ctx, cx, cy, rx, ry, intensity) {
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
    const peak = Math.min(intensity * 0.55, 0.5);
    grd.addColorStop(0,   `rgba(255,255,255,${peak.toFixed(2)})`);
    grd.addColorStop(0.5, `rgba(255,255,255,${(peak * 0.35).toFixed(2)})`);
    grd.addColorStop(1,   'rgba(255,255,255,0)');

    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
}

// ═══════════════════════════════════════════════════════════════
//  2. CHEEK RENDERER (Liquid Blush)
// ═══════════════════════════════════════════════════════════════
//  Draws soft radial gradient ellipses on each cheek.
//  Beauty apps place blush as a diffused glow, not a hard polygon.
//  Center computed from cheek landmarks, radius from face width.
// ═══════════════════════════════════════════════════════════════

// ── Mobile-safe blur + oval masking ──────────────────────────────
// Mobile browsers (iOS Safari / some Android GPUs) mis-handle a canvas blur
// `filter` when the SAME context also does a masking op (clip() or
// destination-in) — the blurred pixels leak past the mask and spill off the
// face. To avoid it we render the blurred effect on a reusable SCRATCH canvas
// (blur only, plain source-over), then mask it to the face oval on the target
// canvas with source-in and NO filter. The blur and the mask never share a
// context, so it's exact on every device.
let _scratchCanvas = null;
function getScratch(w, h) {
    if (!_scratchCanvas) _scratchCanvas = document.createElement('canvas');
    if (_scratchCanvas.width !== w || _scratchCanvas.height !== h) {
        _scratchCanvas.width = w;
        _scratchCanvas.height = h;
    }
    return _scratchCanvas;
}

// Draw `content` (an already-rendered canvas) onto ctx, keeping ONLY the part
// inside ovalPts. No filter is ever active here, so the mask is exact on mobile.
function drawClippedToOval(ctx, content, ovalPts, w, h) {
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.filter = 'none';
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    tracePath(ctx, ovalPts);
    ctx.fillStyle = '#000';
    ctx.fill();                          // the oval mask shape
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(content, 0, 0);        // keep content only where the oval is
    ctx.restore();
}

function renderCheekMask(ctx, landmarks, w, h, hexColor, blurPx) {
    const c = hexToRgb(hexColor);
    ctx.clearRect(0, 0, w, h);

    const leftEdge  = getPts(landmarks, w, h, [234])[0];
    const rightEdge = getPts(landmarks, w, h, [454])[0];
    // Temple-to-temple width FORESHORTENS on a left/right head turn, which used
    // to collapse the blush radius to nothing past the nose. Floor it with the
    // vertical face height (forehead→chin), which stays stable through a yaw
    // turn. Keep the floor low (0.55) so it does NOT inflate the blush on a
    // normal frontal face — it only kicks in once the face is actually turned.
    const topPt    = getPts(landmarks, w, h, [10])[0];
    const chinPt   = getPts(landmarks, w, h, [152])[0];
    const faceTall = Math.hypot(chinPt.x - topPt.x, chinPt.y - topPt.y);
    const faceWidth = Math.max(Math.abs(rightEdge.x - leftEdge.x), faceTall * 0.55);

    // RIGHT cheek landmarks (apple + cheekbone sweep + outward anchor)
    const rUpper = getPts(landmarks, w, h, [111])[0];
    const rLower = getPts(landmarks, w, h, [205])[0];
    const rOuter = getPts(landmarks, w, h, [123])[0];
    // LEFT cheek landmarks
    const lUpper = getPts(landmarks, w, h, [340])[0];
    const lLower = getPts(landmarks, w, h, [425])[0];
    const lOuter = getPts(landmarks, w, h, [352])[0];

    const bigR   = faceWidth * 0.28;  // main sweep blob
    const smallR = faceWidth * 0.15;  // cheekbone highlight blob

    // Plain path clip to the face oval. There is NO blur filter anywhere in this
    // path now, so a basic clip() is reliable on every browser (the earlier
    // spill was a filter+mask interaction). Blush drawn inside the clip cannot
    // reach past the face edge.
    ctx.save();
    ctx.beginPath();
    tracePath(ctx, getPts(landmarks, w, h, FACE_OVAL));
    ctx.clip();
    drawBlushSweep(ctx, rUpper, rLower, rOuter, c, bigR, smallR, blurPx);
    drawBlushSweep(ctx, lUpper, lLower, lOuter, c, bigR, smallR, blurPx);
    ctx.restore();
}

/**
 * Ported from new-vt.html drawSweep():
 * A large tilted oval bloom at the cheek plus a smaller cheekbone
 * highlight, both as radial gradients at full reference alpha (opacity
 * applied later in compositeCheeks()).
 */
function drawBlushSweep(ctx, upPt, lowPt, outPt, c, bigR, smallR, blurPx) {
    // Main blob center: weighted between upper / lower / outer anchors
    const cx = upPt.x * 0.35 + lowPt.x * 0.45 + outPt.x * 0.2;
    const cy = upPt.y * 0.3  + lowPt.y * 0.5  + outPt.y * 0.2;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-0.18);       // slight upward cheekbone tilt
    ctx.scale(1.45, 0.8);    // wide horizontal oval
    ctx.translate(-cx, -cy);
    const g1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, bigR);
    g1.addColorStop(0,    `rgba(${c.r},${c.g},${c.b},1.00)`);
    g1.addColorStop(0.4,  `rgba(${c.r},${c.g},${c.b},0.65)`);
    g1.addColorStop(0.75, `rgba(${c.r},${c.g},${c.b},0.20)`);
    g1.addColorStop(1,    `rgba(${c.r},${c.g},${c.b},0)`);
    ctx.beginPath();
    ctx.arc(cx, cy, bigR, 0, Math.PI * 2);
    ctx.fillStyle = g1;
    // No ctx.filter blur: the radial gradient is already soft, and a blur
    // filter renders as an opaque white bounding box on some mobile GPUs.
    ctx.fill();
    ctx.restore();

    // Cheekbone highlight pop (no rotation)
    const hx = upPt.x, hy = upPt.y;
    ctx.save();
    ctx.translate(hx, hy);
    ctx.scale(1.1, 0.65);
    ctx.translate(-hx, -hy);
    const g2 = ctx.createRadialGradient(hx, hy, 0, hx, hy, smallR);
    g2.addColorStop(0,   `rgba(${c.r},${c.g},${c.b},0.60)`);
    g2.addColorStop(0.5, `rgba(${c.r},${c.g},${c.b},0.25)`);
    g2.addColorStop(1,   `rgba(${c.r},${c.g},${c.b},0)`);
    ctx.beginPath();
    ctx.arc(hx, hy, smallR, 0, Math.PI * 2);
    ctx.fillStyle = g2;
    ctx.fill();
    ctx.restore();
}

function compositeCheeks(ctx, maskCanvas, landmarks, w, h, opacity, shine) {
    ctx.save();

    // Blush — K raised 0.65 → 0.80 so the flush is clearly visible on the
    // cheeks during live try-on without looking painted-on.
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = Math.min(opacity * 0.80, 1.0);
    ctx.drawImage(maskCanvas, 0, 0);

    ctx.restore();
}

// ═══════════════════════════════════════════════════════════════
//  3. FACE RENDERER (Skin Tint)
// ═══════════════════════════════════════════════════════════════
//  Fills the face oval with a very light tint of the selected shade.
//  Cuts out eyes and mouth so they stay natural.
//  Uses extremely low opacity — skin tint is barely-there coverage.
// ═══════════════════════════════════════════════════════════════

function renderFaceMask(ctx, landmarks, w, h, hexColor, blurPx) {
    const c = hexToRgb(hexColor);
    ctx.clearRect(0, 0, w, h);

    // new-vt drawSkinTint(): one soft radial ellipse covering the whole face
    // (incl. forehead). No eye/mouth cutout — the low effective opacity keeps
    // features natural. Drawn at full reference alpha; opacity applied later.
    const fore = getPts(landmarks, w, h, [10])[0];   // forehead top center
    const chin = getPts(landmarks, w, h, [152])[0];  // chin
    const lEar = getPts(landmarks, w, h, [234])[0];  // left edge
    const rEar = getPts(landmarks, w, h, [454])[0];  // right edge

    const faceH = Math.hypot(chin.x - fore.x, chin.y - fore.y);
    // Floor the width with face height so the tint doesn't narrow to a sliver
    // when the head turns left/right (temple-to-temple x foreshortens on yaw).
    // Low floor (0.55) so it never over-widens the tint on a frontal face.
    const faceW = Math.max(Math.abs(rEar.x - lEar.x), faceH * 0.55);

    const cx = (lEar.x + rEar.x) / 2;
    const cy = fore.y + faceH * 0.42;  // center placed so the FULL forehead is covered
    const rx = faceW * 0.62;
    const ry = faceH * 0.70;           // taller reach → hairline + chin both covered
    const maxR = Math.max(rx, ry);

    // Lifted face-oval outline — used to MASK the tint at the end (not clip(),
    // which leaks with a blur filter on mobile). The mesh's top landmark (10)
    // sits mid-forehead, so we lift the upper half up toward the hairline
    // (tapered to 0 at center) to cover the whole forehead.
    const faceOval   = getPts(landmarks, w, h, FACE_OVAL);
    const ovalTopY   = Math.min(...faceOval.map(p => p.y));
    const foreLift   = faceH * 0.22;   // how far up toward the hairline to extend
    const clipPts = faceOval.map(p => {
        if (p.y < cy) {
            const t = (cy - p.y) / (cy - ovalTopY); // 0 at center → 1 at oval top
            return { x: p.x, y: p.y - foreLift * t };
        }
        return p;
    });

    // Plain path clip to the lifted face oval. No blur filter anywhere in this
    // path, so clip() is reliable on mobile — the tint cannot spill past the
    // face edge.
    ctx.save();
    ctx.beginPath();
    tracePath(ctx, clipPts);
    ctx.clip();

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
    grad.addColorStop(0,    `rgba(${c.r},${c.g},${c.b},1.00)`);
    grad.addColorStop(0.60, `rgba(${c.r},${c.g},${c.b},0.92)`);
    grad.addColorStop(0.88, `rgba(${c.r},${c.g},${c.b},0.60)`);
    grad.addColorStop(1,    `rgba(${c.r},${c.g},${c.b},0)`);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(rx / maxR, ry / maxR);
    ctx.translate(-cx, -cy);
    ctx.beginPath();
    ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
    ctx.fillStyle = grad;   // soft radial gradient — no blur filter needed
    ctx.fill();
    ctx.restore();

    // ── Cut the eyes and lips out (destination-out, no filter) ────
    // Less horizontal expansion (1.35) so the eye cutout doesn't bulge toward
    // the nose; more vertical (1.8) to keep margin above/below the eye.
    const leftEye  = expandXY(getPts(landmarks, w, h, LEFT_EYE),  1.35, 1.8);
    const rightEye = expandXY(getPts(landmarks, w, h, RIGHT_EYE), 1.35, 1.8);
    const lips     = expandContour(getPts(landmarks, w, h, LIP_OUTER), 1.15);
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = '#000';
    ctx.beginPath(); tracePath(ctx, leftEye);  ctx.fill();
    ctx.beginPath(); tracePath(ctx, rightEye); ctx.fill();
    ctx.beginPath(); tracePath(ctx, lips);     ctx.fill();
    ctx.restore();

    ctx.restore(); // end face-oval clip
}

function compositeFace(ctx, maskCanvas, landmarks, w, h, opacity, shine) {
    ctx.save();

    // soft-light evens/brightens the EXISTING skin tone (adapts to any skin
    // tone) instead of laying a flat beige film on top — looks natural on
    // deep and fair skin alike.
    ctx.globalCompositeOperation = 'soft-light';
    ctx.globalAlpha = Math.min(opacity * 0.55, 1.0);
    ctx.drawImage(maskCanvas, 0, 0);

    // a faint source-over pass adds just enough real shade coverage so the
    // chosen tint is still recognisable.
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = Math.min(opacity * 0.18, 1.0);
    ctx.drawImage(maskCanvas, 0, 0);

    ctx.restore();

    // ── DEWY finish → luminous highlight sheen on the face's high points ──
    // Only for skin tint's "Dewy" finish; Natural/Matte stay flat (unchanged).
    if ((state.finish || '') === 'Dewy' && landmarks) {
        drawDewyGlow(ctx, landmarks, w, h, Math.max(shine, 0.45));
    }
}

// Soft radiant highlights on the high points of the face (forehead, nose
// bridge/tip, cheekbones, chin, cupid's bow) for a dewy/glowy skin finish.
// Screen-blended white radial gradients — no ctx.filter (mobile-safe).
function drawDewyGlow(ctx, landmarks, w, h, intensity) {
    const lEdge = getPts(landmarks, w, h, [234])[0];
    const rEdge = getPts(landmarks, w, h, [454])[0];
    const topP  = getPts(landmarks, w, h, [10])[0];
    const chinP = getPts(landmarks, w, h, [152])[0];
    const faceH = Math.hypot(chinP.x - topP.x, chinP.y - topP.y);
    const faceW = Math.max(Math.abs(rEdge.x - lEdge.x), faceH * 0.55);
    const peak  = Math.min(intensity * 0.42, 0.4);

    // Lifted face oval — raise the forehead edge toward the HAIRLINE so the glow
    // can cover the FULL forehead (the mesh's top point, landmark 10, sits only
    // mid-forehead, which is why the glow was cut off at half the forehead).
    const cyLift   = topP.y + faceH * 0.42;
    const oval     = getPts(landmarks, w, h, FACE_OVAL);
    const ovalTopY = Math.min(...oval.map(p => p.y));
    const foreLift = faceH * 0.22;
    const clipPts  = oval.map(p => (p.y < cyLift
        ? { x: p.x, y: p.y - foreLift * ((cyLift - p.y) / (cyLift - ovalTopY)) }
        : p));

    ctx.save();
    ctx.beginPath();
    tracePath(ctx, clipPts);           // plain clip, no filter → mobile-safe
    ctx.clip();
    ctx.globalCompositeOperation = 'screen';   // additive light = glow

    // Gentle base so the highlights sit on a soft overall glow (not islands).
    const cx = (lEdge.x + rEdge.x) / 2;
    const cy = topP.y + faceH * 0.5;
    const baseR = Math.max(faceW, faceH) * 0.72;
    const base = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR);
    base.addColorStop(0,   `rgba(255,255,255,${(peak * 0.5).toFixed(2)})`);
    base.addColorStop(0.7, `rgba(255,255,255,${(peak * 0.3).toFixed(2)})`);
    base.addColorStop(1,   'rgba(255,255,255,0)');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    // One elliptical soft highlight (px,py center; rx,ry radii; k = strength).
    const glow = (px, py, rx, ry, k) => {
        const R = Math.max(rx, ry);
        ctx.save();
        ctx.translate(px, py);
        ctx.scale(rx / R, ry / R);
        ctx.translate(-px, -py);
        const g = ctx.createRadialGradient(px, py, 0, px, py, R);
        g.addColorStop(0,   `rgba(255,255,255,${(peak * k).toFixed(2)})`);
        g.addColorStop(0.6, `rgba(255,255,255,${(peak * k * 0.28).toFixed(2)})`);
        g.addColorStop(1,   'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, R, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    };
    const P = i => getPts(landmarks, w, h, [i])[0];

    // FULL forehead: a big wide glow pushed UP toward the hairline, plus side
    // fills — so the entire forehead lights up, not just the lower half.
    const fc = P(151);
    glow(fc.x, fc.y - faceH * 0.12, faceW * 0.38, faceH * 0.24, 1.0);
    const fL = P(108), fR = P(337);
    glow(fL.x, fL.y - faceH * 0.05, faceW * 0.17, faceH * 0.17, 0.85);
    glow(fR.x, fR.y - faceH * 0.05, faceW * 0.17, faceH * 0.17, 0.85);

    // Nose (bridge → tip).
    glow(P(6).x,   P(6).y,   faceW * 0.08, faceW * 0.13, 0.9);
    glow(P(195).x, P(195).y, faceW * 0.07, faceW * 0.12, 0.9);
    glow(P(4).x,   P(4).y,   faceW * 0.10, faceW * 0.09, 0.9);

    // Cheeks (cheekbone + apple + lower cheek, both sides).
    for (const i of [117, 346, 50, 280, 205, 425]) {
        const p = P(i);
        glow(p.x, p.y, faceW * 0.18, faceW * 0.15, 0.9);
    }

    // Chin + cupid's bow.
    glow(P(152).x, P(152).y, faceW * 0.14, faceW * 0.11, 0.85);
    glow(P(0).x,   P(0).y,   faceW * 0.07, faceW * 0.05, 0.7);

    ctx.restore();
}

// ═══════════════════════════════════════════════════════════════
//  4. EYELID RENDERER (Eyeshadow) — everyday smoky shape
// ═══════════════════════════════════════════════════════════════
//  Shape characteristics (matches reference images 3 + 4):
//    - Sits ON the lash line (darkest there), fades upward
//    - THINNER at inner corner (near nose)
//    - THICKER at outer corner (away from nose) — natural smoky taper
//    - Slight outward angle going up — color rises higher at outer 1/3
//    - Stays well below the brow — never touches it
// ═══════════════════════════════════════════════════════════════

function renderEyelidMask(ctx, landmarks, w, h, hexColor, blurPx) {
    const c = hexToRgb(hexColor);
    ctx.clearRect(0, 0, w, h);

    // Soft, blended edge — blur scales with eye size. A touch less blur than
    // before so the improved shape stays defined.
    const ref = getPts(landmarks, w, h, RIGHT_EYE_UPPER);
    const ew  = Math.abs(ref[ref.length - 1].x - ref[0].x) || 40;
    ctx.filter = `blur(${(blurPx + Math.max(ew * 0.05, 3)).toFixed(1)}px)`;

    // Pro shape: lid wash (lash→crease) that rises toward the outer corner,
    // plus an outer-V deepening for dimension. Brow indices let the height
    // adapt to each eye's real lid size.
    drawEyelidShadow(ctx, landmarks, w, h, RIGHT_EYE_UPPER, RIGHT_EYEBROW, c, true);  // outer at start (33)
    drawEyelidShadow(ctx, landmarks, w, h, LEFT_EYE_UPPER,  LEFT_EYEBROW,  c, false); // outer at end (263)

    ctx.filter = 'none';
}

/**
 * Ported from new-vt.html drawEyeshadow():
 * A soft band hugging the lash line, arched upward via a sine curve,
 * filled with a vertical gradient that is darkest at the lash line and
 * fades to transparent at the top. Drawn at full reference alpha — the
 * opacity slider scales it in compositeEyelids().
 *
 * Coordinate note: uses getPts() (no X-flip). Camera flips upstream,
 * photo doesn't, so geometry is correct in both modes.
 */
function drawEyelidShadow(ctx, lm, w, h, lashIdx, browIdx, c, outerAtStart) {
    const lash = getPts(lm, w, h, lashIdx);
    const brow = getPts(lm, w, h, browIdx);
    const n = lash.length;
    const ew = Math.abs(lash[n - 1].x - lash[0].x) || 40;

    // Nearest brow Y for a given X — lets the band size itself to each eye's lid.
    const browYAt = (x) => {
        let best = brow[0], bd = Math.abs(brow[0].x - x);
        for (let j = 1; j < brow.length; j++) {
            const d = Math.abs(brow[j].x - x);
            if (d < bd) { bd = d; best = brow[j]; }
        }
        return best.y;
    };

    // ── STABLE anchors ──
    // The eye CORNERS and the EYEBROW barely move when you blink, unlike the
    // mid-lid lash points (which collapse when the eye closes). We rebuild the
    // ENTIRE shape from just the corners + brow, so the eyeshadow stays the
    // SAME whether the eye is open or closed.
    const A0 = lash[0], B0 = lash[n - 1];            // eye corners (stable)
    const midX = (A0.x + B0.x) / 2;
    const cornerMidY = (A0.y + B0.y) / 2;
    const lid = Math.max(cornerMidY - browYAt(midX), ew * 0.40); // corner→brow gap

    // Extend the chord PAST the corners so the band reaches both canthi — and a
    // bit MORE past the OUTER (lateral) corner so it sweeps toward it.
    const dx = B0.x - A0.x, dy = B0.y - A0.y;
    const extOuter = 0.14, extInner = 0.05;
    const eA = outerAtStart ? extOuter : extInner;   // A is the outer corner when outerAtStart
    const eB = outerAtStart ? extInner : extOuter;
    const A = { x: A0.x - dx * eA, y: A0.y - dy * eA };
    const B = { x: B0.x + dx * eB, y: B0.y + dy * eB };

    const bow = lid * 0.16;   // lower edge sits JUST above the lashes (on the lid, not floating up toward the brow)
    const H   = lid * 0.34;   // reaches ABOVE the crease, fuller toward the outer corner (winged)

    // Actual upper-lid (lash line) Y at a given x. When the eye CLOSES this line
    // drops down, so the shadow can follow the lid down and stay visible ON the
    // closed lid — while staying pinned at the stable floor when the eye is open.
    const lsorted = [...lash].sort((p, q) => p.x - q.x);
    const lashYAt = (x) => {
        if (x <= lsorted[0].x) return lsorted[0].y;
        const last = lsorted[lsorted.length - 1];
        if (x >= last.x) return last.y;
        for (let i = 1; i < lsorted.length; i++) {
            if (x <= lsorted[i].x) {
                const t = (x - lsorted[i - 1].x) / ((lsorted[i].x - lsorted[i - 1].x) || 1);
                return lsorted[i - 1].y + t * (lsorted[i].y - lsorted[i - 1].y);
            }
        }
        return last.y;
    };
    const lidFollow = lid * 0.10;   // keep the lower edge just above the actual lashes

    // LOWER edge = stable arc above the lashes when open, but follows the lid
    // DOWN when the eye closes (so the shadow shows on the CLOSED lid too).
    // UPPER edge = independent capsule dome up to ~the crease from the stable
    // baseline. Spans medial canthus → lateral canthus via the extended chord.
    const STEPS = 30;
    const lower = [], upper = [];
    for (let k = 0; k <= STEPS; k++) {
        const u  = k / STEPS;                            // 0 (corner A) → 1 (corner B)
        const cx = A.x + (B.x - A.x) * u;                // along the corner chord
        const cy = A.y + (B.y - A.y) * u;
        const archL = Math.sin(u * Math.PI);             // bow peaks in the middle
        // WINGED upper edge (matches the reference): tapers to a point at the
        // inner canthus, rises FULLER toward the OUTER corner (the above-crease
        // sweep), and tapers again to the wing tip at the extended outer corner.
        const tio   = outerAtStart ? (1 - u) : u;        // 0 = inner corner → 1 = outer
        const profU = Math.sin(Math.PI * Math.pow(tio, 1.4));
        const floorY = cy - bow * archL;                 // stable baseline (eye open)
        // Follow the lid down when the eye closes (lash drops below the floor);
        // stay at the stable floor when the eye is open.
        const lashDrop  = lashYAt(cx) - lidFollow;
        const baseLower = Math.max(floorY, lashDrop);
        // On the CLOSED eye the lower edge would otherwise run FLAT across the
        // closed-lash line. Add a centre arch (proportional to how far the lash
        // has dropped, i.e. how closed the eye is) so the bottom edge CURVES UP
        // toward the centre of the upper eyelid — a natural crescent, not a
        // straight band. On the open eye `drop` is 0, so nothing changes.
        const drop   = Math.max(0, lashDrop - floorY);
        const lowerY = baseLower - drop * 0.25 * Math.sin(u * Math.PI);
        lower.push({ x: cx, y: lowerY });
        upper.push({ x: cx, y: floorY - H * profU });    // dome from the stable baseline
    }

    // Closed loop: reconstructed lash arc (A→B), then the dome back (B→A),
    // curve-smoothed so the outline reads as one soft cosmetic shape.
    const loop = lower.concat([...upper].reverse());
    ctx.beginPath();
    traceSmoothClosed(ctx, loop);

    // Dark at the lash line (the eye) → lighter toward the crease.
    const topY = Math.min(...upper.map(p => p.y));
    const botY = Math.max(...lower.map(p => p.y));
    const g = ctx.createLinearGradient(0, botY, 0, topY);
    g.addColorStop(0,    `rgba(${c.r},${c.g},${c.b},1.00)`); // darkest — at the lashes
    g.addColorStop(0.40, `rgba(${c.r},${c.g},${c.b},0.80)`);
    g.addColorStop(0.75, `rgba(${c.r},${c.g},${c.b},0.42)`);
    g.addColorStop(1,    `rgba(${c.r},${c.g},${c.b},0)`);    // lightest — toward the crease
    ctx.fillStyle = g;
    ctx.fill();

    // ── Dimension (reference look): darker OUTER corner (smoky V) + lighter
    //    metallic CENTRE sheen. Both are painted INSIDE the lid via a plain clip
    //    (no filter → mobile-safe), so they can't spill off the shape.
    const mi = Math.floor(STEPS / 2);
    const midLidX = lower[mi].x;
    const midLidY = (lower[mi].y + upper[mi].y) / 2;

    const dk = { r: Math.round(c.r * 0.5), g: Math.round(c.g * 0.5), b: Math.round(c.b * 0.5) };
    const lt = { r: Math.round(c.r + (255 - c.r) * 0.55),
                 g: Math.round(c.g + (255 - c.g) * 0.55),
                 b: Math.round(c.b + (255 - c.b) * 0.55) };

    const outerPt = outerAtStart ? A : B;
    const deepCx  = outerPt.x + (midX - outerPt.x) * 0.18; // a touch inward from the corner
    const deepCy  = outerPt.y - lid * 0.14;                // lifted toward the crease
    const deepR   = lid * 0.62;
    const sheenRx = lid * 0.78, sheenRy = lid * 0.42;

    ctx.save();
    ctx.filter = 'none';
    ctx.beginPath();
    traceSmoothClosed(ctx, loop);   // clip to the lid shape
    ctx.clip();

    // Outer smoky deepening.
    const dg = ctx.createRadialGradient(deepCx, deepCy, 0, deepCx, deepCy, deepR);
    dg.addColorStop(0,    `rgba(${dk.r},${dk.g},${dk.b},0.85)`);
    dg.addColorStop(0.55, `rgba(${dk.r},${dk.g},${dk.b},0.32)`);
    dg.addColorStop(1,    `rgba(${dk.r},${dk.g},${dk.b},0)`);
    ctx.fillStyle = dg;
    ctx.fillRect(0, 0, w, h);

    // Lighter metallic centre sheen, elongated along the lid.
    const R2 = Math.max(sheenRx, sheenRy);
    ctx.save();
    ctx.translate(midLidX, midLidY);
    ctx.scale(sheenRx / R2, sheenRy / R2);
    ctx.translate(-midLidX, -midLidY);
    const lg = ctx.createRadialGradient(midLidX, midLidY, 0, midLidX, midLidY, R2);
    lg.addColorStop(0,   `rgba(${lt.r},${lt.g},${lt.b},0.38)`);
    lg.addColorStop(0.6, `rgba(${lt.r},${lt.g},${lt.b},0.12)`);
    lg.addColorStop(1,   `rgba(${lt.r},${lt.g},${lt.b},0)`);
    ctx.fillStyle = lg;
    ctx.beginPath();
    ctx.arc(midLidX, midLidY, R2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
}

function compositeEyelids(ctx, maskCanvas, landmarks, w, h, opacity, shine) {
    const finish  = state.finish || '';
    const pigment = state.pigmentation || '';

    // Pigmentation → coverage. Soft = sheer wash, Intense = bold.
    const PIG_MUL   = { Soft: 0.78, Medium: 1.0, Intense: 1.3 };
    const fillAlpha = Math.min(opacity * 1.25 * (PIG_MUL[pigment] ?? 1.0), 1.0);

    // Finish → shimmer amount. Matte = none, Glitter = most. Default ≈ subtle.
    const SHIM_MUL = { Matte: 0.0, Shimmer: 1.0, Metallic: 1.25, Glitter: 1.6 };
    const shimmer  = shine * (SHIM_MUL[finish] ?? 0.6);

    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = fillAlpha;
    ctx.drawImage(maskCanvas, 0, 0);

    // Shimmer highlight on center of each lid
    if (shimmer > 0.02 && landmarks) {
        // Tint the shimmer toward the SHADE (not stark white) so pale shades
        // don't read as white paint — and keep it small + screen-blended so
        // it sparkles instead of forming a solid blob.
        const sc = hexToRgb(state.shade);
        const hr = Math.round(0.55 * 255 + 0.45 * sc.r);
        const hg = Math.round(0.55 * 255 + 0.45 * sc.g);
        const hb = Math.round(0.55 * 255 + 0.45 * sc.b);

        const leftCenter  = centroid(landmarks, w, h, LEFT_EYE_UPPER);
        const rightCenter = centroid(landmarks, w, h, RIGHT_EYE_UPPER);
        const leftBrow    = centroid(landmarks, w, h, LEFT_EYEBROW);
        const rightBrow   = centroid(landmarks, w, h, RIGHT_EYEBROW);

        const eyeDist  = Math.abs(rightCenter.x - leftCenter.x);
        const shimmerR = eyeDist * 0.11;   // larger, prominent metallic pop

        // Shimmer sits LOW on the lid (near the lash line), not up toward the brow.
        const placeShimmer = (eyeCenter, browCenter) => {
            const gap = Math.abs(browCenter.y - eyeCenter.y);
            return { x: eyeCenter.x, y: eyeCenter.y - gap * 0.15 };
        };

        ctx.globalCompositeOperation = 'screen';
        [
            placeShimmer(leftCenter, leftBrow),
            placeShimmer(rightCenter, rightBrow),
        ].forEach(center => {
            // Elongated along the lid for a luminous metallic sheen (not a dot).
            ctx.save();
            ctx.translate(center.x, center.y);
            ctx.scale(1.5, 0.8);
            ctx.translate(-center.x, -center.y);
            const grd = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, shimmerR);
            grd.addColorStop(0,   `rgba(${hr},${hg},${hb},${Math.min(shimmer * 0.5, 0.55).toFixed(2)})`);
            grd.addColorStop(0.55,`rgba(${hr},${hg},${hb},${(shimmer * 0.18).toFixed(2)})`);
            grd.addColorStop(1,   `rgba(${hr},${hg},${hb},0)`);
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(center.x, center.y, shimmerR, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    ctx.restore();
}

// ═══════════════════════════════════════════════════════════════
//  RENDERER REGISTRY
// ═══════════════════════════════════════════════════════════════

const REGION_RENDERERS = {
    // ─── Lip variants (all share renderLipMask, differ in compositing) ───
    lips_matte: {
        renderMask: renderLipMask,
        composite:  compositeLipstick,
        indices:    FACE_LANDMARK_INDICES.lips,
    },
    lips_gloss: {
        renderMask: renderLipMask,
        composite:  compositeLipGloss,
        indices:    FACE_LANDMARK_INDICES.lips,
    },
    lips_oil: {
        renderMask: renderLipMask,
        composite:  compositeLipOil,
        indices:    FACE_LANDMARK_INDICES.lips,
    },
    // Backward-compat alias (anything still referencing 'lips' defaults to matte)
    lips: {
        renderMask: renderLipMask,
        composite:  compositeLipstick,
        indices:    FACE_LANDMARK_INDICES.lips,
    },

    // ─── Other face regions ───
    cheeks: {
        renderMask: renderCheekMask,
        composite:  compositeCheeks,
        indices:    FACE_LANDMARK_INDICES.cheeks,
    },
    face: {
        renderMask: renderFaceMask,
        composite:  compositeFace,
        indices:    FACE_LANDMARK_INDICES.face,
    },
    eyelids: {
        renderMask: renderEyelidMask,
        composite:  compositeEyelids,
        indices:    FACE_LANDMARK_INDICES.eyelids,
    },
};

function getRenderer(region) {
    return REGION_RENDERERS[region] || REGION_RENDERERS.lips_matte;
}

// ── face-detector ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
//  face-detector.js — MediaPipe loading + landmark stabilization
// ═══════════════════════════════════════════════════════════════

// ─── Stabilization config ─────────────────────────────────────
const STAB = {
    // Smaller ring buffer = less inherent latency. The buffer averages the
    // last N frames; every extra frame is extra lag. 2 keeps a touch of
    // jitter-rejection without the ~2-frame delay the old size-4 added.
    RING_SIZE: 2,

    // Lighter smoothing = the overlay tracks the face more directly.
    // Combined with motion prediction (below), residual jitter stays low
    // while the "chase" lag is largely cancelled.
    ALPHA_STILL:  0.60,     // heavier hold when nearly still (kills micro-jitter)
    ALPHA_MOVING: 0.25,     // light hold during motion = snappy tracking

    DEAD_ZONE: 0.0015,
    MOVE_THRESH: 0.005,

    // ─── Motion prediction ──────────────────────────────────────
    // The detect→smooth→render pipeline is always ~1 frame behind the live
    // video. We measure each landmark's per-frame velocity and project it
    // forward so the overlay lands where the face WILL be, not where it was.
    // This is what removes the "makeup chasing the face" feel.
    //   PREDICT_SLOW — gentle nudge during slow drift
    //   PREDICT_FAST — full ~1-frame lookahead during real motion
    PREDICT_SLOW: 0.4,
    PREDICT_FAST: 1.0,
};

// ─── Smoother state ──────────────────────────────────────────
const smoother = {
    ring: [],
    ringIdx: 0,
    ema: null,           // internal EMA state (what prediction is built from)
    prevEma: null,       // EMA from the previous frame (for velocity)
    output: null,        // displayed landmarks = EMA + velocity prediction
    avgLandmarks: null,
    changed: false,
    overlayCanvas: null,
    overlayDirty: true,
};

// ─── Stable head anchor landmarks ────────────────────────────
//  These points only move when the HEAD moves as a unit — they
//  do NOT move from blinks, saccades, eye refinement noise, lip
//  movement, or expression changes. Using these for the dead-zone
//  check gives a true "face is still vs moving" signal that's
//  consistent across all products (lips, cheeks, face, eyelids).
//
//   1   — nose tip
//   4   — nose base / below nose
//   6   — nose bridge
//   10  — forehead center
//   152 — chin bottom
//   234 — left temple (bony)
//   454 — right temple (bony)
//   168 — nose bridge upper
// ─────────────────────────────────────────────────────────────
const HEAD_ANCHORS = [1, 4, 6, 10, 152, 234, 454, 168];

// ─── Landmark smoothing pipeline ─────────────────────────────
function smoothLandmarks(raw, measureIndices) {
    const count = raw.length;
    // Always use stable head anchors for dead-zone measurement,
    // NOT the region-specific indices. This prevents eye/lip
    // micro-movements from defeating the dead-zone gate.
    const indices = HEAD_ANCHORS;

    // 1. Push into ring buffer
    if (smoother.ring.length < STAB.RING_SIZE) {
        smoother.ring.push(raw.map(p => ({ x: p.x, y: p.y, z: p.z || 0 })));
    } else {
        const slot = smoother.ring[smoother.ringIdx];
        for (let i = 0; i < count && i < slot.length; i++) {
            slot[i].x = raw[i].x;
            slot[i].y = raw[i].y;
        }
    }
    smoother.ringIdx = (smoother.ringIdx + 1) % STAB.RING_SIZE;

    // 2. Compute ring-buffer average
    const nFrames = smoother.ring.length;
    if (!smoother.avgLandmarks) {
        smoother.avgLandmarks = raw.map(p => ({ x: p.x, y: p.y, z: p.z || 0 }));
    }
    const avg = smoother.avgLandmarks;
    for (let i = 0; i < count && i < avg.length; i++) {
        let sx = 0, sy = 0;
        for (let f = 0; f < nFrames; f++) {
            sx += smoother.ring[f][i].x;
            sy += smoother.ring[f][i].y;
        }
        avg[i].x = sx / nFrames;
        avg[i].y = sy / nFrames;
    }

    // 3. First frame — seed EMA, prevEMA and displayed output
    if (!smoother.ema) {
        smoother.ema     = avg.map(p => ({ x: p.x, y: p.y, z: p.z || 0 }));
        smoother.prevEma = avg.map(p => ({ x: p.x, y: p.y, z: p.z || 0 }));
        smoother.output  = avg.map(p => ({ x: p.x, y: p.y, z: p.z || 0 }));
        return smoother.output;
    }

    // 4. Measure displacement on stable head anchors (EMA vs new average)
    const ema = smoother.ema, prevEma = smoother.prevEma, out = smoother.output;
    let totalDisp = 0;
    for (let k = 0; k < indices.length; k++) {
        const i = indices[k];
        if (i >= count) continue;
        const dx = avg[i].x - ema[i].x;
        const dy = avg[i].y - ema[i].y;
        totalDisp += Math.sqrt(dx * dx + dy * dy);
    }
    const avgDisp = totalDisp / indices.length;

    // 5. Dead-zone gate — face is still: hold the overlay rock-steady
    //    (display the bare EMA, no prediction, so it doesn't jitter in place)
    if (avgDisp < STAB.DEAD_ZONE) {
        smoother.changed = false;
        for (let i = 0; i < count && i < out.length; i++) {
            out[i].x = ema[i].x;
            out[i].y = ema[i].y;
        }
        return out;
    }

    // 6. Adaptive EMA — save previous EMA first so we can derive velocity
    const alpha   = avgDisp < STAB.MOVE_THRESH ? STAB.ALPHA_STILL : STAB.ALPHA_MOVING;
    const predict = avgDisp < STAB.MOVE_THRESH ? STAB.PREDICT_SLOW : STAB.PREDICT_FAST;
    for (let i = 0; i < count && i < ema.length; i++) {
        prevEma[i].x = ema[i].x;
        prevEma[i].y = ema[i].y;
        ema[i].x = alpha * ema[i].x + (1 - alpha) * avg[i].x;
        ema[i].y = alpha * ema[i].y + (1 - alpha) * avg[i].y;

        // 7. Project forward by one (scaled) velocity step → cancels lag
        out[i].x = ema[i].x + (ema[i].x - prevEma[i].x) * predict;
        out[i].y = ema[i].y + (ema[i].y - prevEma[i].y) * predict;
    }

    smoother.changed = true;
    smoother.overlayDirty = true;
    return out;
}

function resetSmoothing() {
    smoother.ring = [];
    smoother.ringIdx = 0;
    smoother.ema = null;
    smoother.prevEma = null;
    smoother.output = null;
    smoother.avgLandmarks = null;
    smoother.changed = false;
    smoother.overlayCanvas = null;
    smoother.overlayDirty = true;
}

// ─── MediaPipe FaceLandmarker ─────────────────────────────────
let _FaceLandmarker = null;
let _FilesetResolver = null;
let faceLandmarkerInstance = null;
let currentRunningMode = null;

// Create a FaceLandmarker, trying the GPU delegate first and falling back to
// CPU. Some Android devices and locked-down desktops fail GPU init silently —
// without this fallback the try-on just never starts on those machines.
async function createLandmarker(filesetResolver, mode) {
    const MODEL =
        'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task';
    const opts = (delegate) => ({
        baseOptions: { modelAssetPath: MODEL, delegate },
        runningMode: mode,
        numFaces: 1,
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: false,
    });
    try {
        return await _FaceLandmarker.createFromOptions(filesetResolver, opts('GPU'));
    } catch (gpuErr) {
        console.warn('[HoZ] GPU delegate failed, falling back to CPU:', gpuErr.message);
        return await _FaceLandmarker.createFromOptions(filesetResolver, opts('CPU'));
    }
}

async function getFaceLandmarker(mode = 'IMAGE') {
    if (!_FaceLandmarker) {
        setTryonStatus('Loading AI library\u2026');
        console.log('[HoZ] Importing @mediapipe/tasks-vision@0.10.3 from CDN...');
        const vision = await import(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3'
        );
        _FaceLandmarker  = vision.FaceLandmarker;
        _FilesetResolver = vision.FilesetResolver;
        console.log('[HoZ] Vision module imported OK');
    }

    if (!faceLandmarkerInstance) {
        setTryonStatus('Downloading face model\u2026 (~4 MB, cached after first load)');
        console.log('[HoZ] Creating FaceLandmarker...');
        const filesetResolver = await _FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
        );
        faceLandmarkerInstance = await createLandmarker(filesetResolver, mode);
        currentRunningMode = mode;
        console.log('[HoZ] FaceLandmarker ready, mode:', mode);
        setTryonStatus('');
    }

    if (currentRunningMode !== mode) {
        console.log('[HoZ] Switching mode:', currentRunningMode, '->', mode);
        await faceLandmarkerInstance.setOptions({ runningMode: mode });
        currentRunningMode = mode;
    }

    return faceLandmarkerInstance;
}

// ─── Silent background preloader ─────────────────────────────
// Called automatically after page load. Downloads the MediaPipe
// JS library and face model into the browser cache WITHOUT showing
// any status messages to the user. When the camera or detect button
// is clicked, getFaceLandmarker() returns the already-loaded
// instance immediately — no 5-6 second delay.
async function preloadFaceLandmarker() {
    // Already loaded — nothing to do
    if (faceLandmarkerInstance) return;

    try {
        // Load the library silently — bypass setTryonStatus calls
        if (!_FaceLandmarker) {
            console.log('[HoZ] Preloading MediaPipe library...');
            const vision = await import(
                'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3'
            );
            _FaceLandmarker  = vision.FaceLandmarker;
            _FilesetResolver = vision.FilesetResolver;
            console.log('[HoZ] MediaPipe library preloaded');
        }

        if (!faceLandmarkerInstance) {
            console.log('[HoZ] Preloading face model (~4 MB)...');
            const filesetResolver = await _FilesetResolver.forVisionTasks(
                'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
            );
            faceLandmarkerInstance = await createLandmarker(filesetResolver, 'IMAGE');
            currentRunningMode = 'IMAGE';
            console.log('[HoZ] Face model preloaded — camera will start instantly');
        }
    } catch (err) {
        // Preload failed — not a problem, getFaceLandmarker() will retry on demand
        console.warn('[HoZ] Background preload failed (will retry on demand):', err.message);
        _FaceLandmarker = null;
        faceLandmarkerInstance = null;
        currentRunningMode = null;
    }
}

// ── state ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
//  state.js — Global state + price engine
// ═══════════════════════════════════════════════════════════════

// ─── Global state (one source of truth) ──────────────────────
const state = {
    productId:       'lipstick',
    shade:           '#D2198B',
    shadeName:       'Glamor Pink',
    finish:          '',
    coverage:        '',
    undertone:       '',
    intensity:       '',
    skinType:        '',
    pigmentation:    '',
    paletteSize:     '',
    spf:             false,
    hydration:       false,
    shimmer:         false,
    ingredients:     new Set(),
    fragrance:       '',
    packaging:       '',
    personalisation: '',
    engraving:       '',
    customName:      '',
    qty:             1,
};

// Initialize default ingredients from product config
function initDefaultState(productId) {
    const cfg = getProduct(productId);
    state.productId = productId;
    state.ingredients.clear();
    cfg.ingredients.forEach(ing => {
        if (ing.checked) state.ingredients.add(ing.id);
    });
    state.fragrance = cfg.defaultFragrance || '';
    // Reset product-specific fields
    state.finish = '';
    state.coverage = '';
    state.undertone = '';
    state.intensity = '';
    state.skinType = '';
    state.pigmentation = '';
    state.paletteSize = '';
    state.spf = false;
    state.hydration = false;
    state.shimmer = false;
}

// ─── Try-on state (camera/photo) ─────────────────────────────
const tryonState = {
    mode:       'photo',
    photoImg:   null,
    landmarks:  null,
    cameraStop: null,
    processing: false,
};

// ─── Price engine ────────────────────────────────────────────
function recalcPrice() {
    const cfg = getProduct(state.productId);
    const base = cfg.basePrice;
    let addons = 0;
    state.ingredients.forEach(id => {
        const ing = cfg.ingredients.find(i => i.id === id);
        if (ing) addons += ing.price;
    });
    const total = (base + addons) * state.qty;

    const elBase   = document.getElementById('price-base');
    const elAddons = document.getElementById('price-addons');
    const elTotal  = document.getElementById('price-total');
    if (elBase)   elBase.textContent   = fmt(base);
    if (elAddons) elAddons.textContent = fmt(addons);
    if (elTotal)  elTotal.textContent  = fmt(total);

    return { base, addons, total };
}

// ─── Preview card updater ────────────────────────────────────
function updatePreviewCard() {
    const cfg = getProduct(state.productId);
    const names = [];
    state.ingredients.forEach(id => {
        const ing = cfg.ingredients.find(i => i.id === id);
        if (ing) names.push(ing.name);
    });

    const elName  = document.getElementById('preview-name');
    const elShade = document.getElementById('preview-shade-text');
    const elDot   = document.getElementById('preview-shade-dot');
    const elIng   = document.getElementById('preview-ingredients');
    const elFin   = document.getElementById('preview-finish');

    if (elName) {
        const f = state.finish ? 'Custom ' + state.finish : 'Custom';
        elName.innerHTML = `${f}<br>${cfg.name}`;
    }
    if (elShade) elShade.innerHTML = `${state.shadeName}`;
    if (elDot)   elDot.style.background = state.shade;
    if (elIng)   elIng.textContent = names.join(', ') || '\u2014';
    if (elFin)   elFin.textContent = state.finish || '\u2014';
}

// ─── Product swatch (preview canvas) ─────────────────────────



// ─── PRODUCT SWATCH SVGs ─────────────────────────────────────
// Inline SVG content for each product, shown in the Live Preview.
// Each SVG has width="100%" height="100%" so it fills the
// preview container (sized 128x128 in CSS) automatically.
const getProductSwatches = () => ({
    'lipstick': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="silver-metal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#9a9a9a" />
      <stop offset="20%" stop-color="#e1e1e1" />
      <stop offset="50%" stop-color="#ffffff" />
      <stop offset="75%" stop-color="#cccccc" />
      <stop offset="100%" stop-color="#8c8c8c" />
    </linearGradient>

    <linearGradient id="glass-reflection" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5" />
      <stop offset="15%" stop-color="#ffffff" stop-opacity="0.0" />
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.1" />
      <stop offset="85%" stop-color="#ffffff" stop-opacity="0.0" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.3" />
    </linearGradient>

    <linearGradient id="liquid-shading" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.35" />
      <stop offset="15%" stop-color="#000000" stop-opacity="0.1" />
      <stop offset="50%" stop-color="#000000" stop-opacity="0.0" />
      <stop offset="85%" stop-color="#000000" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.25" />
    </linearGradient>

    <style>
      .lipstick-color {
        fill: ${state.shade}; 
      }
    </style>
  </defs>

  <g id="back-swatch">
    <path class="lipstick-color" d="M 170,270 C 150,290 155,340 180,360 C 210,380 260,390 320,410 C 380,430 450,450 520,445 C 560,440 590,415 570,410 C 530,400 480,350 430,340 C 370,330 320,310 260,290 C 210,270 190,250 170,270 Z" />
    
    <path class="lipstick-color" d="M 540,430 L 580,435 L 560,425 Z M 550,442 L 595,445 L 570,438 Z M 530,445 L 555,452 L 545,447 Z" opacity="0.9" />
    
    <path d="M 185,305 C 230,330 300,350 380,380 C 440,405 500,425 540,425" fill="none" stroke="#ffffff" stroke-width="12" stroke-linecap="round" opacity="0.2" filter="blur(3px)" />
  </g>

  <g id="lipstick-tube" transform="translate(20, 0)">
    
    <rect x="252" y="50" width="86" height="515" rx="6" fill="#000000" opacity="0.08" filter="blur(4px)" />

    <rect class="lipstick-color" x="260" y="215" width="70" height="325" rx="3" />
    
    <rect x="260" y="215" width="70" height="325" rx="3" fill="url(#liquid-shading)" />
    
    <rect x="265" y="215" width="4" height="325" fill="#ffffff" opacity="0.25" />
    <rect x="272" y="215" width="2" height="325" fill="#ffffff" opacity="0.15" />

    <rect x="254" y="212" width="82" height="338" rx="4" fill="url(#glass-reflection)" stroke="#cccccc" stroke-width="0.75" />
    
    <path d="M 254,532 Q 295,535 336,532 L 336,550 Q 295,553 254,550 Z" fill="#ffffff" opacity="0.3" stroke="#b5b5b5" stroke-width="0.5" />

    <text x="296" y="515" font-family="'Arial Black', Gadget, sans-serif" font-size="9" font-weight="900" fill="#ffffff" opacity="0.4" text-anchor="middle" letter-spacing="1.5">LIP BEAUTY</text>
    <text x="296" y="527" font-family="Arial, sans-serif" font-size="7.5" fill="#ffffff" opacity="0.4" text-anchor="middle" letter-spacing="0.5">6 g 0.21 oz.</text>

    <rect x="253" y="175" width="84" height="38" fill="url(#silver-metal)" stroke="#9a9a9a" stroke-width="0.5" />
    <line x1="253" y1="194" x2="337" y2="194" stroke="#777777" stroke-width="0.75" />

    <rect x="253" y="45" width="84" height="130" rx="3" fill="url(#silver-metal)" stroke="#9a9a9a" stroke-width="0.5" />
    <ellipse cx="295" cy="45" rx="42" ry="4" fill="#d8d8d8" stroke="#9a9a9a" stroke-width="0.5" />
  </g>
</svg>`,
    'lip_gloss': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#999" />
      <stop offset="25%" stop-color="#e6e6e6" />
      <stop offset="50%" stop-color="#fff" />
      <stop offset="75%" stop-color="#ccc" />
      <stop offset="100%" stop-color="#888" />
    </linearGradient>

    <linearGradient id="glass-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.6" />
      <stop offset="15%" stop-color="#fff" stop-opacity="0.0" />
      <stop offset="85%" stop-color="#fff" stop-opacity="0.0" />
      <stop offset="100%" stop-color="#fff" stop-opacity="0.4" />
    </linearGradient>

    <style>
      .lipstick-color {
        fill: ${state.shade}; /* Default Orange-Red Color */
      }
    </style>
  </defs>

  <path class="lipstick-color" d="M 400,320 C 370,360 410,440 460,490 C 510,540 530,550 540,555 C 530,540 515,480 490,430 C 460,370 440,300 400,320 Z" />
  <path d="M 415,340 C 395,370 430,440 470,480" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="0.3" filter="blur(2px)" />

  <g transform="translate(50, 0)">
    <rect class="lipstick-color" x="233" y="222" width="64" height="326" rx="4" />
    
    <rect x="233" y="222" width="15" height="326" fill="#000" opacity="0.15" />
    <rect x="282" y="222" width="15" height="326" fill="#000" opacity="0.1" />

    <rect x="225" y="220" width="80" height="335" rx="2" fill="url(#glass-grad)" stroke="#ddd" stroke-width="1" />
    <path d="M 225,540 Q 265,543 305,540 L 305,555 Q 265,557 225,555 Z" fill="#fff" opacity="0.4" stroke="#ccc" stroke-width="0.5" />

    <text x="265" y="525" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#fff" opacity="0.6" text-anchor="middle" letter-spacing="1">LIP BEAUTY</text>
    <text x="265" y="535" font-family="Arial, sans-serif" font-size="7" fill="#fff" opacity="0.6" text-anchor="middle">6g 0.21 oz.</text>

    <rect x="224" y="180" width="82" height="40" fill="url(#metal-grad)" stroke="#b5b5b5" stroke-width="0.5" />
    <line x1="224" y1="200" x2="306" y2="200" stroke="#999" stroke-width="1" />

    <rect x="224" y="40" width="82" height="140" fill="url(#metal-grad)" rx="2" stroke="#b5b5b5" stroke-width="0.5" />
    <ellipse cx="265" cy="40" rx="41" ry="4" fill="#e6e6e6" stroke="#999" stroke-width="0.5" />
  </g>
</svg>`,
    'lip_oil': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#999" />
      <stop offset="25%" stop-color="#e6e6e6" />
      <stop offset="50%" stop-color="#fff" />
      <stop offset="75%" stop-color="#ccc" />
      <stop offset="100%" stop-color="#888" />
    </linearGradient>

    <linearGradient id="glass-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.6" />
      <stop offset="15%" stop-color="#fff" stop-opacity="0.0" />
      <stop offset="85%" stop-color="#fff" stop-opacity="0.0" />
      <stop offset="100%" stop-color="#fff" stop-opacity="0.4" />
    </linearGradient>

    <style>
      .lipstick-color {
        fill: #fd5a99; /* Lip Oil — fixed color, ignores shade picker */
      }
    </style>
  </defs>

  <path class="lipstick-color" d="M 400,320 C 370,360 410,440 460,490 C 510,540 530,550 540,555 C 530,540 515,480 490,430 C 460,370 440,300 400,320 Z" />
  <path d="M 415,340 C 395,370 430,440 470,480" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="0.3" filter="blur(2px)" />

  <g transform="translate(50, 0)">
    <rect class="lipstick-color" x="233" y="222" width="64" height="326" rx="4" />
    
    <rect x="233" y="222" width="15" height="326" fill="#000" opacity="0.15" />
    <rect x="282" y="222" width="15" height="326" fill="#000" opacity="0.1" />

    <rect x="225" y="220" width="80" height="335" rx="2" fill="url(#glass-grad)" stroke="#ddd" stroke-width="1" />
    <path d="M 225,540 Q 265,543 305,540 L 305,555 Q 265,557 225,555 Z" fill="#fff" opacity="0.4" stroke="#ccc" stroke-width="0.5" />

    <text x="265" y="525" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#fff" opacity="0.6" text-anchor="middle" letter-spacing="1">LIP BEAUTY</text>
    <text x="265" y="535" font-family="Arial, sans-serif" font-size="7" fill="#fff" opacity="0.6" text-anchor="middle">6g 0.21 oz.</text>

    <rect x="224" y="180" width="82" height="40" fill="url(#metal-grad)" stroke="#b5b5b5" stroke-width="0.5" />
    <line x1="224" y1="200" x2="306" y2="200" stroke="#999" stroke-width="1" />

    <rect x="224" y="40" width="82" height="140" fill="url(#metal-grad)" rx="2" stroke="#b5b5b5" stroke-width="0.5" />
    <ellipse cx="265" cy="40" rx="41" ry="4" fill="#e6e6e6" stroke="#999" stroke-width="0.5" />
  </g>
</svg>`,
    'skin_tint': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <g transform="translate(40, 40)">
    
    <path id="tint-color" 
          d="M 90,120 
             C 60,170 65,240 100,280 
             C 130,310 210,360 270,365 
             C 320,370 345,350 360,320 
             C 330,310 290,270 270,240 
             C 240,195 210,130 160,105 
             C 130,90 110,95 90,120 Z" 
          fill="${state.shade}" />

    <path d="M 95,130 
             C 75,175 80,230 110,265 
             C 140,295 210,340 260,345
             C 210,325 150,280 125,240
             C 100,190 105,150 95,130 Z" 
          fill="#000000" 
          opacity="0.06" />

    <path d="M 100,125 
             C 120,105 150,110 180,135 
             C 150,125 125,120 110,135 Z" 
          fill="#FFFFFF" 
          opacity="0.25" />

    <path d="M 115,115 
             C 150,125 195,160 225,210 
             C 245,245 270,280 300,300
             C 265,275 240,240 220,205
             C 190,155 145,120 115,115 Z" 
          fill="#FFFFFF" 
          opacity="0.15" />

    <path d="M 120,280 
             C 170,320 230,345 285,340
             C 230,335 170,310 130,275 Z" 
          fill="#FFFFFF" 
          opacity="0.1" />
          
  </g>
</svg>`,
    'liquid_blush': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 650" width="100%" height="100%">
  <defs>
    <linearGradient id="matte-cap" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d9beaa" />
      <stop offset="30%" stop-color="#ebd4c2" />
      <stop offset="70%" stop-color="#ebd4c2" />
      <stop offset="100%" stop-color="#cca891" />
    </linearGradient>

    <linearGradient id="gold-ring" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a37628" />
      <stop offset="25%" stop-color="#f5d77f" />
      <stop offset="50%" stop-color="#fff4c2" />
      <stop offset="75%" stop-color="#e6be53" />
      <stop offset="100%" stop-color="#8c6119" />
    </linearGradient>

    <linearGradient id="frosted-glass" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.4" />
      <stop offset="20%" stop-color="#ffffff" stop-opacity="0.1" />
      <stop offset="80%" stop-color="#ffffff" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.35" />
    </linearGradient>

    <linearGradient id="wand-stick" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e0e0e0" />
      <stop offset="40%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#cccccc" />
    </linearGradient>

    <linearGradient id="blush-shading" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#000000" stop-opacity="0.2" />
      <stop offset="50%" stop-color="#000000" stop-opacity="0.0" />
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0.15" />
    </linearGradient>

    <style>
      .blush-color {
        fill: ${state.shade}; /* Default Liquid Blush Rose-Red Color */
      }
    </style>
  </defs>

  <g id="blush-swatch">
    <path class="blush-color" d="M 440,505 C 390,520 330,570 270,625 C 290,625 320,625 350,615 C 410,595 460,545 490,512 C 500,502 480,495 440,505 Z" opacity="0.95" />
    <path class="blush-color" d="M 270,625 L 250,632 L 280,620 Z M 295,622 L 265,635 L 285,627 Z" opacity="0.8" />
  </g>

  <g id="blush-bottle" transform="translate(40, 40)">
    <rect class="blush-color" x="160" y="170" width="100" height="295" rx="12" />
    <rect x="160" y="170" width="100" height="295" rx="12" fill="url(#blush-shading)" />

    <rect x="154" y="165" width="112" height="305" rx="16" fill="url(#frosted-glass)" stroke="#ebd4c2" stroke-width="1" />
    <path d="M 154,450 Q 210,455 266,450 L 266,470 Q 210,473 154,470 Z" fill="#ffffff" opacity="0.3" />

    <rect x="185" y="125" width="50" height="40" fill="#ebd4c2" opacity="0.5" stroke="#cca891" stroke-width="0.5" />
    <rect x="181" y="133" width="58" height="6" rx="2" fill="#ebd4c2" opacity="0.8" />
    <rect x="181" y="145" width="58" height="6" rx="2" fill="#ebd4c2" opacity="0.8" />

    <text x="210" y="415" font-family="'Arial Black', Gadget, sans-serif" font-size="10" font-weight="bold" fill="#f5d77f" text-anchor="middle" letter-spacing="1">LIQUID BLUSH</text>
    <text x="210" y="428" font-family="Arial, sans-serif" font-size="8" fill="#f5d77f" text-anchor="middle">4.5 ml 0.15 fl.oz.</text>
  </g>

  <g id="blush-wand" transform="translate(40, 40)">
    <rect x="360" y="175" width="16" height="180" fill="url(#wand-stick)" stroke="#bbbbbb" stroke-width="0.5" />

    <path class="blush-color" d="M 358,350 C 358,350 354,375 356,395 C 358,410 368,415 368,415 C 368,415 378,410 380,395 C 382,375 378,350 378,350 Z" />
    <path d="M 358,350 C 358,350 354,375 356,395" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.2" />

    <g transform="translate(10, 0)">
      <path d="M 315,150 L 395,150 C 395,150 400,170 385,175 L 325,175 C 310,170 315,150 315,150 Z" fill="url(#gold-ring)" stroke="#a37628" stroke-width="0.5" />
      
      <rect x="315" y="40" width="80" height="110" rx="4" fill="url(#matte-cap)" stroke="#cca891" stroke-width="0.5" />
      <ellipse cx="355" cy="40" rx="40" ry="4" fill="#ebd4c2" stroke="#cca891" stroke-width="0.5" />
    </g>
  </g>
</svg>`,
    'eyeshadow': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
  <defs>
    <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <path id="eyeshadow" class="eyeshadow-layer" 
        d="M 140,280 C 180,240 320,240 370,290 C 340,330 220,340 140,280 Z" 
        fill="${state.shade}" 
        opacity="0.6" 
        filter="url(#soft-glow)" />

  <g id="eyebrow" fill="#4a3728">
    <path d="M 90,200 C 150,110 320,110 400,180 C 350,150 200,140 90,200 Z" />
  </g>

  <g id="eyelashes" fill="#1a1921">
    <path d="M 130,270 C 200,340 320,340 380,290 C 320,310 200,310 130,270 Z" />
    </g>
</svg>`,
});

function drawProductSwatch() {
    const container = document.getElementById('preview-canvas');
    if (!container) return;

    const swatches = getProductSwatches();
    // Pick the SVG for the current product, fall back to lipstick if missing
    const svg = swatches[state.productId] || swatches['lipstick'];

    // Inject the SVG inline. SVG has width/height 100% so it fills the
    // 128x128 container defined in CSS.
    container.innerHTML = svg;
}

// ─── Build order summary for clipboard / cart ────────────────
function buildOrderPayload() {
    const cfg = getProduct(state.productId);
    const names = [];
    state.ingredients.forEach(id => {
        const ing = cfg.ingredients.find(i => i.id === id);
        if (ing) names.push(ing.name);
    });
    const { base, addons, total } = recalcPrice();

    // Capture current try-on slider values
    const opacityEl = document.getElementById('slider-opacity');
    const blurEl    = document.getElementById('slider-blur');
    const shineEl   = document.getElementById('slider-shine');
    const tryon_settings = {
        opacity: opacityEl ? Number(opacityEl.value) : null,
        blur:    blurEl    ? Number(blurEl.value)    : null,
        shine:   shineEl   ? Number(shineEl.value)   : null,
    };

    return {
        product_type: state.productId,
        product_name: cfg.name,
        shade: state.shade,
        shadeName: state.shadeName,
        finish: state.finish || null,
        coverage: state.coverage || null,
        undertone: state.undertone || null,
        intensity: state.intensity || null,
        skinType: state.skinType || null,
        pigmentation: state.pigmentation || null,
        paletteSize: state.paletteSize || null,
        shimmer: state.shimmer,
        spf: state.spf,
        hydration: state.hydration,
        key_ingredients: names,
        fragrance: state.fragrance || null,
        packaging: state.packaging || null,
        personalisation: state.personalisation || null,
        engraving: state.engraving || null,
        custom_name: state.customName || null,
        qty: state.qty,
        tryon_settings,
        pricing: { base, addons, total },
    };
}

function buildOrderText() {
    const p = buildOrderPayload();
    return [
        '\u2500\u2500 House of Zuri \u2014 Order Details \u2500\u2500',
        'Product:       ' + p.product_name,
        'Shade:         ' + p.shadeName + ' (' + p.shade + ')',
        'Finish:        ' + (p.finish || '\u2014'),
        'Coverage:      ' + (p.coverage || '\u2014'),
        'Undertone:     ' + (p.undertone || '\u2014'),
        'Ingredients:   ' + (p.key_ingredients.join(', ') || '\u2014'),
        'Fragrance:     ' + (p.fragrance || '\u2014'),
        'Packaging:     ' + (p.packaging || '\u2014'),
        'Custom name:   ' + (p.custom_name || '\u2014'),
        'Qty:           ' + p.qty,
        '',
        'Try-on settings:',
        '  Opacity:     ' + (p.tryon_settings.opacity ?? '\u2014') + '%',
        '  Blur:        ' + (p.tryon_settings.blur    ?? '\u2014') + '%',
        '  Shine:       ' + (p.tryon_settings.shine   ?? '\u2014') + '%',
        '',
        'Base price:    ' + fmt(p.pricing.base),
        'Add-ons:       ' + fmt(p.pricing.addons),
        'Total:         ' + fmt(p.pricing.total),
    ].join('\n');
}

// ── tryon ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
//  tryon.js — Photo + Camera try-on orchestration
// ═══════════════════════════════════════════════════════════════

// ─── Get current renderer based on selected product ──────────
function currentRenderer() {
    const cfg = getProduct(state.productId);
    return getRenderer(cfg.faceRegion);
}

// ─── Get slider values ───────────────────────────────────────
function getSliderValues() {
    const opacity = (document.getElementById('slider-opacity')?.valueAsNumber ?? 70) / 100;
    const blurPx  = (document.getElementById('slider-blur')?.valueAsNumber   ?? 2)  / 100 * 6;
    const shine   = (document.getElementById('slider-shine')?.valueAsNumber   ?? 30) / 100;
    return { opacity, blurPx, shine };
}

// ═══════════════════════════════════════════════════════════════
//  PHOTO TRY-ON
// ═══════════════════════════════════════════════════════════════

function setupDropzone() {
    const dz  = document.getElementById('dropzone');
    const fi  = document.getElementById('file-input');
    const btn = document.getElementById('btn-choose-photo');

    if (btn && fi) btn.addEventListener('click', () => fi.click());
    if (fi) fi.addEventListener('change', e => {
        const file = e.target.files?.[0];
        if (file) processPhotoFile(file);
    });
    if (dz) {
        dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('is-dragover'); });
        dz.addEventListener('dragleave', () => dz.classList.remove('is-dragover'));
        dz.addEventListener('drop', e => {
            e.preventDefault(); dz.classList.remove('is-dragover');
            const file = e.dataTransfer?.files?.[0];
            if (file?.type.startsWith('image/')) processPhotoFile(file);
        });
    }
}

function processPhotoFile(file) {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = async () => {
        tryonState.photoImg = img;
        tryonState.landmarks = null;
        const canvas = document.getElementById('tryon-canvas');
        if (canvas) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            canvas.getContext('2d').drawImage(img, 0, 0);
            const result = document.getElementById('tryon-result');
            const dropzone = document.getElementById('dropzone');
            if (result)   result.style.display = 'block';
            if (dropzone) dropzone.style.display = 'none';
        }
        await runPhotoDetection(img);
        URL.revokeObjectURL(url);
    };
    img.onerror = () => { setTryonStatus('Could not read image.', 'warn'); URL.revokeObjectURL(url); };
    img.src = url;
}

async function runPhotoDetection(imgEl) {
    if (tryonState.processing) return;
    tryonState.processing = true;
    try {
        setTryonStatus('Detecting face\u2026');
        const fl = await getFaceLandmarker('IMAGE');
        const result = fl.detect(imgEl);
        console.log('[HoZ] Photo result — faces:', result.faceLandmarks?.length || 0);

        if (!result.faceLandmarks || result.faceLandmarks.length === 0) {
            tryonState.landmarks = null;
            setTryonStatus('No face detected \u2014 try a well-lit frontal photo.', 'warn');
        } else {
            tryonState.landmarks = result.faceLandmarks[0];
            setTryonStatus('Face detected! Shade applied.', 'info');
            applyPhotoOverlay();
            setTimeout(() => setTryonStatus(''), 2500);
        }
    } catch (err) {
        console.error('[HoZ] Photo detection error:', err);
        setTryonStatus('Detection failed \u2014 try another photo.', 'warn');
    } finally {
        tryonState.processing = false;
    }
}

function applyPhotoOverlay() {
    const { landmarks, photoImg, mode } = tryonState;
    if (!landmarks || mode !== 'photo' || !photoImg) return;
    const canvas = document.getElementById('tryon-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = photoImg.naturalWidth, h = photoImg.naturalHeight;
    canvas.width = w; canvas.height = h;
    ctx.drawImage(photoImg, 0, 0);

    const { opacity, blurPx, shine } = getSliderValues();
    const renderer = currentRenderer();

    const tmp = document.createElement('canvas');
    tmp.width = w; tmp.height = h;
    renderer.renderMask(tmp.getContext('2d'), landmarks, w, h, state.shade, blurPx);
    renderer.composite(ctx, tmp, landmarks, w, h, opacity, shine);

    const result = document.getElementById('tryon-result');
    if (result) result.style.display = 'block';
}

// ═══════════════════════════════════════════════════════════════
//  LIVE CAMERA TRY-ON
// ═══════════════════════════════════════════════════════════════

async function startCamera() {
    if (tryonState.cameraStop) return;

    // The camera API only exists in a SECURE context (https:// or localhost).
    // Over a plain-http LAN address (e.g. http://192.168.x.x) the browser does
    // not expose navigator.mediaDevices at all \u2014 guard so we show a clear
    // message instead of throwing "Cannot read properties of undefined".
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        const host = window.location.hostname;
        const isLocal = host === 'localhost' || host === '127.0.0.1';
        const insecure = window.location.protocol !== 'https:' && !isLocal;
        setTryonStatus(
            insecure
                ? 'Camera needs a secure (HTTPS) connection. This page is open over plain http:// on your network, which the browser blocks. Open it via https:// (or a tunnel) to use the camera.'
                : 'Camera is not available in this browser.',
            'warn'
        );
        return;
    }

    try {
        setTryonStatus('Starting camera\u2026');
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
            audio: false,
        });
        const videoEl = document.getElementById('camera-video');
        if (!videoEl) { stream.getTracks().forEach(t => t.stop()); return; }
        videoEl.srcObject = stream;
        // iOS Safari PAUSES a display:none video, which freezes the frame
        // feed. Keep it technically "visible" but effectively invisible:
        // 1px, fully transparent, pinned in a corner, ignoring pointer events.
        videoEl.style.cssText =
            'position:fixed;right:0;bottom:0;width:1px;height:1px;' +
            'opacity:0.01;pointer-events:none;z-index:-1;';

        await new Promise((resolve, reject) => {
            videoEl.onloadeddata = resolve;
            videoEl.onerror = reject;
            videoEl.play().catch(reject);
        });

        const canvas = document.getElementById('camera-canvas');
        if (!canvas) return;
        const vw = videoEl.videoWidth || 640, vh = videoEl.videoHeight || 480;
        canvas.width = vw; canvas.height = vh;
        canvas.style.display = 'block';
        const placeholder = document.getElementById('camera-placeholder');
        if (placeholder) placeholder.style.display = 'none';
        console.log('[HoZ] Camera started:', vw, 'x', vh);

        const fl = await getFaceLandmarker('VIDEO');
        resetSmoothing();
        let running = true, lastTs = -1;
        let lastResult = null;

        function tick() {
            if (!running) return;
            if (videoEl.readyState >= 2) {
                // Detect on EVERY animation frame (no 30fps cap). detectForVideo
                // is synchronous, so requestAnimationFrame self-paces it to the
                // device's real capability — fast on desktop, gracefully slower
                // on low-end mobile — instead of reusing stale landmarks between
                // throttled detections (which was the main source of lag).
                let now = performance.now();
                if (now <= lastTs) now = lastTs + 1; // timestamps must increase
                lastTs = now;
                try { lastResult = fl.detectForVideo(videoEl, now); }
                catch (e) { /* skip frame */ }
                renderCameraFrame(videoEl, canvas, lastResult);
            }
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);

        setTryonStatus('Camera active \u2014 move your face into frame.', 'info');
        setTimeout(() => { if (running) setTryonStatus(''); }, 3000);
        const btnStart = document.getElementById('btn-start-camera');
        const btnStop  = document.getElementById('btn-stop-camera');
        if (btnStart) btnStart.style.display = 'none';
        if (btnStop)  btnStop.style.display  = '';

        tryonState.cameraStop = () => {
            running = false;
            stream.getTracks().forEach(t => t.stop());
            videoEl.srcObject = null;
            resetSmoothing();
            if (placeholder) placeholder.style.display = '';
            if (canvas) canvas.style.display = 'none';
            if (btnStart) btnStart.style.display = '';
            if (btnStop)  btnStop.style.display  = 'none';
            tryonState.cameraStop = null;
            setTryonStatus('');
            console.log('[HoZ] Camera stopped');
        };
    } catch (err) {
        console.error('[HoZ] Camera error:', err);
        const msgs = {
            NotAllowedError:     'Camera access denied \u2014 allow in browser permissions.',
            NotFoundError:       'No camera found on this device.',
            DevicesNotFoundError:'No camera found on this device.',
            NotReadableError:    'Camera in use by another app \u2014 close it and retry.',
            TrackStartError:     'Camera in use by another app \u2014 close it and retry.',
        };
        setTryonStatus(msgs[err.name] || ('Camera error: ' + err.message), 'warn');
    }
}

function renderCameraFrame(videoEl, canvas, result) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(videoEl, 0, 0, w, h);
    ctx.restore();

    const renderer = currentRenderer();

    if (result && result.faceLandmarks && result.faceLandmarks.length > 0) {
        let lm = result.faceLandmarks[0];
        lm = lm.map(p => ({ x: 1 - p.x, y: p.y, z: p.z }));
        smoothLandmarks(lm, renderer.indices);
    }

    if (!smoother.output) return;

    const { blurPx } = getSliderValues();

    // Failsafe: if shade changed but overlayDirty wasn't set (e.g. color picker
    // input event timing), force regeneration by detecting shade mismatch
    if (smoother._lastShade !== state.shade) {
        smoother.overlayDirty = true;
    }

    if (smoother.overlayDirty || !smoother.overlayCanvas) {
        if (!smoother.overlayCanvas) {
            smoother.overlayCanvas = document.createElement('canvas');
        }
        const oc = smoother.overlayCanvas;
        if (oc.width !== w || oc.height !== h) { oc.width = w; oc.height = h; }
        renderer.renderMask(oc.getContext('2d'), smoother.output, w, h, state.shade, blurPx);
        smoother.overlayDirty = false;
        smoother._lastShade = state.shade; // track what shade we rendered
    }

    const { opacity, shine } = getSliderValues();
    renderer.composite(ctx, smoother.overlayCanvas, smoother.output, w, h, opacity, shine);
}

function stopCamera() {
    if (tryonState.cameraStop) tryonState.cameraStop();
}

// ═══════════════════════════════════════════════════════════════
//  TRYON TABS + ACTIONS
// ═══════════════════════════════════════════════════════════════

function setupTryonTabs() {
    const tabPhoto  = document.getElementById('tab-photo');
    const tabCamera = document.getElementById('tab-camera');
    const panelP    = document.getElementById('panel-photo');
    const panelC    = document.getElementById('panel-camera');

    if (tabPhoto) {
        tabPhoto.addEventListener('click', () => {
            tryonState.mode = 'photo';
            tabPhoto.classList.add('is-active');
            tabPhoto.setAttribute('aria-selected', 'true');
            tabCamera?.classList.remove('is-active');
            tabCamera?.setAttribute('aria-selected', 'false');
            if (panelP) panelP.style.display = '';
            if (panelC) panelC.style.display = 'none';
            stopCamera();
        });
    }
    if (tabCamera) {
        tabCamera.addEventListener('click', () => {
            tryonState.mode = 'camera';
            tabCamera.classList.add('is-active');
            tabCamera.setAttribute('aria-selected', 'true');
            tabPhoto?.classList.remove('is-active');
            tabPhoto?.setAttribute('aria-selected', 'false');
            if (panelC) panelC.style.display = '';
            if (panelP) panelP.style.display = 'none';
        });
    }
}

function setupTryonActions() {
    const btnDetect = document.getElementById('btn-detect-face');
    const btnApply  = document.getElementById('btn-apply-shade');
    const btnStart  = document.getElementById('btn-start-camera');
    const btnStop   = document.getElementById('btn-stop-camera');
    const btnClear  = document.getElementById('btn-clear-tryon');

    if (btnDetect) {
        btnDetect.addEventListener('click', async () => {
            if (tryonState.mode === 'photo' && tryonState.photoImg) {
                await runPhotoDetection(tryonState.photoImg);
            } else if (tryonState.mode === 'camera') {
                if (!tryonState.cameraStop) await startCamera();
            } else {
                setTryonStatus('Upload a photo first.', 'warn');
            }
        });
    }
    if (btnApply) {
        btnApply.addEventListener('click', () => {
            if (tryonState.mode === 'photo' && tryonState.landmarks) applyPhotoOverlay();
            else if (tryonState.mode === 'photo') setTryonStatus('Detect a face first.', 'warn');
        });
    }
    if (btnStart) btnStart.addEventListener('click', startCamera);
    if (btnStop)  btnStop.addEventListener('click',  stopCamera);
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            stopCamera();
            tryonState.photoImg = null;
            tryonState.landmarks = null;
            resetSmoothing();
            const canvas = document.getElementById('tryon-canvas');
            if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            const result   = document.getElementById('tryon-result');
            const dropzone = document.getElementById('dropzone');
            const fileInp  = document.getElementById('file-input');
            if (result)   result.style.display = 'none';
            if (dropzone) dropzone.style.display = '';
            if (fileInp)  fileInp.value = '';
            setTryonStatus('');
        });
    }
}

// ─── Invalidate overlay cache (called on shade/slider changes) ─
function invalidateOverlay() {
    smoother.overlayDirty = true;
}

// ── form-builder ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
//  form-builder.js — Dynamic form rendering from product config
// ═══════════════════════════════════════════════════════════════
//  Reads the selected product's config and renders:
//   - Custom fields (selects, toggles) into #dynamic-fields
//   - Ingredients into #dynamic-ingredients
//   - Fragrances into #dynamic-fragrances
//  Called on every product switch.
// ═══════════════════════════════════════════════════════════════

/**
 * Rebuild all dynamic form sections for the given product.
 */
function buildFormForProduct(productId) {
    const cfg = getProduct(productId);

    renderFields(cfg);
    renderIngredients(cfg);
    renderFragrances(cfg);
}

// ═══════════════════════════════════════════════════════════════
//  FIELDS (Step 3 — selects + toggles)
// ═══════════════════════════════════════════════════════════════

function renderFields(cfg) {
    const container = document.getElementById('dynamic-fields');
    if (!container) return;

    const fields = cfg.fields || [];
    if (fields.length === 0) {
        container.innerHTML = '';
        container.closest('.form-card')?.style.setProperty('display', 'none');
        return;
    }

    container.closest('.form-card')?.style.removeProperty('display');

    // Split into selects and toggles
    const selects = fields.filter(f => f.type === 'select');
    const toggles = fields.filter(f => f.type === 'toggle');

    let html = '';

    // Selects in a grid
    if (selects.length > 0) {
        const cols = selects.length >= 2 ? 'grid-2' : '';
        html += `<div class="${cols}" style="margin-top:14px">`;
        for (const field of selects) {
            html += `<div class="field">
                <label class="label" for="field-${field.key}">${field.label}</label>
                <select id="field-${field.key}" name="${field.key}" class="control">
                    <option value="" selected>\u2014 Select \u2014</option>
                    ${field.options.map(o => `<option value="${o}">${o}</option>`).join('')}
                </select>
            </div>`;
        }
        html += '</div>';
    }

    // Toggles as pill switches
    if (toggles.length > 0) {
        html += '<div class="product-tabs product-tabs--tight" style="margin-top:14px">';
        for (const field of toggles) {
            const id = `toggle-${field.key}`;
            html += `<div class="choice">
                <input class="choice-input" type="checkbox" name="${field.key}" id="${id}">
                <label class="tag" for="${id}">${field.label}</label>
            </div>`;
        }
        html += '</div>';
    }

    container.innerHTML = html;

    // Wire up event listeners
    for (const field of selects) {
        const el = document.getElementById(`field-${field.key}`);
        if (el) {
            el.addEventListener('change', () => {
                state[field.key] = el.value;
                updatePreviewCard();
                // Finish/Coverage change the look → refresh the try-on. Camera
                // reads state every frame; photo needs an explicit re-apply.
                invalidateOverlay();
                if (tryonState.mode === 'photo' && tryonState.landmarks) applyPhotoOverlay();
            });
        }
    }

    for (const field of toggles) {
        const el = document.getElementById(`toggle-${field.key}`);
        if (el) {
            el.addEventListener('change', () => {
                state[field.key] = el.checked;
                updatePreviewCard();
                invalidateOverlay();
                if (tryonState.mode === 'photo' && tryonState.landmarks) applyPhotoOverlay();
            });
        }
    }
}

// ═══════════════════════════════════════════════════════════════
//  INGREDIENTS (Step 4)
// ═══════════════════════════════════════════════════════════════

function renderIngredients(cfg) {
    const container = document.getElementById('dynamic-ingredients');
    if (!container) return;

    const ingredients = cfg.ingredients || [];
    if (ingredients.length === 0) {
        container.innerHTML = '';
        container.closest('.form-card')?.style.setProperty('display', 'none');
        return;
    }

    container.closest('.form-card')?.style.removeProperty('display');

    let html = '';
    for (const ing of ingredients) {
        const checked = state.ingredients.has(ing.id) ? 'checked' : '';
        html += `<div class="choice">
            <input class="choice-input" type="checkbox" name="ingredient" id="${ing.id}" ${checked}>
            <label class="tag" for="${ing.id}">${ing.name} <span class="tag__price">+${fmt(ing.price)}</span></label>
        </div>`;
    }

    container.innerHTML = html;

    // Wire up listeners
    container.querySelectorAll('input[name="ingredient"]').forEach(cb => {
        cb.addEventListener('change', () => {
            cb.checked ? state.ingredients.add(cb.id) : state.ingredients.delete(cb.id);
            recalcPrice();
            updatePreviewCard();
        });
    });
}

// ═══════════════════════════════════════════════════════════════
//  FRAGRANCES (Step 5)
// ═══════════════════════════════════════════════════════════════

function renderFragrances(cfg) {
    const container = document.getElementById('dynamic-fragrances');
    if (!container) return;

    const fragrances = cfg.fragrances || [];
    if (fragrances.length === 0) {
        container.innerHTML = '';
        container.closest('.form-card')?.style.setProperty('display', 'none');
        return;
    }

    container.closest('.form-card')?.style.removeProperty('display');

    let html = '';
    for (const fr of fragrances) {
        const id = 'fr-' + fr.toLowerCase().replace(/\s+/g, '-');
        const checked = state.fragrance === fr ? 'checked' : '';
        html += `<div class="choice">
            <input class="choice-input" type="radio" name="fragrance" id="${id}" value="${fr}" ${checked}>
            <label class="tab-pill" for="${id}">${fr}</label>
        </div>`;
    }

    container.innerHTML = html;

    // Wire up listeners
    container.querySelectorAll('input[name="fragrance"]').forEach(r => {
        r.addEventListener('change', () => {
            state.fragrance = r.value;
            updatePreviewCard();
        });
    });
}

// ── app ──────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
//  app.js — Entry point (House of Zuri v5.2 — All face regions)
// ═══════════════════════════════════════════════════════════════
//  index.html must use: <script type="module" src="js/app.js">
// ═══════════════════════════════════════════════════════════════

// ─── Product radio ID → config ID mapping ────────────────────
const PRODUCT_ID_MAP = {
    'product-lipstick':    'lipstick',
    'product-gloss':       'lip_gloss',
    'product-lip-oil':     'lip_oil',
    'product-skin-tint':   'skin_tint',
    'product-blush':       'liquid_blush',
    'product-eyeshadow':   'eyeshadow',
};

// ═══════════════════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    console.log('[HoZ] build JULY-06 loaded — eyeshadow shows on closed lid + mobile accordion');

    // Initialize default state + build form for default product
    initDefaultState('lipstick');
    buildFormForProduct('lipstick');

    // Wire up all interactions
    setupProductTabs();
    // Populate the preset-shade dropdown for the default product (lipstick) on
    // load — otherwise the dropdown only has its placeholder until the user
    // switches products, so the lipstick preset wouldn't show on first load.
    updateShadePresets();
    setupShadeSync();
    setupStaticFormListeners();
    setupQty();
    setupSliders();
    setupDropzone();
    setupTryonTabs();
    setupTryonActions();
    setupCartAndCopy();
    setupMobileAccordion();

    // Initial render
    recalcPrice();
    updatePreviewCard();
    drawProductSwatch();
    toggleShadeSection(state.productId);

    // ── Background preload: start downloading MediaPipe after page settles ──
    // 1000ms delay ensures the page UI renders and is interactive first.
    // After that, the library and 4MB model download silently in the background.
    // When user clicks camera, it starts in <1 second instead of 5-6 seconds.
    setTimeout(preloadFaceLandmarker, 1000);
});

// ═══════════════════════════════════════════════════════════════
//  PRODUCT TAB SWITCHING
// ═══════════════════════════════════════════════════════════════
function setupProductTabs() {
    document.querySelectorAll('input[name="product"]').forEach(r => {
        r.addEventListener('change', () => {
            const productId = PRODUCT_ID_MAP[r.id] || 'lipstick';

            // Reset state for new product
            initDefaultState(productId);

            // Rebuild dynamic form sections (fields, ingredients, fragrances)
            buildFormForProduct(productId);

            // Update shade presets for new product
            updateShadePresets();

            // Hide shade picker for products that don't use it (Lip Oil)
            toggleShadeSection(productId);

            // Refresh everything
            recalcPrice();
            updatePreviewCard();
            drawProductSwatch();
            invalidateOverlay();
            // Re-apply photo overlay if in photo mode (new product = new face region)
            if (tryonState.mode === 'photo' && tryonState.landmarks) applyPhotoOverlay();
        });
    });
}

// ── Shade section visibility ──────────────────────────────────
// ── Shade section state for Lip Oil ──────────────────────────
// Lip Oil uses a fixed color (#fd5a99) the user cannot change. The
// shade section stays visible, but the controls (color picker, preset
// dropdown) are DISABLED so they can be seen but not interacted with.
// The preset is preselected to "Signature Pink" so the user sees the
// fixed color clearly.
function toggleShadeSection(productId) {
    const section = document.getElementById('shade-section');
    const colorInput = document.getElementById('shade-color');
    const presetSelect = document.getElementById('shade-preset');
    if (!section) return;

    // Always visible — never hidden
    section.style.display = '';

    const isLocked = (productId === 'lip_oil');

    if (colorInput) {
        colorInput.disabled = isLocked;
        // Visual cue that the field is locked
        colorInput.style.opacity = isLocked ? '0.6' : '';
        colorInput.style.cursor = isLocked ? 'not-allowed' : '';
    }
    if (presetSelect) {
        presetSelect.disabled = isLocked;
        presetSelect.style.opacity = isLocked ? '0.6' : '';
        presetSelect.style.cursor = isLocked ? 'not-allowed' : '';
    }

    // Visual cue on the section card
    section.style.opacity = isLocked ? '0.75' : '';
}

// ═══════════════════════════════════════════════════════════════
//  SHADE SYNC
// ═══════════════════════════════════════════════════════════════
function setupShadeSync() {
    const ci = document.getElementById('shade-color');
    const co = document.getElementById('shade-code');
    const ps = document.getElementById('shade-preset');

    function sync() {
        const hex = (ci?.value || '#D2198B').toUpperCase();
        state.shade = hex;
        if (co) co.textContent = hex;

        const cfg = getProduct(state.productId);
        let match = null;
        for (const [name, val] of Object.entries(cfg.shadePresets || {})) {
            if (val.toUpperCase() === hex) { match = name; break; }
        }
        state.shadeName = match || hex;
        if (ps) ps.value = match || '';

        invalidateOverlay();
        updatePreviewCard();
        drawProductSwatch();
        // Re-apply photo overlay if in photo mode (mirrors slider behavior)
        if (tryonState.mode === 'photo' && tryonState.landmarks) applyPhotoOverlay();
    }

    if (ci) { ci.addEventListener('input', sync); ci.addEventListener('change', sync); }
    if (ps) {
        ps.addEventListener('change', () => {
            const cfg = getProduct(state.productId);
            const name = ps.value;
            const hex = cfg.shadePresets?.[name];
            if (hex) {
                state.shade = hex; state.shadeName = name;
                if (ci) ci.value = hex;
                if (co) co.textContent = hex.toUpperCase();
                invalidateOverlay();
                updatePreviewCard();
                drawProductSwatch();
                // Re-apply photo overlay if in photo mode
                if (tryonState.mode === 'photo' && tryonState.landmarks) applyPhotoOverlay();
            }
        });
    }
    sync();
}

function updateShadePresets() {
    const ps = document.getElementById('shade-preset');
    const ci = document.getElementById('shade-color');
    const co = document.getElementById('shade-code');
    if (!ps) return;

    const cfg = getProduct(state.productId);
    const presets = cfg.shadePresets || {};

    // Rebuild options
    ps.innerHTML = '<option value="">Select preset shade</option>';
    for (const [name, hex] of Object.entries(presets)) {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        ps.appendChild(opt);
    }

    // Set shade to first preset of new product
    const firstPreset = Object.entries(presets)[0];
    if (firstPreset) {
        state.shade = firstPreset[1];
        state.shadeName = firstPreset[0];
        if (ci) ci.value = firstPreset[1];
        if (co) co.textContent = firstPreset[1].toUpperCase();
        ps.value = firstPreset[0];
    }
}

// ═══════════════════════════════════════════════════════════════
//  STATIC FORM LISTENERS (packaging, personalisation, text inputs)
//  Dynamic fields (finish, coverage, ingredients, fragrances) are
//  handled by form-builder.js — listeners wired on each rebuild.
// ═══════════════════════════════════════════════════════════════
function setupStaticFormListeners() {
    const packaging      = document.getElementById('packaging');
    const personalisation = document.getElementById('personalisation');
    const engraving      = document.getElementById('engraving');
    const customerName   = document.getElementById('customer-name');

    if (packaging)       packaging.addEventListener('change', () => { state.packaging = packaging.value; updatePreviewCard(); });
    if (personalisation) personalisation.addEventListener('change', () => { state.personalisation = personalisation.value; updatePreviewCard(); });
    if (engraving)       engraving.addEventListener('input', () => { state.engraving = engraving.value; });
    if (customerName)    customerName.addEventListener('input', () => { state.customName = customerName.value; });
}

// ═══════════════════════════════════════════════════════════════
//  QUANTITY
// ═══════════════════════════════════════════════════════════════
function setupQty() {
    const minus = document.getElementById('qty-minus');
    const plus  = document.getElementById('qty-plus');
    const val   = document.getElementById('qty-value');
    if (minus) minus.addEventListener('click', () => { state.qty = Math.max(1, state.qty - 1); if (val) val.value = state.qty; recalcPrice(); });
    if (plus)  plus.addEventListener('click',  () => { state.qty = Math.min(999, state.qty + 1); if (val) val.value = state.qty; recalcPrice(); });
}

// ═══════════════════════════════════════════════════════════════
//  SLIDERS
// ═══════════════════════════════════════════════════════════════
function setupSliders() {
    [
        { s: 'slider-opacity', d: 'val-opacity' },
        { s: 'slider-blur',    d: 'val-blur' },
        { s: 'slider-shine',   d: 'val-shine' },
    ].forEach(({ s, d }) => {
        const slider  = document.getElementById(s);
        const display = document.getElementById(d);
        if (!slider) return;
        slider.addEventListener('input', () => {
            if (display) display.textContent = slider.value + '%';
            invalidateOverlay();
            if (tryonState.mode === 'photo' && tryonState.landmarks) applyPhotoOverlay();
        });
    });
}

// ═══════════════════════════════════════════════════════════════
//  CART & COPY
// ═══════════════════════════════════════════════════════════════
function setupCartAndCopy() {
    const btnCopy = document.getElementById('btn-copy');
    const btnCart = document.getElementById('btn-add-to-cart');

    if (btnCopy) {
        btnCopy.addEventListener('click', async () => {
            const text = buildOrderText();
            try {
                await navigator.clipboard.writeText(text);
                btnCopy.textContent = '\u2713 Copied!';
                setTimeout(() => {
                    btnCopy.innerHTML = '<span class="btn__icon btn__icon--copy" aria-hidden="true"></span> COPY DETAILS';
                }, 2000);
            } catch { /* silent */ }
        });

    }
    if (btnCart) {
        btnCart.addEventListener('click', () => {
            const payload = buildOrderPayload();
            document.dispatchEvent(new CustomEvent('add-to-cart', { detail: payload }));
            console.log('[HoZ] Add to cart:', payload);
            btnCart.textContent = '\u2713 Added!';
            setTimeout(() => { btnCart.textContent = 'ADD TO CART'; }, 2000);
        });
    }
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
//  MOBILE ACCORDION (phone only \u2014 desktop stays fully expanded)
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
//  On phones (\u2264640px) each numbered form section collapses; tapping its
//  title toggles it. Section 1 starts open, 2\u20137 start collapsed. On
//  desktop/tablet the CSS never hides content, so this is a no-op there.
function setupMobileAccordion() {
    const mq = window.matchMedia('(max-width: 640px)');
    const cards = Array.from(document.querySelectorAll('.builder-form .form-card'));
    if (!cards.length) return;

    // Set collapsed state to match the viewport: on mobile collapse all but the
    // first; on desktop expand everything (so nothing is ever hidden there).
    function applyState() {
        cards.forEach((card, i) => {
            if (mq.matches) card.classList.toggle('is-collapsed', i !== 0);
            else card.classList.remove('is-collapsed');
        });
    }

    cards.forEach(card => {
        const title = card.querySelector('.form-card__title');
        if (!title) return;
        title.setAttribute('role', 'button');
        title.setAttribute('tabindex', '0');
        const toggle = () => {
            if (!mq.matches) return;                 // desktop: titles aren't collapsible
            card.classList.toggle('is-collapsed');
        };
        title.addEventListener('click', toggle);
        title.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        });
    });

    applyState();
    // Re-apply when crossing the mobile/desktop breakpoint.
    (mq.addEventListener ? mq.addEventListener.bind(mq, 'change') : mq.addListener.bind(mq))(applyState);
}

})();