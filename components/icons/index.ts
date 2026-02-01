import block from "./block";
import blocks from "./blocks";
import transaction from "./transaction";
import contract from "./contract";
import address from "./address";
import extrinsic from "./extrinsic";

// Icon Types
export type Svg = string;

// SvgIcon is a data URI of a SVG icon
export type SvgIcon = string;

// toDataUri converts a SVG to a data URI
export const toDataUri = (svg: Svg): SvgIcon => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;



// Block Icon
export const Block: SvgIcon = toDataUri(block());

// Blocks Icon
export const Blocks: SvgIcon = toDataUri(blocks());

// Transaction Icon
export const Transaction: SvgIcon = toDataUri(transaction());

// Contract Icon
export const Contract: SvgIcon = toDataUri(contract()) as SvgIcon;

// Address Icon
export const Address: SvgIcon = toDataUri(address()) as SvgIcon;

// Extrinsic Icon
export const Extrinsic: SvgIcon = toDataUri(extrinsic()) as SvgIcon;
