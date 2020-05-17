import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CytoscapeVisualizationComponent } from '../cytoscape-visualization/cytoscape-visualization.component';
import { AlgorithmManagerComponent } from '../algorithm-manager/algorithm-manager.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, CytoscapeVisualizationComponent, AlgorithmManagerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
