// One place for every icon used across the app — referenced by key so
// service data, nav, and section headers all draw from the same set.
const PATHS = {
  home: '<path d="M3 11L12 3l9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  building: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/>',
  briefcase: '<rect x="3" y="7" width="18" height="12" rx="1"/><path d="M8 7V5h8v2"/><path d="M3 12h18"/>',
  'map-pin': '<path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.3"/>',
  car: '<path d="M5 17h14l-1.5-7h-11z"/><circle cx="8" cy="19" r="1.4"/><circle cx="16" cy="19" r="1.4"/>',
  'file-text': '<path d="M6 3h9l3 3v15H6z"/><path d="M9 8h6M9 12h6M9 16h4"/>',
  receipt: '<path d="M6 3h12v18l-2-1.5L14 21l-2-1.5L10 21l-2-1.5L6 21z"/><path d="M9 8h6M9 12h6"/>',
  'hard-hat': '<path d="M12 3l8 4v5c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V7z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  shield: '<path d="M12 3l8 3.5V11c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6.5z"/><path d="M9 12l2 2 4-4"/>',
  wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 12h3"/><path d="M3 10h18"/>',
  award: '<circle cx="12" cy="8" r="5"/><path d="M9 12.5L7 21l5-3 5 3-2-8.5"/>',
  check: '<path d="M9 6h11M9 12h11M9 18h11M4.5 6l0.01 0M4.5 12l0.01 0M4.5 18l0.01 0"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  trending: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
  quote: '<path d="M7 11c0-2.5 1.5-4 4-4v2c-1.3 0-2 0.8-2 2h2v4H7z"/><path d="M15 11c0-2.5 1.5-4 4-4v2c-1.3 0-2 0.8-2 2h2v4h-4z"/>',
  chevronDown: '<path d="M6 9l6 6 6-6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/>',
  phone: '<path d="M6 3h4l1 5-2.5 2a12 12 0 0 0 5.5 5.5l2-2.5 5 1v4a2 2 0 0 1-2 2C10.5 20 4 13.5 4 6a2 2 0 0 1 2-3z"/>',
  pin: '<path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>'
};

export default function Icon({ name, size = 22 }) {
  const path = PATHS[name] || PATHS.check;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      dangerouslySetInnerHTML={{ __html: path }}
    />
  );
}
