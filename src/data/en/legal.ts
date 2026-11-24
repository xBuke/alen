export const privacyPolicyEn = {
  metadata: {
    title: "Privacy policy",
    description:
      "Information about the processing of personal data through the website and contact form of Orguljarstvo Kvaternik.",
    canonical: "/pravila-privatnosti",
  },
  lastUpdated: "10 July 2026",
  breadcrumbLabel: "Privacy policy",
  sections: [
    { id: "data-controller", title: "Data controller" },
    {
      id: "data-collected",
      title: "What data we collect",
      intro:
        "When you send us an inquiry through the contact form or via WhatsApp, we receive the following data:",
      bullets: [
        "full name",
        "e-mail and/or phone",
        "type of inquiry",
        "location of the instrument, if entered",
        "content of the message",
      ],
    },
    {
      id: "purpose",
      title: "Purpose of processing",
      intro: "Personal data is processed in order to:",
      bullets: [
        "respond to the inquiry you sent",
        "carry out initial business communication",
        "assess the type of work requested",
      ],
    },
    {
      id: "legal-basis",
      title: "Legal basis",
      content: [
        "Data from your inquiry is processed in order to respond to it and to take steps at your request before a possible business relationship is entered into.",
      ],
    },
    {
      id: "recipients",
      title: "Recipients and processors",
      intro: "Your data may be accessed or processed by:",
      bullets: [
        "authorised persons at Orguljarstvo Kvaternik",
        "the website hosting provider",
        "Web3Forms, the technical provider that delivers messages from the contact form to our e-mail",
        "the e-mail provider (Google, Gmail) and WhatsApp (Meta), if you send your inquiry via WhatsApp",
        "other technical providers only where needed for the operation and security of the site",
      ],
    },
    {
      id: "transfers",
      title: "Transfers outside the EEA",
      content: [
        "Some technical providers may process data outside the European Economic Area. In such cases an appropriate legal safeguard must be in place, such as standard contractual clauses or another valid mechanism.",
      ],
    },
    {
      id: "retention",
      title: "Retention period",
      content: [
        "Data from inquiries is kept for as long as necessary to respond, continue business communication, protect legal interests and meet possible legal obligations. When the data is no longer needed for those purposes, it is deleted or its processing is restricted.",
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      intro: "Where applicable, you have the following rights:",
      bullets: [
        "the right of access",
        "the right to rectification",
        "the right to erasure",
        "the right to restrict processing",
        "the right to object",
        "the right to data portability where the conditions are met",
        "the right to lodge a complaint with the Croatian Personal Data Protection Agency (AZOP)",
      ],
      outro:
        "To exercise your rights you can contact us at alen.kvaternik@gmail.com.",
    },
    {
      id: "automated-decisions",
      title: "Automated decision-making",
      content: [
        "Data sent through the contact form is not used for automated decision-making or profiling.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies and analytics",
      content: [
        "The website currently does not use marketing or analytics cookies set by Orguljarstvo Kvaternik itself. If analytics or other optional technologies are introduced in the future, this policy and the consent mechanism will be updated accordingly.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      content: [
        "This privacy policy may be updated from time to time to reflect actual data processing and changes to the website.",
      ],
    },
  ],
} as const;

export const imprintEn = {
  metadata: {
    title: "Imprint",
    description:
      "Business and contact details of ORGULJARSTVO KVATERNIK d.o.o.",
    canonical: "/impressum",
  },
  breadcrumbLabel: "Imprint",
  fields: [
    { label: "Legal name", value: "ORGULJARSTVO KVATERNIK d.o.o." },
    { label: "Registered office", value: "Rudarska ulica 1, 48000 Draganovec, Croatia" },
    { label: "OIB (tax ID)", value: "76874004422" },
    { label: "Phone", value: "098 777 988", href: "tel:+38598777988" },
    {
      label: "E-mail",
      value: "alen.kvaternik@gmail.com",
      href: "mailto:alen.kvaternik@gmail.com",
    },
    {
      label: "Web",
      value: "orguljarstvo-kvaternik.hr",
      href: "https://orguljarstvo-kvaternik.hr",
    },
  ],
} as const;
