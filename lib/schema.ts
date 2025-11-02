export function orgSchema(){
  return { '@context':'https://schema.org','@type':'Organization','name':'Spotlight on Local',
    'url': process.env.SITE_BASE_URL || 'https://example.com',
    'logo': (process.env.SITE_BASE_URL||'') + '/logo.png' }
}
export function localBusinessSchema(city:string, phone:string){
  return {'@context':'https://schema.org','@type':'LocalBusiness','name':`Spotlight on Local – ${city} Media Hub`,'telephone':phone,'areaServed':city,'url':(process.env.SITE_BASE_URL||'')+`/${city.toLowerCase()}`}
}
export function serviceSchema(serviceName:string, city:string){
  return {'@context':'https://schema.org','@type':'Service','name':`${serviceName} in ${city}`,'areaServed':city,'provider':{'@type':'Organization','name':'Spotlight on Local'}}
}
