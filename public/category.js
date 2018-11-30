//bind the button with event listener
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
