import { Tree } from './../graph/tree';
import { CytoscapeVisualization } from './cytoscape-visualization';

export enum VisualizationType {
  CYTO = 'cytoscape',
}

export class VisualizationFactory<U> {

  public static getVisualization<U>(
    tree: Tree<U>,
    visuType: VisualizationType,
  ): Visualization<U> {
    switch (visuType) {
      case VisualizationType.CYTO:
        return; // new CytoscapeVisualization();
      default:
        console.error(`Visualization Type not recognized! ${visuType}`);
    }
  }

}

export interface Visualization<U> {
  build<U>(tree: Tree<U>): Visualization<U>;
}
