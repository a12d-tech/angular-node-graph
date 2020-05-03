import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Algorithm } from '../shared/algo';

@Component({
  selector: 'app-algorithm-manager',
  templateUrl: './algorithm-manager.component.html',
  styleUrls: ['./algorithm-manager.component.css']
})
export class AlgorithmManagerComponent implements OnInit {

  @Output()
  public selectedAlgorithm: EventEmitter<Algorithm> = new EventEmitter<Algorithm>();

  constructor() { }

  ngOnInit() {
  }

  public startBreadthFirstSearch(): void {
    console.log('Breadth First Search selected');
    this.selectedAlgorithm.emit(Algorithm.BFS);
  }

}