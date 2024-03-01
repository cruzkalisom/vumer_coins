/*
function bubblesort(array){
    const n = array.length
    console.log(array)

    for(let i = 0; i < n - 1; i++){
        for(let j = 0; j < n - i - 1; j++){
            if(array[j] > array[j + 1]){
                const temp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = temp

                console.log(array)
            }
        }
    }

    return array
}

var array = [60, 52, 3, 5, 9, -4, 32]
console.log(bubblesort(array))
*/

/*
var nomes = ['Messias', 'Ana', 'Lucas', 'Cristian', 'Beatriz', 'Kalisom']
nomes.sort()
console.log(nomes)

nomes[nomes.length] = 'Caique'

nomes.sort()

console.log(nomes)
*/

let obj = { a:"hello world", b: 11, c: true };
obj["b"] = obj["a"]
console.log(`Valor de a: ${obj["a"]}`)
console.log(`Valor de b: ${obj["b"]}`)