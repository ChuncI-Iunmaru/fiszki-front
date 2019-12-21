const getLinkType = (link) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    if (pattern.test(link)) {
        const imagePattern = new RegExp('\\.(jpg|png|gif)$');
        const audioPattern = new RegExp('\\.(wav|mp3|ogg)$');
        if (imagePattern.test(link)) return { type: 'image', extension: imagePattern.exec(link)[1]};
        else if (audioPattern.test(link)) return { type: 'audio', extension: audioPattern.exec(link)[1]};
        else return { type: 'unsupported', extension: 'link'};
    } else return { type: 'invalid', extension: null};
};

export default getLinkType;
