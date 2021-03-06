export class Usuario {
    nombre?: string;
    nombreCompleto?:string;
    apellidoP?: string;
    apellidoM?: string;
    num_control: string;
    email?: string;
    jurado?: boolean;
    acceso?:number;
    horarios?:Array<any>;
    roles?: [
        {
            nombre_: string,
            is: boolean
        }
    ]
    myTeam?: boolean;
    taller?:boolean;
    horarios_count: number;
    jurado_proyecto_count: number;
}