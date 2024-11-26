export const jsonAggregator = (data: Array<object>, field: string) => {
    const result = {};

    data.forEach((item) => {
        const keys = field.split('.');
        const value = keys.reduce((acc, key) => acc?.[key], item);

        if (value) {
            result[value] = (result[value] || 0) + 1;
        }
    });

    return Object.entries(result).map(([name, count]) => ({ name, count }));
}