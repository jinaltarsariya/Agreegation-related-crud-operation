var express = require("express");
const {
  postStudentData,
  postStudentList,
  updateStudentData,
  deleteStudent,
} = require("../controller/student_result.controller");
var router = express.Router();

/* GET users listing. */
router.post("/student/create", postStudentData);
router.get("/student/list", postStudentList);
router.put("/student/update", updateStudentData);
router.delete("/student/delete", deleteStudent);

module.exports = router;
