let rotate = [0];
let click = 0;
document.addEventListener("DOMContentLoaded", function(){
    let con = document.getElementsByTagName("div")[0];
    let el = document.getElementsByClassName("element")[0];
    let p = document.getElementsByTagName("p")[0];
    let sh = document.createElement("div");
    sh.classList.add("element");
    document.body.appendChild(sh);
    sh.style.opacity = "50%";
    sh.style.background = "#9e9a9a";
    el.style.left = con.offsetLeft;
    el.style.top = con.offsetTop;
    sh.style.left = con.offsetLeft;
    sh.style.top = con.offsetTop;
    sh.style.zIndex = 10;
    el.style.zIndex = 11;
    const socket = new WebSocket("wss://puzzles-server.onrender.com");
    el.addEventListener("click", function(){
        setTimeout(function(){
            el.style.boxShadow = "0px 0px 10px blue";
            click = 1;
        }, 200);
    });
    document.addEventListener("click", function(event) {
        if(click == 1){
            let x = event.clientX;
            let y = event.clientY;
            if(rotate[0] % 90 != 0){
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
            x -= el.clientWidth / 2 + con.offsetLeft;
            y -= el.clientHeight / 2 + con.offsetTop;
            socket.send([x, y]);
            setTimeout(function(){
                click = 0;
                el.style.boxShadow = "";
            }, 200);
        }
    });
    document.addEventListener("mousemove", function(event){
        if(click == 1){
            let xQ = event.clientX;
            let yQ = event.clientY;
            
            if(rotate[0] % 90 != 0){
                let hypo = Math.sqrt(el.clientWidth * el.clientWidth + el.clientHeight * el.clientHeight);
                if(xQ < con.offsetLeft + hypo / 2){
                    xQ = con.offsetLeft + hypo / 2;
                }
                if(yQ < con.offsetTop + hypo / 2){
                    yQ = con.offsetTop + hypo / 2;
                }
                if(xQ > con.offsetLeft - hypo / 2 + con.clientWidth){
                    xQ = con.offsetLeft - hypo / 2 + con.clientWidth;
                }
                if(yQ > con.offsetTop - hypo / 2 + con.clientHeight){
                    yQ = con.offsetTop - hypo / 2 + con.clientHeight;
                }
            }
            else{
                if(xQ < con.offsetLeft + el.clientWidth / 2){
                    xQ = con.offsetLeft + el.clientWidth / 2;
                }
                if(yQ < con.offsetTop + el.clientHeight / 2){
                    yQ = con.offsetTop + el.clientHeight / 2;
                }
                if(xQ > con.offsetLeft - el.clientWidth / 2 + con.clientWidth){
                    xQ = con.offsetLeft - el.clientWidth / 2 + con.clientWidth;
                }
                if(yQ > con.offsetTop - el.clientHeight / 2 + con.clientHeight){
                    yQ = con.offsetTop - el.clientHeight / 2 + con.clientHeight;
                }
            }
            xQ -= sh.clientWidth / 2;
            yQ -= sh.clientHeight / 2;

            sh.style.left = xQ;
            sh.style.top = yQ;
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key == 'r' || event.key == 'к') {
            socket.send(1);
        }
        if (event.key == 'q' || event.key == 'й') {
            click = 0;
            el.style.boxShadow = "";
            sh.style.left = el.offsetLeft;
            sh.style.top = el.offsetTop;
        }
    });
    socket.onmessage = ({data}) => {
        data.text().then((conv) => {
            if(conv.indexOf(",") != -1){
                el.style.left = parseInt(conv.substring(0, conv.indexOf(","))) + parseInt(con.offsetLeft);
                el.style.top = parseInt(conv.substring(conv.indexOf(",") + 1, conv.length)) + parseInt(con.offsetTop);
                setTimeout(function(){
                    sh.style.left = parseInt(conv.substring(0, conv.indexOf(","))) + parseInt(con.offsetLeft);
                    sh.style.top = parseInt(conv.substring(conv.indexOf(",") + 1, conv.length)) + parseInt(con.offsetTop);
                }, 200);
            }
            if(conv == "1"){
                rotate[0] += 45;
                if(rotate[0] >= 360){
                    rotate[0] -= 360;
                }
                el.style.transform = "rotate(" + rotate[0] + "deg)";
                el.style.left = con.clientWidth / 2 - el.clientWidth / 2 + con.offsetLeft;
                el.style.top = con.clientHeight / 2 - el.clientHeight / 2 + con.offsetTop;
                sh.style.transform = "rotate(" + rotate[0] + "deg)";
                sh.style.left = con.clientWidth / 2 - el.clientWidth / 2 + con.offsetLeft;
                sh.style.top = con.clientHeight / 2 - el.clientHeight / 2 + con.offsetTop;
            }
        });
    };
});