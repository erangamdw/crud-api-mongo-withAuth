const express = require("express");
const studentController = require("../controller/studentController");
const { authenticateToken } = require("../middlewares/authenticateToken");
const upload = require("../middlewares/uploadFile");

const router = express.Router();

//post (save) [body]
router.post(
  "/add",
  authenticateToken,
  studentController.addStudent
); /*saveCustomer()*/
//get(fetch) [headers]
router.get("/", authenticateToken, studentController.getAllStudents);
router.get("/:id", authenticateToken, studentController.getStudent);
//delete(delete) [headers]
router.delete("/:id", authenticateToken, studentController.deleteStudent);
//PUT(Update) [Body]
router.put("/:id", authenticateToken, studentController.updateStudent);
router.post(
  "/upload",
  authenticateToken,
  upload.single("image"),
  studentController.uploadStudentImage
);

module.exports = router;
