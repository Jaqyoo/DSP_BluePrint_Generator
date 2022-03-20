import { assert } from "console"

export function array_diff_multi(bases:Array<number>, diff:Array<number>, num = 0) : Array<Array<number>> {
    let ret = new Array()
    assert(bases.length == diff.length)
    for (let i = 0; i < num; i++) {
        let tmp = new Array<number>(bases.length)
        bases.forEach((base, index) => tmp[index] = base + diff[index] * i) 
        ret.push(tmp)
    }
    return ret
}

export function array_diff(bases:Array<number>, diff:Array<number>) : Array<number> {
    let ret = new Array<number>()
    assert(bases.length == diff.length)
    bases.forEach((base, index) => ret[index] = base + diff[index]) 
    return ret
}

export function local_diff(base:[number, number, number], diff:[number, number, number]) :[number, number, number] {
    return array_diff(base, diff) as [number, number, number]
}

export function local_diff_2(base:[number, number, number], diff:[number, number, number]) :[number, number] {
    let local = array_diff(base, diff)
    return [local[0], local[1]]
}

// console.log(array_diff([0, 1, 0], [1, 1, 0], 20))