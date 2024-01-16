export const isNumber = (a: any): boolean => {
    return !isNaN(Number(a))
}

export const all = (p: Function, arr: Array<any>): boolean => {
    for(const a in arr){
        if (!p(arr[a])) return false
    }
    return true
}

export default 'default'