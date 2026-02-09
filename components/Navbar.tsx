import Link from "next/link";
import { FaFileImage, FaCompress, FaObjectGroup } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav style={navStyle}>
      <Link href="/" style={logo}>
        📄 Just PDF
      </Link>

      <div style={links}>
        <Link href="/jpg-to-pdf" style={linkItem}>
          <FaFileImage /> JPG → PDF
        </Link>

        <Link href="/png-to-pdf" style={linkItem}>
          <FaFileImage /> PNG → PDF
        </Link>

        <Link href="/merge-pdf" style={linkItem}>
          <FaObjectGroup /> Merge
        </Link>

        <Link href="/compress-pdf" style={linkItem}>
          <FaCompress /> Compress
        </Link>
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
  alignItems: "center",
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

const linkItem = {
  color: "white",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};
