import ToolCard from "../components/ToolCard";

export default function Home() {
  return (
    <main style={container}>
      <h1 style={title}>All PDF Tools in One Place</h1>

      <div style={grid}>
        <ToolCard title="JPG → PDF" href="/jpg-to-pdf" />
        <ToolCard title="PNG → PDF" href="/png-to-pdf" />
        <ToolCard title="Merge PDF" href="/merge-pdf" />
        <ToolCard title="Compress PDF" href="/compress-pdf" />
      </div>
    </main>
  );
}

const container = {
  padding: "60px 20px",
  textAlign: "center" as const,
  minHeight: "80vh",
  backgroundColor: "#f5f5f5",
};

const title = {
  fontSize: "36px",
  marginBottom: "40px",
  color: "#111", 
  fontWeight: "bold",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  maxWidth: "900px",
  margin: "auto",
};
