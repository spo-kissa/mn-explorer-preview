
const SECTION_CATEGORY_CONFIG = {
  "themes": {
    "light": {
      "coreSystem": "#4C3D99",
      "governance": "#2563EB",
      "federatedAuthority": "#EA580C",
      "observation": "#16A34A"
    },
    "dark": {
      "coreSystem": "#A78BFA",
      "governance": "#60A5FA",
      "federatedAuthority": "#FDBA74",
      "observation": "#4ADE80"
    }
  },
  "valueToCategory": {
    "cNightObservation": "observation",
    "council": "governance",
    "federatedAuthority": "federatedAuthority",
    "federatedAuthorityObservation": "federatedAuthority",
    "midnight": "coreSystem",
    "midnightSystem": "coreSystem",
    "sessionCommitteeManagement": "governance",
    "technicalCommittee": "governance",
    "timestamp": "coreSystem"
  }
} as const;

const SECTION_CATEGORY_DEFAULT_COLOR = {
    "light": "#6B7280", // Gray-500
    "dark": "#9CA3AF"  // Gray-500
}


export function getExtrinsicSectionCategory(section: string): string {
    return SECTION_CATEGORY_CONFIG.valueToCategory[section as keyof typeof SECTION_CATEGORY_CONFIG.valueToCategory];
}

export function getExtrinsicSectionColorByCategory(theme: "light" | "dark", category: string): string {
    return SECTION_CATEGORY_CONFIG.themes[theme][category as keyof typeof SECTION_CATEGORY_CONFIG.themes.light] || SECTION_CATEGORY_DEFAULT_COLOR[theme];
}

export function getExtrinsicSectionColor(section: string, theme: "light" | "dark"): string {
    const category = getExtrinsicSectionCategory(section);
    if (category) {
        return SECTION_CATEGORY_CONFIG.themes[theme][category as keyof typeof SECTION_CATEGORY_CONFIG.themes.light];
    }
    return SECTION_CATEGORY_DEFAULT_COLOR[theme];
}


export const EXTRINSIC_COLOR_MAP = {
  "themes": {
    "light": {
      "observationTokenOps": { "text": "#16A34A", "border": "#86EFAC" },
      "governanceLifecycle": { "text": "#2563EB", "border": "#93C5FD" },
      "governanceDecision": { "text": "#1D4ED8", "border": "#60A5FA" },
      "authorityLifecycle": { "text": "#EA580C", "border": "#FDBA74" },
      "authorityAdmin": { "text": "#C2410C", "border": "#FED7AA" },
      "transactionSubmit": { "text": "#4C3D99", "border": "#C4B5FD" },
      "transactionSubmitSystem": { "text": "#2B2447", "border": "#A78BFA" },
      "adminConfig": { "text": "#6B7280", "border": "#D1D5DB" }
    },
    "dark": {
      "observationTokenOps": { "text": "#4ADE80", "border": "#166534" },
      "governanceLifecycle": { "text": "#60A5FA", "border": "#1D4ED8" },
      "governanceDecision": { "text": "#93C5FD", "border": "#2563EB" },
      "authorityLifecycle": { "text": "#FDBA74", "border": "#9A3412" },
      "authorityAdmin": { "text": "#FFEDD5", "border": "#C2410C" },
      "transactionSubmit": { "text": "#A78BFA", "border": "#4C1D95" },
      "transactionSubmitSystem": { "text": "#C4B5FD", "border": "#5B21B6" },
      "adminConfig": { "text": "#9CA3AF", "border": "#374151" }
    }
  },
  "pairToCategory": {
    "cNightObservation.processTokens": "observationTokenOps",

    "council.close": "governanceLifecycle",
    "council.propose": "governanceDecision",
    "council.vote": "governanceDecision",

    "federatedAuthority.motionClose": "authorityLifecycle",
    "federatedAuthorityObservation.resetMembers": "authorityAdmin",

    "midnight.sendMnTransaction": "transactionSubmit",
    "midnightSystem.sendMnSystemTransaction": "transactionSubmitSystem",

    "sessionCommitteeManagement.set": "adminConfig",

    "technicalCommittee.close": "governanceLifecycle",
    "technicalCommittee.propose": "governanceDecision",
    "technicalCommittee.vote": "governanceDecision",

    "timestamp.set": "adminConfig"
  }
} as const;


export function getExtrinsicColor(theme: "light" | "dark", section: string, method: string): { text: string; border: string } {
    const pairKey = `${section}.${method}`;
    const category = EXTRINSIC_COLOR_MAP.pairToCategory[pairKey as keyof typeof EXTRINSIC_COLOR_MAP.pairToCategory];
    if (category) {
        return EXTRINSIC_COLOR_MAP.themes[theme][category as keyof typeof EXTRINSIC_COLOR_MAP.themes.light];
    }
    console.warn(`Extrinsic color not found for section=${section} method=${method}`);
    return { text: SECTION_CATEGORY_DEFAULT_COLOR[theme], border: SECTION_CATEGORY_DEFAULT_COLOR[theme] };
}
