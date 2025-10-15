export default function Home() { return null; }

export async function getServerSideProps({ res }) {
  // Redirect "/" to the static reader HTML
  res.writeHead(302, { Location: '/index.html' });
  res.end();
  return { props: {} };
}
