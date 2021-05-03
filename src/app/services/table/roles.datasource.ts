import { BehaviorSubject, Observable, throwError } from "rxjs";
import { RolesService } from '../rol.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { Rol } from 'src/app/modelos/rol.model';

export class RolesDataSource extends DataSource<Rol>{

    private roles: Rol[];
    private rolesSubject = new BehaviorSubject<Rol[]>([]);
    total = 0;

    constructor(private _rolService: RolesService) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.rolesSubject.asObservable();
    }

    disconnect() {
        this.rolesSubject.complete();
    }

    getRoles(url: string) {
        this._rolService.getRoles(url).subscribe(roles => {
            this.rolesSubject.next(roles);
            this.roles = roles;
            this.total = roles.length;
        });
    }

    eliminarRoles(rol: Rol, url: string) {
        return this._rolService.eliminarRol(rol.nombre_, url);
    }


}