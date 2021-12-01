export const getExams = (courseId, sectionId, setState) => {
  setState({
    loading: false,
    resources: [
      {
        id: 1,
        courseId: courseId,
        sectionId: sectionId,
        title: 'Exam 1',
      },
      {
        id: 2,
        courseId: courseId,
        sectionId: sectionId,
        title: 'Exam 2',
      },
    ],
  });
};
