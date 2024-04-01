const studentResultModel = require("../model/student_result.model");

const isEmailValid = (email) => {
  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const postStudentData = async (req, res) => {
  try {
    let { fname, lname, email, subOne, subTwo, subThree } = req.body;

    console.log("req.body", req.body);

    if (!fname || !lname || !email || !subOne || !subTwo || !subThree) {
      return res.json({
        flag: 0,
        msg: "Please fill all field !",
        data: {},
      });
    }

    if (fname.length < 3) {
      return res.json({
        flag: 0,
        msg: "Please enter fname three characters to long !",
        data: {},
      });
    }

    if (fname.length > 30) {
      return res.json({
        flag: 0,
        msg: "Fname is too long !",
        data: {},
      });
    }

    if (lname.length < 3) {
      return res.json({
        flag: 0,
        msg: "Please enter lname three characters to long !",
        data: {},
      });
    }

    if (lname.length > 30) {
      return res.json({
        flag: 0,
        msg: "lname is too long !",
        data: {},
      });
    }

    if (!isEmailValid(email)) {
      return res.json({
        flag: 0,
        msg: "Please enter a valid email address!",
        data: {},
      });
    }

    if (
      subOne.length < 1 ||
      subOne.length > 3 ||
      subTwo.length < 1 ||
      subTwo.length > 3 ||
      subThree.length < 1 ||
      subThree.length > 3 ||
      parseInt(subOne) < 0 ||
      parseInt(subOne) > 100 ||
      parseInt(subTwo) < 0 ||
      parseInt(subTwo) > 100 ||
      parseInt(subThree) < 0 ||
      parseInt(subThree) > 100
    ) {
      return res.json({
        flag: 0,
        msg: "Subject grades must be between 0 and 100!",
        data: {},
      });
    }

    let checkName = await studentResultModel.findOne({
      $and: [{ fname: fname }, { lname: lname }],
    });

    if (checkName) {
      return res.json({
        flag: 0,
        msg: "This student is already register !",
        data: {},
      });
    }

    let result = await studentResultModel.create(req.body);
    console.log("result ----> ", result);

    return res.json({
      flag: 1,
      msg: "Student data created successfully!",
      data: result,
    });
  } catch (error) {
    return res.json({
      flag: 0,
      msg: error.message,
      data: {},
    });
  }
};

const postStudentList = async (req, res) => {
  try {
    let response = await studentResultModel.find();
    console.log("response ---> ", response);
    return res.json({
      flag: 1,
      msg: "All student data are display",
      data: response,
    });
  } catch (error) {
    return res.json({
      flag: 0,
      msg: error.message,
      data: {},
    });
  }
};

const updateStudentData = async (req, res) => {
  try {
    let studentId = req.query.id;

    // Destructure request body
    let { fname, lname, email, subOne, subTwo, subThree } = req.body;

    if (fname?.length < 3 || fname?.length > 30) {
      return res.json({
        flag: 0,
        msg: "First name must be between 3 and 30 characters long!",
        data: {},
      });
    }

    if (lname?.length < 3 || lname?.length > 30) {
      return res.json({
        flag: 0,
        msg: "Last name must be between 3 and 30 characters long!",
        data: {},
      });
    }

    if (!isEmailValid(email)) {
      return res.json({
        flag: 0,
        msg: "Please enter a valid email address!",
        data: {},
      });
    }
    
    if (
      subOne.length < 1 ||
      subOne.length > 3 ||
      subTwo.length < 1 ||
      subTwo.length > 3 ||
      subThree.length < 1 ||
      subThree.length > 3 ||
      parseInt(subOne) < 0 ||
      parseInt(subOne) > 100 ||
      parseInt(subTwo) < 0 ||
      parseInt(subTwo) > 100 ||
      parseInt(subThree) < 0 ||
      parseInt(subThree) > 100
    ) {
      return res.json({
        flag: 0,
        msg: "Subject grades must be between 0 and 100!",
        data: {},
      });
    }

    // Check if student with the given name already exists
    let checkName = await studentResultModel.findOne({
      $and: [{ fname: fname }, { lname: lname }],
      _id: { $ne: studentId }, // Exclude the current student from the check
    });

    if (checkName) {
      return res.json({
        flag: 0,
        msg: "This student is already registered!",
        data: {},
      });
    }

    // Update student data
    let response = await studentResultModel.findByIdAndUpdate(
      studentId,
      req.body
    );

    if (!response) {
      return res.status(404).json({
        flag: 0,
        msg: "Student not found!",
        data: {},
      });
    }

    return res.json({
      flag: 1,
      msg: "Student data updated successfully",
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      flag: 0,
      msg: error.message,
      data: {},
    });
  }
};

const deleteStudent = async (req, res) => {
  try {
    let studentId = req.query.id;

    await studentResultModel.findByIdAndDelete(studentId);
    return res.json({
      flag: 1,
      msg: "Student data deleted successfully",
      data: {},
    });
  } catch (error) {
    return res.json({
      flag: 0,
      msg: error.message,
      data: {},
    });
  }
};

module.exports = {
  postStudentData,
  postStudentList,
  updateStudentData,
  deleteStudent,
};
