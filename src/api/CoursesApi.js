import {
  coursesEndPoint,
  creatorsEndPoint,
  resourcesEndPoint,
  usersEndPoint,
} from '../Parameters/EndpointsUrls';
import processResponse from '../components/FetchUtilities';
import showToast from '../components/ToastUtilities';

export const getCourses = setState => {
  setState({loading: true});

  fetch(coursesEndPoint, {
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

      if (statusCode === 200) {
        setState({
          loading: false,
          courses: data.data,
        });
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const getSections = (courseId, setState) => {
  setState({loading: true});

  fetch(coursesEndPoint + '/' + courseId + '/sections', {
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

      if (statusCode === 200) {
        setState({
          loading: false,
          sections: data.data,
        });
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const getSection = (courseId, sectionId, setState) => {
  setState({loading: true});

  fetch(coursesEndPoint + '/' + courseId + '/sections/' + sectionId, {
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

      if (statusCode === 200) {
        setState({
          loading: false,
          section: data.data,
        });
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const getCourse = (id, setState) => {
  setState({loading: true});

  fetch(coursesEndPoint + '/' + id, {
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

      if (statusCode === 200) {
        setState({
          loading: false,
          course: data.data,
        });
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const getMyCourses = (setState, userId) => {
  setState({loading: true});

  console.log('userId ' + userId);

  fetch(creatorsEndPoint + '/' + userId + '/courses', {
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
          courses: data.data,
        });
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const getCategories = (setCategories, setLoading) => {
  setLoading(true);

  fetch(coursesEndPoint + '/categories', {
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
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const creatCourse = (course, category, setError, navigation, userId) => {
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

  fetch(coursesEndPoint, {
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

      if (statusCode === 200) {
        showToast('Course created successfully');
        navigation.navigate('My Courses', {userId: userId});
      } else {
        showToast(data.message);
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const getEnrolled = (id, setState) => {
  setState({loading: true});

  let url = coursesEndPoint + '/' + id + '/inscriptions';

  fetch(url, {
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

      console.log('[INFO] ' + data.data);

      if (statusCode === 200) {
        setState({
          loading: false,
          enrolled: data.data,
        });
      }
    })
    .catch(error => console.error(error.message));
};

export const creatSection = (form, setError, navigation, courseId) => {
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

  fetch(coursesEndPoint + '/' + courseId + '/sections', {
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

      if (statusCode === 200) {
        showToast(data.data);
        navigation.navigate('Edit Sections', {courseId: courseId});
      } else {
        showToast(data.message);
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const userIsEnrolled = (id, userId, setEnrolledState) => {
  setEnrolledState({loading: true});

  fetch(usersEndPoint + '/' + userId + '/inscriptions', {
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

      console.log(data.data);

      if (statusCode === 200) {
        for (const i in data.data) {
          if (data.data[i].id === id) {
            setEnrolledState({loading: false, isEnrolled: true});
            return;
          }
        }
        setEnrolledState({loading: false, isEnrolled: false});
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const enroll = (userId, id, setEnrolledState) => {
  let url = coursesEndPoint + '/' + id + '/inscriptions/' + userId;

  fetch(url, {
    method: 'post',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
      } else {
        showToast(data.message);
      }
    })
    .catch(error => console.error(error.message));
};

export const cancelInscription = (userId, id, setEnrolledState) => {
  let url = coursesEndPoint + '/' + id + '/inscriptions/' + userId;

  fetch(url, {
    method: 'delete',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
      } else {
        showToast(data.message);
      }
    })
    .catch(error => console.error(error.message));
};

export const getResources = (courseId, sectionId, setState) => {
  setState({loading: true});

  let url = resourcesEndPoint + '/' + courseId + '/sections/' + sectionId;

  console.log(url);

  fetch(url, {
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

      console.log(data.data);

      setState({
        loading: false,
        resources: data.data,
      });
    })
    .catch(error => console.error(error.message));
};

export const editCourse = (course, category, setError, navigation) => {
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

  fetch(coursesEndPoint + '/' + form.id, {
    method: 'put',
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

      if (statusCode === 200) {
        showToast('Course created successfully');
        navigation.navigate('Editable Course', {id: form.id});
      } else {
        showToast(data.message);
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};

export const uploadImage = async (courseId, sectionId, image) => {
  let url = resourcesEndPoint + '/' + 1 + '/sections/' + 1 + '/upload';

  console.log(image);

  let body = new FormData();

  let form = {
    uri: image.uri,
    type: image.type,
    name: image.name,
  };

  body.append('file', form);

  console.log(url);

  let result = await fetch(url, {
    method: 'post',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: body,
  }).catch(error => console.log('[ERROR] ' + error.message));

  console.log(result);
};

export const editSection = (section, setError, navigation) => {
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

  fetch(url, {
    method: 'put',
    mode: 'no-cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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
      } else {
        showToast(data.message);
      }
    })
    .catch(error => console.log('[ERROR] ' + error.message));
};
