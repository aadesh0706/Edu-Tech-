const express = require('express');
const router = express.Router();
const adminmodel = require("./models/admin_model")
const student_model = require("./models/student_model")
const assignment_model = require("./models/assignment_model")
const notice_model = require('./models/notice_model');
const exam_model = require('./models/exam_model');
const admincontroller = require("./controller/admin_controller")
const studentcontroller = require("./controller/student_controller")
const teachercontroller = require("./controller/teacher_controller")
const app = express();
const teacher_model = require("./models/teacher_model")


const PDFDocument = require('pdfkit');
const mongoose = require('mongoose')

router.get('/', (req, res) => {
    res.render('../views/mainpage/mainpage.ejs')
})

router.get('/all_register', (req, res) => {
    res.render('../views/mainpage/all_register')
})

router.get('/admin_register', (req, res) => {
    res.render('../views/mainpage/admin/admin_register')
})

router.post('/admin_register', admincontroller.register_admin)


router.get('/admin_login', (req, res) => {
    res.render('../views/mainpage/admin/admin_login')
})

router.post('/admin_login', admincontroller.login_admin)

router.get('/admin_dashboard', async (req, res) => {
    let total = await student_model.find()
    res.render('../views/mainpage/admin/admin_dashboard', { total })
})

router.post('/admin_dashboard', admincontroller.login_admin)

router.get('/admin_leaderboard', async (req, res) => {
    let total = await student_model.find().sort({ "recent_marks": -1 })
    res.render('../views/mainpage/admin/admin_leaderboard', { total })
})

router.get('/admin_profile', (req, res) => {
    res.render('../views/mainpage/admin/admin_profile')
})

// render admin academic planning page
router.get('/admin_academic_planning', (req, res) => {
    res.render('../views/mainpage/admin/admin_academic_planning')
})

router.get('/admin_notice', async (req, res) => {
    let notice = await notice_model.find().sort({ "date": -1 })
    res.render('../views/mainpage/admin/admin_notice', { notice })
})


// student router
router.get('/student_register', (req, res) => {
    res.render('../views/mainpage/student/student_register')
})

router.post('/student_register', studentcontroller.register_student)

router.get('/student_login', (req, res) => {
    res.render('../views/mainpage/student/student_login')
})

router.post('/student_login', studentcontroller.login_student)

router.get('/student_dashboard', async (req, res) => {
    let total = await student_model.find()
    res.render('../views/mainpage/student/student_dashboard', { total })
})

router.post('/student_dashboard', studentcontroller.login_student)

router.get('/student_leaderboard', async (req, res) => {
    let total = await student_model.find()
    res.render('../views/mainpage/student/student_leaderboard', { total })
})
router.get('/student_profile', async (req, res) => {
    let user = await student_model.find()
    // let total = await student_model.find().sort({"recent_marks":-1})
    res.render('../views/mainpage/student/student_profile', { user })
})
router.get('/success_student', (req, res) => {
    res.render('../views/mainpage/student/success')
})
// render student academic planning page
router.get('/student_academic_planning', (req, res) => {
    res.render('../views/mainpage/student/student_academic_planning')
})
router.get('/student_training', (req, res) => {
    res.render('../views/mainpage/student/student_training')
})
router.get('/student_exam', async(req, res) => {
    let exam = await exam_model.find()
    res.render('../views/mainpage/student/student_exam',{exam})
})
router.get('/student_assignment', async(req, res) => {
    let assignment = await assignment_model.find()
    res.render('../views/mainpage/student/student_assignment',{assignment})
})



// teacher related main pages
router.get('/teacher_register', (req, res) => {
    res.render('../views/mainpage/teacher/teacher_register')
})
router.post('/teacher_register', teachercontroller.register_teacher)

router.get('/teacher_login', (req, res) => {
    res.render('../views/mainpage/teacher/teacher_login')
})
router.post('/teacher_login', teachercontroller.login_teacher)

router.get('/teacher_profile', async (req, res) => {
    let user = await student_model.find()
    res.render('../views/mainpage/teacher/teacher_profile', { user })
})

// router.get('/teacher_dashboard',async(req,res)=>{
//     let teacher = await teacher_model.find().populate('department')
//     let total = await student_model.find().populate(teacher.department)
//     console.log("HEllo")
//     res.render('../views/mainpage/teacher/teacher_dashboard',{total})
// })
router.post('/teacher_dashboard', teachercontroller.login_teacher)



// router.post('/notices', (req, res) => {
//     const { title, date, content } = req.body;
//     const newNotice = new Notice({ title, date, content });
//     newNotice.save()
//         //   send('Notice saved successfully!')
//         .then(() => res.redirect('/admin_notice'))
//         // send('Notice saved successfully!')
//         // .console.log("Data Saved"))
//         .catch((err) => {
//             console.error(err);
//             res.status(500);
//             //   .send('Error saving notice!');
//         });
// });

// const Assignment = require('../Edu-Tech-/models/assignment_model');
// router.get('/teacher_assignment', (req, res) => {

//     res.render('../views/mainpage/teacher/teacher_assignment')

//     // // POST request to store a new notice in MongoDB
//     router.post('/teacher_assignment', (req, res) => {
//         const { assignementName, assignementLink } = req.body;
//         const newAssignment = new Assignment({ assignementName, assignementLink });
//         newAssignment.save()
//             //   send('Notice saved successfully!')
//             .then(() => res.redirect('/teacher_assignment'))
//             // send('Notice saved successfully!')
//             // .console.log("Data Saved"))
//             .catch((err) => {
//                 console.error(err);
//                 res.status(500);
//                 //   .send('Error saving notice!');
//             });
//     });
// })


// POST request to store a new notice in MongoDB
router.get('/teacher_assignment', (req, res) => {
    res.render('../views/mainpage/teacher/teacher_assignment')
});

router.post('/teacher_assignment',(req, res) => {
    const { assignementName, assignementLink } = req.body;
    // console.log(assignementName);
    const newAssignment = new Assignement({ assignementName, assignementLink });
    newAssignment.save()
        //   send('Notice saved successfully!')
        .then(() => res.redirect('/teacher_assignment'))
        // send('Notice saved successfully!')
        // .console.log("Data Saved"))
        .catch((err) => {
            console.error(err);
            res.status(500);
            //   .send('Error saving notice!');
        })
;})

router.get('/teacher_leaderboard', async (req, res) => {
    let total = await student_model.find().sort({ "recent_marks": -1 })
    res.render('../views/mainpage/teacher/teacher_leaderboard', { total })
})
router.get('/teacher_peer', (req, res) => {
    res.render('../views/mainpage/student/student_peer_learning')
})
router.get('/teacher_training', (req, res) => {
    res.render('../views/mainpage/teacher/teacher_training')
})
router.get('/teacher_academic_planning', (req, res) => {
    res.render('../views/mainpage/teacher/teacher_academic_planning')
})
router.get('/teacher_exam', (req, res) => {
    res.render('../views/mainpage/teacher/teacher_exam')
})

const Exam = require('./models/exam_model');

router.post('/teacher_exam',(req, res) => {
    const { examName, examLink } = req.body;
    // console.log(assignementName);
    const newExam = new Exam({ examName, examLink });
    newExam.save()
        //   send('Notice saved successfully!')
        .then(() => res.redirect('/teacher_exam'))
        // send('Notice saved successfully!')
        // .console.log("Data Saved"))
        .catch((err) => {
            console.error(err);
            res.status(500);
            //   .send('Error saving notice!');
        })
;})



// student API's
router.post('/student_dashboard', studentcontroller.login_student)

router.get('/student_peer_learning', (req, res) => {
    res.render('../views/mainpage/student/student_peer_learning')
})

router.get('/success_teacher', (req, res) => {
    res.render('../views/mainpage/teacher/success')
})



// other same pages to render
router.get('/events', (req, res) => {
    res.render('../views/mainpage/components/events')
})

// render institute page
router.get('/institute', (req, res) => {
    res.render('../views/mainpage/components/institute')
})
router.get('/course_institute', (req, res) => {
    res.render('../views/mainpage/components/course_institute')
})
router.get('/contact_institute', (req, res) => {
    res.render('../views/mainpage/components/contact_institute')
})
router.get('/stu_tea_noticeboard', async (req, res) => {
    let notice = await notice_model.find().sort({ "date": -1 })
    res.render('../views/mainpage/components/stu_tea_noticeboard', { notice })
})
router.get('/academic_planning', (req, res) => {
    res.render('../views/mainpage/components/academic_planning')
})
router.get('/feedback', (req, res) => {
    res.render('../views/mainpage/components/feedback')
})

router.get('/admin_report', async (req, res) => {
    let total_teacher = await teacher_model.find()
    let total_student = await student_model.find()
    res.render('../views/mainpage/admin/admin_report', { total_teacher, total_student })
})

const Student = mongoose.model('student', student_model.studentschema);
const puppeteer = require('puppeteer');
router.get('/api/students/pdf', async (req, res) => {
    try {
        const students = await Student.find({}).lean().exec(); // Retrieve student data from MongoDB

        // Generate HTML template
        let html = `
            <html>
                <head>
                    <style>
                        /* Add your CSS styles here */
                        body {
                            font-family: Arial, sans-serif;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h1>Student Data</h1>
                    <table>
                        <tr>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Class</th>
                            <th>recent Marks</th>
                            <th>Gender</th>
                        </tr>
        `;

        // Add student data to the HTML template
        students.forEach(student => {
            html += `
                <tr>
                    <td>${student.fullname}</td>
                    <td>${student.email}</td>
                    <td>${student.Department}</td>
                    <td>${student.class1}</td>
                    <td>${student.recent_marks}</td>
                    <td>${student.gender}</td>
                </tr>
            `;
        });

        html += `
                    </table>
                </body>
            </html>
        `;

        // Launch a headless browser using Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set the HTML content of the page
        await page.setContent(html, { waitUntil: 'domcontentloaded' });

        // Generate a PDF from the HTML page
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

        await browser.close();

        // Send the generated PDF as a response to the client
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=students.pdf');
        res.send(pdfBuffer);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating PDF');
    }
});

const Teacher = mongoose.model('teacher', teacher_model.teacherschema);
// const puppeteer = require('puppeteer');
router.get('/api/teachers/pdf', async (req, res) => {
    try {
        const teachers = await Teacher.find({}).lean().exec(); // Retrieve teacher data from MongoDB

        // Generate HTML template
        let html = `
            <html>
                <head>
                    <style>
                        /* Add your CSS styles here */
                        body {
                            font-family: Arial, sans-serif;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h1>Teacher Data</h1>
                    <table>
                        <tr>
                            <th>Teacher Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Gender</th>
                        </tr>
        `;

        // Add teacher data to the HTML template
        teachers.forEach(teacher => {
            html += `
                <tr>
                    <td>${teacher.fullname}</td>
                    <td>${teacher.email}</td>
                    <td>${teacher.department}</td>
                    <td>${teacher.gender}</td>
                </tr>
            `;
        });

        html += `
                    </table>
                </body>
            </html>
        `;

        // Launch a headless browser using Puppeteer
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set the HTML content of the page
        await page.setContent(html, { waitUntil: 'domcontentloaded' });

        // Generate a PDF from the HTML page
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

        await browser.close();

        // Send the generated PDF as a response to the client
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=teachers.pdf');
        res.send(pdfBuffer);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating PDF');
    }
});


// notice post
// router.post('/notices',admincontroller.uploadNotice)
const Notice = require('./models/notice_model');

// POST request to store a new notice in MongoDB
router.post('/notices', (req, res) => {
    const { title, date, content } = req.body;
    const newNotice = new Notice({ title, date, content });
    newNotice.save()
        //   send('Notice saved successfully!')
        .then(() => res.redirect('/admin_notice'))
        // send('Notice saved successfully!')
        // .console.log("Data Saved"))
        .catch((err) => {
            console.error(err);
            res.status(500);
            //   .send('Error saving notice!');
        });
});

module.exports = router;
