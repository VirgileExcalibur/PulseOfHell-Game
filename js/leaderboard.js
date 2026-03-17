export function calcScore(startTime){
    let now = Date.now();
    now -= startTime;
    console.log("Time spend playing : ", now, "s" )
}