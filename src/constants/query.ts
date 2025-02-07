export const QUERY = {
  STUDENTS_UNPAID: (page: number) =>
    `filters[payment]=unpaid&pagination[page]=${page}&pagination[pageSize]=5&sort=createdAt:desc`,
  STUDENTS: (page: number) => `pagination[page]=${page}&pagination[pageSize]=5`,
  TEACHERS: (page: number) =>
    `pagination[page]=${page}&pagination[pageSize]=10`,
};
