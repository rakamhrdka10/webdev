const char = document.getElementById("dino")
const cactus = document.getElementById("cactus")
const PlayerScore = document.querySelector(".score");

let score = 0;
let interval = null;

let jmlscore = () => {
    score++;
    PlayerScore.innerHTML = `Score : ${score}`;
};

function jump(){
    if(char.classList != "animate"){
        char.classList.add("animate");
        
    }
    setTimeout(function(){
        char.classList.remove("animate")
    },500)
    interval= setInterval(jmlscore, 100)


}

const hitCactus = setInterval(function(){
    const charTop = parseInt (window.getComputedStyle(char).getPropertyValue("top"))
    const cactusleft = parseInt (window.getComputedStyle(cactus).getPropertyValue("left"))

if(cactusleft < 96 && cactusleft > 0 && charTop >= 60){
    cactus.style.animation = "none"
    cactus.style.display = "none"
    if(confirm("yah kurang skillnya, mau ulang?")){
        window.location.reload()
    }
}
})
