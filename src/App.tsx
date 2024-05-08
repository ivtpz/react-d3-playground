import { useEffect, useRef } from "react";
import "./App.css";
import * as d3 from "d3";

var nodes = [
  {
    "id" : 0,
    "name" : "A"
  },
  {
    "id" : 1,
    "name" : "B"
  },
  {
    "id" : 2,
    "name" : "C"
  },
  {
    "id" : 3,
    "name" : "D"
  },
  {
    "id" : 4,
    "name" : "E"
  },
];

var edges = [
  [1,2],
  [1,3],
  [2,4],
  [3,4]
];

function App() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      console.log(ref.current);
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
