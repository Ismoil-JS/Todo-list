const $todoInput = document.querySelector("#form-add-input");
const $form = document.querySelector('#todolist-form');
const $taskContainer = document.querySelector("#task-container");
const clearbtn = document.querySelector('#clear-btn');
$form.addEventListener("submit", e => {
  e.preventDefault();
  if($todoInput.value.trim().length > 0){
    const time = new Date();
    const $taskMainElement = document.createElement("div");
    const $taskMainTitle = document.createElement("p");
    const $btnsWrapperElement = document.createElement("div");
    $taskMainTitle.innerText = $todoInput.value;
    $taskMainElement.className = "task-item";
    $btnsWrapperElement.className = "task-item__btn-wrapper";
    $btnsWrapperElement.innerHTML = `
      <button class="complete"> <i class="fas fa-circle-check"></i> <br> Complete </button>
      <button class="edit"> <i class="fas fa-edit"></i> <br> Edit </button>
      <button> <i class="fas fa-clock"></i> <br> ${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}:${time.getSeconds().toString().padStart(2, "0")} </button> 
      <button class="delete"> <i class="fas fa-trash"></i> <br> Delete  </button>
    `
    $taskMainElement.appendChild($taskMainTitle);
    $taskMainElement.appendChild($btnsWrapperElement);
    $taskContainer.appendChild($taskMainElement);
    $todoInput.value = "";
  }
})
$taskContainer.addEventListener("click", (e) => {
  clearbtn.addEventListener("click", (e) => {
    e.target.parentElement.remove();
})
  if(e.target.className == "complete" ){
    e.target.parentElement.previousSibling.classList.toggle("completed")
  }
  else if(e.target.className == "delete"){
    const isAgreedToDelete = ('Are you sure to delete this item?')
    let extra = document.createElement("div");
    extra.style.marginTop = "20px"
    extra.id = "extra-div";
    $taskContainer.appendChild(extra);
    let paragraph = document.createElement("p");
    paragraph.id = "extra-paragraph";
    paragraph.innerHTML = "Sizning 1 kunlik ishingiz muvofaqiyatli o'chirildi!"
    extra.appendChild(paragraph);
      if(isAgreedToDelete){
        e.target.parentElement.parentElement.classList.add("remove-item")
       setTimeout(() => {
          e.target.parentElement.parentElement.remove();
        }, 300)
      }
  }
  else if(e.target.className == "edit"){
    if(e.target.parentElement.previousSibling.hasAttribute("contenteditable")){
      e.target.parentElement.previousSibling.removeAttribute("contenteditable");
      e.target.parentElement.previousSibling.classList.remove("changing");
      e.target.innerHTML = '<i class="fas fa-edit"></i> <br> Edit';
      e.target.style.background = "gold"
    }
    else{
      e.target.parentElement.previousSibling.setAttribute("contenteditable", true);
      e.target.parentElement.previousSibling.classList.add("changing")
      e.target.innerHTML = '<i class="fas fa-check-double"></i> <br> Done';
      e.target.style.background = "purple"
    }
  }
  else{
    console.log("bosilmadi")
  }
});
