export class Usuario {
    nombre?: string;
    apellidoP?: string;
    apellidoM?: string;
    num_control: string;
    email?: string;
    jurado?: boolean
    roles?: [
        {
            nombre: string,
            is: boolean
        }
    ]
}