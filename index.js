function handleFormSubmit(event){


    event.preventDefault();

    let myObj = {
        amount : event.target.amount.value,
        description : event.target.description.value,
        category : event.target.category.value
    };

    let myObj_str = JSON.stringify(myObj);

    localStorage.setItem(myObj.category, myObj_str);

    event.target.amount.value = '';
    event.target.description.value = '';
    event.target.category.value = '';

    const string = `${myObj.category} - ${myObj.description} - ${myObj.amount}`;

    const newLi = document.createElement('li');
    const newLiText = document.createTextNode(string);
    newLi.appendChild(newLiText);
    const list = document.querySelector("ul");
    list.appendChild(newLi);

    //Delete button 

    const deleteBtn = document.createElement('button');
    const deleteBtnText = document.createTextNode('Delete Expense');
    deleteBtn.appendChild(deleteBtnText);
    deleteBtn.className = 'delete-btn';
    newLi.appendChild(deleteBtn);

    //Edit button
    
    const editBtn = document.createElement('button');
    const editBtnText = document.createTextNode('Edit Expense');
    editBtn.appendChild(editBtnText);
    editBtn.className = 'edit-btn';
    newLi.appendChild(editBtn);

    //Delete functionality
    list.addEventListener('click', function(event){
        if(event.target.classList.contains('delete-btn')){
            const pointToDelete = event.target.parentElement;
            pointToDelete.remove();
            localStorage.removeItem(myObj.category);
        } else if(event.target.classList.contains('edit-btn')){
            handleEdit(myObj);
        }
    });

    function handleEdit(userObj){

        newLi.remove();

        event.target.amount.value = userObj.amount;
        event.target.description.value = userObj.description;
        event.target.category.value = userObj.category;

        localStorage.removeItem(userObj.category);
    }
}

module.exports = handleFormSubmit;