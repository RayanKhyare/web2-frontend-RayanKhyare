window.onload = function () {

    getUserData()

    // Get all data of user in profil page
    function getUserData() {
        let userId = sessionStorage.getItem("userId");

        fetch(`https://web2-courseproject-rayankhyare.herokuapp.com/users/${userId}`, {
                method: 'GET'
            })
            .then(response => {
                return response.json()
            })
            .then(data => {

                let container = document.getElementById('profilcontainer');
                let htmlString = "";
                let dataId = data._id
                let userFirstName = data.firstname;
                let userLastName = data.lastname;
                let userEmail = data.email;
                let userPassword = data.password;

                htmlString += ` <h2 class="textprofil" id="${dataId} textprofil">First name : </h2>
            <h3 class="firstnamestyle" id="firstnamestyle">${userFirstName}</h3>
            <h2 class="textprofil">Last Name : </h2>
           
            <h3 class="firstnamestyle" id="lastnamestyle" >${userLastName}</h3>
          
            <h2 class="textprofil">Email : </h2>
            <div class="divEmailEdit">
            <h3 class="firstnamestyle">${userEmail}</h3> <i class="material-icons updateacc" id="updateacc">create</i>
            </div>
            <div class="emailInput" id="emailInput">

            <form class="emailChangeForm" id="emailChangeForm">
            <input type="text" class="emailInputForm" id="emailInputForm" name="email" placeholder="New email">
            <button type="submit" class="submitEmailChange" id="submitEmailChange">Change email</button>

            </form>
            </div>
            <h2 class="textprofil">Password : </h2>
            <div class="divPasswordEdit">
            <h3 class="firstnamestyle"><a id="passwordShow">Change password</a></h3><i class="material-icons updatepassword" id="updatepassword">create</i>
            </div>

            <div class="passwordInput" id="passwordInput">
            <form class="passwordChangeForm" id="passwordChangeForm">
            <input type="text" class="passwordInputForm" id="passwordInputForm" name="password" placeholder="New password">
            <button type="submit" class="submitpasswordChange" id="submitpasswordChange">Change password</button>

            </form>
            </div>
            `
                container.insertAdjacentHTML("afterbegin", htmlString);
                updateUserEmail(userFirstName, userLastName, userPassword)
                updateUserPassword(userFirstName, userLastName, userEmail)
                showEditEmailBtn()
                showEditPasswordBtn()
                deleteAcc()
            })

    }

    // Update email of user in profil page
    function updateUserEmail(userFirstName, userLastName, userPassword) {

        document.getElementById("emailChangeForm").addEventListener('submit', e => {
            e.preventDefault()

            let userId = sessionStorage.getItem("userId");
            let firstNameValue = userFirstName
            let secondNameValue = userLastName
            let emailValue = e.target.email.value
            let passwordValue = userPassword

            const accUpdate = {
                "firstname": firstNameValue,
                "lastname": secondNameValue,
                "email": emailValue,
                "password": passwordValue
            }
            fetch(`https://web2-courseproject-rayankhyare.herokuapp.com/users/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(accUpdate)
                }).then(res => {
                    res.json()
                })
                .then(data => {

                    if (data == undefined) {
                        location.reload();
                    }
                });
        })
    }

    // Update password of a user in profil page
    function updateUserPassword(userFirstName, userLastName, userEmail) {

        document.getElementById("passwordChangeForm").addEventListener('submit', e => {
            e.preventDefault()

            let userId = sessionStorage.getItem("userId");
            let firstNameValue = userFirstName
            let secondNameValue = userLastName
            let emailValue = userEmail
            let passwordValue = e.target.password.value

            const accUpdate = {
                "firstname": firstNameValue,
                "lastname": secondNameValue,
                "email": emailValue,
                "password": passwordValue
            }
            fetch(`https://web2-courseproject-rayankhyare.herokuapp.com/users/${userId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(accUpdate)
                }).then(res => {
                    res.json()
                })
                .then(data => {

                    if (data == undefined) {
                        location.reload();
                    }
                });
        })
    }


    // First delete account button triggers the display of the second
    document.getElementById("deleteaccbtn").addEventListener("click", function (e) {
        document.getElementById("deleteaccsure").style.display = "block";
    })

    // Deletes the user account
    function deleteAcc() {
        document.getElementById("deleteaccsure").addEventListener("click", function (e) {
            let userId = sessionStorage.getItem("userId");

            fetch(`https://web2-courseproject-rayankhyare.herokuapp.com/users/${userId}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    window.location.href = "./../index.html"
                })
        })
    }

    // Delete userId in sessionStorage and redirect to beginning
    document.getElementById("discaccbtn").addEventListener("click", function (e) {
        sessionStorage.removeItem("userId")
        window.location.href = "./../index.html"
    })

    // Show the email update form
    function showEditEmailBtn() {
        document.getElementById("updateacc").addEventListener("click", function (e) {

            document.getElementById("emailInput").style.display = "block";
        })
    }

    // Show the password update form
    function showEditPasswordBtn() {
        document.getElementById("updatepassword").addEventListener("click", function (e) {

            document.getElementById("passwordInput").style.display = "block";
        })
    }

}