window.onload = function () {

    getUserData()


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
                let userFirstName = data.firstname;
                let userLastName = data.lastname;
                let userEmail = data.email;
                let userPassword = data.password;

                htmlString += ` <h2 class="textprofil">First name : </h2>
            <h3 class="firstnamestyle" id="firstnamestyle">${userFirstName}</h3>
            <h2 class="textprofil">Last Name : </h2>
           
            <h3 class="firstnamestyle" id="lastnamestyle" >${userLastName}</h3>
          
            <h2 class="textprofil">Email : </h2>
            <div class="divEmailEdit">
            <h3 class="firstnamestyle">${userEmail}</h3> <i class="material-icons deleteacc" id="${data.id}">create</i>
            </div>
            <div class="emailInput">
            <form class="emailChangeForm" id="emailChangeForm">
            <input type="text" class="emailInputForm" name="emailInputForm" id="emailInputForm" name="email">
            <button type="button" class="submitEmailChange" id="submitEmailChange">Change password</button>
            </form>
            </div>
            <h2 class="textprofil">Password : </h2>
            <h3 class="firstnamestyle"><a id="passwordShow">Show crypted password &#8595;</a></h3>
            <h3 class="firstnamestyle" id="password">${userPassword}</h3>`

                container.insertAdjacentHTML("afterbegin", htmlString)
                updateUserEmail(userFirstName, userLastName, userPassword)
            })

    }

    function updateUserEmail(userFirstName, userLastName, userPassword) {
        document.getElementById("emailChangeForm").addEventListener('submit', e => {

            let userId = sessionStorage.getItem("userId");

            let firstNameValue = userFirstName
            console.log(firstNameValue);
            let secondNameValue = userLastName
            console.log(secondNameValue);
            let emailValue = e.target.email.value
            console.log(emailValue);
            let passwordValue = userPassword
            console.log(emailValue);

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
                    console.log(data);
                    if (data == undefined) {
                        location.reload();
                    }
                });
        })

    }

    document.getElementById("deleteaccbtn").addEventListener("click", function (e) {
        console.log("lets gooo");
        document.getElementById("deleteaccsure").style.display = "block";
    })

    document.getElementById("deleteaccsure").addEventListener("click", function (e) {
        console.log("lets gooo");
        window.location.href = "./index.html"
    })
}