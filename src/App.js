 
import React, { useState} from 'react';
import './App.css'; 

const generateRandomArray = (size) => {
  const array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
  return array;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const App = () => {
  const [bars, setBars] = useState(generateRandomArray(20));

  const updateBars = async (updatedBars) => {
    setBars([...updatedBars]);
    await sleep(100);
  };

  const randomizeArray = () => {
    setBars(generateRandomArray(bars.length));
  };

  const insertionSort = async () => {
    const array = [...bars];
    const n = array.length;

    for (let i = 1; i < n; i++) {
      const key = array[i];
      let j = i - 1;

      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j = j - 1;
      }

      array[j + 1] = key;
      await updateBars(array);
    }
  };

  const selectionSort = async () => {
    const array = [...bars];
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < n; j++) {
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }

      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;

      await updateBars(array);
    }
  };

  const bubbleSort = async () => {
    const array = [...bars];
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;

          await updateBars(array);
        }
      }
    }
  };

  const mergeSort = async () => {
    const merge = async (arr, l, m, r) => {
      const n1 = m - l + 1;
      const n2 = r - m;

      const L = new Array(n1);
      const R = new Array(n2);

      for (let i = 0; i < n1; ++i) {
        L[i] = arr[l + i];
      }
      for (let j = 0; j < n2; ++j) {
        R[j] = arr[m + 1 + j];
      }

      let i = 0;
      let j = 0;
      let k = l;

      while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
          arr[k] = L[i];
          i++;
        } else {
          arr[k] = R[j];
          j++;
        }
        k++;
      }

      while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
      }

      while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
      }
    };

    const mergeSortHelper = async (arr, l, r) => {
      if (l < r) {
        const m = Math.floor((l + r) / 2);

        await mergeSortHelper(arr, l, m);
        await mergeSortHelper(arr, m + 1, r);

        await merge(arr, l, m, r);
        await updateBars(arr);
      }
    };

    const array = [...bars];
    const n = array.length;
    await mergeSortHelper(array, 0, n - 1);
  };

  const quickSort = async () => {
    const array = [...bars];

    const partition = async (arr, low, high) => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
          i++;
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }

      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;

      return i + 1;
    };

    const quickSortHelper = async (arr, low, high) => {
      if (low < high) {
        const pi = await partition(arr, low, high);

        await quickSortHelper(arr, low, pi - 1);
        await quickSortHelper(arr, pi + 1, high);
        await updateBars(arr);
      }
    };

    const n = array.length;
    await quickSortHelper(array, 0, n - 1);
  };

  const shellSort = async () => {
    const array = [...bars];
    const n = array.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i++) {
        const temp = array[i];
        let j = i;

        while (j >= gap && array[j - gap] > temp) {
          array[j] = array[j - gap];
          j -= gap;
        }

        array[j] = temp;
      }
      await updateBars(array);
    }
  };

  const changeSize = () => {
    const newSize = Math.floor(Math.random() * 20) + 5;
    setBars(generateRandomArray(newSize));
  };

  return (
    <div className="app-container">
      <div className="bars-container">
        {bars.map((value, index) => (
          <div key={index} className="bar" style={{ height: `${value * 6}px` }}>
            {value}
          </div>
        ))}
      </div>
      <div className="buttons-container">
        <button className='btn' onClick={randomizeArray}>Randomize Array</button>
        <button className='btn' onClick={insertionSort}>Insertion Sort</button>
        <button className='btn' onClick={selectionSort}>Selection Sort</button>
        <button className='btn' onClick={bubbleSort}>Bubble Sort</button>
        <button className='btn' onClick={mergeSort}>Merge Sort</button>
        <button className='btn' onClick={quickSort}>Quick Sort</button>
        <button className='btn' onClick={shellSort}>Shell Sort</button>
        <button className='btn' onClick={changeSize}>Change Size</button>
      </div>
    </div>
  );
};

export default App;
