import Link from "next/link";
import { DarcyArt } from "@/components/art";

export default function NotFound() {
  return (
    <main id="main" className="section shell centered">
      <DarcyArt width={100} height={90} />
      <h1 className="section-title">Darcy can’t find that page</h1>
      <Link className="button button-primary" href="/">Back home</Link>
    </main>
  );
}
