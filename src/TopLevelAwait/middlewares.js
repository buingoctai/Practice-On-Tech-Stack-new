import { square, diagonal } from "./library";

console.log('From middleare');

let squareOutput;
let diagonalOutput;

(async () => {
    await delay(1000);
    squareOutput = square(13);
    diagonalOutput = diagonal(12, 5);
})();

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(console.log('❤️'));
        }, delayInms);
    });
}

export {
    squareOutput,
    diagonalOutput
}
