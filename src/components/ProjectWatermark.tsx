import styles from "./ProjectWatermark.module.css";

/** The existing typographic HEXA STEEL® identity, matching the website header. */
export function ProjectWatermark() {
 return <span className={styles.watermark} aria-hidden="true"><span className={styles.wordmark}>HEXA STEEL<sup>®</sup></span></span>;
}
