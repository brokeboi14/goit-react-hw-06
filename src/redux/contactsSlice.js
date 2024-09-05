import { nanoid } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { initialState } from './initialState'

const contactSlice = createSlice({
    name: "contacts",
    initialState: initialState.contacts,
    reducers: {
        addContact: {
            reducer: (state, action) => {
                state.items.push(action.payload);
            },
            prepare: ({name, number}) => {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        number,
                    },
                };
            },
        },
     deleteContact (state, action) {
        state.items = state.items.filter((item) => item.id !== action.payload);
     },   
    },
});

export const { addContact, deleteContact } = contactSlice.actions;
export const getContact = (state) => state.contacts.items;
export const contactsReducer = contactSlice.reducer;