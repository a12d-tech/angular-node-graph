import { Component, Input, OnChanges, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { CytoscapeVisualization, Tree } from '../../core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-cytoscape-visualization',
  templateUrl: './cytoscape-visualization.component.html',
  styleUrls: ['./cytoscape-visualization.component.scss']
})
export class CytoscapeVisualizationComponent<T> implements OnInit, OnChanges, OnDestroy {

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
    if (changes.tree) {
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

    this.breadthFirstSearch();
  }

  private breadthFirstSearch(): void {
    const bfs = this.visualization.getGraph().elements().breadthFirstSearch({ root: '#a', directed: true });

    let i = 0;
    const highlightNextElement = () => {
      if (i < bfs.path.length){
        bfs.path[i].addClass('highlighted');

        i++;
        setTimeout(highlightNextElement, 1000);
      }
    };

    // kick off first highlight
    highlightNextElement();
  }

}
