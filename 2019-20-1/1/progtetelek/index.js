function isNegativ(y) {
    return y < 0;
}

function linker(x) {
    let i = 0;
    while (i < x.length && x[i] >= 0) {
        ++i;
    }
    return {
        van: i < x.length,
        index: i,
    };
}

function linker2(x, f) {
    let i = 0;
    while (i < x.length && !f(x[i])) {
        ++i;
    }
    return {
        van: i < x.length,
        index: i,
    };
}

const tomb = [1, 2, 5, 6, 11];

/*
const eredmeny = linker(tomb);

if (!eredmeny.van) {
    console.log('nincs ilyen elem');
} else {
    console.log(`az elso negativ elem helye az ${
        tomb
    } tombben: ${eredmeny.index}. index`);
}
*/

// const eredmeny2 = tomb.find(isNegativ);

const eredmeny2 = tomb.find(x => x < 0);
console.log(eredmeny2);

const eredmeny3 = linker2(tomb, x => x < 0);
console.log(eredmeny3);

// linker
// tomb.find(x => x < 0);
// ha index kell: .findIndex
// ha van-e: .some
// ha nincs-e: .every

// masolas
// tomb.map(x => x * 2);

// kivalogatos
// tomb.filter(x => x < 0);

// hajtogatas
// tomb.reduce(
//    (reszEredmeny, akt) => reszEredmeny + akt,
//    0
// );
