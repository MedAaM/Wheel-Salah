import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
const login = async (formData) => {
    try {
        const response = await api.post('/api/v1/user/admin', formData);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};
const addToList = async (data) => {

    try {
        const response = await api.post('/api/v1/user/addTolist', data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
const deleteAllUsers = async () => {
    try {
        const response = await api.post('/api/v1/user/deleteAllUsers',);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
const getUsers = async () => {
    try {
        const response = await api.get('/api/v1/user/getUsers');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const addSub = async (data) => {

    try {
        const response = await api.post('/api/v1/subscription/add', data , {
            headers: {"Content-Type": "multipart/form-data"}
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const deleteSub = async () => {
    try {
        const response = await api.delete('/api/v1/subscription/delete',);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const getSub = async () => {
    try {
        const response = await api.get('/api/v1/subscription/get');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
const payement = async (data) => {
    try {
        const response = await api.post('api/v1/user/payement',data);
        console.log(response.data);
        return response.data
        
    }
    catch(error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
const submit_name = async (data) => {
    try {
        const response= await api.post('api/v1/user/submit-name',data);
        return response.data;
    }
    catch(error) {
        console.error('Error fetching data:', error);
        throw error;
    }
  };

  const notify_looser = async (data) => {
    try {
        const response= await api.post('api/v1/user/notify-looser',data);
        return response.data;
    }
    catch(error) {
        console.error('Error fetching data:', error);
        throw error;
    }
  };
  const notify_winner = async (data) => {
    try {
        const response= await api.post('api/v1/user/notify-winner',data);
        return response.data;
    }
    catch(error) {
        console.error('Error fetching data:', error);
        throw error;
    }
  }
export { addToList, deleteAllUsers, getUsers,addSub,deleteSub,getSub,login,payement ,submit_name,notify_looser,notify_winner};