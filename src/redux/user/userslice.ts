import { createSlice, current } from "@reduxjs/toolkit";


const initialState= {
    currentUser : null,
    error:null,
    loading:false,
}


const userSlice  = createSlice({
        name:"User",
        initialState,
        reducers:{ 
            signInStart:(state)=>{
                state.loading = true;
            },
            signInSuccess:(state,action)=>{
                state.currentUser=action.payload;
                state.loading=false;
                state.error=null;
            },
            signInFailure:(state,action)=>{
                state.error =action.payload;
                state.loading=false
            },
            UpdateUserStart:(state)=>{
                state.loading = true;
            },
             UpdateUserSuccess:(state,action)=>{
                state.currentUser=action.payload;
                state.loading=false;
                state.error=null;
            },
            UpdateUserFailure:(state,action)=>{
                state.error =action.payload;
                state.loading=false
            },
            DeleteUserStart:(state)=>{
                state.loading = true;
            },
             DeleteUserSuccess:(state)=>{
                state.currentUser=null;
                state.loading=false;
                state.error=null;
            },
            DeleteUserFailure:(state,action)=>{
                state.error =action.payload;
                state.loading=false
            },
            signOutUserStart:(state)=>{
                state.loading = true;
            },
             signOutUserSuccess:(state)=>{
                state.currentUser=null;
                state.loading=false;
                state.error=null;
            },
            signOutUserFailure:(state,action)=>{
                state.error =action.payload;
                state.loading=false
            },

           

        }
    }
)

export const {signInStart 
    , signInFailure
    ,signInSuccess
    ,UpdateUserFailure
    ,UpdateUserStart
    ,UpdateUserSuccess
    ,DeleteUserStart
    ,DeleteUserSuccess
    ,DeleteUserFailure
    ,signOutUserStart
    ,signOutUserSuccess
    ,signOutUserFailure

} = userSlice.actions;

export default userSlice.reducer;
