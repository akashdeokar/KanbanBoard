let modal = document.querySelector(".modal-backdrop");
let add_button = document.querySelector(".add-btn");

add_button.addEventListener("click",function(){
    modal.style.display = modal.style.display == "flex" ? "none" : "flex"
})