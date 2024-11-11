document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("mobile-number")
    .addEventListener("blur", function () {
      var mobileNumber = this.value;
      if (mobileNumber.length === 10) {
        fetch(
          "https://script.google.com/macros/s/AKfycbyhZ1hPtMLDDNuv4M7SoqzOdhkWymlkYu--wFlhu1CMirvKu2oqeXhP5eYSvQgGc0qJ/exec?mobileNumber=" +
            mobileNumber
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                "Network response was not ok: " + response.statusText
              );
            }
            return response.json();
          })
          .then((data) => {
            // Log the fetched data to the console
            console.log("Fetched Data:", data);

            if (data.error) {
              // Handle errors returned from the Apps Script
              alert(data.error);
              return; // Stop further execution
            }

            if (data.customerName) {
              alert("Customer Details Found");
              document.getElementById("customer-name").value =
                data.customerName;
              document.getElementById("gender").value = data.gender;
              document.getElementById("location").value = data.location;

              // Check if dateOfBirth is available
              if (data.dateOfBirth) {
                // Format the date of birth only if it's not empty
                var dob = new Date(data.dateOfBirth);
                var formattedDOB = dob.toISOString().split("T")[0];
                document.getElementById("date-of-birth").value = formattedDOB;
              } else {
                console.log("Date of Birth is not available.");
                document.getElementById("date-of-birth").value = ""; // Clear field if empty
              }

              document.getElementById("unsettled-amount").value =
                data.unsettledAmount;
              // document.getElementById("discount-amount").value =
              //   data.discountAmount;
            } else {
              // When customer details are not found
              alert("Customer Details not Found");
              // document.getElementById("customer-name").value = "";
              // document.getElementById("gender").value = "";
              // document.getElementById("location").value = "";
              // document.getElementById("date-of-birth").value = "";
              // document.getElementById("unsettled-amount").value = "";
              // document.getElementById("discount-amount").value = "";
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert(
              "An error occurred while fetching customer details: " +
                error.message
            );
          });
      }
    });
});
