$(() => {
  if ($("body").is(".admin")) {
    loadStudentsTable();
    loadCoursesTable();
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

function loadCoursesTable() {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/api/Course",
    success: data => {
      $("#coursesTable").DataTable({
        data: data,
        columns: [
          { data: "courseCode" },
          { data: "courseTitle" },
          { data: "courseType" },
          { data: "qualificationType" },
          { data: "deliveryMode" },
          { data: "department" },
          { data: "NFQLevel" },
          { data: "noOfSemesters" },
          { data: "totalCredits" }
        ]
      });
    }
  });
}
