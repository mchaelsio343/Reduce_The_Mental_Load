//blind the button with event listener
var AddTODO_Btn = document.getElementById("AddTODO");
AddTODO_Btn.addEventListener("click", requestAddTODO);
//inform server to insert a TODO task to DB by ajax
function requestAddTODO(e){
	console.log("in addTODO.js")
	//pack up the data that will be sent to the server
	var dataToServer = {};
	dataToServer.todoName = document.getElementById("todoName").value;
	dataToServer.todoUrgency = document.getElementById("todoUrgency").value;
	rawDate = document.getElementById("todoDate").value;
	dataToServer.todoDate = moment(rawDate).format('YYYY-MM-DD HH:mm:ss');  //re-format date for DB
	dataToServer.todoCategory = document.getElementById("todoCategory").value;
	dataToServer = JSON.stringify(dataToServer);
	//test log
	console.log("We are inside requestAddTODO(). dataToServer: ");
	console.log(dataToServer)

	//connect with the server
	var req = new XMLHttpRequest();
	req.open("POST","/addTODO",true);
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

function TODODelete(id) {
	if (confirm('Are you sure you want to delete this task?')) {
        var dataToServer = {};
        dataToServer.id = id;
        dataToServer = JSON.stringify(dataToServer);
        //connect with the server
        var req = new XMLHttpRequest();
        req.open("POST","/deleteTODO",true);
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

function TODOMarkDone(id) {
	if(confirm('Are you sure you want to mark task complete?')){
    var dataToServer = {};
    dataToServer.id = id;
    dataToServer = JSON.stringify(dataToServer);
    //connect with the server
    var req = new XMLHttpRequest();
    req.open("POST","/markTODO",true);
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