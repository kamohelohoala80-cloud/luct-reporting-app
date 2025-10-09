# TODO: Implement Role-Based Login (Students with Student Numbers, Lecturers with Lecturer IDs)

## Steps to Complete

- [x] Update server/database.js: Add `student_number` and `lecturer_id` columns to users table.
- [x] Update server/database.js: Modify seedUsers to include student_number for student role and lecturer_id for lecturer role.
- [x] Update server/server.js: Modify /api/signup endpoint to accept and store student_number for students, lecturer_id for lecturers.
- [x] Update server/server.js: Modify /api/login endpoint to query by student_number if role is student, lecturer_id if lecturer, email otherwise.
- [x] Update src/Components/Login.js: Modify the form to display student number input for students, lecturer ID input for lecturers, email input for other roles.
- [x] Fix App.js: Correct the role mapping so lecturers see LecturerModule and students see StudentModule.
- [x] Add /api/reports endpoint to server.js to return mock report data for the Reports component.
- [x] Test the login functionality for different roles to ensure it works correctly.
