

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getHeader = () => {
  const token = localStorage.getItem("access");

  if (!token) return {};

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const register = async (userData) => {
    const url = BASE_URL + "users/api/register/"
    console.log("url ",url);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        if (!response.ok) {
            throw data;
        }
        return data;
    }
    catch(error) {
        throw error;
    }
}

export const loginApi = async (userData) => {
    const url = BASE_URL + "users/api/login/"
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        if (!response.ok) {
            throw data;
        }
        return data;
    }
    catch(error) {
        throw error;
    }
}

export const createProject = async (projectData) => {
    const url = BASE_URL + "projects/api/projects/"
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: getHeader(),
            body: JSON.stringify(projectData)
        });
        const data = await response.json();
        if (!response.ok) {
            throw data;
        }
        return data;
    }
    catch(error) {
        throw error;
    }
}

export const deleteProject = async (projectId) => {
    const url = BASE_URL + `projects/api/projects/${projectId}/`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: getHeader(),
        });
        const data = await response.json();
        console.log(response.status, " ", typeof (response.status));
        if (response.status != 204) {
            throw data;
        }
        return data;
    }
    catch(error) {
        throw error;
    }
}

export const getProjectApi = async (projectData) => {
    const url = BASE_URL + "projects/api/projects/"
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: getHeader(),
        });
        const data = await response.json();
        if (!response.ok) {
            throw data;
        }
        return data;
    }
    catch(error) {
        throw error;
    }
}

export const createTask = async (taskData, projectId) => {
    const url = BASE_URL + `projects/api/${projectId}/tasks/`
    console.log(url);
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: getHeader(),
            body: JSON.stringify(taskData)
        });
        const data = await response.json();
        if (!response.ok) {
            throw data;
        }
        return data;
    }
    catch(error) {
        throw error;
    }
}

export const getTasks = async (projectId) => {
    const url = BASE_URL + `projects/api/${projectId}/tasks/`
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: getHeader(),
        });
        const data = await response.json();
        if (!response.ok) {
            throw data;
        }
        return data;
    }
    catch(error) {
        throw error;
    }
}

export const updateTask = async (taskId, updatedForm, projectId) => {
    const url = BASE_URL + `projects/api/${projectId}/tasks/${taskId}/`
    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: getHeader(),
            body: JSON.stringify(updatedForm)
        });
        const data = await response.json();
        if (!response.ok) {
            throw data;
        }
        return data;
    }
    catch(error) {
        throw error;
    }
}

export const deleteTask = async (projectId, taskId) => {
    const url = BASE_URL + `projects/api/${projectId}/tasks/${taskId}/`
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: getHeader(),
        });
        const data = await response.json();
        if (!response.ok) {
            throw data;
        }
        return data;
    }
    catch(error) {
        throw error;
    }
}

export const getDashboardData = async () => {
    const url = BASE_URL + `projects/api/dashboard/`;
    try {
        const response = await fetch(url, 
            {
                headers: getHeader(),
            }
        );
        const data = await response.json();
        if (!response.ok) {
            throw data;
        }
        return data;
    } catch (error) {
        throw error
    }
}