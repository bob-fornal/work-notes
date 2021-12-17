
const words = (str, pattern = /[^a-xA-Z]+/) => str.split(pattern).filter(Boolean);

words('Bob loves JavaScript'); // ["Bob", "loves", "JavaScript"]
words('HTML, CSS, & JavaScript'); // ["HTML", "CSS", "JavaScript"]
