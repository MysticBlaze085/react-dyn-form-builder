export const groupRowBy = (state, action) => {
    let key = action.payload;
    if (!key) return {}; // Return an empty object instead of undefined

    key = key.toLowerCase(); // Normalize key to lowercase

    // Ensure dataSource is an array
    if (!Array.isArray(state.dataSource)) {
        console.error('dataSource is not an array:', state.dataSource);
        return {}; // Return an empty object instead of undefined
    }

    return state.dataSource.reduce((result, currentValue) => {
        // Check if key exists on currentValue
        if (!(key in currentValue)) {
            console.warn(`Key "${key}" not found in:`, currentValue);
            return result; // Continue with the next iteration
        }

        const groupKey = currentValue[key] ? currentValue[key].toString().toLowerCase() : ''; // Normalize groupKey to lowercase
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(currentValue);
        return result;
    }, {});
};