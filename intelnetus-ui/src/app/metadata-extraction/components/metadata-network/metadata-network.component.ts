import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  OnChanges
} from '@angular/core';
import { Edge, Node } from '../../models/metadata-network.model';
import { random } from 'graphology-layout';
import Graph from 'graphology';
import forceAtlas2 from 'graphology-layout-forceatlas2';
import Sigma from 'sigma';
import { faNetworkWired } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-metadata-network',
  standalone: false,
  templateUrl: './metadata-network.component.html',
  styleUrl: './metadata-network.component.scss'
})
export class MetadataNetworkComponent implements OnChanges, OnDestroy {
  /** Pass your Gephi-exported nodes/edges here, or leave empty for a demo random graph */
  @Input() nodes: Node[] = [];
  @Input() edges: Edge[] = [];

  /** Number of ForceAtlas2 iterations to run before first render (higher = more "settled" layout) */
  @Input() iterations = 300;

  @ViewChild('sigmaContainer', { static: true })
  private containerRef!: ElementRef<HTMLDivElement>;

  private sigmaInstance?: Sigma;

  faNetworkWired = faNetworkWired;

  ngOnChanges(): void {
    if(this.nodes.length > 0) {
      const graph = this.buildGraph();
      this.layoutGraph(graph);
      this.renderGraph(graph);
    }
  }

  ngOnDestroy(): void {
    this.sigmaInstance?.kill();
  }

  private buildGraph(): Graph {
    const graph = new Graph();

    for (const node of this.nodes) {
      graph.addNode(node.id, {
        label: node.label ?? node.id,
        size: node.size ?? 3,
        color: node.color ?? '#111111',
        x: 0,
        y: 0,
      });
    }

    for (const edge of this.edges) {
      // Guard against duplicate/self edges which graphology rejects by default
      if (
        edge.source !== edge.target &&
        graph.hasNode(edge.source) &&
        graph.hasNode(edge.target) &&
        !graph.hasEdge(edge.source, edge.target)
      ) {
        graph.addEdge(edge.source, edge.target, {
          weight: edge.weight ?? 1,
          color: '#cccccc',
          size: 0.5,
        });
      }
    }

    return graph;
  }

  private layoutGraph(graph: Graph): void {
    // Random initial positions, then let ForceAtlas2 (same algorithm Gephi uses) settle the graph
    random.assign(graph);
    forceAtlas2.assign(graph, {
      iterations: this.iterations,
      settings: {
        gravity: 1,
        scalingRatio: 10,
        barnesHutOptimize: graph.order > 1000, // speeds up layout for large graphs
      },
    });
  }

  private renderGraph(graph: Graph): void {
    this.sigmaInstance = new Sigma(graph, this.containerRef.nativeElement, {
      renderLabels: graph.order < 200, // avoid label clutter on dense graphs
      allowInvalidContainer: true,
      defaultNodeColor: '#111111',
      defaultEdgeColor: '#dddddd',
      minCameraRatio: 0.05,
      maxCameraRatio: 10,
    });
  }
}
