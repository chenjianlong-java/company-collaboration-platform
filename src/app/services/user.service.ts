import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Project} from "../domain/project.model";
import {from, Observable, of} from "rxjs";
import {mergeMap, map, switchMap, count, mapTo, filter, reduce} from 'rxjs/operators';
import {User} from "../domain/user.model";


@Injectable()
export class UserService {
    private readonly domain = 'users';
    private headers = new HttpHeaders({
        'Content-type': 'application/json'
    })
    
    constructor(private http: HttpClient,
                @Inject('BASE_CONFIG') private config
    ) {
    }
    
    searchUsers(filter: string): Observable<User[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http.get(uri, {params: {'email_like': filter}}).pipe(map(r => r as User[]));
    }
    
    searchUsersByProject(projectId: string): Observable<User[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http.get(uri, {params: {'projectId': projectId}}).pipe(map(r => r as User[]));
    }
    
    addProjectRef(user: User, projectId: string): Observable<User> {
        const uri = `${this.config.uri}/${this.domain}`;
        const projectIds = user.projectIds ? user.projectIds : [];
        if (projectIds.indexOf(projectId) > -1) return of(user);
        return this.http.patch(uri, JSON.stringify({projectIds: [...projectIds, projectId]}), {headers: this.headers}).pipe(map(r => r as User));
    }
    
    removeProjectRef(user: User, projectId: string): Observable<User> {
        const uri = `${this.config.uri}/${this.domain}`;
        const projectIds = user.projectIds ? user.projectIds : [];
        const index = projectIds.indexOf(projectId);
        if (index === -1) return of(user);
        return this.http.patch(uri, JSON.stringify({projectIds: [...projectIds, projectId]}), {headers: this.headers}).pipe(map(r => r as User));
    }
    
    /**
     * 为项目批量添加新成员
     */
    batchUpdateProjectRef(project: Project): Observable<User[]> {
        const projectId = project.id;
        const memberIds = project.members ? project.members : [];
        return from(memberIds).pipe(
            switchMap(id => {
                const uri = `${this.config.uri}/${this.domain}/${id}`
                return this.http.get(uri).pipe(map(res => res as User));
            }),
            filter(user => user.projectIds.indexOf(projectId) === -1),
            switchMap(u => this.addProjectRef(u, projectId)),
            reduce((arr: User[], curr: User) => [...arr, curr], [])
        );
    }
    
}
