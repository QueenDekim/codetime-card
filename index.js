import http from "http";
import fetch from "node-fetch";
import { CodetimeTimeCard, CodetimeLanguagesCard, CodetimeCombinedCard } from "./src/codetime-card.js";
import { time } from "console";

const stringToBoolean = function (string) {
  switch (string.toLowerCase().trim()) {
    case "true": case "yes": case "1": return true;
    case "false": case "no": case "0": case null: return false;
    default: return Boolean(string);
  }
};

const server = http.createServer(async (req, res) => {
  const reqUrl = req.url[0] === "/" ? req.url.substring(1) : req.url;
  const searchParams = new URLSearchParams(reqUrl);

  if (!searchParams.has("userID")) {
    res.write(JSON.stringify({ error: "Missing userID" }));
    res.end();
    return;
  }
  
  const userID = searchParams.get("userID");
  const type = searchParams.get("type") || "time";
  
  const showLogo = searchParams.has("showLogo")
    ? stringToBoolean(searchParams.get("showLogo"))
    : true;

  const theme = searchParams.has("theme")
    ? searchParams.get("theme")
    : "stackoverflow-light";

  const showBorder = searchParams.has("showBorder")
    ? stringToBoolean(searchParams.get("showBorder"))
    : true;

  const showIcons = searchParams.has("showIcons")
    ? stringToBoolean(searchParams.get("showIcons"))
    : true;

  const showAnimations = searchParams.has("showAnimations")
    ? stringToBoolean(searchParams.get("showAnimations"))
    : true;

  try {
    if (type === "time") {
      // Get coding time for 7, 30 and 90 days
      const [res7, res30, res90] = await Promise.all([
        fetch(`https://api.codetime.dev/v3/public/users/${userID}/coding-history?days=7`),
        fetch(`https://api.codetime.dev/v3/public/users/${userID}/coding-history?days=30`),
        fetch(`https://api.codetime.dev/v3/public/users/${userID}/coding-history?days=90`)
      ]);

      const [data7, data30, data90] = await Promise.all([
        res7.json(),
        res30.json(),
        res90.json()
      ]);

      const result = await CodetimeTimeCard(
        data7,
        data30,
        data90,
        showLogo,
        showBorder,
        showIcons,
        showAnimations,
        theme
      );

      res.writeHead(200, { "Content-Type": "image/svg+xml" });
      res.write(result);
    } else if (type === "languages") {
      const days = searchParams.get("days") || 30;
      const top_n = searchParams.get("top_n") || 5;
      
      const response = await fetch(
        `https://api.codetime.dev/v3/public/users/${userID}/top-languages-rank?top_n=${top_n}&days=${days}`
      );
      
      const data = await response.json();
      const result = await CodetimeLanguagesCard(
        data,
        showLogo,
        showBorder,
        showIcons,
        showAnimations,
        theme
      );

      res.writeHead(200, { "Content-Type": "image/svg+xml" });
      res.write(result);
    } else if (type === "combined") {
      const days = searchParams.get("days") || 30;
      const top_n = searchParams.get("top_n") || 5;
      
      // Get data for both time and languages
      const [res7, res30, res90, langRes] = await Promise.all([
        fetch(`https://api.codetime.dev/v3/public/users/${userID}/coding-history?days=7`),
        fetch(`https://api.codetime.dev/v3/public/users/${userID}/coding-history?days=30`),
        fetch(`https://api.codetime.dev/v3/public/users/${userID}/coding-history?days=90`),
        fetch(`https://api.codetime.dev/v3/public/users/${userID}/top-languages-rank?top_n=${top_n}&days=${days}`)
      ]);

      const [data7, data30, data90, langData] = await Promise.all([
        res7.json(),
        res30.json(),
        res90.json(),
        langRes.json()
      ]);

      const result = await CodetimeCombinedCard(
        data7,
        data30,
        data90,
        langData,
        showLogo,
        showBorder,
        showIcons,
        showAnimations,
        theme,
        days
      );

      res.writeHead(200, { "Content-Type": "image/svg+xml" });
      res.write(result);
    } else {
      res.write(JSON.stringify({ error: "Invalid type parameter" }));
    }
  } catch (error) {
    console.error('Error:', error);
    res.write(JSON.stringify({ error: "Failed to fetch data" }));
  }
  
  res.end();
});

function startServer(port) {
  let isHandled = false;

  const serverInstance = server.listen(port, function() {
    if (!isHandled) {
      isHandled = true;
      console.log(`Server started at port ${port}`);
    }
  }).on('error', function(err) {
    if (!isHandled) {
      isHandled = true;
      
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying ${port + 1}`);
        serverInstance.close(() => {
          startServer(port + 1);
        });
      } else {
        console.error(err);
      }
    }
  });
}

startServer(process.env.PORT || 3000);