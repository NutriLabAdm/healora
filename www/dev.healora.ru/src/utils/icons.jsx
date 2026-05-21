import React from 'react';

const Svg = ({ w = 16, h = 16, viewBox = '0 0 24 24', fill = 'none', stroke = 'currentColor', sw = 2, children }) => (
  <svg viewBox={viewBox} width={w} height={h} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{children}</svg>
);

const i = {};

i.scale = <Svg w={16} h={16}><path d="M12 3v14"/><path d="M5 21h14"/><path d="M19 21l-3-3-3 3"/></Svg>;
i.ruler = <Svg w={16} h={16}><path d="M4 20V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v16"/><path d="M8 8v4"/><path d="M12 6v6"/><path d="M16 8v4"/><path d="M4 12h16"/></Svg>;
i.sleep = <Svg w={16} h={16}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></Svg>;
i.meditate = <Svg w={16} h={16}><circle cx="12" cy="5" r="3"/><path d="M12 22v-8l-4-3"/><path d="M12 14l4-3"/><path d="M10 11l-3 5"/><path d="M14 11l3 5"/></Svg>;
i.walk = <Svg w={16} h={16}><circle cx="13" cy="4" r="2"/><path d="M13 17v5"/><path d="M11 12l-3 5h5l2 5"/><path d="M8 10l-2 4"/></Svg>;
i.blood = <Svg w={16} h={16}><path d="M12 2a8 8 0 0 0-8 8c0 5 4 9 8 9"/><path d="M12 2a8 8 0 0 1 8 8c0 5-4 9-8 9"/><circle cx="12" cy="10" r="2"/></Svg>;
i.syringe = <Svg w={16} h={16}><path d="M10 3h4"/><path d="M12 3v14"/><path d="M7 12l5 5 5-5"/><path d="M5 17h14"/></Svg>;
i.heart = <Svg w={16} h={16}><path d="M19 14c1.5-1.5 2.5-4 2.5-5.5A4.5 4.5 0 0 0 12 7a4.5 4.5 0 0 0-9.5 1.5C2.5 10 3.5 12.5 5 14l7 7 7-7z"/></Svg>;
i.greenHeart = <Svg w={16} h={16}><path d="M19 14c1.5-1.5 2.5-4 2.5-5.5A4.5 4.5 0 0 0 12 7a4.5 4.5 0 0 0-9.5 1.5C2.5 10 3.5 12.5 5 14l7 7 7-7z"/><circle cx="12" cy="13" r="4" fill="#4caf50" stroke="none"/></Svg>;
i.sun = <Svg w={16} h={16}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></Svg>;
i.water = <Svg w={16} h={16}><path d="M12 2a8 8 0 0 0-8 8c0 5 4 9 8 9s8-4 8-9a8 8 0 0 0-8-8z"/><path d="M10 10l2 4 2-4"/></Svg>;
i.tape = <Svg w={16} h={16}><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="12" y2="10"/></Svg>;

i.check = <Svg w={16} h={16}><circle cx="12" cy="12" r="10"/><polyline points="9 12 11 14 15 10"/></Svg>;
i.checkSmall = <Svg w={16} h={16}><polyline points="20 6 9 17 4 12"/></Svg>;
i.upload = <Svg w={16} h={16}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></Svg>;
i.thumbsUp = <Svg w={16} h={16}><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></Svg>;
i.edit = <Svg w={16} h={16}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></Svg>;
i.chart = <Svg w={16} h={16}><line x1="4" y1="20" x2="20" y2="20"/><line x1="6" y1="16" x2="6" y2="10"/><line x1="12" y1="16" x2="12" y2="6"/><line x1="18" y1="16" x2="18" y2="2"/></Svg>;

i.target = <Svg w={16} h={16}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></Svg>;
i.clipboard = <Svg w={16} h={16}><path d="M16 3h3v18H5V3h3"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/></Svg>;
i.robot = <Svg w={16} h={16}><rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="9" cy="11" r="2"/><circle cx="15" cy="11" r="2"/><path d="M9 16h6"/><path d="M12 3v3"/></Svg>;
i.person = <Svg w={16} h={16}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></Svg>;
i.plus = <Svg w={16} h={16}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>;
i.refresh = <Svg w={16} h={16}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></Svg>;
i.save = <Svg w={16} h={16}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></Svg>;
i.archive = <Svg w={16} h={16}><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></Svg>;
i.play = <Svg w={16} h={16}><polygon points="5 3 19 12 5 21 5 3"/></Svg>;
i.stop = <Svg w={16} h={16}><rect x="4" y="4" width="16" height="16" rx="2"/></Svg>;
i.star = <Svg w={16} h={16}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Svg>;
i.starFill = <Svg w={16} h={16} fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></Svg>;
i.flag = <Svg w={16} h={16}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></Svg>;
i.hospital = <Svg w={16} h={16}><path d="M4 22V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v18"/><line x1="8" y1="22" x2="16" y2="22"/><line x1="12" y1="10" x2="12" y2="16"/><line x1="9" y1="13" x2="15" y2="13"/></Svg>;
i.leaf = <Svg w={16} h={16}><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></Svg>;
i.phone = <Svg w={16} h={16}><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></Svg>;
i.mic = <Svg w={16} h={16}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></Svg>;
i.smile = <Svg w={16} h={16}><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></Svg>;
i.camera = <Svg w={16} h={16}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></Svg>;
i.magnifier = <Svg w={16} h={16}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Svg>;
i.alarm = <Svg w={16} h={16}><circle cx="12" cy="13" r="8"/><polyline points="12 9 12 13 14 15"/><line x1="5" y1="3" x2="8" y2="6"/><line x1="19" y1="3" x2="16" y2="6"/></Svg>;
i.dna = <Svg w={16} h={16}><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4 6a8 8 0 0 1 16 0"/><path d="M4 18a8 8 0 0 0 16 0"/><path d="M5 8.4A9 9 0 0 0 5 15.6"/><path d="M19 8.4a9 9 0 0 1 0 7.2"/></Svg>;
i.question = <Svg w={16} h={16}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></Svg>;
i.bulb = <Svg w={16} h={16}><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A6 6 0 0 0 6 12c0 4 3 5 3 5h6s1-.37 1.09-1z"/></Svg>;
i.microscope = <Svg w={16} h={16}><circle cx="10" cy="10" r="7"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="6" y1="10" x2="14" y2="10"/><line x1="10" y1="6" x2="10" y2="14"/></Svg>;
i.dumbell = <Svg w={16} h={16}><path d="M6 8l-2 2v4l2 2"/><path d="M18 8l2 2v4l-2 2"/><rect x="6" y="5" width="12" height="14" rx="2"/></Svg>;
i.salad = <Svg w={16} h={16}><path d="M6 13c0 5 3 8 6 8s6-3 6-8"/><path d="M3 13h18"/><path d="M12 3v10"/><path d="M8 3l4 4 4-4"/></Svg>;
i.brain = <Svg w={16} h={16}><path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"/><path d="M9 12h6"/><path d="M9 8h6"/></Svg>;
i.warning = <Svg w={16} h={16}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></Svg>;
i.circleYellow = <Svg w={16} h={16}><circle cx="12" cy="12" r="10" fill="#ffb300" stroke="none"/></Svg>;

export default i;
