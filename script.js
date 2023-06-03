let modal = document.querySelector(".modal-backdrop");
let add_button = document.querySelector(".add-btn");
let delete_btn = document.querySelector(".delete-btn");
let ticket_cont = document.querySelector(".ticket-cont");
let textarea = document.querySelector("textarea");
let priority_colors = document.querySelectorAll(".priority-cont > .priority-color");
let filter_colors = document.querySelectorAll(".filter-cont > .color");
let active_color = "red";
let delete_status = false
let modal_status = false
let uid = new ShortUniqueId();

add_button.addEventListener("click",function(){
    modal.style.display = modal_status ? "none" : "flex";
    modal_status = !modal_status;
});

delete_btn.addEventListener("click",function(){
    delete_btn.style["color"] = delete_status ? "initial" : "red";
    delete_status = !delete_status;
});

textarea.addEventListener("keydown",function(e){
    if(e.key == "Enter"){
        let task = textarea.value;
        if(task.trim() == ""){
            alert("Task cannot be Empty !!");
            return;
        }
        textarea.value = "";
        modal.style.display = "none";
        modal_status = !modal_status;
        create_ticket(task);
    }
});

for(let i=0;i<priority_colors.length;i++){
    priority_colors[i].addEventListener("click",function(e){
        let color = e.target.classList[1];
        let active_color_box = document.querySelector(".priority-cont > .priority-color.active");
        active_color_box.classList.remove("active");
        e.target.classList.add("active");
        active_color = color;
    })
}

for(let i=0;i<filter_colors.length;i++){
    filter_colors[i].addEventListener("click",function(){
        let tickets = document.querySelectorAll(".ticket-cont > .ticket");
        for(let j=0;j<tickets.length;j++){
            if(filter_colors[i].classList[1] == tickets[j].querySelector(".ticket-priority").classList[1]){
                tickets[j].style.display = "block";
            }else{
                tickets[j].style.display = "none";
            }
        }
    })
}

function create_ticket(task){
    let ticket = document.createElement("div");
    ticket.setAttribute("class","ticket");
    ticket.innerHTML = `<div class="ticket-priority ${active_color}"></div>
                        <div class="ticket-id">#${uid()}</div>
                        <div class="ticket-description">${task}</div>`
    ticket_cont.appendChild(ticket);
    ticket.addEventListener("click",function(){
        if(delete_status){
            ticket.remove();
        }
    })
}