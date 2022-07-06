export const authReducer = (state, action) => {
    const { type, payload } = action;
    switch (action) {
        case "SET_AUTH":
            return {
                ...state,
            };
    }
};
