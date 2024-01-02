document.addEventListener("DOMContentLoaded", function(){
    let con = document.getElementsByTagName("div")[0];
    let el = document.getElementsByTagName("div")[1];
    const socket = new WebSocket("wss://puzzles-service.onrender.com");
    document.addEventListener("click", function(event) {
        let x = event.clientX;
        let y = event.clientY;
        if(x < con.offsetLeft + el.clientWidth / 2){
            x = con.offsetLeft + el.clientWidth / 2;
        }
        if(y < con.offsetTop + el.clientHeight / 2){
            y = con.offsetTop + el.clientHeight / 2;
        }
        if(x > con.offsetLeft - el.clientWidth / 2 + con.clientWidth){
            x = con.offsetLeft - el.clientWidth / 2 + con.clientWidth;
        }
        if(y > con.offsetTop - el.clientHeight / 2 + con.clientHeight){
            y = con.offsetTop - el.clientHeight / 2 + con.clientHeight;
        }
        x -= el.offsetLeft + el.clientWidth / 2;
        y -= el.offsetTop + el.clientHeight / 2;
        socket.send([x, y]);
    });
    
    socket.onmessage = ({data}) => {
        el.style.transform = "translate(" + data[0] + "px, " + data[1] + "px)";
    };
});