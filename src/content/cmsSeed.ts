/** Public fallback media; currently illustrative, not HEXA project photography. */
export const defaultHeroSlides = [
  {src:"https://images.unsplash.com/photo-1748956628042-b73331e0b479?auto=format&fit=crop&w=1500&q=84",alt:"Steel-frame structure under construction with a tower crane",title:"STRUCTURAL STEEL / SITE EXECUTION",credit:"Illustrative photograph · Jaeman Jung / Unsplash"},
  {src:"https://images.unsplash.com/photo-1649587597799-4c227640f4f8?auto=format&fit=crop&w=1500&q=84",alt:"Large pre-engineered industrial steel building during erection",title:"PRE-ENGINEERED BUILDINGS / INDUSTRIAL",credit:"Illustrative photograph · David Griffiths / Unsplash"},
  {src:"https://images.unsplash.com/photo-1781156771445-404a80d7ee7a?auto=format&fit=crop&w=1500&q=84",alt:"Industrial steel facility interior showing steel roof framing and overhead crane",title:"MANUFACTURING / INDUSTRIAL STRUCTURES",credit:"Illustrative photograph · Declan Sun / Unsplash"}
];
export const projectIllustrations = defaultHeroSlides.map(slide=>slide.src.replace("w=1500&q=84","w=1100&q=80"));
export const homeCopy = {
 heroHeadline:"ENGINEERED WITH PRECISION.",
 heroDescription:"Structural steel and pre-engineered buildings delivered with technical agility, premium quality and disciplined project execution.",
 marketPositioning:"Hexa Steel® is #1 Mid-Sized steel fabrication company in Saudi Arabia."
};
/** Only the legacy controlled image hosts are accepted as fallback; new uploads use Sanity assets. */
export function isSafePublicImage(src:string|undefined):src is string {
 return typeof src==="string" && (
  /^https:\/\/cdn\.sanity\.io\/images\/ik7morln\/production\//.test(src) ||
  /^https:\/\/images\.unsplash\.com\/photo-[a-z0-9-]+(?:\?|$)/.test(src)
 );
}
export function isIllustrativeImage(src:string|undefined):boolean {
 return typeof src==="string" && src.startsWith("https://images.unsplash.com/");
}
