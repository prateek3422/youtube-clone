import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status : false,
    userData :null
}

const authSlice = createSlice({
    name: "Auth",
    initialState,
    reducers:{

    }

})