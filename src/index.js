export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Apple App Site Association
    if (url.pathname === "/.well-known/apple-app-site-association") {
      const aasa = {
        applinks: {
          apps: [],
          details: [
            {
              appIDs: ["MT47FXLG57.com.lovemaroon.maroon"],
              paths: ["*"],
              components: [{ "/": "/*" }],
            },
          ],
        },
        webcredentials: {
          apps: ["MT47FXLG57.com.lovemaroon.maroon"],
        },
      };

      return new Response(JSON.stringify(aasa), {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "public, max-age=300",
        },
      });
    }

    // Rich preview page for EVERY path (including /blah)
    const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Sent you a possible match on Maroon</title>

  <meta property="og:title" content="A friend thought you would connect with this profile" />
  <meta property="og:description" content="Open Date Maroon to view the match." />
  <meta property="og:image" content="https://links.datemaroon.com/questions.png" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${url.href}" />

  <meta name="twitter:card" content="summary_large_image" />

  <!-- Humans get redirected; bots still see OG tags -->
  <script>
    setTimeout(() => {
      window.location.replace("https://www.datemaroon.com/");
    }, 250);
  </script>
</head>
<body></body>
</html>`;

    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=300",
      },
    });
  },
};
