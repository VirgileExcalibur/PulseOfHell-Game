export function calcScore(startTime) {
    const now = Date.now();
    const timeSpent = (now - startTime) / 1000; // convert to seconds

    console.log("Time spent playing:", timeSpent, "s");
    return Math.trunc(timeSpent * 100000);
}


export let cachedScores = null;

export async function loadLeaderboardOnce() {
    if (cachedScores) return cachedScores; // no new request
    const res = await fetch('/php/script.php');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    cachedScores = await res.json();
    return cachedScores;
}

export async function sortLeaderboard(){
    cachedScores.sort().reverse();
}