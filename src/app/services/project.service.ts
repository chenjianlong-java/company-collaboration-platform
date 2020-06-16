import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Project} from "../domain/project.model";
import {from, Observable} from "rxjs";
import {mergeMap, map, switchMap, count, mapTo} from 'rxjs/operators';


@Injectable()
export class ProjectService {
    private readonly domain = 'projects';
    private headers = new HttpHeaders({
        'Content-type': 'application/json'
    })
    
    constructor(private http: HttpClient,
                @Inject('BASE_CONFIG') private config
    ) {
    }
    
    add(project: Project): Observable<any> {
        project.id = null;  // 防止自己携带id
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http.post(uri, JSON.stringify(project), {headers: this.headers});
    }
    
    update(project: Project) {
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;
        const toUpdate = {
            id: project.id,
            name: project.name,
            desc: project.desc,
            coverImg: project.coverImg
        }
        // httpClient不需要 map(res => res.json())
        return this.http.patch(uri, JSON.stringify(toUpdate), {headers: this.headers});
    }
    
    del(project: Project): Observable<Project> {
        // 使用mergeMap是因为确保所删除一个tasklist的时候前边删除的tasklist流还能生效
        const delTasks$ = from(project.taskLists ? project.taskLists : []).pipe(mergeMap(listId => {
            return this.http.delete(`${this.config.uri}/taskLists/${listId}`)
        }), count());
        // 用switch是因为count过来的时候就不需要关心我层了
        return delTasks$.pipe(switchMap(_ => this.http.delete(`${this.config.uri}/${this.domain}/${project.id}`)),
            mapTo(project));
    }
    
    get(userId: string): Observable<Project[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http.get(uri).pipe(map(r => r as Project[]));
    }
}
