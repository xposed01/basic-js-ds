const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

// : Бинарное дерево - Корень - ветви - листья  
// : значение больше корня идет вправо >
// : значение меньше корня идет влево  <

class BinarySearchTree {

  constructor() {
		this.rootNode = null;
	}
  
  root() {
    return this.rootNode;
  }

  add(data) {
    let newNode = new Node(data);
		// есть ли корень?
		if (!this.rootNode) {
			this.rootNode = newNode;
			return;
		}

		// текущее положение ветви внизу
		let currentNode = this.rootNode;

		// добавление значения
		while (currentNode) {
			// если значение меньше корня = левая ветвь
			if (newNode.data < currentNode.data) {
				// есть ли ветка?
				if(!currentNode.left) {
					currentNode.left = newNode;
					return;
				}
				// перезаписываем значение currentNode, для спуска вниз
				currentNode = currentNode.left;

			// если значение больше корня = правая ветвь
			} else {
				if(!currentNode.right) {
					currentNode.right = newNode;
					return;
				}
				currentNode = currentNode.right;
			}
		}
  }

  has(data) {
    return search(this.rootNode, data);

    function search (node, data) {
      if (!node) return false;

      if (node.data === data) return true;
      
      if (data < node.data) {
        return search(node.left, data);
      } else {
        return search(node.right, data);
      }
    }
  }

  find(data) {
    return search(this.rootNode, data);

    function search (node, data) {
      if (!node) return null;

      if (node.data === data) return node;
      
      if (data < node.data) {
        return search(node.left, data);
      } else {
        return search(node.right, data);
      }
    }
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      // идем вправо
      if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      }

      // идем влево
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      }
      
      // если равно
      if (data == node.data) {
        // проверка, лист ли это
        if(!node.right && !node.left) return null;
        // если нет правого потомка
        if (!node.right) {
          node = node.left;
          return node;
        }
        // если нет левого  потомка
        if (!node.left) {
          node = node.right;
          return node;
        }

        // минимум среди правого поддерева
        let MFR = node.right;

        while (MFR.left) {
          MFR = MFR.left;
        }

        node.data = MFR.data;
        node.right = removeNode(node.right, MFR.data);
        return node;
      }
    }
  }

  min() {
    if (!this.rootNode) {
      return;
    }

    let node = this.rootNode;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.rootNode) {
      return;
    }

    let node = this.rootNode;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};