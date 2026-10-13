import type {Metadata} from "next";
export const metadata:Metadata={title:"HEXA Content Studio",robots:{index:false,follow:false}};
export default function StudioLayout({children}:{children:React.ReactNode}){return <div className="studio-viewport">{children}</div>}
