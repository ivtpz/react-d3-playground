import { useEffect, useRef } from "react";
import * as React from "react";
import * as d3 from 'd3'
import { graphviz, GraphvizOptions } from 'd3-graphviz';
import "./App.css";
import { StringLiteral } from "typescript";

const defaultOptions: GraphvizOptions = {
  fit: true,
  height: 500,
  width: 500,
  zoom: false,
};

interface Node {
  id : string;
  name : string;
}

interface Edge {
  source : string
  target : string
}

const nodes : Array<Node> = [
  { id : "idA", name : "A" },
  { id : "idB", name : "B" },
  { id : "idC", name : "C" },
]

const edges : Array<Edge> = [
  { source : "idA", target : "idB" },
  { source : "idC", target : "idB" },
]

function mkDot(nodes : Array<Node>, edges : Array<Edge>) : string {
  var out = "digraph {\n"
  nodes.forEach((e) => 
    out += `  ${e.id} [label=\"${e.name}\", id=\"${e.id}\"];\n`
  );
  edges.forEach((e) => 
    out += `  ${e.source} -> ${e.target};\n`
  );
  return out + "\n}"
}

function App() {
  useEffect(() => {
    graphviz("#graph", { ...defaultOptions, zoom : true })
      .renderDot(mkDot(nodes, edges))
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
