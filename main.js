//Merge sort recursive
function mergeSort(theArray, min = 0, max = theArray.length - 1) {
    //Check if the min is less than the max
    if (min < max) {
        //Get the mid section fo the array
        let mid = Math.floor(((min + max) / 2));
        //Recursive call for the left part
        mergeSort(theArray, min, mid);
        //Recursive call for the right part
        mergeSort(theArray, mid + 1, max);
        //Merge the sorted parts
        merge(theArray, min, mid, max);
    }

    return theArray;
}

//Help function that merges the sorted parts
function merge(theArray, min, mid, max) {
    //A helper array that will store the sorted elements
    let helpArray = [];
    //Left part of the array
    let i = min;
    //Right part of the array
    let j = mid + 1;
    //Index of the helper array
    let k = min;
    
    //For loop that goes through the left/right part of the array
    for (;i <= mid && j <= max;) {
        //If the left index is less than the right index
        if(theArray[i] < theArray[j]) {
            //Put the value in the help array
            helpArray.push(theArray[i]);
            //Move the left index
            i++;
            //Move the helper index
            k++;
        } else {
            //Put the value in the help array
            helpArray.push(theArray[j]);
            //Move the right index
            j++;
            //Move the helper index
            k++;
        }
    }

    //Check if the remainder parts are in the left array
    if (i <= mid) {
        //For loop that goes through the left part
        for (; i <= mid; i++) {
            //Push the values in the help array
            helpArray.push(theArray[i]);
            k++;
        }
    } else {
        //For loop that goes through the right part
        for (; j <= max; j++) {
            //Push the values in the help part
            helpArray.push(theArray[j]);
            k++;
        }
    }

    let helpIndex = 0;
    //For loop that copies the elements in the help array in the original array
    for (let help = min; help <= max; help++) {
        theArray[help] = helpArray[helpIndex];
        helpIndex++;
    }

    return;
}

class Node {
    #value; //Value of the node
    #left;  //Left children of the node
    #right; //Right children of the node

    //Constructor
    constructor (value = 0, left = null, right = null) {
        this.#value = value;
        this.#left = left;
        this.#right = right;
    }

    get getValue() {
        return this.#value;
    }

    get getLeft() {
        return this.#left;
    }

    get getRight() {
        return this.#right;
    }

    setLeft(value) {
        this.#left = value;
    }

    setRight(value) {
        this.#right = value;
    }

    setValue(value) {
        this.#value = value;
    }
}

class Tree {
    #root;      //Root of the tree

    constructor(root = 0) {
        this.#root = 0;
    }

    get getRoot() {
        return this.#root;
    }

    //Functions that builds the tree
    buildTree(array) {
        //Call the mergeSort to sort the elements
        let sortedArray = mergeSort(array);
        let i = 1;
        //Variables to check if two numbers are equal
        let previous;
        let current;
        //While loop that goes through all the array
        while(i < sortedArray.length) {
            //Get the current element 
            current = sortedArray[i];
            //Get the previous element
            previous = sortedArray[i - 1];
            //If they are the same delete the previous one
            if(previous === current) {
                sortedArray.splice(i - 1, 1);
            }
            //Go to the next index
            i += 1;
        }
        //Create the auxiliary function
        this.#root = this.createTree(sortedArray);
        //Return the root
        return this.#root;
    }

    //Auxiliary function to help create the tree
    createTree(array, min = 0, max = array.length - 1) {
        if(min > max) {
            return null;
        } else {
            //Get the element in the middle
            let mid = Math.floor((min + max)/2);
            //Create a new node with the value of the element in the middle
            let root = new Node(array[mid]);
            //Recursive call to set the left nodes
            root.setLeft(this.createTree(array, min, mid - 1));
            //Recursive call to set the right nodes
            root.setRight(this.createTree(array, mid + 1, max));
            return root;
        }
    }

    //Function that inserts a new value
    insert(value, node = this.#root) {
        //Check if the value is the same in the node
        if(value === node.getValue) {
            return;
        //Check if the value is smaller than the node
        } else if (value < node.getValue) {
            //Check if the next node is null
            if(node.getLeft === null) {
                //Create a new node
                let newNode = new Node(value);
                //Set the new node in the left
                node.setLeft(newNode);
                return;
            }
            //Recursive call to go to the next left node
            this.insert(value,node.getLeft);
        //Else where the value is bigger than the node
        } else {
            //Check if the next node is null
            if(node.getRight === null) {
                //Create a new node
                let newNode = new Node(value);
                //Set the new node in the right
                node.setRight(newNode);
                return;
            }
            //Recursive call to go to the right node
            this.insert(value, node.getRight);
        }
    }

    //Deletes a value of the tree
    delete(value, nodeSon = this.#root, nodeFather) {
        //If the value is found in the tree
        if(value === nodeSon.getValue) {
            //First case: the node has zero children
            if(nodeSon.getLeft === null && nodeSon.getRight === null) {
                //Set the value to null
                nodeSon.setValue(null);
                //If the node was smaller than the father
                if(nodeSon.getValue < nodeFather.getValue) {
                    //Set the left node to null
                    nodeFather.setLeft(null);
                } else {
                    //Set the right node to null
                    nodeFather.setRight(null);
                }
                return;

            //Second case: the node has one children
            } else if (nodeSon.getLeft !== null && nodeSon.getRight === null || nodeSon.getLeft === null && nodeSon.getRight !== null) {
                //If the node is in the left of the father
                if(nodeSon.getValue < nodeFather.getValue) {
                    //If the child is in the left
                    if(nodeSon.getLeft !== null) {
                    //The father left node points to the left child 
                    nodeFather.setLeft(nodeSon.getLeft);
                    //Set the values to null
                    nodeSon.setValue(null);
                    nodeSon.setLeft(null);
                    } else {
                    //The father left node points to the right child
                    nodeFather.setLeft(nodeSon.getRight);
                    //Set the values to null
                    nodeSon.setValue(null);
                    nodeSon.setRight(null);
                    }
                //If the node is in the right of the father
                } else {
                    //If the child is in the left
                    if(nodeSon.getLeft !== null) {
                    //The father right node points to the left child
                    nodeFather.setRight(nodeSon.getLeft);
                    //Set the values to null
                    nodeSon.setValue(null);
                    nodeSon.setLeft(null);
                    } else {
                    //The father right node points to the right child
                    nodeFather.setRight(nodeSon.getRight);
                    //Set the values to null
                    nodeSon.setValue(null);
                    nodeSon.setRight(null);
                    }
                }
                return;

            //Third case: The node have two children
            } else {
                //Find the predecessor
                let thePredecessor = this.predecessor(nodeSon);
                //Change the value fo the node to the value of the predecessor
                nodeSon.setValue(thePredecessor.getValue);
                //Set the value of the predecessor to null
                thePredecessor.setValue(null);
                return;
            }
        
        //If the value is not found and it is smaller than the node
        } else if (value < nodeSon.getValue && nodeSon.getLeft !== null) {
            //Recursive call to the left
            this.delete(value, nodeSon.getLeft, nodeSon);
        //If the value is not found and it is bigger than the node
        } else if (nodeSon.getRight !== null){
            //Recursive call to the right
            this.delete(value, nodeSon.getRight, nodeSon);
        } else {
            //If not value is found return the function
            return;
        }
    }

    //Function to find the predecessor of the node
    predecessor(node) {
        //The previous node of the predecessor
        let previousNode;
        //The left node of the node to be deleted
        let temporalNode = node.getLeft;
        //While loop to find the last node in the right
        while(temporalNode.getRight !== null) {
            //Previous node is equal to the temporal node
            previousNode = temporalNode;
            //Go to the next node in the right
            temporalNode = temporalNode.getRight;
        }
        //If the previous node was defined
        if(previousNode !== undefined) {
            //Previous node right value is null
            previousNode.setRight(null);
        } else {
            //If the node to be deleted only has one child to the left, set that value to null
            node.setLeft(null);
        }
        //Return the temporal node
        return temporalNode;
    }

    //Finds a value in the tree
    find(value, node = this.#root) {
        //If the value is found return the node
        if(value === node.getValue) {
            return node;
        //If the value is smaller, and if the left is not null
        } else if (value < node.getValue && node.getLeft !== null) {
            //Recursive call to the left node
            return this.find(value, node.getLeft);
        //If the value is bigger, and the right is not null
        } else if (node.getRight !== null){
            //Recursive call to the right node
            return this.find(value, node.getRight);
        } else {
            return "No value was found";
        }
    }

    //Callback function for level order
    callBackFunction(node) {
        //Log the value of the node
        console.log(node.getValue);
    }

    //Function that gives the level order of the tree
    levelOrderForEach(callback) {
        //Check if the callback is a function
        if(typeof(callback) !== "function") {
            throw new Error("You need to pass a function");
        }
        //Create an array that will function like a queue
        let theQueue = [];
        //Start at the root
        let temporalNode = this.#root;
        //Push the node in the array
        theQueue.push(temporalNode);
        //While loop that stops when the array is empty
        while (theQueue.length !== 0) {
            //Get the front element of the array
            let theFront = theQueue.splice(0,1);
            //Call the callback function
            this.callBackFunction(theFront[0]);
            //Temporal function is the value of the front of the list
            temporalNode = theFront[0];
            //If there is a node in the left
            if(temporalNode.getLeft != null) {
                //Push the left child in the array
                theQueue.push(temporalNode.getLeft);
            }
            //If there is a node in the right
            if(temporalNode.getRight != null) {
                //Push the right child in the array
                theQueue.push(temporalNode.getRight);
            }
        }
        return;
    }

}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.getRight !== null) {
    prettyPrint(node.getRight, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.getValue}`);
  if (node.getLeft !== null) {
    prettyPrint(node.getLeft, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};


let example = new Tree();
example.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(example.insert(2));
console.log(example.insert(6));
console.log(example.insert(32));
console.log(example.insert(2));
prettyPrint(example.getRoot);
console.log(example.delete(2));
prettyPrint(example.getRoot);
console.log(example.delete(1));
prettyPrint(example.getRoot);
console.log(example.delete(7));
prettyPrint(example.getRoot);
console.log(example.delete(67));
prettyPrint(example.getRoot);
console.log(example.delete(32));
prettyPrint(example.getRoot);
console.log(example.delete(9));
prettyPrint(example.getRoot);
console.log(example.delete(8));
prettyPrint(example.getRoot);
console.log(example.find(5));
console.log(example.find(7));
console.log(example.levelOrderForEach(example.callBackFunction));
