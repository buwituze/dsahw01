const fs = require('fs');
const path = require('path');

class UniqueInt {
    constructor() {
        this.seenIntegers = Array(2047).fill(false); // Range from -1023 to 1023
        this.uniqueIntegers = [];
    }

    processFile(inputFilePath, outputFilePath) {
        console.log(`Processing file: ${inputFilePath}`);
        const data = fs.readFileSync(inputFilePath, 'utf8');
        const lines = data.split('\n');
        lines.forEach(line => {
            this.readNextItemFromLine(line);
        });

        this.writeResults(outputFilePath);
    }

    readNextItemFromLine(line) {
        line = line.trim();
        if (line === '') return;

        const parts = line.split(/\s+/);
        if (parts.length !== 1) return;

        const item = parts[0];
        const intVal = parseInt(item, 10);
        if (isNaN(intVal) || item.includes('.') || intVal < -1023 || intVal > 1023) {
            console.log(`Skipping invalid line: ${line}`);
            return;
        }

        const index = intVal + 1023;
        if (!this.seenIntegers[index]) {
            this.seenIntegers[index] = true;
            this.uniqueIntegers.push(intVal);
            console.log(`Added integer: ${intVal}`);
        }
    }

    writeResults(outputFilePath) {
        this.uniqueIntegers.sort((a, b) => a - b);
        const outputData = this.uniqueIntegers.join('\n') + '\n';
        fs.writeFileSync(outputFilePath, outputData, 'utf8');
        console.log(`Results written to: ${outputFilePath}`);
    }
}

// Define paths - use absolute paths
const sampleInputsDir = path.resolve('C:/Users/HP/OneDrive/Documents/Programming docs/dsahw01/hw01/sample_inputs');
const sampleResultsDir = path.resolve('C:/Users/HP/OneDrive/Documents/Programming docs/dsahw01/hw01/sample_results');

// Process each input file in the sample inputs directory
fs.readdirSync(sampleInputsDir).forEach(file => {
    const inputFilePath = path.join(sampleInputsDir, file);
    const outputFilePath = path.join(sampleResultsDir, `${file}_results.txt`);
    const uniqueInt = new UniqueInt();
    uniqueInt.processFile(inputFilePath, outputFilePath);
});
