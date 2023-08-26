


function fun(arr) {
    let len = arr.len
    for (let index = 0; index < arr.length; index++) {
        for (let j = 0; j < arr.length-1-index; j++) {
            if (arr[j+1] > arr[j]) {
                const element = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = element;
            }
            
        }
    }
}