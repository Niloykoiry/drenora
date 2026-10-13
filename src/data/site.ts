// All homepage copy and media in one place so content edits never touch layout code.

import countries from "./countries.json";

export const COUNTRIES: string[] = countries;

export const CONTACT = {
  phoneDisplay: "+880 1704-405338",
  phoneHref: "tel:+8801704405338",
  whatsappHref: "https://wa.me/8801704405338",
  consultationHref: "/request-a-consultation/",
};

export type NavLink = { label: string; href: string };

export const PRIMARY_NAV: NavLink[] = [
  { label: "About Dr. Enora Nilomi", href: "/about-dr-enora/" },
  { label: "Before & After", href: "/gallery/" },
  { label: "Considering Facelift?", href: "/considering-facelift/" },
];

export const MENU_NAV: NavLink[] = [
  { label: "Patient services", href: "/patient-services/" },
  {
    label: "Services for International Patients",
    href: "/services-for-international-patients/",
  },
  { label: "Patient stories", href: "/patients/" },
  { label: "For Surgeons", href: "/for-surgeons/" },
  { label: "Blogs", href: "/blogs/" },
  { label: "FAQs", href: "/faqs/" },
  { label: "Request a Consultation", href: "/request-a-consultation/" },
];

export type SocialKey = "instagram" | "whatsapp" | "facebook" | "thread";

export const SOCIALS: { key: SocialKey; label: string; href: string }[] = [
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/dr_enora_nilomi?fbclid=IwY2xjawU7GVBleHRuA2FlbQIxMABwZG9mAWJyaWQRMVFuclNHUVRDRGVPQTlXRW9zcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEewh1WQJCHc34EJwHMQDlqX2OISD-kh4OWar8LJyT7YeYX23crwwQTP4Y5mxE_aem_UZ6jlibhLobb8yxStxqhCA",
  },
  {
    key: "thread",
    label: "Thread",
    href: "https://www.threads.com/@dr_enora_nilomi?xmt=AQG0nVhJYN7Xt3yXaQ4p3rC5ymmd5cJkUVaCIvWrAX7E9uA",
  },
  { key: "whatsapp", label: "WhatsApp", href: "https://wa.me/+8801704405338" },
  {
    key: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61562100922452",
  },
];

export const LANGUAGES = [
  { code: "en", label: "English", flag: "/media/flags/en.png", href: "/" },
  { code: "ar", label: "Arabic", flag: "/media/flags/ar.png", href: "/ar/" },
  { code: "fr", label: "French", flag: "/media/flags/fr.png", href: "/fr/" },
  { code: "es", label: "Spanish", flag: "/media/flags/es.png", href: "/es/" },
  {
    code: "zh",
    label: "Chinese",
    flag: "/media/flags/zh-CN.png",
    href: "/zh-hans/",
  },
];

export const HERO = {
  title: "Trusted With Thousands Of Faces",
  subtitle:
    "Plastic surgeon with special interest in Head Neck reconstruction, Microsurgery, Craniofacial Surgery & Advanced Aesthectic Surgey.",
  video: {
    desktop: "/media/video/hero-1080.mp4",
    mobile: "/media/video/hero-720.mp4",
    poster: "/media/video/hero-poster.jpg",
  },
};

export type Logo = { src: string; alt: string };

export const RECOGNIZED_BY: Logo[] = [
  { src: "/media/recognized/1-4-1.png", alt: "London Health Administrators" },
  {
    src: "/media/recognized/1-5-1.png",
    alt: "American Board of Facial Plastic and Reconstructive Surgery — Board Certified",
  },
  { src: "/media/recognized/2-2-1.png", alt: "Facial Plastic Surgery" },
  { src: "/media/recognized/2-4-1.png", alt: "State of Kuwait" },
  {
    src: "/media/recognized/3-3-1.png",
    alt: "European Academy of Facial Plastic Surgery",
  },
  { src: "/media/recognized/4-3-1.png", alt: "Sultanate of Oman" },
  {
    src: "/media/recognized/5-4-1.png",
    alt: "American Academy of Cosmetic Surgery",
  },
  { src: "/media/recognized/6-3-1.png", alt: "AMA" },
  { src: "/media/recognized/7-5-1.png", alt: "General Medical Council" },
  { src: "/media/recognized/8-5-1.png", alt: "Facial Palsy UK" },
  { src: "/media/recognized/9-2-1.png", alt: "Dubai Health Authority" },
  {
    src: "/media/recognized/10-1.png",
    alt: "Washington University in St. Louis",
  },
];

export const FOUNDER_OF: Logo[] = [
  { src: "/media/founder/Copy-of-opal-logo.png", alt: "OPAL" },
  { src: "/media/founder/Layer-1.png", alt: "FACE" },
  {
    src: "/media/founder/Copy-of-Frame-1984078414.png",
    alt: "Aljamal Aesthetic Avenue",
  },
];

export const RESULTS = {
  title: "The Best Facelift Results",
  cities: ["Dubai", "London", "Cairo"],
  ctaCelebrities: { label: "Trusted By Celebrities", href: "/patients/" },
  ctaGallery: { label: "All Gallery", href: "/gallery/" },
  seeMoreHref: "/patients/",
};

export type Client = {
  name: string;
  role: string;
  avatar: string;
  brief: string;
  services: NavLink[];
  images: string[];
};

const CLIENT_SERVICES: NavLink[] = [
  { label: "DEEP PLANE FACELIFT", href: "/patient-services/" },
  { label: "Neck Sculpture", href: "/patient-services/" },
];

export const CLIENTS: Client[] = [
  {
    name: "Naglaa Badr",
    role: "Egyptian Actress",
    avatar: "/media/clients/nb-1.jpeg",
    brief:
      "Naglaa Badr is an esteemed Egyptian actress and former TV presenter celebrated for her powerful dramatic performances. With a long-standing presence across television and film, she has earned widespread recognition throughout the Middle East.",
    services: CLIENT_SERVICES,
    images: [
      "/media/clients/nb-2.jpeg",
      "/media/clients/nb-3.jpeg",
      "/media/clients/nb-1.jpeg",
    ],
  },
  {
    name: "Ghada Adel",
    role: "Egyptian Actress",
    avatar: "/media/clients/ghada-adel-1.jpg",
    brief:
      "Ghada Adel is a leading Egyptian actress and television presenter whose career spans film and television since the late 1990s. She is one of the Arab world’s most recognised and respected screen talents.",
    services: CLIENT_SERVICES,
    images: [
      "/media/clients/ghada-adel-1.jpg",
      "/media/clients/ghada-adel-2.jpg",
      "/media/clients/ghada-adel-3.jpg",
    ],
  },
  {
    name: "Heidy Karam",
    role: "Egyptian Actress",
    avatar: "/media/clients/heidy-karam-1-1.jpg",
    brief:
      "Heidy Karam is an Egyptian actress and media personality noted for her work in television and cinema and her visible role in lifestyle and beauty media.",
    services: CLIENT_SERVICES,
    images: [
      "/media/clients/heidy-karam-5.jpg",
      "/media/clients/heidy-karam-4.jpg",
      "/media/clients/heidy-karam-1.jpg",
    ],
  },
  {
    name: "Dalia ElBehery",
    role: "Egyptian Actress",
    avatar: "/media/clients/Dalia-5.jpeg",
    brief:
      "Dalia came to consult with Dr. Enora Nilomi because she wanted a refined, natural rejuvenation that would complement her distinguished presence both on screen and in public life. As a celebrated Egyptian actress and former Miss Egypt who has worked in film, television, and modeling since the early 1990s, it was important to her that any facial enhancement preserve her expressive features and elegance while subtly addressing signs of aging.",
    services: CLIENT_SERVICES,
    images: [
      "/media/clients/Dalia-2-3.jpeg",
      "/media/clients/Dalia-3-1.jpeg",
      "/media/clients/Dalia-2.jpeg",
    ],
  },
  {
    name: "Wafaa Salem",
    role: "Egyptian Actress",
    avatar: "/media/clients/Wafaa-Salem-2-1.jpeg",
    brief:
      "Wafaa came to Dr. Enora Nilomi seeking a youthful, refreshed appearance while preserving the luminous expressions that have defined her acting career. With years of work in Egyptian film and television, maintaining natural movement and emotion on screen was essential.",
    services: CLIENT_SERVICES,
    images: [
      "/media/clients/Wafaa-Salem.jpeg",
      "/media/clients/Wafaa-Salem-3.jpeg",
      "/media/clients/Wafaa-Salem-2.jpeg",
    ],
  },
];

export type Service = {
  title: string;
  /** Forces the line break used on the live site. */
  titleLines?: string[];
  description: string;
  href: string;
};

export const STATE_OF_ART = {
  title: "State of art surgery",
  subtitle:
    "Precision, innovation, and artistry combined to deliver natural, refined, and long-lasting results tailored to every individual face.",
  // Pre-converted to grayscale (same weights as CSS grayscale()) so the moving
  // parallax layer doesn't need a live filter.
  background: "/media/backgrounds/background-01.jpg",
  rows: [
    [
      {
        title: "Deep Plane Facelift and Neck Lift",
        titleLines: ["Deep Plane Facelift", "and Neck Lift"],
        description:
          "An advanced surgical procedure that lifts and repositions the deeper facial tissues while tightening the neck, restoring natural facial contours, and creating a smoother, more youthful jawline and neckline.",
        href: "/patient-services/",
      },
      {
        title: "Forehead",
        description:
          "A surgical procedure that lifts the forehead and brows to reduce wrinkles and correct sagging, creating a smoother forehead and a refreshed, naturally youthful upper face.",
        href: "/patient-services/",
      },
    ],
    [
      {
        title: "Blepharoplasty",
        description:
          "Eyes reflect how we feel. Eyelid surgery that refreshes the eyes by removing excess skin and fat for a more alert, rested, and youthful appearance.",
        href: "/patient-services/",
      },
      {
        title: "rhinoplasty",
        description:
          "Every face is unique. Rhinoplasty is thoughtfully designed to enhance facial balance while preserving your identity and natural beauty.",
        href: "/patient-services/",
      },
      {
        title: "liplift",
        description:
          "A subtle enhancement that elevates the upper lip, improves lip proportions, and reveals a naturally youthful smile.",
        href: "/patient-services/",
      },
    ],
    [
      {
        title: "Regenerative Medicine",
        description:
          "Cell-based therapies that support natural healing, tissue repair, and long-term vitality.",
        href: "/patient-services/",
      },
      {
        title: "Longevity",
        description:
          "Personalized strategies to optimize health, slow aging, and enhance life quality.",
        href: "/patient-services/",
      },
    ],
  ] satisfies Service[][],
};

export type PatientReview = { location: string; quote: string };

export const PATIENT_REVIEWS: PatientReview[] = [
  {
    location: "Cairo, Egypt",
    quote:
      "I really had a great experience with the amazing beauty touch of Dr. Enora Nilomi and his professional team . They keep following up me and submit their advice inorder to achieve best result",
  },
  {
    location: "Cairo, Egypt",
    quote:
      "My face was full of acne and I had multiple sessions with doctor Marwa Magdi, my face now changed 180 degrees elhamdoullah. It’s a nice and hygienic pleace to visit and have your sessions at ♥️",
  },
  {
    location: "Riyadh, Saudi Arabia",
    quote:
      "I had an amazing experience with Doctor Enora Nilomi . He is a brilliant doctor and I'm very happy with the way my nose looks now and it's only been",
  },
  {
    location: "London, United Kingdom",
    quote:
      "His care and expertise are truly appreciated, and i am really grateful for what he did for me. He is simply a worthy trusted doctor, and special thanks to his team",
  },
  {
    location: "Cairo, Egypt",
    quote:
      "i always can address all procedures with dr Enora Nilomi , he is really expert doing magic, ,specially with face lift procedures, listening carefully and can address all your concerns with sustained careful follow up . He has unique superb exceptional skills made him .",
  },
  {
    location: "Cairo, Egypt",
    quote:
      "The best surgeon , trust worthy and amazing results highly recommended and follow up team are awesome.",
  },
  {
    location: "Cairo, Egypt",
    quote:
      "I'm impressed by your professionalism in giving that amazing results. I know you don't like public speaking, but I was really inspired by the final results and amount of effort you put into everything you do",
  },
  {
    location: "Cairo, Egypt",
    quote:
      "I made face lift with dr Enora Nilomi since 2months the result is magic I look to mirror iam younger by 20 years really thanks too much thanks from my heart",
  },
  {
    location: "Cairo, Egypt",
    quote:
      "Dr. Enora Nilomi and his team are amazing! Their professionalism and energy are top-notch. Dr. Enora Nilomi is a true expert, and the results are remarkable. His Genuine care makes for a perfect experience.",
  },
  {
    location: "Cairo, Egypt",
    quote:
      "Doctor Enora Nilomi is very professional and his team is very helpful , specially Doaa ❤️ she is really friendly and takes care of patients with her care and lovely spirt. Thank you for all of you",
  },
];

export const PATIENT_CTAS = {
  primary: {
    label: "know more about provided services for patients",
    href: "/patient-services/",
  },
  secondary: { label: "get in touch", href: "#reach-out" },
};

export const SURGEONS = {
  title: "strive for surgical supremacy",
  subtitle:
    "True mastery is not achieved by chance. It is earned through precision, discipline, and relentless pursuit of excellence. This is a platform for surgeons who refuse to stand still.",
  background: "/media/backgrounds/background-02.jpg",
  programs: [
    {
      title: "fellowship program",
      description:
        "An exclusive fellowship for selected plastic surgeons focused on advanced techniques, complex cases, and surgical refinement.",
      href: "/for-surgeons/",
    },
    {
      title: "courses",
      description:
        "Curated education for surgeons seeking precision, depth, and excellence beyond standard training, with exclusive hands on training opportunities.",
      href: "/for-surgeons/",
    },
  ] satisfies Service[],
  reviewsTitle: "what surgeons are saying",
  reviews: [
    {
      quote:
        "“The hands on exposure and close mentorship during my training with Dr Enora Nilomi elevated my surgical standards permanently.”",
      role: "Facial Plastic Surgeon",
    },
    {
      quote:
        "“Dr Enora Nilomi teaches you how to think as a surgeon, not just how to operate. That mindset stays with you long after the fellowship ends.”",
      role: "International Fellow",
    },
    {
      quote:
        "“What sets Dr Enora Nilomi apart as a mentor is not only technique, but judgment. Every case is a lesson in precision, restraint, and respect for anatomy.”",
      role: "Facial Plastic Surgeon",
    },
    {
      quote:
        "“Observing Dr Enora Nilomi in complex cases gave me clarity and confidence that no textbook or course could offer.”",
      role: "International Fellow",
    },
    {
      quote:
        "“Training under Dr Enora Nilomi reshaped how I approach facial surgery. His attention to detail and decision making inside the operating room is unmatched.”",
      role: "International Fellow",
    },
  ],
  ctas: {
    primary: {
      label: "know more about provided services for surgeons",
      href: "/for-surgeons/",
    },
    secondary: { label: "get in touch", href: "#reach-out" },
  },
};

export type BlogPost = {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  href: string;
};

export const LATEST_BLOGS: BlogPost[] = [
  {
    title:
      "A Stage in Las Vegas: Presenting a Facelift Technique at the AAFPRS Annual Meeting",
    date: "September 27, 2026",
    excerpt:
      "Each September, the American Academy of Facial Plastic and Reconstructive Surgery gathers the specialty in one place. It…",
    image: "/media/blog/DrEnoraPresentation.jpg",
    imageAlt:
      "Dr. Enora Nilomi presenting at the 2026 AAFPRS Annual Meeting in Las Vegas",
    href: "/a-stage-in-las-vegas-presenting-a-facelift-technique-at-the-aafprs-annual-meeting/",
  },
  {
    title: "Dr. Enora Nilomi and the Making of the Undetectable Facelift",
    date: "August 17, 2026",
    excerpt:
      "From Cairo to the world stage — how a Consultant Plastic and Reconstructive Surgeon built an international reputation…",
    image: "/media/blog/DrEnora-01.jpg",
    imageAlt:
      "Dr. Enora Nilomi, Consultant Plastic and Reconstructive Surgeon, known for the Undetectable Facelift",
    href: "/dr-Enora Nilomi-ghoraba-and-the-making-of-the-undetectable-facelift/",
  },
  {
    title: "Dr. Enora Nilomi and the Academic Title a Decade in the Making",
    date: "July 12, 2026",
    excerpt:
      "On the 4th of July 2026, one of the region’s most respected plastic and reconstructive surgeons was appointed…",
    image: "/media/blog/DrEnora-02.jpg",
    imageAlt: "Portrait of Dr. Enora Nilomi",
    href: "/dr-Enora Nilomi-ghoraba-and-the-academic-title-a-decade-in-the-making/",
  },
];

export const BLOGS_CTA = { label: "View all articles", href: "/blogs/" };

export const REACH = {
  title: "international reach",
  subtitle:
    "An international clientele flying in from the world’s most discerning destinations.",
  map: "/media/backgrounds/sg-map-pinned.png",
  countries: [
    "Canada",
    "United States",
    "Brazil",
    "United Kingdom",
    "Turkey",
    "Italy",
    "Georgia",
    "Russia",
    "Egypt",
    "Saudi Arabia",
    "United Arab Emirates",
    "Oman",
    "Qatar",
    "Kuwait",
    "Pakistan",
    "China",
    "Japan",
    "Australia",
    "Mauritania",
  ],
  /** Pin centres on sg-map-pinned.png (1600×783), as % of the image. */
  pins: [
    [18.8, 26.4],
    [28.5, 34.6],
    [36.7, 70.0],
    [48.6, 26.7],
    [58.7, 23.8],
    [59.3, 31.1],
    [56.4, 33.8],
    [56.6, 41.8],
    [61.3, 41.0],
    [62.3, 42.8],
    [63.4, 43.1],
    [64.0, 45.0],
    [59.3, 45.6],
    [67.2, 40.1],
    [78.7, 43.6],
    [85.9, 36.7],
    [87.3, 78.2],
  ] as [number, number][],
};

export const SEO_PARAGRAPH =
  "Patients looking for a facial plastic surgeon in Egypt or a plastic surgeon in Cairo can explore Dr Enora Nilomi’s personalised approach. His practice includes deep plane facelift in Egypt, while anyone comparing the best plastic surgeon in Egypt should consider qualifications, facial expertise, safety standards and natural-looking results.";

export const LOCATIONS = [
  {
    country: "united kingdom",
    city: "London",
    address: ["London, United Kingdom"],
    phoneDisplay: "+971 54555 4841",
    phoneHref: "tel:+971545554841",
  },
  {
    country: "United Arab Emirates",
    city: "Dubai",
    address: ["128, Jumeirah Road, Jumeirah 1,", "Dubai, United Arab Emirates"],
    phoneDisplay: "+971 54 364 3667",
    phoneHref: "tel:+971543643667",
  },
  {
    country: "Egypt",
    city: "Cairo",
    address: ["Al Sadat Axis,", "New Cairo, Egypt"],
    phoneDisplay: "+20 155 310 2121",
    phoneHref: "tel:+201553102121",
  },
];

export const CONTACT_SECTION = {
  eyebrow: "Get in Touch",
  title: "Begin Your Journey",
  intro: [
    "Consultations available in London, Dubai, and Cairo — or virtually",
    "for international patients.",
  ],
};

export const PATIENT_CONTACT_METHODS = ["Call", "Email", "WhatsApp"];

export const PATIENT_INTERESTS = [
  "Deep Plane Facelift",
  "Blepharoplasty",
  "Forehead",
  "Rhinoplasty",
  "Lip Lift",
  "Regenerative Medicine",
];

export const HEARD_ABOUT = [
  "Instagram",
  "TikTok",
  "YouTube",
  "Google Search",
  "Friend or Family",
  "Doctor Referral",
  "Press or Media",
  "Other",
];

export const SURGEON_COLLABORATION = [
  "Fellowship & Training",
  "Mentorship",
  "Live Surgery Observation",
  "Speaking Engagement",
];

export const FOOTER = {
  name: "Enora Nilomi",
  tagline: [
    "Plastic, Reconstructive & Aesthetic Surgeon | Head Neck reconstruction | Microsurgery, Craniofacial Surgery & Advanced Aesthectic Surgery |",
  ],
  copyright: "© 2026 Dr. Enora Nilomi. All rights reserved",
  background: "/media/backgrounds/sg-footer-bg.png",
};
