// API utility for client
export async function submitContact(data) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchNews() {
  const res = await fetch('/api/news');
  return res.json();
}
