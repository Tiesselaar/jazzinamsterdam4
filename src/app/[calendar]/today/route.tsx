export async function GET(
  req: Request,
  props: { params: Promise<{ calendar: string }> }
) {
  const params = await props.params;
  const { calendar } = params;
  const imageURL = `https://jazzinamsterdam4.vercel.app/${calendar}/today/post/jpg/${new Date().toISOString()}`;

  return fetch(imageURL, { cache: 'no-store' })
    .then(response => response.blob())
    .then(blob => new Response(blob,
      {
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Length': String(blob.size)
        }
      })
    )
}
