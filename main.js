let rotate = [0];
document.addEventListener("DOMContentLoaded", function(){
    let con = document.getElementsByTagName("div")[0];
    let el = document.getElementsByTagName("div")[1];
    el.style.left = con.offsetLeft;
    el.style.top = con.offsetTop;
    const socket = new WebSocket("wss://puzzles-server.onrender.com");
    let p = document.getElementsByTagName("p")[0];
    document.addEventListener("click", function(event) {
        let x = event.clientX;
        let y = event.clientY;
        if(rotate % 90!=0){
            let hypo = Math.sqrt(el.clientWidth * el.clientWidth + el.clientHeight * el.clientHeight);
            if(x < con.offsetLeft + hypo / 2){
                x = con.offsetLeft + hypo / 2;
            }
            if(y < con.offsetTop + hypo / 2){
                y = con.offsetTop + hypo / 2;
            }
            if(x > con.offsetLeft - hypo / 2 + con.clientWidth){
                x = con.offsetLeft - hypo / 2 + con.clientWidth;
            }
            if(y > con.offsetTop - hypo / 2 + con.clientHeight){
                y = con.offsetTop - hypo / 2 + con.clientHeight;
            }
        }
        else{
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
        }
        x -= el.clientWidth / 2;
        y -= el.clientHeight / 2;
        socket.send([x, y]);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key == 'r') {
            socket.send(1);
        }
    });
    
    socket.onmessage = ({data}) => {
        data.text().then((conv) => {
            if(conv.indexOf(",") != -1){
                el.style.left = conv.substring(0, conv.indexOf(","));
                el.style.top = conv.substring(conv.indexOf(",") + 1, conv.length);
            }
            if(conv == "1"){
                rotate[0] += 45;
                if(rotate[0] >= 360){
                    rotate[0] -= 360;
                }
                el.style.transform = "rotate(" + rotate[0] + "deg)";
                el.style.left = con.clientWidth / 2 - el.clientWidth / 2 + con.offsetLeft;
                el.style.top = con.clientHeight / 2 - el.clientHeight / 2 + con.offsetTop;
            }
        });
    };
});