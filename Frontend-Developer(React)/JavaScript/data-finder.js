function dataFinder(data) {
    return function find(minRange, maxRange, value) {
        // Check if minRange or maxRange is beyond the end of the array
        if (minRange < 0 || maxRange >= data.length || minRange > maxRange) {
            throw new Error('Invalid range');
        }

        // Search for the value in the inclusive range [minRange - maxRange]
        for (let i = minRange; i <= maxRange; i++) {
            if (data[i] === value) {
                return true;
            }
        }

        return false;
    };
}

function main() {
    const fs = require('fs');
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const inputString = fs.readFileSync(0, 'utf-8').split('\n');
    const data = inputString[0].trim().split(' ').map(val => parseInt(val));
    const join = dataFinder(data);

    try {
        const inputs = inputString[1].trim().split(' ');
        const minRange = parseInt(inputs[0]);
        const maxRange = parseInt(inputs[1]);
        const value = parseInt(inputs[2]);
        const result = join(minRange, maxRange, value);
        ws.write(result.toString());
    } catch (e) {
        ws.write(`${e}`);
    }

    ws.end();
}

main();
