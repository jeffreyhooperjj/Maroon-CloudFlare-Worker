export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Serve Apple App Site Association
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

    // Bot detection (iMessage / social previews)
    const ua = request.headers.get("user-agent") || "";
    const isBot =
      /Applebot|Twitterbot|facebookexternalhit|Facebot|Slackbot|Discordbot|LinkedInBot|WhatsApp|TelegramBot/i.test(
        ua
      );

    // Humans → real site
    if (!isBot) {
      return Response.redirect("https://www.datemaroon.com/", 302);
    }

    // Bots → rich preview (200 OK, no redirect)
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
