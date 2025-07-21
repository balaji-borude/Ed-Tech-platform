import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    
    signupData: null,
    loading: false,
    
    // jr token bhetle tr parse kr nahitr null set kr --> there is use of ternary operator 
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice({
    name:"auth",
    initialState:initialState,

    reducers:{
        setToken(state,value){
            state.token = value.payload;
        },
        setSignupData(state, value) {
            state.signupData = value.payload;
            },

          setLoading(state, value) {
            state.loading = value.payload;
          },
    },
});

export const {setToken, setSignupData, setLoading, } = authSlice.actions;

export default authSlice.reducer