
var sw = 0;
export function GetSw() {
    return sw;
}

export function SetSw(page) {
    sw = page;
}

export var Switch = () => {
    if(sw == 0) sw = 1;
    else sw = 0;
}