let modal = document.querySelector(".modal-backdrop");
let add_button = document.querySelector(".add-btn");
let delete_btn = document.querySelector(".delete-btn");
let ticket_cont = document.querySelector(".ticket-cont");
let textarea = document.querySelector("textarea");
let priority_colors = document.querySelectorAll(".priority-cont > .priority-color");
let filter_colors = document.querySelectorAll(".filter-cont > .color");
let lock_icons = document.querySelectorAll(".lock > i");
let active_color = "red";
let delete_status = false
let modal_status = false
let uid = new ShortUniqueId();
let priority_color_arr = ["red","blue","pink","green"];

function toggle_modal(){
    modal.style.display = modal_status ? "none" : "flex";
    modal_status = !modal_status;
}

add_button.addEventListener("click",toggle_modal);

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

    filter_colors[i].addEventListener("dblclick",function(){
        let tickets = document.querySelectorAll(".ticket-cont > .ticket");
        tickets.forEach(function(ticket){
            ticket.style.display = "block";
        })
    })
}

let modal_close = document.querySelector(".modal-body > i");
modal_close.addEventListener("click",toggle_modal);

function create_ticket(task){
    let ticket = document.createElement("div");
    ticket.setAttribute("class","ticket");
    ticket.innerHTML = `<div class="ticket-priority ${active_color}"></div>
                        <div class="ticket-id">#${uid()}</div>
                        <div class="ticket-description">${task}</div>
                        <div class="lock">
                            <i class="fa-solid fa-lock"></i>
                        </div>`
    ticket_cont.appendChild(ticket);
    ticket.addEventListener("click",function(){
        if(delete_status){
            ticket.remove();
        }
    })
    let icon = ticket.querySelector("i");
    let ticket_des = ticket.querySelector(".ticket-description");
    icon.addEventListener("click",function(){
        if(icon.classList[1] == "fa-lock"){
            icon.classList.remove("fa-lock");
            icon.classList.add("fa-lock-open");
            ticket_des.setAttribute("contenteditable","true");

        }else{
            icon.classList.remove("fa-lock-open");
            icon.classList.add("fa-lock");
            ticket_des.setAttribute("contenteditable","false");
        }
    })
    let color = ticket.querySelector(".ticket-priority");
    color.addEventListener("click",function(e){
        let curr_color_idx = priority_color_arr.findIndex(color => color == e.target.classList[1]);
        color.classList.remove(e.target.classList[1]);
        color.classList.add(priority_color_arr[(curr_color_idx+1)%priority_color_arr.length]);
    })
}