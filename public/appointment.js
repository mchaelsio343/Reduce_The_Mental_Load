//blind the button with event listener
var AddAPPOINTMENT_Btn = document.getElementById("AddAPPOINTMENT");
AddAPPOINTMENT_Btn.addEventListener("click", requestAddAPPOINTMENT);
//inform server to insert a TODO task to DB by ajax
function requestAddAPPOINTMENT(e){
    //pack up the data that will be sent to the server
    var dataToServer = {};
    dataToServer.appointmentName = document.getElementById("appointmentName").value;
    dataToServer.appointmentLocation = document.getElementById("appointmentLocation").value;
    rawDate = document.getElementById("appointmentDate").value;
    dataToServer.appointmentDate = moment(rawDate).format('YYYY-MM-DD HH:mm:ss');   //re-format date for DB
    dataToServer.appointmentDescription = document.getElementById("appointmentDescription").value;
    dataToServer = JSON.stringify(dataToServer);
    //test log
    console.log("We are inside requestAddAPPOINTMENT(). dataToServer: ");
    console.log(dataToServer)

    //connect with the server
    var req = new XMLHttpRequest();
    req.open("POST","/addAPPOINTMENT",true);
    req.setRequestHeader("Content-Type", "application/json");
    //callback
    req.addEventListener("load",function(){
    if(req.status >= 200 && req.status < 400){
        window.location.assign('/')
    } else {
    console.log("Error in network request: " + req.statusText);
    }});
    //send the data to server
    req.send(dataToServer);

    event.preventDefault();
}

function AppointmentDelete(id) {
    if (confirm('Are you sure you want to delete this appointment?')) {
        var dataToServer = {};
        dataToServer.id = id;
        dataToServer = JSON.stringify(dataToServer);
        //connect with the server
        var req = new XMLHttpRequest();
        req.open("POST","/deleteAppointment",true);
        req.setRequestHeader("Content-Type", "application/json");
        //callback
        req.addEventListener("load",function(){
            if(req.status >= 200 && req.status < 400){
                window.location.assign('/')
            } else {
                console.log("Error in network request: " + req.statusText);
            }});
        //send the data to server
        req.send(dataToServer);
        event.preventDefault();
    }
}

function AppointmentMarkDone(id) {
    console.log("in markDone.js")
    if(confirm('Are you sure you want to mark appointment attended?')){
    var dataToServer = {};
    dataToServer.id = id;
    dataToServer = JSON.stringify(dataToServer);
    //connect with the server
    var req = new XMLHttpRequest();
    req.open("POST","/markAppointment",true);
    req.setRequestHeader("Content-Type", "application/json");
    //callback
    req.addEventListener("load",function(){
        if(req.status >= 200 && req.status < 400){
            window.location.assign('/')
        } else {
            console.log("Error in network request: " + req.statusText);
        }});
    //send the data to server
    req.send(dataToServer);
    event.preventDefault();
    }
}