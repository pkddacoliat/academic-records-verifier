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
        {
          data: "gradeId",
          render: data => {
            return (
              '<a href="#" onClick=viewGradeHistory("' +
              data +
              '") class="gradeIdBtn" data-id="' +
              data +
              '">' +
              data +
              "</a>"
            );
          }
        },
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

function viewGradeHistory(gradeId) {
  let studentNo = gradeId.split("_")[0];
  let crn = gradeId.split("_")[1];

  $("#gradeHistoryModal").modal({});
  $.ajax({
    type: "GET",
    url:
      "http://localhost:3000/api/queries/selectHistoryOfGradeAssignedToStudent?studentNumber=" +
      studentNo +
      "&moduleCRN=" +
      crn,
    success: data => {
      // console.log(data);
    }
  }).done(data => {
    console.log(data);
    $("#gradeHistoryForm #moduleCRNInput").val(data[0].moduleCRN);
    $("#gradeHistoryForm #studentNoInput").val(data[0].studentNumber);
    $("#gradeHistoryForm #finalGradeInput").val(data[0].finalGrade);
    $("#gradeHistoryForm #transactionIdInput").val(data[0].transactionId);
    $("#gradeHistoryForm #timeStampInput").val(data[0].timestamp);
  });
}
