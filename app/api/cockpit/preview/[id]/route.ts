import { ownerApiDenial, privateHeaders } from "@/lib/owner-access"
import { privateArtifact } from "@/lib/cockpit/store"
export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}) {
  const denied=await ownerApiDenial();if(denied)return denied
  const result=await privateArtifact((await params).id)
  const title=result?.entry.title??""
  const type=title.endsWith('.html')?'text/html':title.endsWith('.svg')?'image/svg+xml':title.endsWith('.pdf')?'application/pdf':null
  if(!result||!type)return new Response('Not found',{status:404,headers:privateHeaders})
  return new Response(new Uint8Array(result.bytes),{headers:{...privateHeaders,'Content-Type':type,'Content-Security-Policy':"sandbox; default-src 'none'; style-src 'unsafe-inline'; img-src data:; form-action 'none'; base-uri 'none'; frame-ancestors 'self'",'Referrer-Policy':'no-referrer','Content-Disposition':'inline'}})
}
