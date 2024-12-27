let gameWrapper = document.querySelector('.game-wrapper');

let allNumbers = Array.from(Array(80).keys()).map(num => num +1); // [1...80];
let mojaKombinacija = [6,7,8];
let kvote = [3.6,15,60,250,1000,2800,12500,35000];
let stats = {};
fillStats();
let ulog = 1;
let total = 0;
let pobede = 0;

createBoxNumbers()
runStat()
runGame()

function runGame(){
    let loopNum = 0;
    let copyNumbers = [...allNumbers];
    let loop = setInterval(()=>{
        let rand = Math.floor(Math.random() * copyNumbers.length);
        let currentNumber = copyNumbers[rand];
        document.querySelector(`[data-id="${currentNumber}"]`).classList.add("active");
        if(loopNum === 19){
        document.querySelector(`[data-id="${currentNumber}"]`).classList.add("final");
        clearInterval(loop)
        }
        copyNumbers.splice(rand,1);
        loopNum++
    },1500);
}

function runStat(){
    let brojKola = 100000;
    for(let k = 0; k < brojKola; k++){
        let brojPogodaka = 0;
        let izvuceniBrojevi = [];
        let copyNumbers = [...allNumbers];
        // pocinje izvlacenje
        for(let i = 0;i < 20;i++){
            let rand = Math.floor(Math.random() * copyNumbers.length);
            let currentNumber = copyNumbers[rand]; // izvucen broj
            izvuceniBrojevi.push(currentNumber);  
            if(mojaKombinacija.includes(currentNumber)){
                brojPogodaka++;
            }
            copyNumbers.splice(rand,1);
        }
        if(brojPogodaka === mojaKombinacija.length){
            // console.log(`Pogodak! Vasa kvota je ${kvote[brojPogodaka-1]}`);
            pobede++;
        }
        if(brojPogodaka === mojaKombinacija.length){
            stats["pogodci"]++
        }else{
            stats[brojPogodaka]++;
        }
        
    }
    total = (stats["pogodci"] * ulog) * kvote[mojaKombinacija.length-1]
    console.log(stats);
    console.log(`Ukupan ulog je ${brojKola * ulog} a ukupan dobitak je ${total}.`);

}



function createBoxNumbers(){
    let text = "";
    allNumbers.forEach((num, index) => {
        text += `
            <div class="number" data-id="${index+1}">${num}</div>
        `.trim();
    })
    gameWrapper.innerHTML = text;
}

function fillStats(){
    for(let i = 0;i < (mojaKombinacija.length+1);i++){
        if(i === mojaKombinacija.length){
            stats["pogodci"] = 0;
        }else{
            stats[i] = 0;
        }
    }
}
