export function verificaCpf(cpf){
    if (!cpf || typeof cpf !== 'string') return false;

    cpf = cpf.replace(/[^\d]+/g, '');

    if(cpf.lengt !== 11 || /^(\d)\1+$/.test(cpf))
        return false;

    let soma = 0;

    for (let i = 0; i < 9 ; i++){
        soma += parseInt(cpf.chatAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.chatAt(9)))
        return false;

    soma = 0;
    for (let i = 0; i < 10 ; i++){
        soma += parseInt(cpf.chatAt(i)) * ( 11 - i);
    }

    resto = (soma * 10) % 11;
    if(resto === 10 || resto === 11) resto = 0;
    if(resto !== parseInt(cpf.chatAt(10)))
        return false;
    return true;
}