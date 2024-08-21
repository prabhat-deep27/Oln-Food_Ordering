async function handleSubmit(event){
    //prevent default
    event.preventDefault();

    //get values

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone_no = document.getElementById("phone_no").value;
    const password = document.getElementById("password").value;

    const customer = {username, email, phone_no, password}

    console.log("This is your customer data" + JSON.stringify(customer));

    const baseURL = "http://localhost:8080/addCustomer"

    try{
        const response = await fetch(baseURL, {
            method: "POST",
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify(customer)
        });
        if(response.ok){
            alert("Customer Registered Successfully");
            redirectToHomePage();
        }
        }catch(error){
                        console.log("error is comming while adding the student" + error);
                    }
}
function redirectToHomePage() {
    window.location.href = "index.html";
}