/** @type {import('next').NextConfig} */
const nextConfig={
 reactStrictMode:true,poweredByHeader:false,output:"standalone",
 async headers(){
  const noindex=[{key:"X-Robots-Tag",value:"noindex, nofollow, noarchive"}];
  return [
   {source:"/:path*",headers:[
    {key:"X-Content-Type-Options",value:"nosniff"},
    {key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},
    {key:"X-Frame-Options",value:"SAMEORIGIN"},
    {key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"},
    // Avoid includeSubDomains: OTS™ is a separate application with its own controls.
    {key:"Strict-Transport-Security",value:"max-age=15552000"}
   ]},
   {source:"/studio",headers:noindex},
   {source:"/studio/:path*",headers:noindex},
   {source:"/api/:path*",headers:noindex},
   {source:"/search",headers:noindex}
  ];
 }
};
export default nextConfig;
