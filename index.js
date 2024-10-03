let userform = document.getElementById("form");

window.onload = () => {
  localStorage.clear();
};

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};

let entries = retrieveEntries();
const displayEntries = () => {
  const entries = retrieveEntries();

  const table = entries
    .map((entry) => {
      const namecell = `<td>${entry.name}</td>`;
      const emailcell = `<td>${entry.email}</td>`;
      const passcell = `<td>${entry.password}</td>`;
      const dobcell = `<td>${entry.dob}</td>`;
      const tnccell = `<td>${entry.tnc}</td>`;

      return `<tr>${namecell} ${emailcell} ${passcell} ${dobcell} ${tnccell}</tr>`;
    })
    .join("\n");

  document.getElementById("from-here").innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dobe = new Date(document.getElementById("dob").value);
  const dob = document.getElementById("dob").value;
  const tnc = document.getElementById("tnc").checked;

  const today1 = new Date();
  const today2 = new Date();

  const minAge = new Date(today1.setFullYear(today1.getFullYear() - 18));
  const maxAge = new Date(today2.setFullYear(today2.getFullYear() - 55));

  if (dobe > minAge || dobe < maxAge) {
    alert("Age must be between 18 - 55");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    tnc,
  };
  entries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(entries));
  displayEntries();

  userform.reset();
};

userform.addEventListener("submit", saveUserForm);
displayEntries();
