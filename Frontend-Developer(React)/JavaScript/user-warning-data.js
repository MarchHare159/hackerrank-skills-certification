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

// Define the User class
class User {
    constructor(userName) {
        this.userName = userName;
    }
    
    getUsername() {
        return this.userName;
    }
    
    setUsername(userName) {
        this.userName = userName;
    }
}

// Define the ChatUser class that inherits from User
class ChatUser extends User {
    constructor(userName) {
        super(userName);
        this.warningCount = 0;
    }
    
    giveWarning() {
        this.warningCount += 1;
    }
    
    getWarningCount() {
        return this.warningCount;
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    
    const initialUsername = readLine().trim();
    const chatUserObj = new ChatUser(initialUsername);
    
    let numberOfOperations = parseInt(readLine().trim());
    while (numberOfOperations-- > 0) {
        const inputs = readLine().trim().split(' ');
        const operation = inputs[0];
        const username = inputs[1];

        switch(operation) {
            case 'GiveWarning':
                chatUserObj.giveWarning();
                break;
            case 'SetName':
                chatUserObj.setUsername(username);
                break;
            default:
                break;
        }
    }
    ws.write(`User ${chatUserObj.getUsername()} has a warning count of ${chatUserObj.getWarningCount()}\n`);
    ws.write(`ChatUser extends User: ${(chatUserObj instanceof User).toString()}`);
    ws.end();
}
