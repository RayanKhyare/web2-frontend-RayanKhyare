import {
    register
} from './api.js'

window.onload = function () {
    document.getElementById("signupForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const firstNameValue = e.target.fname.value
        console.log(firstNameValue);
        const lastNameValue = e.target.lname.value
        const emailValue = e.target.email.value
        const passwordValue = e.target.password.value

        const registerFetch = await register(
            firstNameValue,
            lastNameValue,
            emailValue,
            passwordValue
        )
        console.log(registerFetch);
        
        if (registerFetch.ok) {
            console.log('test');
        }
        window.location.href = "./signin.html"
    })

}