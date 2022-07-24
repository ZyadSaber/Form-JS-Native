// Global Variables
let table = document.getElementById("table_body");
let row;
let index_to_edit
let save_edit = false
const exsys_get_api = "http://207.180.237.36:9090/ords/exsys_api/ex_react_test_emp/exsys_react_test_emp_data?authorization=3995005&staff_id=&poffset=0&staff_short_code&staff_name="
const exsys_post_api = "http://207.180.237.36:9090/ords/exsys_api/ex_react_test_emp/exsys_react_test_emp_dml	"
let new_object = {
    "total": 5,
    "age": 25,
    "date_start_service": "01-07-2022",
    "email": "ABC@GMAIL.COM",
    "genger": "M",
    "staff_id": 1,
    "staff_name": "ALI ZAKI",
    "address": " CAIRO EGYPT",
    "staff_short_code": "AZ",
    "record_status": "q"
}
let new_array = []
let end_obj
// Global Functions
function log (message) {console.log(message)};
function state (i) {
    if (new_array[i].status === "A") {
        return "checked"
}else{
    return ""
}
};
function ch_state () {
    if (document.getElementById("checkbox").checked) {
        return "A"
}};
function clr () {
    table.innerHTML = "";
}
function rows () {
    table.innerHTML += row
}
function save (ex) {

    fetch(exsys_post_api,{
        method: "POST",
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(ex)
    }
        )
    
    }



// Load all the available data when the page is loaded

function generate () {
    fetch(exsys_get_api)
.then((s) => s.json())
.then((arr) => {
    new_array = arr.data
    end_obj = {"data":new_array}
    for (let i = 0; i < new_array.length; i++){
            row = `<tr> 
            <td class="name">${new_array[i].staff_name}</td>
            <td class="age">${new_array[i].age}</td>
            <td class="email">${new_array[i].email}</td>
            <td class="address">${new_array[i].address}</td>
            <td class="date"><input type="date" disabled  "/></td>
             <td class="checkbox"><input type="checkbox" ${state(i)} disabled/></td>
             <td> <div class="d_e"><button id="delete" onclick="delete_this_data(${[i]})">❌</button><button class="edit" onclick="edit_this_data(${[i]}, new_array)">🖋</button></div></td>
            </tr>`;
            rows();
            }
})
}
generate()



//add data to the array

function add_data_fun (data) {
            clr()
            for (let i = 0; i < data.length; i++){
            row = `<tr> 
            <td class="name">${data[i].staff_name}</td>
            <td class="age">${data[i].age}</td>
            <td class="email">${data[i].email}</td>
            <td class="address">${data[i].address}</td>
            <td class="date"><input type="date" disabled"/></td>
            <td class="checkbox"><input type="checkbox" ${state(i)} disabled/></td>
            <td> <div class="d_e"><button id="delete" disabled onclick="delete_this_data(${[i]})">❌</button><button class="edit" disabled onclick="edit_this_data(${[i]}, my_data)">🖋</button></div></td>
            </tr>`;
            rows();
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
            rows();
};



// edit button to the data

function edit_this_data (i, data) {
    save_edit = true
    btn_edit = true
    table.innerHTML = ""
    document.getElementById("add_data").setAttributeNode(document.createAttribute("disabled"))
    document.getElementById("save_data").disabled="";
     for (let e = 0; e < data.length; e++){
        if (e != i) {
             row = `<tr> 
            <td>${data[e].staff_name}</td>
            <td>${data[e].age}</td>
            <td>${data[e].email}</td>
            <td>${data[e].address}</td>
            <td><input type="date" disabled /></td>
            <td><input type="checkbox" disabled ${state(e)}/></td>
            <td><div class="d_e"><button id="delete" disabled>❌</button><button class="edit" disabled>🖋</button></dev></td>
            </tr>`;
        } else {
             row = `<tr> 
            <td><input type="text" required id="name" value="${data[e].staff_name}"></td>
            <td><input type="text" id="age" value="${data[e].age}"></td>
            <td><input type="email" id="email" value="${data[e].email}"></td>
            <td><input type="text" id="address" value="${data[e].address}"></td>
            <td><input type="Date" id="date_of_birth" required pattern="\d{4}-\d{2}-\d{2}" ></td>
            <td><input type="checkbox" id="checkbox" ${state(e)}></td>
            <td><div class="d_e"><button id="delete" disabled" disabled>❌</button><button class="edit"disabled>🖋</button></dev></td>
            </tr>`;
            index_to_edit = e
            log(index_to_edit)
        }
            rows()
            }
            
}



//save data to the array after adding it

function save_data_fun () {
    if (save_edit === false) {
        let staff_name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let email = document.getElementById("email").value;
        let address = document.getElementById("address").value;
        let date_of_birth  = document.getElementById("date_of_birth").value;
        if (staff_name === "" || age === "" || email  === "" || address  === "" ) {
            document.getElementById("err_msg").hidden="";
        } else {
            document.getElementById("err_msg").setAttributeNode(document.createAttribute("hidden"));
            document.getElementById("save_data").setAttributeNode(document.createAttribute("disabled"));
            document.getElementById("add_data").disabled="";
            let new_array_data = {
                "total": 5,
                "age": age,
                "date_start_service": date_of_birth,
                "email": email,
                "genger": "M",
                "staff_id": 1,
                "staff_name": staff_name,
                "address": address,
                "staff_short_code": "AZ",
                "record_status": "q",
                "status" : ch_state()
            };
            new_array.push(new_array_data);
            clr()
            save(end_obj);
            generate();
        }
    }
};
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
        new_array[index_to_edit].staff_name = name;
        new_array[index_to_edit].age = age;
        new_array[index_to_edit].email = email;
        new_array[index_to_edit].address = address;
        new_array[index_to_edit].date_of_birth = date_of_birth;
        if (document.getElementById("checkbox").checked) {
                new_array[index_to_edit].state = "checked";
            }else {
                new_array[index_to_edit].state = "";
            };
        clr()
        save(end_obj);
        generate();
        }
    }
        
};



// delete specific data

function delete_this_data (i) {
    new_array.splice(i, 1);
    table.innerHTML = ""
    save(end_obj);
    generate();
};