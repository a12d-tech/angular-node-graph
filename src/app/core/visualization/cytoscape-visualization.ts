import * as cytoscape from 'cytoscape';
import { ElementDefinition } from 'cytoscape';
import { Tree, TreeNode, TreeEdge, Tuple } from '../graph';

export class CytoscapeVisualizationAdapter<T> {

  constructor(private tree: Tree<T>) {}

  public getElementDefinitions(): ElementDefinition[] {
    const tuple: Tuple<ElementDefinition[], ElementDefinition[]> = this.tree.getNodesAndEdges()
      .mapLeft((nodes: TreeNode<T>[]): ElementDefinition[] => this.getNodeElementDefinitions(nodes))
      .mapRight((edges: TreeEdge<T>[]): ElementDefinition[] => this.getEdgeElementDefinitions(edges));

    return tuple.left.concat(tuple.right);
  }

  /*-- Private methods --*/

  private getNodeElementDefinitions(nodes: TreeNode<T>[]): ElementDefinition[] {
    return nodes.map((node: TreeNode<T>): ElementDefinition => this.getNodeElementDefinition(node));
  }

  private getEdgeElementDefinitions(edges: TreeEdge<T>[]): ElementDefinition[] {
    return edges.map((edge: TreeEdge<T>): ElementDefinition => this.getEdgeElementDefinition(edge));
  }

  private getNodeElementDefinition(node: TreeNode<T>): ElementDefinition {
    return {
      group: 'nodes',
      data: {
        id: node.value as unknown as string,
      }
    };
  }

  private getEdgeElementDefinition(edge: TreeEdge<T>): ElementDefinition {
    return {
      group: 'edges',
      data: {
        id: `${edge.source.value}${edge.target.value}`,
        source: edge.source.value,
        target: edge.target.value,
        // weight: this.getRandomInt(nodes.length + 1)
      }
    };
  }

  private getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

}

export class CytoscapeVisualization<T> {
  /**
    * eles --> Cy.Collection
    *  a collection of one or more elements (nodes and edges)
    *
    * ele  --> Cy.Singular
    *  a collection of a single element (node or edge)
    *
    * node --> Cy.NodeSingular
    *  a collection of a single node
    *
    * nodes -> Cy.NodeCollection
    *  a collection of one or more nodes
    *
    * edge --> Cy.EdgeSingular
    *  a collection of a single edge
    *
    * edges -> Cy.EdgeCollection
    *  a collection of one or more edges
    */

  private container: HTMLElement;
  private graph: cytoscape.Core;
  private tree: Tree<T>;
  private visualizationAdapter: CytoscapeVisualizationAdapter<T>;

  constructor(container: HTMLElement) {
    this.container = container;
    this.graph = cytoscape(this.graphOpts(container));
  }

  public getGraph(): cytoscape.Core {
    return this.graph;
  }

  public buildFromTree(tree: Tree<T>): void {
    this.tree = tree;
    this.visualizationAdapter = new CytoscapeVisualizationAdapter<T>(this.tree);

    this.graph.add(this.visualizationAdapter.getElementDefinitions());

    this.graph.elements().layout({
        name: 'breadthfirst',
        directed: true,
        roots: '#a',
        padding: 10
    }).run();
  }

  /*-- Private methods --*/

  private graphOpts(container: HTMLElement): cytoscape.CytoscapeOptions {
    return {
      container,
      boxSelectionEnabled: false,
      autounselectify: true,
      style: [
        {
          selector: 'node',
          style: {
            'content': 'data(id)'
          }
        },
        {
          selector: 'edge',
          style: {
            'label': 'data(id)',
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'width': 4,
            'line-color': '#ddd',
            'target-arrow-color': '#ddd'
          }
        },
        {
          selector: '.highlighted',
          style: {
            'background-color': '#61bffc',
            'line-color': '#61bffc',
            'target-arrow-color': '#61bffc',
            // 'transition-property': 'background-color, line-color, target-arrow-color',
            // 'transition-duration': '0.5s'
          }
        }
      ],
      elements: {
        nodes: [],
        edges: [],
      },
      /*layout: {
        name: 'breadthfirst',
        directed: true,
        roots: '#a',
        padding: 10
      }*/
    }
  }

}
