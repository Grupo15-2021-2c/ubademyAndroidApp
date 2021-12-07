import {coursesEndPoint} from '../Parameters/EndpointsUrls';
import processResponse from '../components/FetchUtilities';
import showToast from '../components/ToastUtilities';

export const getExams = (courseId, sectionId, setState) => {
  setState(prevState => {
    let modifiableState = Object.assign({}, prevState);
    modifiableState.loading = true;
    return modifiableState;
  });

  let uri =
    coursesEndPoint + '/' + courseId + '/sections/' + sectionId + '/' + 'exams';

  console.log(uri);

  fetch(uri, {
    method: 'get',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.log(data);

      if (statusCode === 200) {
        setState({
          loading: false,
          resources: data.data,
        });
      }
    })
    .catch(error => console.error(error.message));
};

export const createExam = (courseId, sectionId, state) => {
  let uri =
    coursesEndPoint + '/' + courseId + '/sections/' + sectionId + '/' + 'exams';

  console.log(uri);

  fetch(uri, {
    method: 'post',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(state),
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.log(data);

      if (statusCode === 200) {
        console.log('Creado');
      }
    })
    .catch(error => console.error(error.message));
};

export const updateExam = (exam, navigation) => {
  let uri =
    coursesEndPoint +
    '/' +
    exam.courseId +
    '/sections/' +
    exam.sectionId +
    '/exams/' +
    exam.id;

  console.log(uri);

  fetch(uri, {
    method: 'patch',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exam.questions),
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.log(data);

      if (statusCode === 200) {
        showToast('Exam updated!');
        navigation.goBack();
      }
    })
    .catch(error => console.error(error.message));
};

export const publishExam = (exam, navigation) => {
  let uri =
    coursesEndPoint +
    '/' +
    exam.courseId +
    '/sections/' +
    exam.sectionId +
    '/exams/' +
    exam.id +
    '/publish';

  console.log(uri);

  fetch(uri, {
    method: 'patch',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exam.questions),
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.log(data);

      if (statusCode === 200) {
        showToast('Exam published!');
        navigation.goBack();
      }
    })
    .catch(error => console.error(error.message));
};

export const answerExam = (state, userId, navigation) => {
  let uri =
    coursesEndPoint +
    '/' +
    state.exam.courseId +
    '/sections/' +
    state.exam.sectionId +
    '/exams/' +
    state.exam.id +
    '/resolutions';

  console.log(uri);

  let form = {
    userId: userId.currentUserId,
    answers: state.answers,
  };

  console.log(form);

  fetch(uri, {
    method: 'post',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.log(data);

      if (statusCode === 200) {
        showToast('Exam published!');
        navigation.goBack();
      }
    })
    .catch(error => console.error(error.message));
};

export const getUserAnswer = (state, userId, setAnswer) => {
  let uri =
    coursesEndPoint +
    '/' +
    state.exam.courseId +
    '/sections/' +
    state.exam.sectionId +
    '/exams/' +
    state.exam.id +
    '/resolutions';

  console.log(uri);

  fetch(uri, {
    method: 'get',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.log(data);

      if (statusCode === 200) {
        for (const ans in data.data) {
          if (data.data[ans].userId === userId) {
            setAnswer({loading: false, answers: data.data[ans]});
            return;
          }
        }
      }
    })
    .catch(error => console.error(error.message));
};

export const getPublishedExams = (courseId, sectionId, setState) => {
  setState(prevState => {
    let modifiableState = Object.assign({}, prevState);
    modifiableState.loading = true;
    return modifiableState;
  });

  let uri =
    coursesEndPoint + '/' + courseId + '/sections/' + sectionId + '/' + 'exams';

  console.log(uri);

  fetch(uri, {
    method: 'get',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.log(data);

      if (statusCode === 200) {
        let exams = [];

        for (const i in data.data) {
          if (data.data[i].state === 'PUBLISHED') {
            exams.push(data.data[i]);
          }
        }

        setState({
          loading: false,
          resources: exams,
        });
      }
    })
    .catch(error => console.error(error.message));
};

export const getStudentsExams = (courseId, sectionId, examId, setState) => {
  setState(prevState => {
    let modifiableState = Object.assign({}, prevState);
    modifiableState.loading = true;
    return modifiableState;
  });

  console.log('aca');

  let uri =
    coursesEndPoint +
    '/' +
    courseId +
    '/sections/' +
    sectionId +
    '/exams/' +
    examId +
    '/resolutions';

  console.log(uri);

  fetch(uri, {
    method: 'get',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.log(data);

      if (statusCode === 200) {
        setState({
          loading: false,
          resources: data.data,
        });
      }
    })
    .catch(error => console.error(error.message));
};

export const getExam = (courseId, sectionId, examId, setState) => {
  setState(prevState => {
    let modifiableState = Object.assign({}, prevState);
    modifiableState.loading = true;
    return modifiableState;
  });

  let uri =
    coursesEndPoint +
    '/' +
    courseId +
    '/sections/' +
    sectionId +
    '/exams/' +
    examId;

  console.log(uri);

  fetch(uri, {
    method: 'get',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.log(data);

      if (statusCode === 200) {
        setState(prevState => {
          let modifiableState = Object.assign({}, prevState);
          modifiableState.exam = data.data;
          modifiableState.loading = false;
          return modifiableState;
        });
      }
    })
    .catch(error => console.error(error.message));
};

export const scoreExam = (
  courseId,
  sectionId,
  examId,
  resolutionId,
  score,
  navigation,
) => {
  let uri =
    coursesEndPoint +
    '/' +
    courseId +
    '/sections/' +
    sectionId +
    '/exams/' +
    examId +
    '/resolutions/' +
    resolutionId +
    '/score';

  console.log(uri);

  let form = {score: score};

  console.log(form);

  fetch(uri, {
    method: 'patch',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.log(data);

      if (statusCode === 200) {
        showToast('Exam scored!');
        navigation.goBack();
      }
    })
    .catch(error => console.error(error.message));
};
