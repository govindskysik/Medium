export const API_BASE_URL = "https://backend.aroult-skysik.workers.dev";

export const API_ENDPOINTS = {
  signin: `${API_BASE_URL}/api/v1/user/signin`,
  signup: `${API_BASE_URL}/api/v1/user/signup`,
  update: `${API_BASE_URL}/api/v1/user/user`,
  createBlog: `${API_BASE_URL}/api/v1/blog/create`,
  updateBlog: `${API_BASE_URL}/api/v1/blog/update`,
  getBlogs: `${API_BASE_URL}/api/v1/blog/bulk`,
  getBlog: (id: string) => `${API_BASE_URL}/api/v1/blog/get/${id}`,
};
