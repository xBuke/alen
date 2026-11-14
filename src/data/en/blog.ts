import type { BlogPost } from "@/data/blog";
import type { ImageAsset } from "@/types";

const img = (
  src: string,
  alt: string,
  width: number,
  height: number,
): ImageAsset => ({
  src,
  alt,
  width,
  height,
  status: "verified-original",
  temporary: false,
});

const ref = "/images/orguljarstvo/reference";
const pp = "/images/orguljarstvo/prije-poslije";

/** `slug` je hrvatski ključ članka; engleski URL određuje blogSlugMap. */
export const blogPostsEn: BlogPost[] = [
  {
    slug: "vjetroorgulje-na-trovru",
    title: "The wind organ on Trovro: an instrument played by the wind",
    excerpt:
      "On a hill above Rogotin, near Ploče, stands the world's first wind organ. It is played by the bura, the jugo and the maestral, and its pipes were made in our workshop.",
    date: "2026-11-13",
    category: "Projects",
    readingMinutes: 5,
    featured: true,
    cover: img(
      "/images/orguljarstvo/galerija/knezija-zagreb/17-img-1133.webp",
      "Close-up of large metal pipes",
      2400,
      1600,
    ),
    blocks: [
      {
        type: "p",
        text: "In more than two decades of working on organs, almost every job has had the same frame: a church, a choir loft, an instrument and an organist. Then a call came from the Neretva valley. We were asked to make pipes for an organ that would stand in no church and would be played not by a person, but by the wind.",
      },
      { type: "h2", text: "The idea of Željko Škorić" },
      {
        type: "p",
        text: "The wind organ was conceived by Željko Škorić, a civil engineer from Ploče. He carried the idea for years. About ten years passed from the first concept to the moment the organ first sounded, and the local portal Rogotin.hr has even kept an old photograph of him climbing Trovro, long before any construction, to check whether anything could be built there at all.",
      },
      {
        type: "p",
        text: "In 2017 the project was submitted under a county programme for promoting the sustainable development of the natural heritage of the Neretva valley, financed largely with European funds. The Dubrovnik-Neretva County was the lead partner and many people were involved alongside the Town of Ploče. Without the persistence of the man who devised it all, there would have been nothing.",
      },
      { type: "h2", text: "Where it stands" },
      {
        type: "p",
        text: "Trovro is a hill 114 metres above Rogotin, a small place between Ploče and Metković. From the top you can see the mouth of the Neretva, the delta, the surrounding hills and the Pelješac peninsula. A stone-paved path about 900 metres long leads up, and a viewpoint and a dry-stone plateau have been built alongside the organ.",
      },
      { type: "h2", text: "How it is built" },
      {
        type: "list",
        items: [
          "Three concrete structures, each 15.5 metres long, face three winds: the bura, the jugo and the maestral.",
          "Each holds seven pipes, 21 in total.",
          "The pipes are made of 316 stainless steel, which withstands salt and the weather by the sea.",
          "The pipes are closed (stopped) and tuned so that the seven notes together form a pleasant harmony rather than random noise.",
          "Dampers limit the airflow so that the organ does not howl in strong wind.",
        ],
      },
      {
        type: "p",
        text: "The concrete work was carried out by the Dubrovnik company Trag, and the position was chosen using wind data for the site. The musical part, the pipes, was made in our workshop near Koprivnica. It took about half a year, and in April 2020 we delivered and installed them on site. The Slovenian organ builder Škrabl also took part in the project.",
      },
      { type: "h2", text: "Why it is different from a church organ" },
      {
        type: "p",
        text: "The principle is the same as for any pipe: the longer it is, the deeper the note, and the shorter it is, the higher. Everything else is different. In a church the bellows provide a calm, steady air pressure, so a pipe speaks the same way every time. On the hill the pressure is set by the wind, which changes from second to second. So nothing here could be copied from existing instruments. We had never done work like this before and we put into it everything we know about pipes.",
      },
      {
        type: "p",
        text: "According to the HRT broadcast report, the organ already sounds when the wind blows at about 2.7 metres per second. Because the direction and strength of the wind are constantly changing, the music never repeats.",
      },
      { type: "h2", text: "One of a kind in the world" },
      {
        type: "p",
        text: "The inspiration was the Sea Organ in Zadar, played by the sea. Here the wind plays, and from three directions. The wind organ on Trovro is the first and only of its kind in the world and has also been featured in international television exchange. It is a project we are especially proud of, and we are glad that our signature is on it.",
      },
      {
        type: "p",
        text: "If your travels take you to the Neretva valley, climb Trovro. Best when the wind is blowing.",
      },
    ],
    sources: [
      {
        label: "Rogotin.hr: The wind organ on Trovro, how it began (in Croatian)",
        url: "https://www.rogotin.hr/2021/04/01/vjetroorgulje-na-trovru-ovako-je-pocelo",
      },
      {
        label: "Rogotin.hr: The first pipe is being installed in the Rogotin wind organ (in Croatian)",
        url: "https://www.rogotin.hr/2020/04/06/ugraduje-se-prva-tuba-u-vjetro-orgulje-u-rogotinu/",
      },
      {
        label: "Rogotin.hr: Construction of the wind organ near Ploče nears completion, HTV report (in Croatian)",
        url: "https://www.rogotin.hr/2020/04/21/pri-kraju-izgradnja-vjetroorgulja-kraj-ploca-prilog-htv/",
      },
      {
        label: "Punkufer: A unique attraction when the wind plays over the Neretva (in Croatian)",
        url: "https://punkufer.dnevnik.hr/clanak/putovanja/vjetrorgulje-u-dolini-neretve---960543.html",
      },
      {
        label: "Croatia Week: Unique wind organ above Rogotin nears completion",
        url: "https://www.croatiaweek.com/video-unique-wind-organ-above-rogotin-nears-completion/",
      },
    ],
  },
  {
    slug: "kako-rade-orgulje",
    title: "How do organs actually work?",
    excerpt:
      "Thousands of pipes, a single bellows and the mechanics that connect it all to the organist's fingers. A short guide to the inside of the king of instruments.",
    date: "2026-11-06",
    category: "About organs",
    readingMinutes: 5,
    cover: img(
      `${ref}/bistra.webp`,
      "Organ in a painted church choir loft",
      1200,
      1800,
    ),
    blocks: [
      {
        type: "p",
        text: "When you stand in a church and look towards the choir loft, you see only the facade: a row of shining pipes in a decorated case. Behind it hides an instrument that has several hundred pipes even in a small parish church, and several thousand in cathedrals. Here is what happens from the moment the organist presses a key.",
      },
      { type: "h2", text: "Air: blower, bellows and wind trunks" },
      {
        type: "p",
        text: "The organ is a wind instrument. In the past the air was pumped by an assistant, the calcant, using feet or hands. Today a quiet electric blower does it. Its air enters the bellows, which has a single task: to keep the pressure steady. If the pressure wavers, so does the tone. From the bellows the air travels through wooden trunks to the wind chests.",
      },
      {
        type: "image",
        image: img(
          `${pp}/mjeh-nakon-restauracije.webp`,
          "Restored organ bellows in the workshop",
          1350,
          1800,
        ),
        caption: "Bellows after restoration in our workshop.",
      },
      { type: "h2", text: "The wind chest: the heart of the instrument" },
      {
        type: "p",
        text: "The wind chest is a wooden box on which the pipes stand. It contains valves that decide which pipe gets air. One system selects the note, that is the key, and another the stop, that is a row of pipes with the same tone colour. A pipe speaks only when both are open.",
      },
      { type: "h2", text: "Pipes: flue and reed" },
      {
        type: "list",
        items: [
          "Flue pipes work like a recorder. Air strikes the edge of the lip and sets the column of air in the pipe vibrating. The great majority of pipes in an organ are of this kind.",
          "Reed pipes have a vibrating metal tongue, similar to a clarinet. They give penetrating colours like the trumpet or oboe.",
          "Pipes are made of a tin and lead alloy or of wood. The material, width and shape determine the tone colour, and the length the pitch.",
        ],
      },
      {
        type: "p",
        text: "Markings on the stops, such as 8′ or 4′, give the length of the lowest pipe in feet. An 8′ stop sounds as written in the music, a 4′ stop an octave higher, and a 16′ stop an octave lower.",
      },
      {
        type: "image",
        image: img(
          `${ref}/ploce-registri.webp`,
          "Stop knobs on an organ console",
          1200,
          1800,
        ),
        caption: "Stop knobs: each one brings on a row of pipes.",
      },
      { type: "h2", text: "The console and the action" },
      {
        type: "p",
        text: "The console is the organist's workplace: one or more manuals for the hands, a pedalboard for the feet and the stop knobs. The link between the key and the valve is called the action. It can be mechanical, pneumatic or electric, and we write about the differences in a separate article.",
      },
      { type: "h2", text: "Why every organ is different" },
      {
        type: "p",
        text: "Organs are not mass-produced. They are built for a particular space, according to its size and acoustics. The last and most delicate step is voicing: each pipe is adjusted individually until it sounds just right in that very church. That is why the same instrument in a different space would never sound the same.",
      },
    ],
  },
  {
    slug: "restauracija-orgulja-prije-i-poslije",
    title: "Organ restoration: what is actually done, and what it looks like before and after",
    excerpt:
      "An old bellows that leaks, pipes full of dust, woodworm in the timber. Using our own examples, we show what restoration means in practice.",
    date: "2026-10-30",
    category: "Restoration",
    readingMinutes: 5,
    cover: img(
      `${pp}/fonicki-fundus-poslije-popravka.webp`,
      "Organ pipes after repair",
      1800,
      1350,
    ),
    blocks: [
      {
        type: "p",
        text: "Organs are built to last for centuries, but not without help. The leather on the bellows dries out and cracks over the years, dust settles into the pipes, woodworm attacks the timber, and in places someone before us repaired things as best they knew how. Restoration means giving the instrument back what it had, not turning it into something else.",
      },
      { type: "h2", text: "Inspection first, tools later" },
      {
        type: "p",
        text: "Every job begins with an inspection. We list the stops, check the bellows, wind chests, action and pipes, and look for woodworm and traces of damp. Only when we know what is original and what was added later can we propose the work. For organs that are protected cultural heritage, the work is agreed with the responsible conservators.",
      },
      { type: "h2", text: "The bellows" },
      {
        type: "p",
        text: "The bellows are the lungs of the organ. When the leather gives way, air escapes, the blower runs without stopping, and the tone wavers. We take the bellows apart, clean the wood, replace the leather and close them up again.",
      },
      { type: "beforeAfter", pairId: "mijeh" },
      { type: "h2", text: "The pipes" },
      {
        type: "p",
        text: "The pipework, that is all the pipes in the instrument, is removed row by row. Each pipe is cleaned, straightened and soldered where needed. The photographs show the difference between the condition we found and the pipes returned to the wind chest after repair.",
      },
      { type: "beforeAfter", pairId: "fundus" },
      {
        type: "p",
        text: "Wooden pipes that woodworm has damaged too badly cannot be saved. In that case we make new ones to the measurements of the old, from the same kind of wood, so that you cannot hear in the sound where the old ends and the new begins.",
      },
      { type: "beforeAfter", pairId: "svirale" },
      { type: "h2", text: "Voicing and tuning at the end" },
      {
        type: "p",
        text: "When everything is back in place, there follows the work that cannot be seen but can be heard. We voice and tune every pipe again in the space of the church. Only then is the restoration complete.",
      },
      { type: "h2", text: "How long does it take?" },
      {
        type: "p",
        text: "It depends on the size of the instrument and the condition we find it in. A smaller job can be finished in a few weeks, while a thorough restoration of a larger organ takes months. We can only give an exact estimate after an inspection.",
      },
    ],
  },
  {
    slug: "mehanicka-pneumatska-elektricna-traktura",
    title: "Mechanical, pneumatic or electric action: what is the difference?",
    excerpt:
      "The action is the link between the key and the pipe. It determines how the organ responds under the fingers, how reliable it is and how it is maintained.",
    date: "2026-10-23",
    category: "About organs",
    readingMinutes: 4,
    cover: img(
      "/images/orguljarstvo/galerija/knezija-zagreb/11-img-1355.webp",
      "Electromagnets of the action inside an organ",
      2400,
      1600,
    ),
    blocks: [
      {
        type: "p",
        text: "When the organist presses a key, somewhere in the instrument, sometimes ten metres away, a valve beneath the right pipe has to open. The system that carries that movement is called the action. There are three basic kinds.",
      },
      { type: "h2", text: "Mechanical action" },
      {
        type: "p",
        text: "The oldest and most direct system. The key is physically connected to the valve by thin wooden strips (trackers), squares and rollers. Under the finger the organist feels the moment the valve opens and can influence how the pipe speaks. A well-made mechanism lasts for centuries and can be repaired with ordinary carpentry tools. That is why we build new organs precisely with the classical mechanical system.",
      },
      { type: "h2", text: "Pneumatic action" },
      {
        type: "p",
        text: "At the end of the 19th century, thin lead tubes replaced the mechanics. Pressing a key sends a puff of air which, at the other end, moves a small pneumatic motor and opens the valve. The keys are light and the console can be placed further from the pipes. The drawbacks are a delay in the tone and a large number of leather parts that age. Many organs in our churches from the late 19th and early 20th century have exactly this kind of system.",
      },
      { type: "h2", text: "Electric and electromagnetic action" },
      {
        type: "p",
        text: "Here the key closes an electrical contact and an electromagnet opens the valve. There is no delay caused by distance, so the console can stand anywhere in the church. A modern digital version carries the signal over a single cable and allows combinations of stops to be stored.",
      },
      {
        type: "image",
        image: img(
          `${ref}/ploce-elektromagneti.webp`,
          "Electromagnets that open the valves in an organ",
          1350,
          1800,
        ),
        caption: "Electromagnets and control electronics inside an organ.",
      },
      { type: "h2", text: "Which is better?" },
      {
        type: "list",
        items: [
          "For new organs of small and medium size, mechanical action is the most durable solution.",
          "Historic pneumatic organs are generally worth restoring in their original system.",
          "Digital electromagnetic action is a good choice when the old system is beyond repair, when the console has to be separate from the organ or when the instrument is being extended.",
        ],
      },
      {
        type: "p",
        text: "We install digital electromagnetic action in both new and existing organs. Which solution is right for your instrument is best assessed on site.",
      },
    ],
  },
  {
    slug: "odrzavanje-orgulja-savjeti-za-zupe",
    title: "How to look after an organ: seven tips for parishes",
    excerpt:
      "Most serious faults in organs are caused not by playing, but by heating, damp, dust and years without an inspection. Here is what to watch for.",
    date: "2026-10-16",
    category: "Maintenance",
    readingMinutes: 4,
    cover: img(
      `${ref}/sigetec.webp`,
      "Neo-Gothic organ case in the choir loft",
      1800,
      1200,
    ),
    blocks: [
      {
        type: "p",
        text: "The organ is the most expensive and most complex object in most churches, and we often remember it exists only when it falls silent just before Christmas. With a little attention through the year, there can be far fewer major repairs.",
      },
      { type: "h2", text: "1. Heat slowly" },
      {
        type: "p",
        text: "Sudden heating of a cold church dries out the air, so wood cracks and wind chests start to leak. If the church is heated, let the temperature rise gradually and do not let warm air blow directly towards the organ.",
      },
      { type: "h2", text: "2. Watch the humidity" },
      {
        type: "p",
        text: "Wood and leather prefer a moderate and steady humidity, roughly between 50 and 70 percent. Air that is too dry brings cracks, and air that is too damp brings mould and corrosion. A simple hygrometer in the choir loft costs little and tells you a lot.",
      },
      { type: "h2", text: "3. Play regularly" },
      {
        type: "p",
        text: "Organs that are not used deteriorate faster than those that are played. Regular playing keeps the mechanics moving and airs the pipes. Occasionally the rarely used stops should be drawn too.",
      },
      { type: "h2", text: "4. Work in the church? Protect the organ first" },
      {
        type: "p",
        text: "Painting, sanding and plastering are the biggest danger for an organ. Fine dust gets into the pipes and valves and can later be removed only by taking the instrument apart. Before any work, the organ should be properly covered by an expert, and you are welcome to call us for advice.",
      },
      { type: "h2", text: "5. Woodworm and rodents" },
      {
        type: "p",
        text: "Fine wood dust under the case or the pipes is a sign of woodworm. Mice, meanwhile, gladly gnaw leather and felt. The earlier it is noticed, the smaller the repair.",
      },
      { type: "h2", text: "6. Do not repair it yourself" },
      {
        type: "p",
        text: "A pipe that does not speak or a note that will not stop is often a small matter, but bending pipes, sticky tape and oil on the mechanics regularly do more damage than the fault itself. Write down which note and which stop cause the problem and tell the organ builder.",
      },
      { type: "h2", text: "7. Regular inspection and tuning" },
      {
        type: "p",
        text: "One inspection with tuning a year is enough for most instruments. Reed stops, which are more sensitive to temperature, sometimes need tuning more often. With regular inspections, small problems are solved before they become expensive.",
      },
      {
        type: "p",
        text: "Have a question about your organ? Send us a message with a few photographs and a short description, and we will tell you what would be good to do.",
      },
    ],
  },
];

export function getBlogPostsEn(): BlogPost[] {
  return [...blogPostsEn].sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPostBySlugEn(slug: string): BlogPost | undefined {
  return blogPostsEn.find((post) => post.slug === slug);
}
