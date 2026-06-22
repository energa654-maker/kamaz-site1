(function () {
  const apiOrigin = window.location.port === '8780'
    ? 'http://127.0.0.1:5000'
    : '';

  window.kamazApiUrl = function kamazApiUrl(url) {
    if (typeof url !== 'string' || !url.startsWith('/api/')) {
      return url;
    }

    return `${apiOrigin}${url}`;
  };

  window.getKamazApiUrl = window.kamazApiUrl;
})();
