const getRandomIndex = () => {
    let result = '';
    const words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

    const max_position = words.length - 1;
    for (let i = 0; i < 6; i++) {
        let position = Math.floor(Math.random() * max_position);

        result = result + words.substring(position, position + 1);
    }
    return result;
}

export default getRandomIndex;