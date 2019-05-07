$(() => {
  if ($("body").is(".verifier")) {
    let students = loadStudentsTable();
  }
});

function loadStudentsTable() {
  let students = [];
  $("#studentsTable").DataTable({
    ajax: {
      type: "GET",
      url: "http://localhost:3000/api/Student",
      data: data => {
        return (data = JSON.stringify(data));
      },
      dataSrc: "",
      complete: data => {
        data.responseJSON.forEach(student => {
          students.push(student.participantNo);
        });
      }
    },
    columns: [
      {
        data: "participantNo",
        render: data => {
          return '<a href="/student/' + data + '">' + data + "</a>";
        }
      },
      { data: "contact.firstName" },
      { data: "contact.lastName" },
      { data: "contact.email" },
      {
        data: "college",
        render: data => {
          return data.substring(data.indexOf("#") + 1);
        }
      },
      {
        data: "course",
        render: data => {
          return data.substring(data.indexOf("#") + 1);
        }
      },
      { data: "currentCredits" },
      { data: "graduated" }
    ]
  });
  return students;
}
