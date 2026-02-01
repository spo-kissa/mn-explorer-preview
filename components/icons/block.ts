import type { Svg } from ".";

export default function block(): Svg {

    const svg = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 16V8C20.9996 7.64927 20.9044 7.30481 20.725 7L12 2L3.275 7C3.09564 7.30481 3.00036 7.64927 3 8V16C3.00036 16.3507 3.09564 16.6952 3.275 17L12 22L20.725 17C20.9044 16.6952 20.9996 16.3507 21 16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M3.275 7L12 12L20.725 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 22V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

    return svg as Svg;
}
