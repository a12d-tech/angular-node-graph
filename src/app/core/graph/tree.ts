import { Tuple } from  './tuple';

export class TreeNode<T> {
  value: T;
  children?: TreeNode<T>[];

  constructor(value?: T) {
    this.value = value;
    this.children = [];
  }

  addValue(value: T): TreeNode<T> {
    this.value = value;
    
    return this;
  }

  addChild(node: TreeNode<T>): TreeNode<T> {
    this.children.push(node);
    
    return this;
  }

  addChildren(...nodes: TreeNode<T>[]): TreeNode<T> {
    this.children.push(...nodes);

    return this;
  }

}

export interface TreeEdge<T> {
  source: TreeNode<T>;
  target: TreeNode<T>;
}

export class Tree<T> {
  root: TreeNode<T>;

  constructor(root?: TreeNode<T>) {
    this.root = root;
  }

  addRoot(root: TreeNode<T>): Tree<T> {
    this.root = root;

    return this;
  }

  public getNodesAndEdges(): Tuple<TreeNode<T>[], TreeEdge<T>[]> {
    const nodes: Set<TreeNode<T>> = new Set();
    const edges: Set<TreeEdge<T>> = new Set();

    if (this.root) {
      this.visitNodeAndEdges(this.root, nodes, edges);
    }
    
    return new Tuple<TreeNode<T>[], TreeEdge<T>[]>(Array.from(nodes.values()), Array.from(edges));
  }

  public getNodes(): TreeNode<T>[] {
    return this.getNodesAndEdges().left;
  }

  public getEdges(): TreeEdge<T>[] {
    return this.getNodesAndEdges().right;
  }

  /*-- Private methods --*/

  private getUniqueNodes(node: TreeNode<T>, acc: Set<TreeNode<T>>): void {
    // console.log('visit node:', node.value);

    if (acc.has(node)) {
      // console.log('skip already visited!');
      return;
    }
    
    // console.log('new node');
    acc.add(node);

    node.children.map(child => this.getUniqueNodes(child, acc));
  }

  private visitNodeAndEdges(node: TreeNode<T>, nodeAcc: Set<TreeNode<T>>, edgeAcc: Set<TreeEdge<T>>): void {
    // console.log('visit node:', node.value);

    if (nodeAcc.has(node)) {
      // console.log('skip already visited!');
      return;
    }
    
    // console.log('new node');
    nodeAcc.add(node);

    node.children.forEach(child => {
      edgeAcc.add({
        source: node,
        target: child,
      });

      this.visitNodeAndEdges(child, nodeAcc, edgeAcc);
    });
  }

}
