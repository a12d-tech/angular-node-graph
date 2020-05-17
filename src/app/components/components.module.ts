import { CytoscapeVisualizationComponent } from './cytoscape-visualization/cytoscape-visualization.component';
import { AlgorithmManagerComponent } from './algorithm-manager/algorithm-manager.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AlgorithmManagerComponent,
    CytoscapeVisualizationComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlgorithmManagerComponent,
    CytoscapeVisualizationComponent,
  ]
})
export class ComponentsModule { }
