"use client";
import {NextStudio} from "next-sanity/studio";
import config from "../../../../sanity.config";

/** Sanity handles editor authentication. The public project ID is configured in sanity.config.ts. */
export default function StudioPage(){
 return <div className="hexa-studio"><NextStudio config={config}/></div>;
}
