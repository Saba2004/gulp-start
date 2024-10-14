const rx = /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/im;
const rx2 = /[^0-9+]/g;
const rx3 = /^(\+\d{1,3})?\d{10,}$/;


export const testPhone = (phone) => {
    return rx.test(phone) && rx3.test(phone.replace(rx2,''));
};