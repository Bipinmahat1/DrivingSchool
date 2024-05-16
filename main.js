document.addEventListener("DOMContentLoaded", function() {
    const enrollOption = document.getElementById('enrollOption');
    const enrollmentFormSection = document.getElementById('enrollmentFormSection');
    const cancelBtn = document.getElementById('cancelBtn');
    const enrollmentForm = document.getElementById('enrollmentForm');
    const payNowButton = document.getElementById('payNow');
    const closeBtn = document.querySelector('.close'); // Select the close button
    const billSection = document.getElementById('billSection');

    if (enrollOption && enrollmentFormSection && cancelBtn && enrollmentForm && payNowButton && closeBtn && billSection) {
      enrollOption.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        enrollmentFormSection.style.display = 'block';
        billSection.style.display= 'none';
      });

      cancelBtn.addEventListener('click', function() {
        enrollmentFormSection.style.display = 'none';
        enrollmentForm.reset(); // Reset form fields
      });

      closeBtn.addEventListener('click', function() { // Attach event listener to the close button
        enrollmentFormSection.style.display = 'none';
        enrollmentForm.reset(); // Reset form fields
      });

      enrollmentForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission

        const planSelect = document.getElementById('plan');
        const selectedOption = planSelect.options[planSelect.selectedIndex];
        const fullName = document.getElementById('fullName').value;
        const cardNumber = document.getElementById('cardNumber').value;
        const expirationDate = document.getElementById('expirationDate').value;
        const cvv = document.getElementById('cvv').value;

        // Validate card number
        if (!isValidCardNumber(cardNumber)) {
          alert("Please enter a valid 16-digit card number.");
          return;
        }

        // Validate expiration date
        if (!isValidExpirationDate(expirationDate)) {
          alert("Please enter a valid expiration date in MM/YYYY format.");
          return;
        }

        // Validate CVV
        if (!isValidCVV(cvv)) {
          alert("Please enter a valid 3-digit CVV.");
          return;
        }

        // Get the username from the full name
        const username = fullName.split(' ')[0]; // Assumes the first word is the first name

        // Calculate total amount based on selected plan
        const planPrice = parseInt(selectedOption.value);
        const planName = selectedOption.text.split('(')[0].trim();
        const totalAmount = planPrice;
        billSection.style.display='block';

        // Display the bill with personalized message
        billSection.innerHTML = `
          <h2>Thank You, ${username}, for Your Enrollment!</h2>
          <p><strong>Plan:</strong> ${planName}</p>
          <p><strong>Total Amount:</strong> ${totalAmount}</p>
        `;

        // Reset form fields
        enrollmentForm.reset();

        // Hide the enrollment form section
        enrollmentFormSection.style.display = 'none';
      });

      payNowButton.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent form submission
        enrollmentForm.submit(); // Manually trigger form submission
      });
    }
  });

  function isValidCardNumber(cardNumber) {
    return /^\d{16}$/.test(cardNumber); // Check if card number consists of exactly 16 digits
  }

  function isValidExpirationDate(expirationDate) {
    // Check if expiration date matches MM/YYYY format
    const dateRegex = /^(0[1-9]|1[0-2])\/(20)\d{2}$/;
    if (!dateRegex.test(expirationDate)) return false;

    // Parse expiration month and year
    const [month, year] = expirationDate.split('/');
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed

    // Check if expiration date is in the future
    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
      return false;
    }

    return true;
  }

  function isValidCVV(cvv) {
    return /^\d{3}$/.test(cvv); // Check if CVV consists of exactly 3 digits
  }
