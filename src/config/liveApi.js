import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function registerUser(data) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/register`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Registration error:", err?.response?.data?.message || err.message);
    throw err;
  }
}

export async function loginUser(data) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Registration error:", err?.response?.data?.message || err.message);
    throw err;
  }
}

export async function getAllUsers(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(
 `${API_BASE_URL}/api/auth/get-all-users`,
      { headers }
    );
    // console.log(response, "errrrrrrrrr");
    return response.data; // Return the response data if needed
  } catch (error) {
    console.log(error.message);
    throw error; // Re-throw the error if needed
  }
}

export async function addNewCourses(token, data) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      API_BASE_URL + `/course/create`,
      data,
      { headers }
    );

    console.log(response, "errrrrrrrrr");
    return response.data; // Return the response data if needed
  } catch (error) {
    console.log(error.message);
    throw error; // Re-throw the error if needed
  }
}

export async function getAllSubjects(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(
   `${API_BASE_URL}/api/subject/get-all-subject`,
      { headers }
    );
    // console.log(response, "errrrrrrrrr");
    return response.data; // Return the response data if needed
  } catch (error) {
    console.log(error.message);
    throw error; // Re-throw the error if needed
  }
}

export const updateCourseDetails = async (id, payload, token) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/course/update/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};

export async function getAllAdmin() {
  try {
    const response = await axios.get(
        `${API_BASE_URL}/api/auth/admin`);
    // console.log(response, "errrrrrrrrr");
    return response.data; // Return the response data if needed
  } catch (error) {
    console.log(error.message);
    throw error; // Re-throw the error if needed
  }
}

export async function getCourseFilter(token,page,searchInput,createdByFilter,subjectFilter) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(
        `${API_BASE_URL}/api/course/get-courses?page=${page}&search=${searchInput}&createdBy=${createdByFilter}&subject=${subjectFilter}`,
      { headers }
    );
    // console.log(response, "errrrrrrrrr");
    return response.data; // Return the response data if needed
  } catch (error) {
    console.log(error.message);
    throw error; // Re-throw the error if needed
  }
}

export const updateSubjectDetails = async (id, payload, token) => {
  try {
    const response = await axios.patch(
      `${API_BASE_URL}/api/subject/update/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};

export async function getSubjectsFilter(token,page,searchInput,createdByFilter) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(
 `${API_BASE_URL}/api/subject/get-sujects?page=${page}&search=${searchInput}&createdBy=${createdByFilter}`,
      { headers }
    );
    // console.log(response, "errrrrrrrrr");
    return response.data; // Return the response data if needed
  } catch (error) {
    console.log(error.message);
    throw error; // Re-throw the error if needed
  }
}

export async function createSubject(token, data) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      API_BASE_URL + `/subject/subject`,
      data,
      { headers }
    );

    console.log(response, "errrrrrrrrr");
    return response.data; // Return the response data if needed
  } catch (error) {
    console.log(error.message);
    throw error; // Re-throw the error if needed
  }
}

export async function getAllLectureForTable(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(
 `${API_BASE_URL}/api/lecture/get-lectures`,
      { headers }
    );
    // console.log(response, "errrrrrrrrr");
    return response.data; // Return the response data if needed
  } catch (error) {
    console.log(error.message);
    throw error; // Re-throw the error if needed
  }
}

export async function craeteLecture(token, data) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(
      API_BASE_URL + `/lecture/create`,
      data,
      { headers }
    );

    console.log(response, "errrrrrrrrr");
    return response.data; // Return the response data if needed
  } catch (error) {
    console.log(error.message);
    throw error; // Re-throw the error if needed
  }
}

export async function getListOfCourses(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.get(
     `${API_BASE_URL}/api/course/get-all-courses`,
      { headers }
    );
    // console.log(response, "errrrrrrrrr");
    return response.data; // Return the response data if needed
  } catch (error) {
    console.log(error.message);
    throw error; // Re-throw the error if needed
  }
}
