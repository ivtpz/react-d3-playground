// @ts-nocheck
import { useEffect, useRef } from "react";
import "./App.css";
import ForceGraph from "./ForceGraph";

function App() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const graph = ForceGraph(
        {
          nodes: [
            { id: "Alice", group: 2 },
            { id: "Bob", group: 1 },
            { id: "Carol", group: 1 },
            { id: "David", group: 2 },
          ],
          links: [
            { source: "Bob", target: "Alice", value: 1 },
            { source: "Carol", target: "Bob", value: 2 },
            { source: "David", target: "Alice", value: 3 },
          ],
        },
        {
          nodeId: (d) => d.id,
          nodeGroup: (d) => d.group,
          nodeTitle: (d) => `${d.id}\n${d.group}`,
          linkStrokeWidth: (l) => Math.sqrt(l.value),
          width: 600,
          height: 600,
          nodeRadius: 10,
        }
      );
      ref.current.innerHTML = "";
      ref.current.appendChild(graph);
    }
  }, []);
  return (
    <div className="App">
      <div ref={ref}></div>
    </div>
  );
}

export default App;
