export default async function handler(req, res) {
  const APK_URL =
    'https://github.com/devesh-386/FitAI/releases/download/v3.1.1/FitAI-v3.1.1.apk';

  const upstream = await fetch(APK_URL, { redirect: 'follow' });

  if (!upstream.ok) {
    res.status(502).send('Failed to fetch APK');
    return;
  }

  res.setHeader('Content-Type', 'application/vnd.android.package-archive');
  res.setHeader('Content-Disposition', 'attachment; filename="FitAI-v3.1.1.apk"');

  const contentLength = upstream.headers.get('content-length');
  if (contentLength) res.setHeader('Content-Length', contentLength);

  const reader = upstream.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    res.write(Buffer.from(value));
  }
  res.end();
}
