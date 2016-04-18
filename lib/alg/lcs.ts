// refer: https://segmentfault.com/a/1190000002641054

export enum Operation {
    nothing,
    addCopyOfX,
    addCopyOfY
}


let initArray = function (n, m, initalValue) {
    let x = []
    for (let i = 0; i < n; i++) {
        x[i] = []
        for (let j = 0; j < m; j++) {
            x[i][j] = initalValue
        }
    }
    return x
}


let initValue = function (q, op, n, m) {
    q[-1]     = []
    q[-1][-1] = 0
    op[-1]    = []

    for (let j = 0; j < m; j++) {
        q[-1][j]  = q[-1][j - 1] + 1
        op[-1][j] = Operation.addCopyOfY
    }

    for (let i = 0; i < n; i++) {
        q[i][-1]  = q[i - 1][-1] + 1
        op[i][-1] = Operation.addCopyOfX
    }
}


let calc = function (list1, list2, q, op, n, m) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (list1[i] == list2[j]) {
                q[i][j]  = q[i - 1][j - 1]
                op[i][j] = Operation.nothing
                continue
            }

            if (q[i - 1][j] <= q[i][j - 1]) {
                q[i][j]  = q[i - 1][j] + 1
                op[i][j] = Operation.addCopyOfX
            } else {
                q[i][j]  = q[i][j - 1] + 1
                op[i][j] = Operation.addCopyOfY
            }
        }
    }
}


let calcOperation = function (op, n, m) {
    let result = []
    while (true) {
        if (n == -1 && m == -1) break

        let operation = op[n][m]

        switch (operation) {
            case Operation.nothing:
                n -= 1
                m -= 1
                break
            case Operation.addCopyOfX:
                result.push({type: Operation.addCopyOfX, index: n})
                n -= 1
                break
            case Operation.addCopyOfY:
                result.push({type: Operation.addCopyOfY, index: m})
                m -= 1
                break
        }
    }
    return result
}


export default function lcs(list1:any[], list2:any[]) {
    let n  = list1.length
    let m  = list2.length
    let q  = initArray(n, m, null)
    let op = initArray(n, m, null)
    initValue(q, op, n, m)
    calc(list1, list2, q, op, n, m)
    return calcOperation(op, n - 1, m - 1).reverse()
}