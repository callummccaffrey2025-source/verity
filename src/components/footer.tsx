export default function Footer(){
  return(<footer className="site-footer mt-16">
    <div className="mx-auto max-w-6xl px-6 py-8 text-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>© {new Date().getFullYear()} Verity</div>
      <nav className="flex gap-5"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/join-waitlist">Join</a></nav>
    </div>
  </footer>);
}
