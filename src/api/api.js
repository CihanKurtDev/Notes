export async function handleSubmit(e, navigate) {
    e.preventDefault();

    try {
        const res = await fetch('http://localhost:3000/', {
            method: "POST",
            credentials: 'include',
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: document.getElementById("name").value, 
                password: document.getElementById("password").value
            })
        })
        const response = await res.json()
        if(response.user) {
            // Create Home Component
            navigate("/Home")
        }
    } catch(error) {
        const inputs = document.getElementsByTagName('input')
        for(let i = 0; i< inputs.length; i++) {
            inputs[i].style.border = "1px solid red"
        }
        console.log(error)
    }
}

export async function handleRegistration(e, navigate) {
    e.preventDefault(); 
    fetch('http://localhost:3000/Register', {
        method: "POST",
        credentials: 'include',
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: document.getElementById("email").value, 
            name: document.getElementById("name").value, 
            password: document.getElementById("password").value, 
        })
    })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
        const inputs = document.getElementsByTagName('input')
        for(let i = 0; i< inputs.length; i++) {
            inputs[i].style.border = "1px solid red"
        }
        console.error(error)
    })
    .finally(() => navigate("/"))
}