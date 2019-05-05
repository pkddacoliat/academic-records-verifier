$(() => {
  if ($("body").is(".admin")) {
    loadStudentsTable();
    loadCoursesTable();
    loadModulesTable();
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

function loadModulesTable() {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/api/Module",
    success: data => {
      console.log(data);
      $("#modulesTable").DataTable({
        data: data,
        columns: [
          { data: "crn" },
          { data: "moduleCode" },
          { data: "title" },
          { data: "credits" },
          { data: "Level" },
          {
            data: "deliveries",
            render: data => {
              return data[0].course.substring(data[0].course.indexOf("#") + 1);
            }
          }
        ]
      });
    }
  });
}
