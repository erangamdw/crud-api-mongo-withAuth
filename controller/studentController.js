const StudentModel = require("../models/Student");

const addStudent = async (req, res) => {
  try {
    const { name, address, age, gender } = req.body;
    const student = new StudentModel({ name, address, age, gender });
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, age, gender } = req.body;

    const updatedStudent = await StudentModel.findByIdAndUpdate(
      id,
      { name, address, age, gender },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await StudentModel.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json("Student deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await StudentModel.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.json({ studentsData: students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadStudentImage = async (req, res) => {
  try {
    // const { name, address, age, gender } = req.body;
    // const student = new StudentModel({ name, address, age, gender });
    // const savedStudent = await student.save();
    res.status(201).json("uploaded");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addStudent,
  updateStudent,
  deleteStudent,
  getStudent,
  getAllStudents,
  uploadStudentImage,
};
