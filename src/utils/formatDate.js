const formatDate = (text) => {
    // eslint-disable-next-line no-useless-escape
    const pattern = new RegExp("([0-9]{4})[\-/ \.]([0-9]{2})[\-/ \.]([0-9]{2})");
    if (pattern.test(text)) {
        const results = pattern.exec(text);
        return results[3] + '.' + results[2] + '.' + results[1];
    } else return 'Not a valid date';
};

export default formatDate;