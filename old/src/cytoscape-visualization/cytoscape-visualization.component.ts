import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CytoscapeVisualization } from '../shared/cytoscape-visualization';
import { Tree, TreeNode } from '../shared/tree';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cytoscape-visualization',
  templateUrl: './cytoscape-visualization.component.html',
  styleUrls: ['./cytoscape-visualization.component.css']
})
export class CytoscapeVisualizationComponent<T> implements OnInit, OnChanges {

  @Input()
  public tree: Tree<T>;

  @Input()
  public animateAlgo: Observable<Algorithm>;
  
  private visualization: CytoscapeVisualization<T>;
  private animateAlgoSubscription: Subscription;

  constructor() { }

  ngOnInit(){
    this.animateAlgoSubscription = this.animateAlgo.subscribe((algo: Algorithm) => this.start(algo));
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.tree) {
      if (changes.tree.isFirstChange) {
        this.visualization = new CytoscapeVisualization<T>(document.getElementById('cy'));
      }
      // this.visualization.remove();
      this.visualization.buildFromTree(changes.tree.currentValue);
    }
  }

  ngOnDestroy() {
    this.animateAlgoSubscription.unsubscribe();
  }

  private start(algo: Algorithm): void {
    console.log('start ' + algo);
  }

  private breadthFirstSearch(): void {
    let bfs = this.visualization.getGraph().elements().breadthFirstSearch('#a', function(){}, true);

    let i = 0;
    let highlightNextEle = () => {
      if (i < bfs.path.length){
        bfs.path[i].addClass('highlighted');

        i++;
        setTimeout(highlightNextEle, 1000);
      }
    };

    // kick off first highlight
    highlightNextEle();
  }

}