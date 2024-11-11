document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const nextBtn = form.querySelector(".nextBtn");
  const backBtn = form.querySelector(".backBtn");
  const formFirst = document.querySelector(".form.first");
  const allRequiredFields = formFirst.querySelectorAll(
    "input[required], select[required]"
  );

  nextBtn.addEventListener("click", function (event) {
    // Get the value of the "Name" field
    let nameValue = document
      .querySelector('input[name="Customer Name"]')
      .value.trim();
    // Correct the format of the name (capitalize each first letter)
    let correctedName = nameValue
      .toLowerCase()
      .replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });
    // Set the corrected name value to the hidden "CustomerName" field
    document.getElementById("customer-name").value = correctedName;

    event.preventDefault();
    let allFilled = true;

    allRequiredFields.forEach((field) => {
      if (!field.value || field.value.includes("Select")) {
        field.classList.add("error");
        allFilled = false;
      } else {
        field.classList.remove("error");
      }
    });

    const serviceSelect = document.getElementById("service-select").value;
    const serviceInput = document.getElementById("service-input").value;
    const serviceDepartment =
      document.getElementById("department-select").value;

    if (serviceDepartment === "Others") {
      if (serviceInput != "") {
        if (allFilled) {
          form.classList.add("secActive");
        }
      } else {
        alert("Please fill all required fields before proceeding.");
      }
    } else {
      if (serviceSelect != "Select Service Name") {
        if (allFilled) {
          form.classList.add("secActive");
        } else {
          alert("Please fill all required fields before proceeding.");
        }
      } else {
        alert("Please specify the Service Operation in the input field.");
      }
    }
  });

  backBtn.addEventListener("click", function (event) {
    event.preventDefault();
    form.classList.remove("secActive");
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get the values of specific fields for validation
    const totalAmount = document.getElementById("total-amount").value;
    const debitedTransactionBank = document.getElementById(
      "debited-transaction-bank"
    ).value;
    const category = document.getElementById("category-select").value;

    // Get the submit button
    const submitButton = form.querySelector('button[type="submit"]');

    // Confirmation dialog before proceeding
    if (confirm("Are you sure you want to submit the form?")) {
      // Disable the submit button to prevent multiple submissions
      submitButton.disabled = true;

      // Validation check for required fields
      if (
        totalAmount == 0 ||
        debitedTransactionBank === "Select Debited Bank"
      ) {
        alert("Please select valid Transaction Details.");
        // Re-enable submit button if validation fails
        submitButton.disabled = false;
      } else if (category === "Select Service Category") {
        alert("Please select valid Service Details.");
        // Re-enable submit button if validation fails
        submitButton.disabled = false;
      } else {
        // Proceed with form submission
        const scriptURL =
          "https://script.google.com/macros/s/AKfycbwFoBwuxHwSvfYdnHmDgF8mluvB12p_Jgr-0PioN1IDPvGPrN3lBa87aZk3dYQW9JFC/exec";
        fetch(scriptURL, { method: "POST", body: new FormData(form) })
          .then((response) => {
            alert("Thank you! Your form is submitted successfully.");
            // Reload the page or clear the form after submission
            // location.reload();
            submitButton.disabled = false;
            clearFields();
          })
          .catch((error) => {
            console.error("Error!", error.message);
            alert(
              "An error occurred while submitting the form. Please try again."
            );
            // Re-enable the button if there is an error
            submitButton.disabled = false;
          });
      }
    } else {
      // If the user cancels submission, re-enable the submit button
      alert("Form submission cancelled.");
      submitButton.disabled = false;
    }
  });
  function clearFields() {
    // Clear all the fields if no match is found or input is incomplete
    document.getElementById("category-select").value =
      "Select Service Category";
    document.getElementById("department-select").value = "Select Debited Bank";
    document.getElementById("service-select").value = "Select Service Name";
    document.getElementById("debited-transaction-bank").value =
      "Select Service Name";
    document.getElementById("application-charge").value = "0";
    document.getElementById("service-charge").value = "0";
    document.getElementById("cash").value = "";
    document.getElementById("upi").value = "";
    document.getElementById("total-amount").value = "0";
  }
  const categorySelect = document.getElementById("category-select");
  const departmentSelect = document.getElementById("department-select");
  const serviceSelect = document.getElementById("service-select");
  const serviceInput = document.getElementById("service-input"); // Text input field
  const serviceContainer = document.getElementById("service-container"); // Container to hold both dropdown and input

  const secondDropdownOptions = {
    "General Services": [
      "Ration Card",
      "Voter Id",
      "Aadhar Card",
      "Pan Card",
      "College Application",
      "License and RTO Services",
      "Money Transfer Services",
      "Counselling Apply",
      "TN Police",
      "TNEB",
      "Online Payments",
      "Dharisanam Bookings",
      "Typing Services",
      "Browsing",
      "MSME",
      "UDAY Scheme",
      "AePS",
      "PF",
      "Passport",
      "Printouts",
      "Others",
    ],
    "E-Sevai": [
      "Income Certificate",
      "Community Certificate",
      "Nativity Certificate",
      "Legal Hier Certificate",
      "Inter Caste Marriage Certificate",
      "Obc Certificate",
      "No Male Child Certificate",
      "First Graduate Certificate for Employment",
      "Small/Marginal Farmer Certificate",
      "Widow Certificate",
      "Deserted Women Certificate",
      "Disability Pension Scheme",
      "Widow Pension Scheme",
      "Old Age Pension Scheme",
      "e-Adangal Extract Download",
      "Agricultural Income Certificate",
      "Family Migration Certificate",
      "Unemployment Certificate",
      "Certificate for Loss of Educational Records due to disasters",
      "Residence Certificate",
      "Solvency Certificate",
      "Unmarried Certificate",
      "Economically Weaker Sections (Income & Assets)",
      "Issuance of Jain Religious Minority Certificate",
      "Destitute Widow Certificate",
      "Community Certificate for Converted BC Muslim",
      "Indira Gandhi National Old Age Pension Scheme (IGNOPS)",
      "Destitute Widow Pension Scheme (DWPS)",
      "Destitute Deserted Woman Pension Scheme (DDWPS)",
      "Unmarried Women Pension Scheme (UWPS)",
      "Chief Minister Uzhavar Pathukappu Thittam (CMUPT)",
      "Differently Abled Pension Scheme (DAPS)",
      "Licence under Pawn Broker Act",
      "Money Lender’s Licence",
      "Issuance of Public Building Licence",
      "Patta",
      "Social Security Pension",
      "Issuance of Income and Asset Certificate for EWS",
      "No Objection Certificate (NOC) for Retail Outlets Establishment, Storage and Sale of Petroleum",
      "Concurrence from District Collector for development of land located in non-planned areas (Wet land)",
      "Grievance Day Petition",
      "Mutation of Revenue Records",
      "Renewal of Permanent License for Cinema Theatres (Form C License Renewal)",
      "Aadhaar enrollment",
      "CGM",
      "PSTM",
      "Certificate for Lost Document",
      "Others",
    ],
    "Job Application Support": [
      "TN Employment Registration",
      "TNPSC",
      "MRB",
      "High Court",
      "Ration Shop",
      "RRB",
      "NLC",
      "Others",
    ],
    "Travel Services": [
      "Flight Ticket",
      "Visa",
      "Certificate Attestation",
      "Bus Booking",
      "Visa Stamping",
      "Cruise Booking",
      "Hotel Booking",
      "Medical Appointment",
      "Tour Services",
      "Others",
    ],
    "Tour Services": ["Domestic Tour Packages", "International Packages"],
  };

  const thirdDropdownOptions = {
    "Ration Card": [
      "New Smart Card Apply",
      "Add Member",
      "Remove Member",
      "Family Head Change",
      "Smart Card Duplicate Apply",
      "Address Change",
    ],
    "Voter Id": ["New Register", "Voter Id Duplicate Print", "Correction"],
    "Aadhar Card": [
      "Aadhar Address Change",
      "Aadhar Id Card",
      "Aadhar PVC Card Apply",
      "Aadhar Card Full",
    ],
    "College Application": ["Anna University", "Annamalai University"],
    "Pan Card": [
      "Pan New",
      "Pan Aadhar Link",
      "E-Pan Card Printing",
      "Pan Correction",
    ],
    "License and RTO Services": [
      "LLR Apply",
      "RTO Tax Payments",
      "Police E Challan Payments",
      "License Duplicate Card",
    ],
    "Money Transfer Services": [
      "Domestic Money Transfer",
      "AEPS Money Withdrawal (Aadhar ATM)",
      "UPI Money Withdrawal",
    ],
    "Counselling Apply": [
      "TNEA Engineering",
      "TNAU Agriculture",
      "TNDALU Law",
      "TANUVAS Veterinary",
      "Paramedical Science",
      "MBBS/BDS",
      "Diploma In Paramedical",
      "MD/MDS",
      "AIIMS/JIPMER",
      "Diploma In Engineering",
      "ITI Industrial Training",
    ],
    "TN Police": [
      "Police NOC (Self Verification)",
      "Document Missing",
      "Online Complaint",
      "FIR Print",
    ],
    TNEB: [
      "EB Bill Payment",
      "New Connection Payments",
      "New Service Connection",
      "Load Addition",
      "Load Reduction",
      "EB Name Transfer",
    ],
    "Online Payments": [
      "College Tuition Fees Payments",
      "College Admission Payments",
      "SBI Collect Payments",
      "RTO Tax Payments",
      "Karuvoolam Challan Payments",
      "Income Tax Payments",
      "Property Tax Payments (Rural)",
    ],
    "Dharisanam Bookings": ["Tirupathi Booking", "Sabarimala Booking"],
    "Typing Services": [
      "Tamil Typing",
      "English Typing",
      "Resume Typing",
      "Bio Data Typing",
      "Jathagam Typing",
    ],
    Passport: [
      "New Passport",
      "Passport Renewal",
      "Lost Or Damage Passport",
      "PCC",
      "Tatkal",
    ],
    "Flight Ticket": ["Flight Tickets", "Flight Ticket Rescheduling"],
    Visa: ["Tourist Visa", "Student Visa", "Visit Visa"],
    "Certificate Attestation": [
      "Birth Certificate Attestation",
      "Marriage Certificate Attestation",
      "Degree Certificate Attestation",
      "Educational Certificate Attestation",
      "Commercial Certificate Attestation",
      "Non-Commercial Certificate Attestation",
      "MEA Attestation",
      "HRD Attestation",
      "PCC Attestation",
    ],
    "Cruise Booking": ["Domestic", "International"],
    "Hotel Booking": ["Domestic", "International"],
    "Tour Services": ["Domestic", "International"],
    "TN Employment Registration": ["New Register", "Renewal", "Addition"],
    Patta: ["View Patta or Chitta", "Patta Transfer", "FMB", "New Register"],
    PF: [
      "PF: ENomination",
      "Add Bank PassBook and Pan Card",
      "PF Activation",
      "PF Password Change",
      "PF Merge the Companies",
      "Advance Claim",
      "Full Claim",
    ],
    Printouts: [
      "Black and White Printout",
      "Colour Printout",
      "WhatsApp Printout",
      "Mail Printout",
      "Scan and Share",
    ],
  };

  // Function to update the second dropdown (department select)
  // Function to update the second dropdown (department select)
  function updateSecondDropdown() {
    const selectedCategory = categorySelect.value;
    const relevantDepartments = secondDropdownOptions[selectedCategory] || [];

    departmentSelect.innerHTML =
      "<option disabled selected>Select Service Department</option>";
    relevantDepartments.forEach((dept) => {
      const option = document.createElement("option");
      option.value = dept;
      option.textContent = dept;
      departmentSelect.appendChild(option);
    });

    // Clear service select dropdown when category changes
    serviceSelect.innerHTML =
      "<option disabled selected>Select Service Name</option>";

    // Hide the text input when switching categories
    restoreServiceSelect();
  }

  // Function to update the third dropdown (service select)
  function updateThirdDropdown() {
    const selectedDepartment = departmentSelect.value;

    // If "Others" is selected, replace the dropdown with an input field
    if (selectedDepartment === "Others") {
      switchToTextInput();
    } else {
      switchToDropdown();

      const relevantServices = thirdDropdownOptions[selectedDepartment] || [];

      serviceSelect.innerHTML =
        "<option disabled selected>Select Service Name</option>";

      // Add relevant service options
      if (relevantServices.length > 0) {
        relevantServices.forEach((service) => {
          const option = document.createElement("option");
          option.value = service;
          option.textContent = service;
          serviceSelect.appendChild(option);
        });
      } else {
        const option = document.createElement("option");
        option.value = selectedDepartment;
        option.textContent = selectedDepartment;
        serviceSelect.appendChild(option);
      }
    }
  }

  // Function to switch to the text input field for "Others"
  function switchToTextInput() {
    // Hide the dropdown
    serviceSelect.style.display = "none";
    // Show the input field
    serviceInput.style.display = "block";
  }

  // Function to switch back to the dropdown menu
  function switchToDropdown() {
    // Hide the text input
    serviceInput.style.display = "none";
    // Show the dropdown
    serviceSelect.style.display = "block";
  }

  // Function to restore the dropdown when switching categories
  function restoreServiceSelect() {
    serviceSelect.style.display = "block";
    serviceInput.style.display = "none";
  }

  // Event Listeners
  categorySelect.addEventListener("change", updateSecondDropdown);
  departmentSelect.addEventListener("change", updateThirdDropdown);

  const referralCodeSelect = document.getElementById("referral-code-select");
  const customerSourceSelect = document.getElementById(
    "customer-source-select"
  );
  const leadSourceSelect = document.getElementById("lead-source-select");

  const customerSources = {
    "AIMS-2007": "AIMS",
    "AIMS-2024": "CR Digital Vibes",
  };

  const leadSources = {
    AIMS: "Walk-in",
    "CR Digital Vibes": [
      "Meta AD",
      "WhatsApp",
      "Instagram",
      "Facebook",
      "Campaigns",
      "Walk-in",
    ],
  };

  referralCodeSelect.addEventListener("change", function () {
    const selectedReferralCode = referralCodeSelect.value;
    const relevantCustomerSource = customerSources[selectedReferralCode] || "";

    customerSourceSelect.innerHTML =
      "<option disabled selected>Select Customer Source Name</option>";
    if (relevantCustomerSource) {
      const option = document.createElement("option");
      option.value = relevantCustomerSource;
      option.textContent = relevantCustomerSource;
      customerSourceSelect.appendChild(option);
      customerSourceSelect.value = relevantCustomerSource;
    }

    // Update lead source options based on the selected customer source
    const relevantLeadSources = leadSources[relevantCustomerSource] || [];

    leadSourceSelect.innerHTML =
      "<option disabled selected>Select Lead Generated Source Name</option>";

    // Add options to lead source select
    relevantLeadSources.forEach((source) => {
      const option = document.createElement("option");
      option.value = source;
      option.textContent = source;
      leadSourceSelect.appendChild(option);
    });
  });

  customerSourceSelect.addEventListener("change", function () {
    const selectedCustomerSource = customerSourceSelect.value;
    const relevantLeadSource = leadSources[selectedCustomerSource] || "";

    leadSourceSelect.innerHTML =
      "<option disabled selected>Select Lead Generated Source Name</option>";
    if (relevantLeadSource) {
      const option = document.createElement("option");
      option.value = relevantLeadSource;
      option.textContent = relevantLeadSource;
      leadSourceSelect.appendChild(option);
      leadSourceSelect.value = relevantLeadSource;
    }
  });

  const mobileNumberInput = document.getElementById("mobile-number");

  mobileNumberInput.addEventListener("input", function () {
    const value = mobileNumberInput.value;
    if (!/^\d{0,10}$/.test(value)) {
      mobileNumberInput.value = value.slice(0, 10); // Limit to 10 digits
    }
  });

  mobileNumberInput.addEventListener("focusout", function () {
    const value = mobileNumberInput.value;
    if (!/^\d{10}$/.test(value)) {
      alert("Mobile number must be exactly 10 digits.");
    }
  });

  const applicationChargeInput = document.getElementById("application-charge");
  const serviceChargeInput = document.getElementById("service-charge");
  const totalAmountInput = document.getElementById("total-amount");

  applicationChargeInput.addEventListener("input", updateTotalAmount);
  serviceChargeInput.addEventListener("input", updateTotalAmount);

  function updateTotalAmount() {
    const applicationCharge = parseFloat(applicationChargeInput.value) || 0;
    const serviceCharge = parseFloat(serviceChargeInput.value) || 0;
    const totalAmount = applicationCharge + serviceCharge;
    totalAmountInput.value = totalAmount.toFixed(2); // Display total with 2 decimal places
  }
});
