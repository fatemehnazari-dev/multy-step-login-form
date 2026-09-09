const pages = document.querySelectorAll(".page");
const steps = document.querySelectorAll(".step");
const nextBtns = document.querySelectorAll(".next");
const prevBtns = document.querySelectorAll(".prev");
const submitBtn = document.querySelector(".submit");
let currentstep = 0;

function showPage(step) {
  pages.forEach((page, index) => {
    page.style.display = index === step ? "block" : "none";
  });
  updateProgress(step);
}

function updateProgress(step) {
  steps.forEach((stepelement, index) => {
    if (index <= step) {
      stepelement.classList.add("active");
    } else {
      stepelement.classList.remove("active");
    }
  });
}
function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (password.length < minLength) {
    return "رمز عبور باید حداقل ۸ کاراکتر باشد";
  }
  if (!hasUpperCase) {
    return "رمز عبور باید حداقل یک حرف بزرگ داشته باشد";
  }
  if (!hasLowerCase) {
    return "رمز عبور باید حداقل یک حرف کوچک داشته باشد";
  }
  if (!hasNumber) {
    return "رمز عبور باید حداقل یک عدد داشته باشد";
  }
  return null; // یعنی معتبره
}

function validateFields(step) {
  const fields = pages[step].querySelectorAll("input,select");
  for (let field of fields) {
    if (!field.value.trim()) {
      alert("please fill in all fields");
      return false;
    }
    if (field.type === "password") {
      const errorMsg = validatePassword(field.value);
      if (errorMsg) {
        alert(errorMsg);
        return false;
      }
    }
  }
  return true;
}
nextBtns.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (validateFields(index)) {
      currentstep++;
      showPage(currentstep);
    }
  });
});
prevBtns.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    currentstep--;
    showPage(currentstep);
  });
});
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateFields(currentstep)) {
    alert("form submitted successfully");
    location.reload();
  }
});
showPage(currentstep);
