export const EMAIL_EXP = /^[\w-.]+@([\w-]+\.)+[\w-]+$/g;
export const PASSWORD_EXP = /^[\w-.@$!%*#?&]{6,}$/g;

export const MIME_IMAGE_EXP = /image\/\w+/;//do not need global here

//url = protocol(https) + domain/port(1~256) + country-code(0~6) + path
export const URL_EXP = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.?[a-zA-Z0-9()]{0,6}\b[-a-zA-Z0-9@:%_+.~#=?&/()]*/gi;
export const IMG_URL_EXP = /https?:[/|.|\w|\s|-]*\.(?:jpeg|jpg|gif|png)/gi;
export const BX_EXP = /(?<=^|\s)@\d+(?=\s|$)/gi;