const cache_config = {
  cacheControl: false, maxAge: 3000, 
  setHeaders: (res)=> { res.setHeader('Cache-Control','private, max-age=5')},
  lastModified: true, 
  etag: true
}

module.exports = cache_config;