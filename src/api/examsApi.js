import {coursesEndPoint} from '../Parameters/EndpointsUrls';
import processResponse from '../components/FetchUtilities';
import showToast from '../components/ToastUtilities';
import {getUserToken, loadedUserId} from './Storage';
import {logOutUser} from './UsersApi';

export const getExams = async (courseId, sectionId, setState, navigation) => {
  let user = await getUserToken();

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
      Authorization: 'Bearer ' + user.token,
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
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};

export const createExam = async (courseId, sectionId, state, navigation) => {
  let user = await getUserToken();
  let uri =
    coursesEndPoint + '/' + courseId + '/sections/' + sectionId + '/' + 'exams';

  console.log(uri);

  console.log({state});
  console.log(state.questions);

  fetch(uri, {
    method: 'post',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.token,
    },
    body: JSON.stringify(state),
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      console.log(data);

      if (statusCode === 200) {
        navigation.goBack();
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};

export const updateExam = async (exam, navigation) => {
  let uri =
    coursesEndPoint +
    '/' +
    exam.courseId +
    '/sections/' +
    exam.sectionId +
    '/exams/' +
    exam.id;

  let user = await getUserToken();

  console.log(uri);

  fetch(uri, {
    method: 'patch',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.token,
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
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};

export const publishExam = async (exam, navigation) => {
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

  let user = await getUserToken();

  fetch(uri, {
    method: 'patch',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.token,
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
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};

export const answerExam = async (state, userId, navigation) => {
  let uri =
    coursesEndPoint +
    '/' +
    state.exam.courseId +
    '/sections/' +
    state.exam.sectionId +
    '/exams/' +
    state.exam.id +
    '/resolutions';

  let user = await getUserToken();

  console.log(uri);

  let form = {
    userId: userId,
    answers: state.answers,
  };

  console.log('exam answer');
  console.log(form);

  fetch(uri, {
    method: 'post',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.token,
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
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};

export const getUserAnswer = async (state, userId, setAnswer, navigation) => {
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

  let user = await getUserToken();

  fetch(uri, {
    method: 'get',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.token,
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
        setAnswer({loading: false, answers: null});
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};

export const getPublishedExams = async (
  courseId,
  sectionId,
  setState,
  navigation,
) => {
  let user = await getUserToken();

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
      Authorization: 'Bearer ' + user.token,
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
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};

export const getStudentsExams = async (
  courseId,
  sectionId,
  examId,
  setState,
  navigation,
) => {
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

  let user = await getUserToken();

  fetch(uri, {
    method: 'get',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.token,
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
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};

export const getExam = async (
  courseId,
  sectionId,
  examId,
  setState,
  navigation,
) => {
  setState(prevState => {
    let modifiableState = Object.assign({}, prevState);
    modifiableState.loading = true;
    return modifiableState;
  });

  let user = await getUserToken();

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
      Authorization: 'Bearer ' + user.token,
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
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};

export const scoreExam = async (
  courseId,
  sectionId,
  examId,
  resolutionId,
  score,
  navigation,
) => {
  if (score > 10 || score < 0) {
    showToast('Score is note between 0 and 10');
    return;
  }

  let user = await getUserToken();

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

  let id = await loadedUserId();

  let form = {score: score, scorerId: id.currentUserId};

  console.log(form);

  fetch(uri, {
    method: 'patch',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.token,
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
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};
