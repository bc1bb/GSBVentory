const dateHtmlValue = (date: Date|string) => {
    // for some reason React likes to joke around and send string to this function while everything is typed as Date,
    // i love typescript btw.
    const newDate = new Date(date);

    if (newDate.getFullYear() === 1970) return ""
    else return newDate.toLocaleDateString('en-CA');
}

export default dateHtmlValue;