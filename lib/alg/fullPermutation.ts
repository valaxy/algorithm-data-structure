const BREAK = true
const EXHAUST = false

const swap = function (elements, i, j) {
    let temp    = elements[i]
    elements[i] = elements[j]
    elements[j] = temp
}

// calculate the count of full permutation of last `deep` elements
const perm = function (elements, deep, callback) {
    if (deep == 1) {
        return callback(elements)
    } else {
        let firstIndex = elements.length - deep
        for (let i = firstIndex; i < elements.length; i++) {
            swap(elements, firstIndex, i)
            if (perm(elements, deep - 1, callback) === BREAK) {
                return BREAK
            }
            swap(elements, firstIndex, i) // recover
        }
    }
}


// TODO copy elements first
/** Get the full permutation of elements */
export default function fullPermutation<T>(elements: T[], perPermCallback: (elements: T[]) => void | boolean): boolean {
    if (elements.length > 0) {
        return perm(elements, elements.length, perPermCallback)
    }
    return EXHAUST
}
