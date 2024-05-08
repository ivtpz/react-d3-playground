import { useEffect, useRef } from "react";
import "./App.css";
import * as d3 from "d3";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      d3.select(ref.current).selectAll("svg").remove();
      d3.select(ref.current)
        .append("svg")
        .attr("width", 800)
        .attr("height", 600)
        .append("circle")
        .attr("cx", 150)
        .attr("cy", 70)
        .attr("r", 50)
        .style("fill", "red");
    }
  }, []);
  return (
    <div className="App">
      <div ref={ref}></div>
    </div>
  );
}

export default App;
