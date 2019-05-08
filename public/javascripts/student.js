$(() => {
  if ($("body").is(".student")) {
    let studentGrades = loadStudentData();
  }
});

function loadStudentData() {
  let studentGrades = [];
  let studentNoToSearch = $("#studentNo").text();
  $.ajax({
    type: "GET",
    url:
      "http://localhost:3000/api/Grade?filter=%7B%22where%22%3A%7B%22student%22%3A%22resource%3Aie.cit.blockchain.participant.Student%23" +
      studentNoToSearch +
      "%22%7D%7D",
    success: data => {
      data.forEach(item => {
        let gradeObj = {};
        gradeObj.gradeId = item.gradeId;
        gradeObj.finalGrade = item.finalGrade;
        gradeObj.crn = item.crn;
        gradeObj.subject = item.moduleCode.substring(0, 4);
        gradeObj.course = item.moduleCode.substring(4);
        gradeObj.stage = item.stage;
        gradeObj.semester = item.semester;
        gradeObj.title = item.courseTitle;
        gradeObj.creditsEarned = item.creditsEarned;
        studentGrades.push(gradeObj);
      });
    }
  }).done(() => {
    $("#studentGradesTable").DataTable({
      data: studentGrades,
      columns: [
        { data: "gradeId" },
        { data: "stage" },
        { data: "semester" },
        { data: "crn" },
        { data: "subject" },
        { data: "course" },
        { data: "title" },
        { data: "creditsEarned" },
        { data: "finalGrade" }
      ]
    });
  });
  return studentGrades;
}
