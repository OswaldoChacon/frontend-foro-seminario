// import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, Observable } from "rxjs";
import { RolesService } from '../rol/rol.service';
import { CollectionViewer,DataSource } from '@angular/cdk/collections';
import { finalize } from 'rxjs/operators';

export class RolesDataSource extends DataSource<any>{

    private rolesSubject = new BehaviorSubject<any>([]);
    private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    loading$ = this.loadingSubject.asObservable();
    total = 0;
    // roles = this.rolesSubject.asObservable();

    constructor(private _rolService: RolesService){
        super();
    }

    

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.rolesSubject.asObservable();
    }

    disconnect(){
        this.rolesSubject.complete();
    }

    getRoles(){
        this._rolService.getRoles().pipe(
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(roles=>{
            this.rolesSubject.next(roles);
            this.total = roles.length;
        });
    }
}