function rotateGrid(element) {
    let currentRotation = parseInt(element.getAttribute("data-rotate"));

    if (currentRotation === 0) {
        element.style.transform = "rotate(90deg)";
        element.setAttribute("data-rotate", "90");
    } else if(currentRotation === 90){
        element.style.transform = "rotate(180deg)";
        element.setAttribute("data-rotate", "180");
    }else if (currentRotation===180){
        element.style.transform = "rotate(270deg)";
        element.setAttribute("data-rotate", "270");
    }else{
        element.style.transform = "rotate(0deg)";
        element.setAttribute("data-rotate", "0");
    }
}
