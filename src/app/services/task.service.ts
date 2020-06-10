import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Task} from "../domain/task.model";
import {from, Observable} from "rxjs";
import {mergeMap, map, switchMap, count, mapTo} from 'rxjs/operators';


@Injectable()
export class TaskService {
    private readonly domain = 'tasks';
    private headers = new HttpHeaders({
        'Content-type': 'application/json'
    })
    
    constructor(private http: HttpClient,
                @Inject('BASE_CONFIG') private config
    ) {
    }
    
    add(task: Task) {
        task.id = null;  // 防止自己携带id
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http.post(uri, JSON.stringify(task), {headers: this.headers});
    }
    
    update(task: Task) {
        const uri = `${this.config.uri}/${this.domain}/${task.id}`;
        const toUpdate = {
            desc: task.desc,
            priority: task.priority,
            dueDate: task.dueDate,
            reminder: task.reminder,
            ownerId: task.ownerId,
            participantIds: task.participantIds,
            remark: task.remark
        }
        // httpClient不需要 map(res => res.json())
        return this.http.post(uri, JSON.stringify(task), {headers: this.headers});
    }
    
    del(task: Task): Observable<Task> {
        const uri = `${this.config.uri}/taskLists/${task.id}`;
        // 用switch是因为count过来的时候就不需要关心我层了
        return this.http.delete(uri).pipe(mapTo(task));
    }
    
    get(taskListId: string): Observable<Task[]> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http.get(uri, {
            params: {'taskListId': taskListId}
        }).pipe(map(r => r as Task[]));
    }
}
