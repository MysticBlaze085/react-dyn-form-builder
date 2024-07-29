export const groupByData = (array, key) => {
    const gKey = key.toLowerCase();

    return array.reduce((result, currentValue) => {
        const normalizedCurrentValue = {};
        for (const k in currentValue) {
            if (currentValue.hasOwnProperty(k)) {
                normalizedCurrentValue[k.toLowerCase()] = currentValue[k];
            }
        }

        const groupKey = normalizedCurrentValue[gKey];
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(currentValue);
        return result;
    }, {});
};
