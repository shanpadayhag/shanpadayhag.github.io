import Link from "next/link";

export default function BlogMaintenancePage() {
  return <main className="maintenance"><p>Notes are being rebuilt.</p><h1>The writing archive is under maintenance.</h1><Link href="/">Return home <span aria-hidden="true">→</span></Link></main>;
}
