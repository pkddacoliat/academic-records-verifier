$(() => {
  if ($("body").is(".admin")) {
    loadStudentsTable();
  }
});

function loadStudentsTable() {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/api/Student",
    success: data => {
      $("#studentsTable").DataTable({
        data: data,
        columns: [
          { data: "participantNo" },
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
    }
  });
}
