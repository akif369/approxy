const countdown = () => {
    const countDate = new Date("September 25, 2021 10:00:00").getTime()
    const now = new Date().getTime();
    const gap = countDate - now;
    
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour *24;
    const textDay = Math.floor(gap / day)
    const textHour = Math.floor((gap % day) / hour)
    const textMinute = Math.floor((gap % hour) / minute)
    const textSecond= Math.floor((gap % minute)/ second)

    // console.log(textDay);
    // console.log(textHour);
    // console.log(textMinute);
    // console.log(textSecond);
    
    document.querySelector(".day").innerHTML = textDay;
    document.querySelector(".hour").innerHTML = textHour;
    document.querySelector(".minute").innerHTML = textMinute;
    document.querySelector(".second").innerHTML = textSecond;
    
}

const dot = () => {


    let wait = document.getElementById("dot");
    if(wait.innerHTML.length > 3)
        wait.innerHTML ="";
    else
        wait.innerHTML += ".";
}

setInterval(dot,500);
setInterval(countdown,1000);