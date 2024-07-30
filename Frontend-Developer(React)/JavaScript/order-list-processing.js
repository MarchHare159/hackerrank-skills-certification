'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding("ascii");
let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (chunk) {
    inputString += chunk;
});
process.stdin.on("end", function () {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

function processOrderList(orderList, orderId, state) {
    for (let i = 0; i < orderList.length; i++) {
        if (orderList[i].id === orderId) {
            if (state === 'Processing') {
                orderList[i].state = state;
            } else if (state === 'Delivered') {
                orderList.splice(i, 1);
            }
            return orderList;
        }
    }
    return orderList;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    
    const orderCount = parseInt(readLine().trim());
    let orderList = [];
    for (let i = 0; i < orderCount; i++) {
        orderList.push({
            id: i + 1,
            state: 'Received'
        });
    }
    
    let numberOfOperations = parseInt(readLine().trim());
    let updatedOrderList = [...orderList];
    while (numberOfOperations-- > 0) {
        const inputs = readLine().trim().split(' ');
        const orderId = parseInt(inputs[0]); 
        const updatedState = inputs[1];

        updatedOrderList = processOrderList(updatedOrderList, orderId, updatedState);
        updatedOrderList = [...updatedOrderList];
    }
    
    if (updatedOrderList.length > 0) {
        for (let i = 0; i < updatedOrderList.length; i++) {
            const order = updatedOrderList[i];
            ws.write(`Order with id ${order.id} is in ${order.state} state\n`);
        }
    } else {
        ws.write(`All orders are in Delivered state\n`);
    }

    ws.end();
}
