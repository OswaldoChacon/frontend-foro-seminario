// import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable } from "rxjs";
import { RolesService } from '../rol/rol.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { SolicitudesService } from '../solicitudes.service';
import { finalize } from 'rxjs/operators';

export class SolicitudesDataSource extends DataSource<any>{

    private solicitudesSubject = new BehaviorSubject<any>([]);
    total = 0;

    constructor(private _solicitudesService: SolicitudesService) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.solicitudesSubject.asObservable();
    }

    disconnect() {
        this.solicitudesSubject.complete();
    }

    getSolicitudes() {
        this._solicitudesService.getSolicitudes().subscribe(roles => {
            this.solicitudesSubject.next(roles);
            this.total = roles.length;
        });
    }
}