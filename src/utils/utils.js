const onTestNewInfoAboutUser = (namming) =>{
    const namePos = namming.indexOf(' ');
    let firstName = '';
    let SecondName = '';
    if (namePos > 0) {
        firstName = (namming.slice(0, namePos));
        SecondName = (namming.slice(namePos+1, namming.length));
    } else {
        firstName = (namming);
        SecondName = ('notLastName');
    }
    return ([firstName,SecondName]);
}

export default onTestNewInfoAboutUser;