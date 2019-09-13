function faktorialis(n) {
    let x = 1;
    for (let y = 1; y <= n; ++y) {
        x = x * y;
    }
    return x;
}

function rekurzivFaktorialis(n) {
    if (n === 1) {
        return 1;
    } else {
        return n * rekurzivFaktorialis(n - 1);
    }
}

console.log(faktorialis(3));
