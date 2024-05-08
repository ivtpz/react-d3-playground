import { useEffect } from "react";
import * as d3 from 'd3'
import { graphviz, GraphvizOptions } from 'd3-graphviz';
import "./App.css";

const defaultOptions: GraphvizOptions = {
  fit: true,
  height: 500,
  width: 500,
  zoom: false,
};

interface Node {
  id : string;
  name : string;
  type : string;
}

interface Edge {
  source : string
  target : string
}

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

function Graph(nodes: Array<Node>, edges : Array<Edge>) {
  const nodeMap = new Map(nodes.map(node => [node.id, node]))

  useEffect(() => {
    graphviz("#graph", { ...defaultOptions, zoom : true })
      .renderDot(mkDot(nodes, edges))
      .on("end", () => {
        d3.selectAll<SVGAElement, unknown>("#graph g.node")
          .on("click", function(event: MouseEvent) {
            event.stopPropagation();
            const nodeId = d3.select(this).attr("id");
            const node = nodeMap.get(nodeId)
            if (node) {
              d3.select("#node-info").text(`Node Type: ${node.type}`);
            };
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

const nodes : Array<Node> = [
  { id : "idA", name : "A", type : "tpA" },
  { id : "idB", name : "B", type : "tpB" },
  { id : "idC", name : "C", type : "tpC" },
]

const edges : Array<Edge> = [
  { source : "idA", target : "idB" },
  { source : "idC", target : "idB" },
]

function App() {
  return Graph(nodes, edges);
}

export default App;
