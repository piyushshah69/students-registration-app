let studentList = [];

// Creating local storage variable if it's not already present
if (localStorage.getItem("students") === null) {
    localStorage.setItem("students", JSON.stringify([]));
} else studentList = JSON.parse(localStorage.getItem("students"))

// Storing necessary HTML elements into variables
const fullnameInput = document.getElementById('fullname');
const studentIdInput = document.getElementById('studentId');
const emailInput = document.getElementById('email');
const numberInput = document.getElementById('number');
const table = document.getElementById('table');

const submitBtn = document.getElementById('submit-btn');

// This function handles the click on edit button present inside the display table
const handleEdit = (studentId) => {
    for (let student of studentList) {
        if (student.id === studentId) {
            studentIdInput.value = student.id;
            fullnameInput.value = student.fullname;
            emailInput.value = student.email;
            numberInput.value = student.phone;
        }
    }
    table.style.display = "none";
    studentIdInput.readOnly = "true"
    submitBtn.value = "Save";
}

// This function handles click on delete button present inside the display table
const handleDelete = (studentId) => {
    const newStudentList = studentList.filter(studentData => {
        return studentData.id != studentId;
    })
    studentList = newStudentList;
    const stringifiedStudentList = JSON.stringify(studentList);
    localStorage.setItem("students", stringifiedStudentList);
    addStudentsData();
};

// This function displays the data present inside the array using table
const addStudentsData = () => {
    if (studentList.length > 0) {
        table.style.display = "table";
    }
    table.removeChild(table.lastElementChild);
    const tbody = document.createElement("tbody");
    studentList.map(student => {
        const newTr = document.createElement("tr");

        const fullnameTd = document.createElement("td");
        const idTd = document.createElement("td");
        const emailTd = document.createElement("td");
        const phoneTd = document.createElement("td");
        const iconsTd = document.createElement("td");

        fullnameTd.innerHTML = student.fullname;
        idTd.innerHTML = student.id;
        emailTd.innerHTML = student.email;
        phoneTd.innerHTML = student.phone;

        const editIcon = document.createElement("i");
        editIcon.classList.add("fa-regular", "fa-pen-to-square");
        editIcon.addEventListener("click", () => handleEdit(student.id));

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-trash");
        deleteIcon.addEventListener("click", () => handleDelete(student.id));

        iconsTd.appendChild(editIcon);
        iconsTd.appendChild(deleteIcon);
        iconsTd.id = "display-btns"
        
        newTr.appendChild(fullnameTd);
        newTr.appendChild(idTd);
        newTr.appendChild(emailTd);
        newTr.appendChild(phoneTd);
        newTr.appendChild(iconsTd)

        tbody.appendChild(newTr);
    })
    table.appendChild(tbody);
}

// This function handles the click no register button after filling the input boxes.
const handleRegister = () => {
    if (!studentIdInput.value || !fullnameInput.value || !emailInput.value || !numberInput.value) {
        alert("VALUES CAN'T BE EMPTY!!!")
        return;
    }
    for (let student of studentList) {
        if (studentList.length > 0 && student.id === studentIdInput.value) {
            alert("SAME ID ALREADY EXISTS!!!");
            return;
        };
    }
    const newStudent = {
        id: studentIdInput.value,
        fullname: fullnameInput.value,
        email: emailInput.value,
        phone: numberInput.value,
    }
    studentList.push(newStudent);
    const stringifiedStudentList = JSON.stringify(studentList);
    localStorage.setItem("students", stringifiedStudentList);
    addStudentsData();
    studentIdInput.value = "";
    fullnameInput.value = null;
    emailInput.value = "";
    numberInput.value = null;
}

// This function handles click on save button after editing the data
const handleSave = () => {
    let newStudentList = [];
    for (let student of studentList) {
        if (student.id === studentIdInput.value) {
            student = {
                id: studentIdInput.value,
                fullname: fullnameInput.value,
                email: emailInput.value,
                phone: numberInput.value,
            }
            newStudentList.push(student);
        }
        else newStudentList.push(student);
    }
    studentList = newStudentList;
    const stringifiedStudentList = JSON.stringify(studentList);
    localStorage.setItem("students", stringifiedStudentList);
    addStudentsData();
    studentIdInput.value = "";
    fullnameInput.value = null;
    emailInput.value = "";
    numberInput.value = null;
    table.style.display = "table";
}

// This function handles click on submit button
const handleSubmitClick = (e) => {
    e.preventDefault();
    if (submitBtn.value === "Register") {
        handleRegister();
    } else handleSave();
}

submitBtn.addEventListener('click', handleSubmitClick)

addStudentsData();
