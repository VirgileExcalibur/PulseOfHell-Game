export function calcScore(startTime) {
    const now = Date.now();
    const timeSpent = (now - startTime) / 1000; // convert to seconds

    console.log("Time spent playing:", timeSpent, "s");
    return Math.trunc(timeSpent * 100000);
}