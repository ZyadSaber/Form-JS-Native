// Global Variables
let table = document.getElementById("table_body");
let row;
let index_to_edit
let save_edit = false
const exsys_get_api = "http://207.180.237.36:9090/ords/exsys_api/ex_react_test_emp/exsys_react_test_emp_data?authorization=3995005&staff_id=&poffset=0&staff_short_code&staff_name="
const exsys_post_api = "http://207.180.237.36:9090/ords/exsys_api/ex_react_test_emp/exsys_react_test_emp_dml"

let new_array = []
let ap
// Global Functions
function log (message) {console.log(message)};
function state (i) {
    if (new_array[i].genger === "M") {
        return "checked"
}else{
    return ""
}
};
function ch_state () {
    if (document.getElementById("checkbox").checked) {
        return "M"
}
};
function clr () {
    table.innerHTML = "";
}
function rows () {
    table.innerHTML += row
}
function save (staff_name, age, date_start_service, email,  address, state, record_status, staff_id) {

    fetch(exsys_post_api,{
        method: "POST",
        headers: {
            'content-type' : 'application/json'
        },
        body: JSON.stringify(
            {
                "authorization": "201792", 
	            "data": [
        {
            "age": age,
            "date_start_service": date_start_service,
            "email": email,
            "genger": state,
            "staff_id": staff_id,
            "staff_name": staff_name,
            "staff_short_code": "AZ",
            "address": address,
            "record_status": record_status
		}]
            }
        )
    }
        )
        .then(res => res.json())
        .then(generate())
    
};

function send_date (date) {
    let y = date.slice(0,4)
    let m =date.slice(5,7)
    let d = date.slice(8,10)
    return `${d}-${m}-${y}`
};
function show_date (date) {
    let b = new_array[date].date_start_service
    if (b !== undefined) {
        let y = b.slice(6,10)
        let m =b.slice(3,5)
        let d = b.slice(0,2)
        return `${y}-${m}-${d}` 
    }
}




// Load all the available data when the page is loaded

function generate () {
    fetch(exsys_get_api)
.then((s) => s.json())
.then((arr) => {
    new_array = arr.data
    // end_obj = {"data":new_array}
    log(new_array)
    for (let i = 0; i < new_array.length; i++){
            row = `<tr> 
            <td class="name">${new_array[i].staff_name}</td>
            <td class="age">${new_array[i].age}</td>
            <td class="email">${new_array[i].email}</td>
            <td class="address">${new_array[i].address}</td>
            <td class="date"><input type="date" disabled value="${show_date(i)}"/></td>
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

                 if (data[i].record_status === "D") {
                    continue
                } else {
                    row = `<tr> 
            <td class="name">${data[i].staff_name}</td>
            <td class="age">${data[i].age}</td>
            <td class="email">${data[i].email}</td>
            <td class="address">${data[i].address}</td>
            <td class="date"><input type="date" disabled value="${show_date(i)}"/></td>
            <td class="checkbox"><input type="checkbox" ${state(i)} disabled/></td>
            <td> <div class="d_e"><button id="delete" disabled onclick="delete_this_data(${[i]})">❌</button><button class="edit" disabled onclick="edit_this_data(${[i]}, my_data)">🖋</button></div></td>
            </tr>`;
            rows();
            }
            }
            row = `<tr> 
            <td><input type="text" required id="name"></td>
            <td><input type="text" id="age"></td>
            <td><input type="email" id="email"></td>
            <td><input type="text" id="address"></td>
            <td class="date"><input type="date" disabled" id="date_of_birth"s/></td>
            <td><input type="checkbox" id="checkbox"></td>
            <td> <div class="d_e"><button disabled id="delete" onclick="delete_this_data()">❌</button><button disabled class="edit" onclick="edit_this_data()">🖋</button></div></td>
            </tr>`;
            document.getElementById("add_data").setAttributeNode(document.createAttribute("disabled"));
            document.getElementById("save_data").disabled="";
            rows();
};



// edit button to the data

function edit_this_data (i, data) {
    ab = data[i].staff_id
    save_edit = true
    btn_edit = true
    table.innerHTML = ""
    document.getElementById("add_data").setAttributeNode(document.createAttribute("disabled"))
    document.getElementById("save_data").disabled="";
     for (let e = 0; e < data.length; e++){
     if (e != i){
            row = `<tr> 
            <td>${data[e].staff_name}</td>
            <td>${data[e].age}</td>
            <td>${data[e].email}</td>
            <td>${data[e].address}</td>
            <td><input type="date" disabled value="${show_date(i)}"/></td>
            <td><input type="checkbox" disabled ${state(e)}/></td>
            <td><div class="d_e"><button id="delete" disabled>❌</button><button class="edit" disabled>🖋</button></dev></td>
            </tr>`;
        } else {
            row = `<tr>
            <td><input type="text" required id="name" value="${data[e].staff_name}"></td>
            <td><input type="text" id="age" value="${data[e].age}"></td>
            <td><input type="email" id="email" value="${data[e].email}"></td>
            <td><input type="text" id="address" value="${data[e].address}"></td>
            <td><input type="Date" id="date_of_birth" required pattern="\d{4}-\d{2}-\d{2}" value="${show_date(i)}"></td>
            <td><input type="checkbox" id="checkbox" ${state(e)}></td>
            <td><div class="d_e"><button id="delete" disabled" disabled>❌</button><button class="edit"disabled>🖋</button></dev></td>
            </tr>`;
            index_to_edit = e
        }
            rows()
            }
            
}



//save data to the array after adding it

function save_data_fun () {
    if (save_edit === false) {
        document.getElementById("err_msg").setAttributeNode(document.createAttribute("hidden"));
        document.getElementById("save_data").setAttributeNode(document.createAttribute("disabled"));
        document.getElementById("add_data").disabled="";
        let staff_name, age, email, address, date_of_service, state
        staff_name = document.getElementById("name").value;
        age = document.getElementById("age").value;
        email = document.getElementById("email").value;
        address = document.getElementById("address").value;
        date_start_service  = send_date(document.getElementById("date_of_birth").value)
        if (document.getElementById("checkbox").checked) {
                state = "M"
            }else {
               state = "";
            };
           
            clr()
            save(staff_name, age, date_start_service, email,  address, state, "n");
        // generate()
    }
};
function save_edited_data() {
    if (save_edit === true) {
        let staff_name, age, email, address, date_start_service, state
        staff_name = document.getElementById("name").value;
        age = document.getElementById("age").value;
        email = document.getElementById("email").value;
        address = document.getElementById("address").value;
        date_start_service = send_date(document.getElementById("date_of_birth").value) ;    
        document.getElementById("err_msg").setAttributeNode(document.createAttribute("hidden"));
        document.getElementById("save_data").setAttributeNode(document.createAttribute("disabled"))
        document.getElementById("add_data").disabled="";
        if (document.getElementById("checkbox").checked) {
                state = "M"
            }else {
               state = "";
            };
        clr()
        ab = new_array[index_to_edit].staff_id
        save(staff_name, age, date_start_service, email,  address, state, "u", ab);
        // generate()
    }
        
};



// delete specific data

function delete_this_data (i) {
    let staff_name, age, email, address, date_start_service, state
    ab = new_array[i].staff_id 
    clr();
    save(staff_name, age, date_start_service, email,  address, state, "d", ab);
    
};
