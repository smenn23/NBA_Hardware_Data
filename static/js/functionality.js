function showPlayer(player_name) {
    document.getElementById('player_info').innerText = player_name;
}
function deleteSpace(player_name){
    return player_name.replaceAll(" ","_").replaceAll("'","\\'");
}
var stats = [parseInt(document.getElementById("asgs").innerHTML),parseInt(document.getElementById("mvps").innerHTML),parseInt(document.getElementById("fmvps").innerHTML),parseInt(document.getElementById("dpoys").innerHTML),parseInt(document.getElementById("rings").innerHTML)];
var players = document.getElementById("names").innerHTML;
var playerList = new Set()
var start = 0
var foundStart = false;
var doubleQuote = false;
for(let i = 0; i < players.length; i++) {
    let currChar = players.charAt(i);
    if(foundStart) {
        if(doubleQuote) {
            if(currChar == '\"') {
                playerList.add(players.substring(start,i));
                foundStart = false;
                doubleQuote = false;
            }
        }
        else{
            if(currChar == '\'' || currChar == '\"') {
                playerList.add(players.substring(start,i));
                foundStart = false;
            }         
        }
        
    }    

    else {
        if(currChar.toUpperCase() !== currChar.toLowerCase()) {
            start = i;
            foundStart = true;
            if(players.charAt(i - 1) == '\"') {
                doubleQuote = true;
            }
        }
    }
}
let grid = document.getElementById("grid");
if (playerList.size > 0) {
    document.getElementById('click_prompt').innerText = document.getElementById('click_prompt').innerText + "Click a player!";
    document.getElementById('total').innerText = document.getElementById('total').innerText + "Total Players: " + playerList.size;
}
playerList = (Array.from(playerList)).sort();
playerList.forEach((player)=>{
    let newChild = document.createElement('button');
    newChild.setAttribute('class','grid-buttons');
    newChild.innerText = player;
    newChild.className = 'grid-item';
    
    newChild.setAttribute('onclick',"window.location.href='/results" + stats[0] + "," + stats[1] + "," + stats[2] + "," + stats[3] + "," + stats[4] + "/player/" + deleteSpace(player) + "';")
        
    grid.appendChild(newChild);
}) 


document.getElementById("find_button").setAttribute("onclick", "window.location.href='/results" + stats[0] + "," + stats[1] + "," + stats[2] + "," + stats[3] + "," + stats[4] + "';");   

function changePlayerHTML(element,name,stats,link) {
    element.innerHTML = "<b>" + name + "</b><br>All Star Appearances: " + stats[0] + "<br>MVPS: "+ stats[1] +"<br>Finals MVPS: "+ stats[2] +"<br>DPOYs: "+ stats[3] +"<br>Rings: " + stats[4];
    imgDiv = document.createElement('div');
    imgDiv.setAttribute("style", "text-align: center; position: absolute; top: 0px; right: 200px");
    

    img_element = document.createElement('img');
    img_element.setAttribute("src",link);
    img_element.setAttribute("alt", "Image not availiable")
    
    imgDiv.appendChild(img_element);
    element.appendChild(imgDiv);
}
var player_stats = document.getElementById("player_info").innerText;
var player_element = document.getElementById("player_info");
if(player_stats !== "") {
    newStat = player_stats.substring(1,player_stats.length);
    statList = newStat.split(",");
    for(let i = 0; i < statList.length; i++) {
        statList[i] = parseInt(statList[i]);
    }
    

    let player_name = document.getElementById("player_name").innerHTML;
    let link = document.getElementById('player_image').innerHTML;
    player_name = player_name.replaceAll("_", " ");
    window.onload = changePlayerHTML(player_element,player_name,statList,link);
}

let link = document.getElementById('player_image').innerHTML;







function increment(ind,tick) {
    if (tick == -1 && stats[ind] == 0) {
        return;
    }
    stats[ind]+=tick;
    if (ind == 0) {
        document.getElementById("asgs").innerHTML = stats[0];
    }
    else if (ind == 1 ) {
        document.getElementById("mvps").innerHTML = stats[1];
        
    }
    else if (ind == 2 ) {
        document.getElementById("fmvps").innerHTML = stats[2];
        
    }
    else if (ind == 3 ) {
        document.getElementById("dpoys").innerHTML = stats[3];
        
    }
    else {
        document.getElementById("rings").innerHTML = stats[4];
    }
    document.getElementById("find_button").setAttribute("onclick", "window.location.href='/results" + stats[0] + "," + stats[1] + "," + stats[2] + "," + stats[3] + "," + stats[4] + "';");    
}



