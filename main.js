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
    constructor (value = 0, left = 0, right = 0) {
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
}

class Tree {
    #root;      //Root of the tree

    constructor(root = 0) {
        this.#root = 0;
    }

    get getRoot() {
        return this.#root;
    }

    buildTree(array) {
        let sortedArray = mergeSort(array);
        let i = 1;
        let previous;
        let current;
        while(i < sortedArray.length) {
            current = sortedArray[i];
            previous = sortedArray[i - 1];
            if(previous === current) {
                sortedArray.splice(i - 1, 1);
            }
            i += 1;
        }

        return sortedArray;
    }

    createTree(array, min = 0, max = array.length - 1) {
        if(min < max) {
            let mid = floor((min + max)/2);
        }
    }
}

let example = new Tree();
console.log(example.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]));