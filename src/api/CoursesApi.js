import {
  categoriesEndpoint,
  coursesEndPoint,
  creatorsEndPoint,
  underSubscription,
  usersEndPoint,
} from '../Parameters/EndpointsUrls';
import processResponse from '../components/FetchUtilities';
import showToast from '../components/ToastUtilities';
import {getUserToken} from './Storage';
import {logOutUser} from './UsersApi';

export const getSections = async (courseId, setState, navigation) => {
  setState({loading: true});

  let user = await getUserToken();

  fetch(coursesEndPoint + '/' + courseId + '/sections', {
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

      if (statusCode === 200) {
        setState({
          loading: false,
          sections: data.data,
        });
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const getSection = async (courseId, sectionId, setState, navigation) => {
  setState({loading: true});

  let user = await getUserToken();

  fetch(coursesEndPoint + '/' + courseId + '/sections/' + sectionId, {
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

      if (statusCode === 200) {
        setState({
          loading: false,
          section: data.data,
        });
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const getCourse = async (id, setState, navigation) => {
  setState({loading: true});

  let user = await getUserToken();

  fetch(coursesEndPoint + '/' + id, {
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

      if (statusCode === 200) {
        setState({
          loading: false,
          course: data.data,
        });
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const getMyCourses = async (setState, userId, navigation) => {
  setState({loading: true});

  let user = await getUserToken();

  console.log('userId ' + userId);

  fetch(creatorsEndPoint + '/' + userId + '/courses', {
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
          courses: data.data,
        });
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const getCategories = async (setCategories, setLoading, navigation) => {
  setLoading(true);

  let user = await getUserToken();

  fetch(coursesEndPoint + '/categories', {
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

      let list = [];

      for (const category in data.data) {
        list.push({
          label: data.data[category].name,
          value: data.data[category].id,
        });
      }

      console.log(list);

      if (statusCode === 200) {
        setLoading(false);
        setCategories(list);
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const creatCourse = async (
  course,
  category,
  setError,
  navigation,
  userId,
) => {
  let form = {...course, categoryId: category};
  console.log('[INFO] form: ' + JSON.stringify(form));

  if (form.title === '') {
    showToast('Course needs a title');
    setError({title: true});
    return;
  }
  setError({title: false});

  if (form.categoryId === 0) {
    showToast('Course needs a category');
    return;
  }

  if (form.description === '') {
    showToast('Course needs a description');
    setError({
      description: true,
    });
    return;
  }
  setError({description: false});

  let user = await getUserToken();

  fetch(coursesEndPoint, {
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

      if (statusCode === 200) {
        showToast('Course created successfully');
        navigation.navigate('My Courses', {userId: userId});
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      } else {
        showToast(data.message);
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const getEnrolled = async (id, setState, navigation) => {
  setState({loading: true});

  let url = coursesEndPoint + '/' + id + '/inscriptions';

  let user = await getUserToken();

  fetch(url, {
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
          enrolled: data.data,
        });
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};

export const creatSection = async (form, setError, navigation, courseId) => {
  console.log('[INFO] form: ' + JSON.stringify(form));

  if (form.subtitle === '') {
    showToast('Section needs a subtitle');
    setError({subtitle: true});
    return;
  }
  setError({subtitle: false});

  if (form.body === '') {
    showToast('Section needs a body');
    setError({body: true});
    return;
  }

  setError({body: false});

  console.log(coursesEndPoint + '/' + courseId + '/sections');

  let user = await getUserToken();

  fetch(coursesEndPoint + '/' + courseId + '/sections', {
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

      if (statusCode === 200) {
        showToast(data.data);
        navigation.navigate('Edit Sections', {courseId: courseId});
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      } else {
        showToast(data.message);
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const userIsEnrolled = async (
  id,
  userId,
  setEnrolledState,
  navigation,
) => {
  setEnrolledState({loading: true});

  let user = await getUserToken();

  fetch(usersEndPoint + '/' + userId + '/inscriptions', {
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

      console.log(data.data);

      if (statusCode === 200) {
        for (const i in data.data) {
          if (data.data[i].id === id) {
            setEnrolledState({loading: false, isEnrolled: true});
            return;
          }
        }
        setEnrolledState({loading: false, isEnrolled: false});
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const enroll = async (userId, id, setEnrolledState, navigation) => {
  let url = coursesEndPoint + '/' + id + '/inscriptions/' + userId;

  let user = await getUserToken();

  fetch(url, {
    method: 'post',
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

      if (statusCode === 200) {
        showToast('You are enrolled!');
        setEnrolledState({
          loading: false,
          isEnrolled: true,
        });
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      } else {
        showToast(data.message);
      }
    })
    .catch(error => console.error(error.message));
};

export const cancelInscription = async (
  userId,
  id,
  setEnrolledState,
  navigation,
) => {
  let user = await getUserToken();

  let url = coursesEndPoint + '/' + id + '/inscriptions/' + userId;

  fetch(url, {
    method: 'delete',
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

      if (statusCode === 200) {
        showToast('You canceled your inscription');
        setEnrolledState({
          loading: false,
          isEnrolled: false,
        });
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      } else {
        showToast(data.message);
      }
    })
    .catch(error => console.error(error.message));
};

export const getResources = async (
  courseId,
  sectionId,
  setState,
  navigation,
) => {
  setState({loading: true});

  let url =
    coursesEndPoint + '/' + courseId + '/sections/' + sectionId + '/resources';

  let user = await getUserToken();

  fetch(url, {
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

      console.log(data.data);

      if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }

      setState({
        loading: false,
        resources: data.data,
      });
    })
    .catch(error => console.error(error.message));
};

export const editCourse = async (course, category, setError, navigation) => {
  let form = {...course, categoryId: category};
  console.log('[INFO] form: ' + JSON.stringify(form));

  if (form.title === '') {
    showToast('Course needs a title');
    setError({title: true});
    return;
  }
  setError({title: false});

  if (form.categoryId === 0) {
    showToast('Course needs a category');
    return;
  }

  if (form.description === '') {
    showToast('Course needs a description');
    setError({
      description: true,
    });
    return;
  }
  setError({description: false});

  let user = await getUserToken();

  fetch(coursesEndPoint + '/' + form.id, {
    method: 'put',
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

      if (statusCode === 200) {
        showToast('Course edited successfully');
        navigation.navigate('Editable Course', {id: form.id});
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      } else {
        showToast(data.message);
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const uploadImage = async (courseId, sectionId, image, navigation) => {
  let url =
    coursesEndPoint + '/' + courseId + '/sections/' + sectionId + '/resources';

  console.log(image);

  let data = new FormData();

  let form = {
    uri: image.uri,
    type: image.type,
    name: image.fileName,
  };

  data.append('file', form);

  console.log();

  let user = await getUserToken();

  var requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: 'Bearer ' + user.token,
    }),
    body: data,
    redirect: 'manual',
  };

  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => {
      let res = JSON.parse(result);

      console.log({res});

      if (res.status === 'success') {
        navigation.goBack();
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.log('error', error));
};

export const editSection = async (section, setError, navigation) => {
  console.log(section);

  if (section.subtitle === '') {
    showToast('Course needs a title');
    setError({subtitle: true});
    return;
  }
  setError({title: false});

  if (section.body === '') {
    showToast('Course needs a description');
    setError({
      body: true,
    });
    return;
  }
  setError({body: false});

  let url =
    coursesEndPoint + '/' + section.courseId + '/sections/' + section.id;

  let user = await getUserToken();

  fetch(url, {
    method: 'put',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.token,
    },
    body: JSON.stringify(section),
  })
    .then(processResponse)
    .then(res => {
      const {statusCode, data} = res;

      if (statusCode === 200) {
        showToast('Updated');
        navigation.navigate('Editable section', {
          courseId: section.courseId,
          sectionId: section.id,
        });
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      } else {
        showToast(data.message);
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const uploadPdf = async (courseId, sectionId, pdf, navigation) => {
  let url =
    coursesEndPoint + '/' + courseId + '/sections/' + sectionId + '/resources';

  console.log(pdf);

  let data = new FormData();

  data.append('file', pdf);

  let user = await getUserToken();

  var requestOptions = {
    method: 'POST',
    headers: new Headers({
      Authorization: 'Bearer ' + user.token,
    }),
    body: data,
    redirect: 'manual',
  };

  fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => {
      let res = JSON.parse(result);

      if (res.status === 'success') {
        navigation.goBack();
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.log('error', error));
};

export const getCoursesSubscriptionType = async (
  type,
  setState,
  navigation,
) => {
  setState(prevState => {
    let modifiableState = Object.assign({}, prevState);
    modifiableState.loading = true;
    return modifiableState;
  });

  let url = underSubscription + '/' + type;

  console.log(url);

  let user = await getUserToken();

  fetch(url, {
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

      if (statusCode === 200) {
        console.log(data);
        setState({
          loading: false,
          subscriptionType: type,
          courses: data.data,
        });
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};

export const getCoursesCategory = async (category, setState, navigation) => {
  setState(prevState => {
    let modifiableState = Object.assign({}, prevState);
    modifiableState.loading = true;
    return modifiableState;
  });

  let url = categoriesEndpoint + '/' + category;

  let user = await getUserToken();

  console.log(url);

  fetch(url, {
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

      if (statusCode === 200) {
        console.log(data);
        setState({
          loading: false,
          category: category,
          courses: data.data,
        });
      } else if (data.message === 'JwtParseError: Jwt is expired') {
        logOutUser(navigation);
      }
    })
    .catch(error => console.error(error.message));
};
