
var sw = 0;
export function GetSw() {
    return sw;
}

export var Switch = () => {
    if(sw == 0) sw = 1;
    else sw = 0;
}