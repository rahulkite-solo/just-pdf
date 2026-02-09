function ProgressBar({ loading }: { loading: boolean }) {
  return (
    <div style={progressContainer}>
      <div
        style={{
          ...progressFill,
          width: loading ? "80%" : "0%",
        }}
      />
    </div>
  );
}

const progressContainer = {
  width: "100%",
  height: "8px",
  background: "#eee",
  borderRadius: "5px",
  marginTop: "20px",
  overflow: "hidden",
};

const progressFill = {
  height: "100%",
  background: "#0070f3",
  transition: "width 0.5s ease",
};
