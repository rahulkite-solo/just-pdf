import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <Link href="/" style={logo}>Just PDF</Link>

      <div style={links}>
        <Link href="/jpg-to-pdf">JPG → PDF</Link>
        <Link href="/png-to-pdf">PNG → PDF</Link>
        <Link href="/merge-pdf">Merge PDF</Link>
        <Link href="/compress-pdf">Compress PDF</Link>
      </div>
    </nav>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "16px 40px",
  background: "#111",
  color: "white",
};

const logo = {
  fontSize: "22px",
  fontWeight: "bold",
  color: "white",
  textDecoration: "none",
};

const links = {
  display: "flex",
  gap: "20px",
};
