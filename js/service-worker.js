self.addEventListener('install', function(event) {
  console.log('Install!');
});
self.addEventListener("activate", function(event) {
  console.log('Activate!');
});
self.addEventListener('fetch', function(event) {
  console.log('Fetch!', event.request);
});