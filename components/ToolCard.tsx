import Link from "next/link";

export default function ToolCard({ title, href }: any) {
  return (
    <Link href={href} style={card}>
      <h2>{title}</h2>
    </Link>
  );
}

const card = {
  border: "1px solid #ddd",
  padding: "40px",
  borderRadius: "12px",
  textAlign: "center" as const,
  fontSize: "20px",
  fontWeight: "bold",
  background: "white",
  cursor: "pointer",
  textDecoration: "none",
  color: "black",
};
