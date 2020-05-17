import { Subject } from 'rxjs';
import { Tree, TreeNode, Algorithm } from './core/graph';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public tree: Tree<string>;
  public algorithm: Subject<Algorithm> = new Subject<Algorithm>();

  constructor() { }

  public ngOnInit(): void {
    this.tree = this.buildTree();
  }

  public onAlgoSeledted(algo): void {
    console.log('delegate algo to CytoscapeVisualizationComponent');
    this.algorithm.next(algo);
  }

  private buildTree(): Tree<string> {
    const tree = new Tree<string>();

    const nodeA = new TreeNode<string>('a');
    const nodeB = new TreeNode<string>('b');
    const nodeC = new TreeNode<string>('c');
    const nodeD = new TreeNode<string>('d');
    const nodeE = new TreeNode<string>('e');

    nodeA.addChildren(nodeB, nodeE);
    nodeB.addChildren(nodeC, nodeE);
    nodeC.addChildren(nodeD, nodeE);
    nodeD.addChildren(nodeE);

    return tree.addRoot(nodeA);
  }
}
