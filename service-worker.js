self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("lexique-cache").then(cache =>
      cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./app.js"
      ])
    )
  );
});
