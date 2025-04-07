import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Location {
    address: string;
    descripton: string;
    averageOccupancy: number;
    id: string;
    totalCapacity: number;
    rating:string
}

interface LocationsState {
    locations: Location[];
    loading: boolean;
}

const initialState : LocationsState = {
    locations: [],
    loading: false,
}

const locationsSlice = createSlice({
    name:"locations",
    initialState,
    reducers: {
        setLocations(state, action: PayloadAction<Location[]>) {
            state.locations = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        }
    }
})
export const {setLocations, setLoading} = locationsSlice.actions;
export default locationsSlice.reducer;
