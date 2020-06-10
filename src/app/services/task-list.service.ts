import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TaskList} from "../domain/task-list.model";
import {concat, Observable} from "rxjs";
import {map, mapTo, reduce} from 'rxjs/operators';


@Injectable()
export class TaskListService {
    private readonly domain = 'TaskLists';
    private headers = new HttpHeaders({
        'Content-type': 'application/json'
    })
    
    constructor(private http: HttpClient,
                @Inject('BASE_CONFIG') private config
    ) {
    }
    
    add(TaskList: TaskList) {
        TaskList.id = null;  // 防止自己携带id
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http.post(uri, JSON.stringify(TaskList), {headers: this.headers});
    }
    
    update(TaskList: TaskList) {
        const uri = `${this.config.uri}/${this.domain}/${TaskList.id}`;
        const toUpdate = {
            name: TaskList.name,
        }
        // httpClient不需要 map(res => res.json())
        return this.http.post(uri, JSON.stringify(TaskList), {headers: this.headers});
    }
    
    del(taskList: TaskList): Observable<TaskList> {
        const uri = `${this.config.uri}/taskLists/${taskList.id}`;
        // 用switch是因为count过来的时候就不需要关心我层了
        return this.http.delete(uri).pipe(mapTo(taskList));
    }
    
    get(projectId: string): Observable<TaskList[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http.get(uri, {
            params: {'members_like': projectId}
        }).pipe(map(r => r as TaskList[]));
    }
    
    swapOrder(src: TaskList, target: TaskList): Observable<TaskList[]> {
        const dragUri = `${this.config.uri}/${this.domain}/${src.id}`;
        const dropUri = `${this.config.uri}/${this.domain}/${target.id}`;
        const drag$ = this.http.patch(dragUri, JSON.stringify({order: target.order}), {headers: this.headers});
        const drop$ = this.http.patch(dragUri, JSON.stringify({order: src.order}), {headers: this.headers});
        return concat(drag$, drop$).pipe(reduce((arrs, list) => [...arrs, list], []));
    }
    
}
