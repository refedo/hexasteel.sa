import {isIllustrativeImage,isSafePublicImage} from "@/content/cmsSeed";
import {ProjectWatermark} from "@/components/ProjectWatermark";
import styles from "./ProjectImages.module.css";

type GalleryPhoto={src:string;alt?:string};
type ProjectImage={src:string;alt:string;cover:boolean;illustrative:boolean};

/** Include the CMS cover exactly once, followed by all approved, safe gallery assets. */
function getProjectImages(title:string,coverImage?:string,gallery?:readonly GalleryPhoto[]):ProjectImage[]{
 const candidates=[
  ...(coverImage?[{src:coverImage,alt:title+" — project cover image",cover:true}]:[]),
  ...(gallery||[]).map((photo,index)=>({src:photo.src,alt:photo.alt?.trim()||title+" — project image "+(index+1),cover:false}))
 ];
 const seen=new Set<string>();
 return candidates.filter(photo=>{
  if(!isSafePublicImage(photo.src)||seen.has(photo.src))return false;
  seen.add(photo.src);
  return true;
 }).map(photo=>({...photo,illustrative:isIllustrativeImage(photo.src)}));
}

export function ProjectImages({title,coverImage,gallery}:{title:string;coverImage?:string;gallery?:readonly GalleryPhoto[]}){
 const images=getProjectImages(title,coverImage,gallery);
 if(images.length===0)return null;
 return <section className={styles.section} aria-labelledby="project-gallery-title">
  <div className="shell">
   <div className={styles.heading}>
    <div><p className="eyebrow">PROJECT VISUAL REFERENCE</p><h2 id="project-gallery-title">Project image gallery<span>.</span></h2></div>
    <p className={styles.count}>{images.length} {images.length===1?"image":"images"}</p>
   </div>
   <div className={styles.grid}>
    {images.map((photo,index)=><figure key={photo.src} className={index===0?styles.featured:undefined}>
     <div className={styles.media}>
      <img src={photo.src} alt={photo.illustrative?"Illustrative image, not verified project photography":photo.alt} loading={index===0?"eager":"lazy"} decoding="async"/>
      {!photo.illustrative&&<ProjectWatermark/>}
      <span className={styles.label}>{photo.illustrative?"ILLUSTRATIVE IMAGE":photo.cover?"PROJECT COVER":"PROJECT PHOTO "+String(index+1).padStart(2,"0")}</span>
     </div>
     <figcaption>{photo.illustrative?"Illustrative industrial photography — not a verified project photograph":photo.alt}</figcaption>
    </figure>)}
   </div>
  </div>
 </section>;
}
