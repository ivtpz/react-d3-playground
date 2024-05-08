import { useEffect, useRef } from "react";
import * as React from "react";
import * as d3 from 'd3'
import { graphviz, GraphvizOptions } from 'd3-graphviz';
import "./App.css";

const defaultOptions: GraphvizOptions = {
  fit: true,
  height: 500,
  width: 500,
  zoom: false,
};

function App() {
  useEffect(() => {
    graphviz("#graph", { ...defaultOptions, zoom : true })
      .renderDot("digraph {A [id=\"idA\"]; B [id=\"idB\"] A -> B;}")
      .on("end", () => {
        d3.selectAll<SVGAElement, unknown>("#graph g.node")
          .on("click", function(event: MouseEvent) {
            event.stopPropagation();
            const nodeId = d3.select(this).attr("id");
            d3.select("#node-info").text(`Node ID: ${nodeId}`);
          });

          d3.select(document).on("click", () => {
            d3.select("#node-info").text("Node information will appear here.");
          });
      });
  }, []);
  return (
    <div className="App">
      <div id="graph"></div>
      <div id="node-info">Node information will appear here.</div>
    </div>
  );
}

export default App;
