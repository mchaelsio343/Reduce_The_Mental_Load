// change homepage view
var addTODO = document.getElementById("addTODOFlag");
var addAppointment = document.getElementById("addAppointmentFlag");
var addCategory = document.getElementById("addCategoryFlag");
var viewTODO = document.getElementById("viewTODOFlag");
var viewAppointment = document.getElementById("viewAppointmentFlag");
var viewCategory = document.getElementById("viewCategoryFlag");

if (addTODO.value === 0) {
    document.getElementById("addTODO").style.display = "none";
}
if (addAppointment.value === 0) {
    document.getElementById("addAppointment").style.display = "none";
}
if (addCategory.value === 0) {
    document.getElementById("addCategory").style.display = "none";
}
if (viewTODO.value === 0) {
    document.getElementById("viewTODO").style.display = "none";
}
if (viewAppointment.value === 0) {
    document.getElementById("viewAppointment").style.display = "none";
}
if (viewCategory.value === 0) {
    document.getElementById("viewCategory").style.display = "none";
}
