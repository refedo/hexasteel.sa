/** @type {import('next').NextConfig} */
const nextConfig={
 reactStrictMode:true,poweredByHeader:false,output:"standalone",
 // Canonical host normalization when www requests reach the Next.js origin.
 // Edge/DNS TLS and HTTP->HTTPS handling must also be verified on Cloudflare/Nginx.
 async redirects(){
  return [{
   source:"/:path*",
   has:[{type:"host",value:"www.hexasteel.sa"}],
   destination:"https://hexasteel.sa/:path*",
   permanent:true
  }];
 },
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
