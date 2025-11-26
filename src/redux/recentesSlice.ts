import { createSlice } from "@reduxjs/toolkit";

interface Activity {
    id: string;
    timestamp: number;
    type: 'VISUALIZACAO' | 'EDICAO' | 'RENOVACAO' | 'CANCELAMENTO';
    details: string;
}

interface RecentesState {
    atividades: Activity[];
}

const initialState: RecentesState = {
    atividades: [],
};

export const recentesSlice = createSlice({
    name: 'recentes',
    initialState,
    reducers: {
        logActivity: (state, action: { payload: Omit<Activity, 'id' | 'timestamp'> }) => {
            const newActivity: Activity = {
                id: crypto.randomUUID(), 
                timestamp: Date.now(),
                ...action.payload,
            };
            
            state.atividades.unshift(newActivity);

            if (state.atividades.length > 10) {
                state.atividades.pop(); 
            }
        },
        
        clearActivities: (state) => {
            state.atividades = [];
        }
    },
});

export const { logActivity, clearActivities } = recentesSlice.actions;
export const recentesReducer = recentesSlice.reducer;