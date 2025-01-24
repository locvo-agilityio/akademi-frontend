## React Revise

### Overview

- This document provides requirements and estimation for React 19 Practice.
- Design: [Figma](https://www.figma.com/design/7cMIoP4TeGCY8sLeEEA2Qe/Akademi---School-Admission-Dashboard?node-id=0-1&p=f&t=Ge1TEd9A4gaRsocZ-0)
- Plan: [Plan Practice](https://docs.google.com/document/d/1RKFpo2h38XS61o3R7BGMA8Y6uz4AW9SdtPzflILwWBs/edit?tab=t.0)

### Target

- Keep updated with the latest React version (v19) and other state management libraries.
- Implement the outstanding features of React 19.
- Improve and apply React advanced concepts (HOC, hook,...) into code.

### Timeline

- Estimate: 11 days (2025/01/03 - 2025/01/17).

### Technical

- Vite - v6.0.1
- Prettier - v3.2.5
- ESLint - v9.15.0
- React - v19.0.0
- TypeScript - v5.6.2
- Storybook - v7.5.3
- Jest - v29.7.0
- React Query - v.5.40.0
- React-Testing-Library - 14.1.2
- React Router - v6.19.0

### Requirements

- DASHBOARD PAGE

  - Display the statistics on the number of students and teachers.
  - Display the list of unpaid student intuition.

- STUDENT LIST PAGE

  - Display the list of students by pagination (6 per page).
  - The user can search by name the list of students.
  - The user can order the list of students by the order dropdown.
  - The user can add a new student by the “New Student” button.
  - The user edits or deletes the student by the action icon in each row.
  - The user can navigate to the student details page by the action icon in each row.

- STUDENT DETAILS PAGE

  - The user can view the student information and list of schedules.

- STUDENT FORM PAGE

  - The user can enter student details and parent details to submit a new student.

  - TEACHER LIST PAGE

    - Display the list of teachers by pagination (12 per page).
    - The user can search by name the list of teachers.
    - The user can order the list of teachers by the order dropdown.
    - The user can add a new teacher by the “New Teacher” button.
    - The user edits or deletes the teacher by the action icon in each row.
    - The user can navigate to the teacher details page by the action icon in each row.

  - TEACHER DETAIL PAGE

    - The user can view the teacher information and list of schedules.

  - TEACHER FORM PAGE

    - The user can enter personal details and education of the student to submit a new teacher.

- UNIT TESTING

  - Unit test coverage is required over 90%.

- CHECKING PAGE SPEED

  - Checking the website page speed through the Lighthouse tool.

- DEPLOY WITH VERCEL

  - Reference link: https://vercel.com/

### Getting Started

- Step 1: Clone repository.

  - SSH: `$ git clone git@gitlab.asoft-python.com:loc.vo/react-training.git`.
  - HTTPS: `$ git clone https://gitlab.asoft-python.com/loc.vo/react-training.git`.

- Step 2:

  - Open terminal: `cd .\akademi\`
  - Install the packages `pnpm install`.

- Step 3:

  - Add file .env and add elements like .env.example
  - Run app:
    - Run web local: `pnpm dev`

- Step 4:

  - Run Storybook: `pnpm storybook`.
  - Run Test: `pnpm test`

## Author

- Loc vo.
- Email: [loc.vo@asnet.com.vn](loc.vo@asnet.com.vn).
