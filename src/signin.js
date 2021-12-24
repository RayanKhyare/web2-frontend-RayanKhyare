import {
    login
} from './api.js'

window.onload = function () {

    loginFetch()
    // Made the login fetch
    function loginFetch() {
        document.getElementById("signInForm").addEventListener("submit", async e => {
            e.preventDefault()

            const emailValue = e.target.email.value
            const passwordValue = e.target.password.value

            const loginFetch = await login(
                emailValue,
                passwordValue
            )
            const loginFetchThen = loginFetch.json()

            loginFetchThen.then(data => {
                if (data) {
                    sessionStorage.setItem("userId", data._id);

                    window.location.href = "./homepage.html";
                } else {
                    document.getElementById("loginerror").style.display = 'block';
                }
            })
        })
    }

}