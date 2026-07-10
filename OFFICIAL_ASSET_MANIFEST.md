# SLUŽBENI ASSET MANIFEST — ORGULJARSTVO KVATERNIK

## Pravilo prioriteta

1. Originalne fotografije koje dostavi Alen.
2. Fotografije s postojeće službene stranice.
3. Neutralne licencirane fotografije samo za prazna mjesta.

Fotografija sa službene stranice nije automatski dokaz da prikazuje Alenov rad. Koristiti je kao opći vizual dok se ne potvrdi kontekst.

## Assets

```ts
export const officialAssets = {
  hero: {
    src: "https://orguljarstvo-kvaternik.hr/wp-content/uploads/2025/03/mark-foster-_TWQ7o8v4zU-unsplash-Copy.jpg",
    alt: "Orgulje u sakralnom prostoru",
    sourcePage: "https://orguljarstvo-kvaternik.hr/",
    usedOnCurrentOfficialSite: true,
    verifiedAsKvaternikProject: false,
    temporary: true,
  },

  construction: {
    src: "https://orguljarstvo-kvaternik.hr/wp-content/uploads/2025/03/pipe-organ-669589_1280-1024x678.jpg",
    alt: "Drveni sviraonik orgulja s više manuala i registrima",
    sourcePage: "https://orguljarstvo-kvaternik.hr/",
    usedOnCurrentOfficialSite: true,
    verifiedAsKvaternikProject: false,
    temporary: true,
  },

  service: {
    src: "https://orguljarstvo-kvaternik.hr/wp-content/uploads/2025/03/pipe-organ-2297819_1280-1024x768.jpg",
    alt: "Detalj metalnih orguljskih cijevi",
    sourcePage: "https://orguljarstvo-kvaternik.hr/",
    usedOnCurrentOfficialSite: true,
    verifiedAsKvaternikProject: false,
    temporary: true,
  },

  restoration: {
    src: "https://orguljarstvo-kvaternik.hr/wp-content/uploads/2025/03/denny-muller-zBRE_VEnY_E-unsplash-300x200.jpg",
    alt: "Manuali drvenog orguljskog sviraonika",
    sourcePage: "https://orguljarstvo-kvaternik.hr/",
    usedOnCurrentOfficialSite: true,
    verifiedAsKvaternikProject: false,
    temporary: true,
  },

  contactBackground: {
    src: "https://orguljarstvo-kvaternik.hr/wp-content/uploads/2025/03/josh-applegate-0FtwZMrMJAo-unsplash.jpg",
    alt: "Unutrašnjost sakralnog prostora",
    sourcePage: "https://orguljarstvo-kvaternik.hr/",
    usedOnCurrentOfficialSite: true,
    verifiedAsKvaternikProject: false,
    temporary: true,
  },
};
```

## Next.js konfiguracija

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "orguljarstvo-kvaternik.hr",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
```

## Portret Alena

Trenutačno nema potvrđenog javnog portreta.

U razvojnoj verziji koristiti komponentu koja podržava:

```ts
portrait: null
```

Kada je `portrait === null`, komponenta treba prikazati elegantan tekstualni blok s imenom, inicijalima `AK` ili neutralnim detaljem instrumenta, ali ne generiranu ili tuđu osobu.
