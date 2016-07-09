var swap = function (elements, i, j) {
    var temp    = elements[i]
    elements[i] = elements[j]
    elements[j] = temp
}

// calculate the count of full permutation of last `deep` elements
var perm = function (elements, deep, callback) {
    if (deep == 1) {
        return callback(elements)
    } else {
        var firstIndex = elements.length - deep
        for (var i = firstIndex; i < elements.length; i++) {
            swap(elements, firstIndex, i)
            if (perm(elements, deep - 1, callback)) {
                return true
            }
            swap(elements, firstIndex, i)
        }
    }
}

var fullPermutation = function (elements, callback) {
    if (elements.length > 0) {
        return perm(elements, elements.length, callback)
    }
    return false
}

export = fullPermutation
