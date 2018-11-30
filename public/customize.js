function ChangeView() {
    var view = [0, 0, 0, 0, 0, 0];
    var checkboxes = document.getElementsByName("changeView");
    for (var i = 0; i < 6; i++) {
        if (checkboxes[i].checked)
        {
           view[i] = 1;
        }
    }

    var dataToServer = {};
    dataToServer.view = view;
    dataToServer = JSON.stringify(dataToServer);

    //connect with the server
    var req = new XMLHttpRequest();
    req.open("POST","/changeView",true);
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
