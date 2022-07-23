let my_data = [{
    "name": "Zyad",
    "age": "20",
    "email": "zyad@gmail.com",
    "address": "Cairo",
    "date_of_birth": "2022-06-09",
    "state": "checked"
}, {
    "name": "Mohamed",
    "age": "22",
    "email": "Mohamed@gmail.com",
    "address": "NY",
    "date_of_birth": "2022-01-22",
    "state": ""
},{
    "name": "Ahmed",
    "age": "30",
    "email": "Ahmed@gmail.com",
    "address": "Alex",
    "date_of_birth": "2021-05-13",
    "state": ""
}, {
    "name": "Mostafa",
    "age": "22",
    "email": "Mostafa@gmail.com",
    "address": "DC",
    "date_of_birth": "2006-11-22",
    "state": "checked"
}]

// Global Variables
let table = document.getElementById("table_body");
let row;
let index_to_edit
let save_edit = false

// Global Functions
function log (message) {console.log(message)};

// Load all the available data when the page is loaded

function generate (data) {
        for (let i = 0; i < data.length; i++){
            row = `<tr> 
            <td class="name">${data[i].name}</td>
            <td class="age">${data[i].age}</td>
            <td class="email">${data[i].email}</td>
            <td class="address">${data[i].address}</td>
            <td class="date"><input type="date" disabled value="${data[i].date_of_birth}"/></td>
            <td class="checkbox"><input type="checkbox" ${data[i].state} disabled/></td>
            <td> <div class="d_e"><button id="delete" onclick="delete_this_data(${[i]})">❌</button><button class="edit" onclick="edit_this_data(${[i]}, my_data)">🖋</button></div></td>
            </tr>`;
            table.innerHTML += row;
            }
           log("Generate")
        };
generate(my_data);


//add data to the array

function add_data_fun (data) {
            table.innerHTML = "";
            for (let i = 0; i < data.length; i++){
            row = `<tr> 
            <td class="name">${data[i].name}</td>
            <td class="age">${data[i].age}</td>
            <td class="email">${data[i].email}</td>
            <td class="address">${data[i].address}</td>
            <td class="date"><input type="date" disabled value="${data[i].date_of_birth}"/></td>
            <td class="checkbox"><input type="checkbox" ${data[i].state} disabled/></td>
            <td> <div class="d_e"><button id="delete" disabled onclick="delete_this_data(${[i]})">❌</button><button class="edit" disabled onclick="edit_this_data(${[i]}, my_data)">🖋</button></div></td>
            </tr>`;
            table.innerHTML += row;
            }
            row = `<tr> 
            <td><input type="text" required id="name"></td>
            <td><input type="text" id="age"></td>
            <td><input type="email" id="email"></td>
            <td><input type="text" id="address"></td>
            <td class="date"><input type="Date" id="date_of_birth" required pattern="\d{4}-\d{2}-\d{2}"></td>
            <td><input type="checkbox" id="checkbox"></td>
            <td> <div class="d_e"><button disabled id="delete" onclick="delete_this_data()">❌</button><button disabled class="edit" onclick="edit_this_data()">🖋</button></div></td>
            </tr>`;
            document.getElementById("add_data").setAttributeNode(document.createAttribute("disabled"));
            document.getElementById("save_data").disabled="";
            table.innerHTML += row;
}


//save data to the array after adding it



function save_data_fun () {
    if (save_edit === false) {
        let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let email = document.getElementById("email").value;
        let address = document.getElementById("address").value;
        let date_of_birth  = document.getElementById("date_of_birth").value;
        if (name === "" || age === "" || email  === "" || address  === "" || date_of_birth === "") {
            document.getElementById("err_msg").hidden="";
        } else {
            document.getElementById("err_msg").setAttributeNode(document.createAttribute("hidden"));
            document.getElementById("save_data").setAttributeNode(document.createAttribute("disabled"));
            document.getElementById("add_data").disabled="";
            if (document.getElementById("checkbox").checked) {
                state = "checked";
            }else {
                state = "";
            };
            let new_array_data = {
                "name": name,
                "age": age,
                "email": email,
                "address": address,
                "date_of_birth": date_of_birth,
                "state": state
            };
            my_data.push(new_array_data);
            table.innerHTML = "";
            generate(my_data);
        }
    }
}


// delete specific data

function delete_this_data (i) {
    my_data.splice(i, 1);
    table.innerHTML = ""
    generate(my_data);
}


// edit button to the data

function edit_this_data (i, data) {
    save_edit = true
    btn_edit = true
    let table = document.getElementById("table_body")
    table.innerHTML = ""
    document.getElementById("add_data").setAttributeNode(document.createAttribute("disabled"))
    document.getElementById("save_data").disabled="";
     for (let e = 0; e < data.length; e++){
        if (e != i) {
             row = `<tr> 
            <td>${data[e].name}</td>
            <td>${data[e].age}</td>
            <td>${data[e].email}</td>
            <td>${data[e].address}</td>
            <td><input type="date" disabled value="${data[e].date_of_birth}"/></td>
            <td><input type="checkbox" disabled ${data[e].state}/></td>
            <td><button id="delete" onclick="delete_this_data(${[e]})" disabled>❌</button><button class="edit" onclick="edit_this_data()" disabled>🖋</button></td>
            </tr>`;
        } else {
             row = `<tr> 
            <td><input type="text" required id="name" value="${data[e].name}"></td>
            <td><input type="text" id="age" value="${data[e].age}"></td>
            <td><input type="email" id="email" value="${data[e].email}"></td>
            <td><input type="text" id="address" value="${data[e].address}"></td>
            <td><input type="Date" id="date_of_birth" required pattern="\d{4}-\d{2}-\d{2}" value="${data[e].date_of_birth}"></td>
            <td><input type="checkbox" id="checkbox" ${data[e].state}></td>
            <td><button id="delete" onclick="delete_this_data(${[e]}) disabled" disabled>❌</button><button class="edit" onclick="edit_this_data()" disabled>🖋</button></td>
            </tr>`;
            index_to_edit = e
            log(index_to_edit)
        }
            table.innerHTML += row
            }
            
}
function save_edited_data() {
    if (save_edit === true) {
        let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let email = document.getElementById("email").value;
        let address = document.getElementById("address").value;
        let date_of_birth  = document.getElementById("date_of_birth").value;    
        if (name === "" || age === "" || email  === "" || address  === "" || date_of_birth === "") {
            document.getElementById("err_msg").hidden="";
        } else {
        document.getElementById("err_msg").setAttributeNode(document.createAttribute("hidden"));
        document.getElementById("save_data").setAttributeNode(document.createAttribute("disabled"))
        document.getElementById("add_data").disabled="";
        console.log("edit")
        my_data[index_to_edit].name = name;
        my_data[index_to_edit].age = age;
        my_data[index_to_edit].email = email;
        my_data[index_to_edit].address = address;
        my_data[index_to_edit].date_of_birth = date_of_birth;
        if (document.getElementById("checkbox").checked) {
                my_data[index_to_edit].state = "checked";
            }else {
                my_data[index_to_edit].state = "";
            };
        table.innerHTML = "";
        generate(my_data);
        }
    }
}