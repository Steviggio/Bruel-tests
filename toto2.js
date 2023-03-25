function promise01() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve(true);
        }, 3000);
    });
};

function promise02() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve(true);
        }, 1000);
    });
};



const aaaa = promise01();
aaaa.then((value) => {
    console.log('3seconde');
});



const aaaa2 = promise02();
aaaa2.then((value) => {
    console.log('1seconde');
});