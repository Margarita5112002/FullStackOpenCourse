export const isNumber = (a: unknown): boolean => {
    return !isNaN(Number(a));
};

export const all = (p: (arg0: unknown) => boolean, arr: Array<unknown>): boolean => {
    for (const a of arr) {
        if (!p(a)) return false;
    }
    return true;
};

export default 'default';