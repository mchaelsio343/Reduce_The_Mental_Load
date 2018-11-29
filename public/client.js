$(function () {
	$('#datetimepicker1').datetimepicker();
});

$(function () {
	$('#datetimepicker2').datetimepicker();
});

//blind the button with event listener
var AddTODO_Btn = document.getElementById("AddTODO");
AddTODO_Btn.addEventListener("click", requestAddTODO);
	//inform server to insert a TODO task to DB by ajax
function requestAddTODO(e){
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

    function TODOMarkDone(id) {
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
    function AppointmentMarkDone(id) {
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
    function AppointmentDelete(id) {
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

    	//blind the button with event listener
	var AddCategory_Btn = document.getElementById("AddCategory");
	AddCategory_Btn.addEventListener("click", requestAddCategory);

	//inform server to insert a TODO task to DB by ajax
	function requestAddCategory(e){
		//pack up the data that will be sent to the server
		var dataToServer = {};
		dataToServer.categoryName = document.getElementById("categoryName").value;
		dataToServer = JSON.stringify(dataToServer);

		//test log
		console.log("We are inside requestAddCategory(). dataToServer: ");
		console.log(dataToServer)

		
		//connect with the server
		var req = new XMLHttpRequest();
		req.open("POST","/addCategory",true);
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

function CategoryDelete(id) {
    var dataToServer = {};
    dataToServer.id = id;
    dataToServer = JSON.stringify(dataToServer);

    //connect with the server
    var req = new XMLHttpRequest();
    req.open("POST","/deleteCategory",true);
    req.setRequestHeader("Content-Type", "application/json");

    //callback
    req.addEventListener("load",function(){
        if(req.status >= 200 && req.status < 400){
            window.location.assign('/')
        } else {
            console.log("Error in network request: " + req.statusText);
     }
    });
    //send the data to server
    req.send(dataToServer);
    event.preventDefault();
}    
