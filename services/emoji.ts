export const ALL_EMOJIS: string[] = [
    "😊", "🤔", "👍", "🎉", "😀", "👋", "👏", "🧠", "💡", "✨",
    "☕️", "🚀", "💻", "⚙️", "📚", "📎", "✅", "❓", "➡️", "⚠️",
    "ℹ️", "⭐", "🔗", "💬", "🔍"
];

export const CHATGPT_EMOJIS = {
    // Smilies & People
    SMILING_FACE_WITH_SMILING_EYES: "😊",
    THINKING_FACE: "🤔",
    THUMBS_UP: "👍",
    PARTY_POPPER: "🎉",
    GRINNING_FACE: "😀",
    WAVING_HAND: "👋",
    CLAPPING_HANDS: "👏",
    BRAIN: "🧠",

    // Animals & Nature
    LIGHT_BULB: "💡", // Often used for ideas
    SPARKLES: "✨",    // For emphasis or new features

    // Food & Drink
    COFFEE: "☕️",

    // Activities
    ROCKET: "🚀", // For launching or speed

    // Objects
    LAPTOP: "💻",
    GEAR: "⚙️", // For settings or technical details
    BOOK: "📚",
    PAPERCLIP: "📎",

    // Symbols
    CHECK_MARK_BUTTON: "✅",
    QUESTION_MARK: "❓",
    RIGHT_ARROW: "➡️",
    WARNING: "⚠️",
    INFO: "ℹ️",
    STAR: "⭐",
    LINK: "🔗",
    SPEECH_BUBBLE: "💬",
    MAGNIFYING_GLASS_TILTED_LEFT: "🔍",
};

export const EMOJI_UNICODE_MAP: { [key: string]: string } = {
    // Smilies & People
    "😊": "U+1F60A", // SMILING_FACE_WITH_SMILING_EYES
    "🤔": "U+1F914", // THINKING_FACE
    "👍": "U+1F44D", // THUMBS_UP
    "🎉": "U+1F389", // PARTY_POPPER
    "😀": "U+1F600", // GRINNING_FACE
    "👋": "U+1F44B", // WAVING_HAND
    "👏": "U+1F44F", // CLAPPING_HANDS
    "🧠": "U+1F9E0", // BRAIN

    // Animals & Nature
    "💡": "U+1F4A1", // LIGHT_BULB
    "✨": "U+2728",   // SPARKLES

    // Food & Drink
    "☕️": "U+2615",  // COFFEE (Note: U+FE0F is a variation selector)

    // Activities
    "🚀": "U+1F680", // ROCKET

    // Objects
    "💻": "U+1F4BB", // LAPTOP
    "⚙️": "U+2699",  // GEAR (Note: U+FE0F is a variation selector)
    "📚": "U+1F4DA", // BOOKS
    "📎": "U+1F4CE", // PAPERCLIP

    // Symbols
    "✅": "U+2705",   // CHECK_MARK_BUTTON
    "❓": "U+2753",   // QUESTION_MARK
    "➡️": "U+27A1",  // RIGHT_ARROW (Note: U+FE0F is a variation selector)
    "⚠️": "U+26A0",  // WARNING (Note: U+FE0F is a variation selector)
    "ℹ️": "U+2139",  // INFO (Note: U+FE0F is a variation selector)
    "⭐": "U+2B50",   // STAR
    "🔗": "U+1F517", // LINK
    "💬": "U+1F4AC", // SPEECH_BUBBLE
    "🔍": "U+1F50D", // MAGNIFYING_GLASS_TILTED_LEFT
};
