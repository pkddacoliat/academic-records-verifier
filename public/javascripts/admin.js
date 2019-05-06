$(() => {
  if ($("body").is(".admin")) {
    loadStudentsTable();
    let courses = loadCoursesTable();
    loadModulesTable();

    $("#addCourseBtn").on("click", () => {
      $("#addCourseModal").modal({
        backdrop: "static",
        keyboard: false
      });
    });

    $("#addCourseModalBtn").click(() => {
      let form = $("#addCourseForm :input");
      let form_data = form.serializeArray();
      form_data.forEach(item => {
        if (item.name === "department") {
          item.value = convertCodeToDepartment(item.value);
        }
      });

      return $.Deferred(jQuerydfd => {
        $.ajax({
          type: "POST",
          url: "http://localhost:3000/api/Course",
          beforeSend: () => {
            $("#addCourseModalSpinner").attr("hidden", false);
          },
          data: {
            $class: "ie.cit.blockchain.course.Course",
            courseCode: form_data[0].value,
            courseTitle: form_data[1].value,
            fieldOfStudy: [],
            department: form_data[2].value,
            courseType: form_data[3].value,
            qualificationType: form_data[4].value,
            deliveryMode: form_data[5].value,
            noOfSemesters: form_data[6].value,
            totalCredits: form_data[7].value,
            NFQLevel: form_data[6].value,
            modules: []
          },
          success: data => {
            courses.push(data.courseCode);
            jQuerydfd.resolve(data);
            $("#addCourseModalSpinner").attr("hidden", true);
            $("#addCourseModal").modal("hide");
            // $("#coursesTable")
            //   .DataTable()
            //   .ajax.reload();
          },
          error: () => {
            $("#addCourseModalSpinner").attr("hidden", true);
          }
        });
      });
    });

    $("#addModuleBtn").on("click", () => {
      resetAddModuleModal();
      $("#addModuleModal").modal({
        backdrop: "static",
        keyboard: false
      });
      courses.forEach(item => {
        $("#deliverySelect").append(
          '<option class="deliverySelectOption" value="' +
            item +
            '">' +
            item +
            "</option>"
        );
      });
    });

    $("#addModuleModalBtn").click(() => {
      let form = $("#addModuleForm :input");
      let form_data = form.serializeArray();
      let subjectCourse = "";
      form_data.forEach(item => {
        if (item.name === "subject" || item.name === "course") {
          subjectCourse += item.value;
        }
      });
      form_data.push({ name: "subjectCourse", value: subjectCourse });

      return $.Deferred(jQuerydfd => {
        $.ajax({
          type: "POST",
          url: "http://localhost:3000/api/Module",
          beforeSend: () => {
            $("#addModuleModalSpinner").attr("hidden", false);
          },
          data: {
            $class: "ie.cit.blockchain.module.Module",
            crn: form_data[0].value,
            moduleCode: form_data[9].value,
            title: form_data[3].value,
            credits: form_data[4].value,
            Level: form_data[5].value,
            deliveries: [
              {
                $class: "ie.cit.blockchain.module.Delivery",
                course:
                  "resource:ie.cit.blockchain.course.Course#" +
                  form_data[6].value,
                stage: form_data[7].value,
                semester: form_data[8].value
              }
            ]
          },
          success: data => {
            jQuerydfd.resolve(data);
            $("#addModuleModalSpinner").attr("hidden", true);
            $("#addModuleModal").modal("hide");
            // $("#coursesTable")
            //   .DataTable()
            //   .ajax.reload();
          },
          error: () => {
            $("#addModuleModalSpinner").attr("hidden", true);
          }
        });
      });
    });
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
  let courses = [];
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/api/Course",
    success: data => {
      data.forEach(item => {
        courses.push(item.courseCode);
      });
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
  return courses;
}

function loadModulesTable() {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/api/Module",
    success: data => {
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

function convertCodeToDepartment(code) {
  if (code === "111") return "Accounting Information Systems";
  if (code === "127") return "Applied Physics and Instrumentation";
  if (code === "201") return "Applied Social Studies";
  if (code === "122") return "Architecture";
  if (code === "213") return "Art and Design Education";
  if (code === "212") return "Art Therapy and Continuing Visual Education";
  if (code === "235") return "Arts in Health and Education";
  if (code === "128") return "Biological Sciences";
  if (code === "185") return "Biological Sciences";
  if (code === "129") return "Chemistry";
  if (code === "133") return "CIT Cork School of Music";
  if (code === "134") return "CIT Crawford College of Art and Design";
  if (code === "252")
    return "CIT Crawford College of Art and Design and UCC School of Education";
  if (code === "120") return "Civil, Structural and Environmental Engine";
  if (code === "130") return "Computer Science";
  if (code === "121") return "Construction";
  if (code === "112") return "Continuing Education";
  if (code === "113") return "DEIS: Department of Education Development";
  if (code === "114") return "Educational Opportunities";
  if (code === "123") return "Electrical and Electronic Engineering";
  if (code === "124") return "Electronic Engineering";
  if (code === "204") return "Fine Art and Applied Art, CIT CCAD";
  if (code === "197") return "Management and Enterprise";
  if (code === "115") return "Management and Marketing";
  if (code === "199") return "Marketing and International Business";
  if (code === "131") return "Mathematics";
  if (code === "126") return "Mechanical and Automotive Engineering";
  if (code === "125") return "Mechanical, Biomedical and Manufacturing Eng";
  if (code === "116") return "Media Communications";
  if (code === "132") return "National Maritime College";
  if (code === "198") return "Organisation and Professional Development";
  if (code === "214") return "Physical Sciences";
  if (code === "119") return "Process, Energy and Transport Engineering";
  if (code === "200") return "Sport, Leisure and Childhood Studies";
  if (code === "180") return "Teaching and Learning Unit";
  if (code === "224") return "Tourism and Hospitality";
}

function resetAddModuleModal() {
  $("#deliverySelect option").remove();
}
