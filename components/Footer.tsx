export default function Footer() {
  return (
    <footer style={footer}>
      <p>© {new Date().getFullYear()} Just PDF</p>
      <p>Fast. Free. Simple PDF tools.</p>
    </footer>
  );
}

const footer = {
  marginTop: "80px",
  padding: "30px",
  textAlign: "center" as const,
  background: "#111",
  color: "white",
};
