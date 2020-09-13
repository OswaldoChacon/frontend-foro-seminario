import { BehaviorSubject, Observable, throwError } from "rxjs";
import { RolesService } from '../rol/rol.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { Rol } from 'src/app/modelos/rol.model';

export class RolesDataSource extends DataSource<Rol>{

    private roles: Rol[];
    private rolesSubject = new BehaviorSubject<Rol[]>([]);
    private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    loading$ = this.loadingSubject.asObservable();
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
        this.resetData();
        this._rolService.getRoles(url).pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(roles => {
            this.rolesSubject.next(roles);
            this.roles = roles;
            this.total = roles.length;
        });
    }

    eliminarRoles(rol: Rol, url: string) {
        this.resetData();
        return this._rolService.eliminarRol(rol.nombre_, url).pipe(
            catchError((error) => {
                this.handleError();
                return throwError(error);
            }),
        )
    }

    resetData() {
        this.rolesSubject.next([]);
        this.loadingSubject.next(true);
    }

    handleError() {
        this.rolesSubject.next(this.roles);
        this.loadingSubject.next(false);
    }
}