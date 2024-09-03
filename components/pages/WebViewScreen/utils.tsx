export const dummyHTML = `<html>
<head>
<script>
window.parent.postMessage("TEST");
window.ReactNativeWebView.postMessage("Message from webView");
</script>
</head>
<body><h1>Hello from webView</h1></body>
</html>`;

export const DEFAULT_INJECTED_JS = (additionalScript?: string) => `(function() {
    ${additionalScript}
    window.addEventListener("message", (event) => {
      window.ReactNativeWebView.postMessage(event.data);
    });
})();`;
